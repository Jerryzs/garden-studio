import { useState, type ComponentProps } from 'react'
import { useNavigate, useOutletContext } from 'react-router'
import * as api from '../api'

const SignIn = () => {
  const user = useOutletContext() as api.User | null | undefined
  const navigate = useNavigate()

  const [register, setRegister] = useState<boolean>(false)
  const [message, setMessage] = useState<string | undefined>()

  if (user) {
    navigate('/')
  }

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const username = data.get('username')?.toString().trim(),
      password = data.get('password')?.toString().trim(),
      name = data.get('name')?.toString().trim()

    if (!username || !password) {
      return
    }

    api.auth(username, password, name ?? undefined).then((result) => {
      if (result) {
        setMessage(result.message)
        return
      }

      setMessage(undefined)
      navigate(-1)
    })
  }

  return (
    <div className='px-4 py-5'>
      <h1 className='display-2'>Sign in</h1>
      <form className='py-4' style={{ maxWidth: '640px' }} onSubmit={handleSubmit}>
        {!message ? null : (
          <div className='alert alert-danger p-3' role='alert'>
            {message}
          </div>
        )}

        {register ? (
          <div className='mb-3'>
            <label htmlFor='register-name-input' className='form-label'>
              Name
            </label>
            <input
              required
              name='name'
              type='text'
              className='form-control'
              id='register-name-input'
              placeholder='John Doe'
            />
          </div>
        ) : null}
        <div className='mb-3'>
          <label htmlFor='login-username-input' className='form-label'>
            Username
          </label>
          <input
            required
            name='username'
            type='text'
            className='form-control'
            id='login-username-input'
            placeholder='john.doe'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='login-password-input' className='form-label'>
            Password
          </label>
          <input
            required
            name='password'
            type='password'
            className='form-control'
            id='login-password-input'
            placeholder='************'
          ></input>
        </div>
        <div className='mb-3 text-center'>
          <a
            href={register ? '?login' : '?register'}
            onClick={(e) => {
              e.preventDefault()
              setRegister(!register)
            }}
          >
            {register ? 'I already have an account' : "I don't have an account"}
          </a>
        </div>
        <div className='w-100'>
          <button className='btn btn-primary w-100' type='submit'>
            {register ? 'Create account' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
