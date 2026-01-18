import { Outlet, useOutletContext } from 'react-router'

import * as api from '../api'
import Welcome from './Welcome'

const Protected = () => {
  const user = useOutletContext() as api.User | null | undefined

  if (!user) {
    return <Welcome />
  }

  return <Outlet context={user} />
}

export default Protected
