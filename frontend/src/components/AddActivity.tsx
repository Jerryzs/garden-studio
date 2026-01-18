const AddActivity = () => {
  return (
    <div className='container py-4'>
      <h1 className='display-4 mb-3'>Create activity</h1>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input type='text' name='name' className='form-control' id='name' placeholder=''></input>
      </div>
      <div className='mb-3 d-flex gap-4'>
        <div>
          <label htmlFor='date' className='form-label'>
            Date
          </label>
          <input type='date' name='startdate' className='form-control' id='date' placeholder=''></input>
        </div>
        <div>
          <label htmlFor='time' className='form-label'>
            Time
          </label>
          <input type='time' name='starttime' className='form-control' id='time' placeholder=''></input>
        </div>
        <div>
          <label htmlFor='length' className='form-label'>
            Duration
          </label>
          <input type='time' name='length' className='form-control' id='length' placeholder=''></input>
        </div>
      </div>
      <div className='mb-3'>
        <label htmlFor='location' className='form-label'>
          Location
        </label>
        <input type='text' className='form-control' id='location' placeholder=''></input>
      </div>
      <div className='mb-3'>
        <label htmlFor='desc' className='form-label'>
          Description
        </label>
        <textarea className='form-control' name='detail' id='desc' rows={5}></textarea>
      </div>
      <div className='mb-3'>
        <button className='btn btn-primary w-100'>Create</button>
      </div>
    </div>
  )
}

export default AddActivity
