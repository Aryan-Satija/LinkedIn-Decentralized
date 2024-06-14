import React from 'react'

const BuildProfile2 = ({profile, setProfile, setStep}) => {
  const changeHandler = (event)=>{
    setProfile((prev)=>{
        return {
            ...prev,
            [event.target.id] : event.target.value
        }
    })
  }    
  const submitHandler = (event)=>{
    event.preventDefault();
    setStep(3);
  }
  console.log(profile);
  return (
    <div className='w-[60%] lg:w-[40%] min-w-[320px] p-2 mx-auto mt-[4rem]'>
        <form onSubmit={submitHandler}>
          <div className='flex flex-col items-start'>
              <label htmlFor='description'>Description*</label>
              <textarea id='description' className='p-2 border-2 border-slate-500 rounded-sm w-full' rows={10} onChange={changeHandler}/>
          </div>
          <div className='flex flex-col'>
              <button className='text-[#0b67c2] rounded-md bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200'>Next</button>
          </div>
        </form>
    </div>
  )
}

export default BuildProfile2