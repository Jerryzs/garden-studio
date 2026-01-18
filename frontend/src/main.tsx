import { createRoot } from 'react-dom/client'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'

import Browse from './components/Browse'
import Home from './components/Home'
import Profile from './components/Profile'
import Protected from './components/Protected'
import SignIn from './components/SignIn'
import './main.scss'

const App = () => {
  return <Outlet />
}

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='discover' element={<Browse />}></Route>
        <Route path='signin' element={<SignIn />}></Route>
        <Route element={<Protected />}>
          <Route index element={<Home />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>
)

export default App
