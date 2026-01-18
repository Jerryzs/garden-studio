import express from 'express'
import { RowDataPacket } from 'mysql2'
import pool from '../db.ts'
import { auth } from './user.ts'

const router = express.Router()

interface Activity extends RowDataPacket {
  id: number
  name: string
  startdate: string
  starttime: string
  length: string
  capacity: number
  image: string
  approved: number
  location: string
  lat: number
  lon: number
  detail: string
}

router.route('/activity/all').get(async (req, res) => {
  try {
    const [activities] = await pool.execute<Activity[]>(
      'select * from activity where startdate >= current_date() and approved = 1 order by startdate, starttime'
    )
    res.json(activities)
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server crashed.' })
  }
})

router.route('/activity/list').get(auth, async (req, res) => {
  const user = req.user

  try {
    if (!user) {
      res.status(403).json({ message: 'You are not logged in.' })
      return
    }

    if (user.privilege < 1) {
      const [activities] = await pool.execute<Activity[]>(
        'select * from activity where id in (select activity from user_activity where user = ?) order by startdate, starttime',
        [user.id]
      )
      res.json(activities)
      return
    }

    const [activities] = await pool.execute<Activity[]>(
      'select * from activity where startdate >= current_date() and approved = 0 order by startdate, starttime'
    )
    res.json(activities)
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server crashed.' })
  }
})

router.route('/activity/approve').post(auth, async (req, res) => {
  const user = req.user

  try {
    if (!user || user.privilege < 1) {
      res.status(403).json({ message: 'You are not an admin.' })
      return
    }

    const { id } = req.body as { id?: number | string }
    if (!id) {
      res.status(400).json({ message: 'id does not exist.' })
      return
    }

    await pool.execute('update activity set approved = 1 where id = ?', [id])
    res.status(200).json(null)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server crashed.' })
  }
})

export default router
