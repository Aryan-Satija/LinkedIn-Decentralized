import React from 'react'

const BuildProfile3 = ({profile, setProfile, setStep}) => {
  const changeHandler = (event)=>{

  }    
  const submitHandler = (event)=>{
    event.preventDefault();
    setStep(3);
  }
  return (
    <div className='w-[60%] lg:w-[40%] min-w-[320px] p-2 mx-auto mt-[4rem]'>
        <form onSubmit={submitHandler}>
          <div>
              <label htmlFor='skills' className='text-slate-600'>Skills*</label>
              <input type='text' id='skills' onChange={changeHandler} className='w-full p-4 border-slate-400 border-2 rounded-sm'/>
          </div>
          <div>
            {
              profile.skills.map((skill)=>{
                return (<div>
                  {
                    skill
                  }
                </div>)
              })
            }
          </div>
          <div className='flex flex-col '>
              <button className='text-[#0b67c2] rounded-md bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200'>Add</button>
              <button className='text-[#0b67c2] rounded-md bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200'>Next</button>
          </div>
        </form>
    </div>
  )
}

export default BuildProfile3