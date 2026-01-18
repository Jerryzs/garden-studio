import { type ComponentProps } from 'react'
import { useNavigate } from 'react-router'
import * as api from '../api'

const AddActivity = () => {
  const navigate = useNavigate()

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const object: Record<string, string> = {}
    data.forEach((value, key) => (object[key] = value as string))
    object['length'] = `${object['length']}:00`
    api.createActivity(object).then((result) => {
      if (!result) {
        navigate('/discover')
      }
    })
  }

  return (
    <div className='container py-4'>
      <h1 className='display-4 mb-3'>Create activity</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input required type='text' name='name' className='form-control' id='name' placeholder=''></input>
        </div>
        <div className='mb-3 d-flex gap-4'>
          <div>
            <label htmlFor='date' className='form-label'>
              Date
            </label>
            <input required type='date' name='startdate' className='form-control' id='date' placeholder=''></input>
          </div>
          <div>
            <label htmlFor='time' className='form-label'>
              Time
            </label>
            <input required type='time' name='starttime' className='form-control' id='time' placeholder=''></input>
          </div>
          <div>
            <label htmlFor='length' className='form-label'>
              Duration
            </label>
            <input required type='number' name='length' className='form-control' id='length' placeholder=''></input>
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='location' className='form-label'>
            Location
          </label>
          <input required name='location' type='text' className='form-control' id='location' placeholder=''></input>
        </div>
        <div className='mb-3'>
          <label htmlFor='desc' className='form-label'>
            Description
          </label>
          <textarea className='form-control' name='detail' id='desc' rows={5}></textarea>
        </div>
        <div className='mb-3'>
          <button className='btn btn-primary w-100' type='submit'>
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddActivity
