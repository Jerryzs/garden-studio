import { createRoot } from 'react-dom/client'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'

const App = () => {
  return <Outlet />
}

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>
)

export default App
