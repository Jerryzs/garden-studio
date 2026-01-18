import * as api from '../api'

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const formatTime = (time: string) => {
  const timeInt = parseInt(time)
  const minutes = time.substring(3, 5)

  if (time > '12:00') {
    return `${timeInt - 12}:${minutes} PM`
  } else {
    return `${timeInt}:${minutes} AM`
  }
}

const ActivityCard = ({ activity, ver = 0 }: { activity: api.Activity; ver?: number }) => {
  switch (ver) {
    case 0:
    case 2:
      return (
        <div className='py-2'>
          <div>
            {formatDate(activity.startdate)} @ {formatTime(activity.starttime)}
          </div>
          <div>
            <h3>{activity.name}</h3>
          </div>
          <div>
            <i className='bi bi-geo px-2'></i>
            {activity.location}
          </div>
          <div>
            <i className='bi bi-stopwatch px-2'></i>
            {`${parseInt(activity.length)} hr`}
          </div>
        </div>
      )
    case 1:
      return (
        <div>
          {formatDate(activity.startdate)}: {activity.name}
        </div>
      )
  }
}

export default ActivityCard
