import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import * as api from '../api'
import ActivityCard from './ActivityCard'

const tod = () => {
  const now = new Date().getHours()
  return now < 12 ? 'morning' : now < 17 ? 'afternoon' : 'evening'
}

const Home = () => {
  const user = useOutletContext() as api.User

  const [activities, setActivities] = useState<api.Activity[] | undefined>()

  useEffect(() => {
    api.listUserActivities().then((result) => {
      if ('message' in result) {
        return
      }
      setActivities(result)
    })
  }, [])

  return (
    <div className='container py-5'>
      <div className=''>
        <h1 className='display-4'>{`Good ${tod()},`}</h1>
        <h2>{user.name}</h2>
      </div>
      <div className='py-2'>
        {!activities ? (
          'Loading...'
        ) : !activities.length ? (
          'No activities.'
        ) : (
          <div className='card'>
            <div className='card-header'>
              <ul className='nav nav-tabs card-header-tabs'>
                <li className='nav-item'>
                  <h4 className='nav-link active fw-medium'>Upcoming activity</h4>
                </li>
              </ul>
            </div>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <ActivityCard activity={activities[0]} />
              </li>
              {activities.slice(1, 5).map((a) => (
                <li key={`ac_${a.id}`} className='list-group-item'>
                  <ActivityCard ver={1} activity={a} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
