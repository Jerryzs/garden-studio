import { NavLink, Outlet, useLocation } from 'react-router'

import { useEffect, useState, type CSSProperties } from 'react'
import * as api from '../api'

const ICON_STYLE: CSSProperties = { fontSize: '2rem' }

export const Layout = () => {
  const location = useLocation()
  const [user, setUser] = useState<api.User | null | undefined>()

  useEffect(() => {
    api.getUser().then((result) => {
      if ('message' in result) {
        return setUser(null)
      }

      setUser(result)
    })
  }, [location])

  return (
    <>
      <Outlet context={user} />
      <nav className='d-md-none fixed-bottom bg-body-tertiary'>
        <ul className='nav nav-justified text-dark'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/discover'>
              {({ isActive }) =>
                isActive ? (
                  <i className='bi bi-compass-fill' style={ICON_STYLE}></i>
                ) : (
                  <i className='bi bi-compass' style={ICON_STYLE}></i>
                )
              }
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/'>
              {({ isActive }) =>
                isActive ? (
                  <i className='bi bi-house-fill' style={ICON_STYLE}></i>
                ) : (
                  <i className='bi bi-house' style={ICON_STYLE}></i>
                )
              }
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/profile'>
              {({ isActive }) =>
                isActive ? (
                  <i className='bi bi-person-fill-gear' style={ICON_STYLE}></i>
                ) : (
                  <i className='bi bi-person-gear' style={ICON_STYLE}></i>
                )
              }
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}
