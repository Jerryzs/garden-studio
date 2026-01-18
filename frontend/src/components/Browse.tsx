import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router'
import * as api from '../api'
import ActivityCard from './ActivityCard'

const Browse = () => {
  const user = useOutletContext() as api.User | null | undefined
  const navigate = useNavigate()

  const [activities, setActivities] = useState<api.Activity[] | undefined>()
  const [userAIds, setUserAIds] = useState<Set<number>>(new Set())

  const update = () => {
    api.listUserAIds().then((result) => {
      if ('message' in result) {
        return
      }
      setUserAIds(new Set(result))
    })
  }

  useEffect(() => {
    api.listAllActivities().then((result) => {
      if ('message' in result) {
        return
      }
      setActivities(result)
    })
  }, [])

  useEffect(() => {
    if (user) update()
  }, [user])

  const handleActivityAdd = (id: number) => {
    if (!user) {
      navigate('/signin')
      return
    }

    api.joinActivity(id).then((result) => {
      if (result) {
        return
      }
      update()
    })
  }

  return (
    <div className='container py-4'>
      <h2 className='display-4'>Browse activities</h2>
      <div className='py-2'>
        {!activities
          ? 'Loading...'
          : !activities.length
            ? 'No activities.'
            : activities.map((a) => (
                <div key={`ac_${a.id}`} className='d-flex flex-row justify-content-between align-items-center'>
                  <ActivityCard activity={a} />
                  <div className='px-2'>
                    {userAIds.has(a.id) ? (
                      <button className='btn border-0' disabled>
                        <i className='bi bi-calendar-check-fill' style={{ fontSize: '2rem' }}></i>
                      </button>
                    ) : (
                      <button className='btn' onClick={() => handleActivityAdd(a.id)}>
                        <i className='bi bi-calendar-plus' style={{ fontSize: '2rem' }}></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
      </div>
    </div>
  )
}

export default Browse
