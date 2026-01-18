import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router'
import * as api from '../api'
import ActivityCard from './ActivityCard'

const Profile = () => {
  const user = useOutletContext() as api.User | null | undefined
  const navigate = useNavigate()

  const [activities, setActivities] = useState<api.Activity[] | undefined>()

  const update = () => {
    api.listTimelineActivities().then((result) => {
      if ('message' in result) {
        return
      }
      setActivities(result)
    })
  }

  useEffect(() => {
    update()
  }, [])

  const handleSignOut = () => {
    api.logout().then((result) => {
      if (!result) navigate('/discover')
    })
  }

  const handleApprove = (id: number) => {
    api.approveActivity(id).then(() => {
      update()
    })
  }

  return (
    <div>
      <div className='py-2 bg-secondary'>
        <div className='container d-flex flex-row gap-4'>
          <div>
            <i className='bi bi-person-circle' style={{ fontSize: '6rem' }}></i>
          </div>
          <div className='py-4'>
            <h1>{user?.name}</h1>
          </div>
        </div>
      </div>
      <div className='container py-4'>
        <h2 className='display-4'>{user?.privilege === 1 ? 'Pending approval' : 'Timeline'}</h2>
        <div className='py-2'>
          {!activities
            ? 'Loading...'
            : !activities.length
              ? 'No activities.'
              : activities.map((a) => (
                  <div key={`ac_${a.id}`}>
                    <ActivityCard activity={a} />
                    {!user?.privilege ? null : (
                      <button className='btn btn-success w-100' onClick={() => handleApprove(a.id)}>
                        Approve
                      </button>
                    )}
                  </div>
                ))}
        </div>
        <button className='btn btn-danger w-100' onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Profile
