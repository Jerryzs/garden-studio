import { Link } from 'react-router'

const Welcome = () => {
  // TODO: name
  return (
    <div className='position-relative vh-100'>
      <div className='position-absolute w-100 text-center' style={{ top: '20vh' }}>
        <h1 className='display-1 fw-medium'>Welcome to</h1>
        <h2 className='display-4'>nwHacks</h2>
      </div>
      <div className='position-absolute w-100 bottom-0'>
        <div className='bg-secondary' style={{ bottom: '30vh', height: '15vh', borderRadius: '50% 50% 0 0' }}></div>
        <div className='bg-secondary' style={{ bottom: '0vh', height: '35vh' }}></div>
      </div>
      <div className='position-absolute w-100' style={{ bottom: '25vh' }}>
        <div className='d-flex flex-column gap-2'>
          <div className='mx-auto'>
            <Link className='btn btn-light fs-4 fw-medium px-5 py-2' to='/signin'>
              Sign in
            </Link>
          </div>
          {/* <div className='mx-auto'>
            <Link className='btn btn-link fs-6 px-5 py-2' to='/signin'>
              Sign up
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Welcome
