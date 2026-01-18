import bcrypt from 'bcrypt'
import express from 'express'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { v4 as uuid } from 'uuid'
import pool from '../db.ts'

const router = express.Router()

interface Session extends RowDataPacket {
  id: string
  expiry: number
  user: string
}

export interface User extends RowDataPacket {
  id: number
  username: string
  name: string
  privilege: number
}

interface UserIP extends RowDataPacket {
  id: number
  password: Buffer
}

const RENEW_DURATION = 3600

export const auth: express.RequestHandler = async (req, res, next) => {
  const { session } = req.cookies as { session?: string }

  if (!session) {
    next()
    return
  }

  try {
    const [results] = await pool.execute<Session[]>('select * from session where id = ?', [session])

    if (!results.length) {
      next()
      return
    }

    const { expiry, user } = results[0]

    const ts = Math.ceil(Date.now() / 1000)
    if (ts > expiry) {
      void pool.execute('delete from session where expiry < ?', [ts])
      next()
      return
    }

    void pool.execute('update session set expiry = ? where id = ?', [ts + RENEW_DURATION, session])

    const [users] = await pool.execute<User[]>('select id, username, name, privilege from user where id = ?', [user])

    if (!users.length) {
      void pool.execute('delete from session where user = ?', [user])
      next()
      return
    }

    req.user = users[0]
    res.cookie('session', session, { maxAge: RENEW_DURATION * 1000 })
    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server crashed.' })
  }
}

router
  .route('/user')
  .get(auth, (req, res) => {
    const user = req.user

    if (!user) {
      res.json({ message: 'No user logged in.' })
      return
    }

    res.json(user)
  })
  .post(async (req, res) => {
    const { username, password, name } = req.body as { username?: string; password?: string; name?: string }

    if (!username || !password) {
      res.status(400).json({ message: 'Missing username or password.' })
      return
    }

    try {
      const [users] = await pool.execute<UserIP[]>('select id, password from user where username = ?', [username])

      const session = uuid()
      const expiry = Math.ceil(Date.now() / 1000) + RENEW_DURATION

      if (users.length) {
        if (name?.trim()) {
          res.status(400).json({ message: 'User already exists.' })
          return
        }

        const { id, password: hashed } = users[0]

        if (!(await bcrypt.compare(password, hashed.toString()))) {
          res.status(400).json({ message: 'Invalid username or password.' })
          return
        }

        await pool.execute('insert into session (id, expiry, user) values (?, ?, ?)', [session, expiry, id])

        res.cookie('session', session, { maxAge: RENEW_DURATION * 1000 }).json(null)
        return
      }

      if (!name?.trim()) {
        res.status(400).json({ message: 'Invalid username or password.' })
        return
      }

      const hash = await bcrypt.hash(password, 10)

      const [headers] = await pool.execute<ResultSetHeader>(
        'insert into user (username, name, password) values (?, ?, ?)',
        [username, name.trim(), hash]
      )

      await pool.execute('insert into session (id, expiry, user) values (?, ?, ?)', [session, expiry, headers.insertId])

      res.cookie('session', session, { maxAge: RENEW_DURATION * 1000 }).json(null)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server crashed.' })
    }
  })

router.route('/user/logout').get(auth, async (req, res) => {
  const user = req.user

  if (!user) {
    res.json({ message: 'No user logged in.' })
    return
  }

  try {
    await pool.execute('delete from session where user = ?', [user.id])
    res.clearCookie('session').json(null)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server crashed.' })
  }
})

export default router
