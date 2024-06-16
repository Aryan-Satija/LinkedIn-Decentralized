import React from 'react'
import { useState, useEffect } from 'react';
import { GetGlobalProps } from '../context';
import { useNavigate } from 'react-router-dom';
const BuildProfile3 = ({profile, setProfile, setStep}) => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(profile.skills);
  const [newSkill, setNewSkill] = useState('');
  const {updateSkills} = GetGlobalProps();
  const changeHandler = (event)=>{
    setNewSkill(event.target.value);
  }
  const addHandler = async()=>{
    setSkills((prev)=>{
      return [...prev, newSkill];
    })
    
    await updateSkills(newSkill)
    
    setNewSkill(''); 
  }
  useEffect(()=>{
    setProfile(prev => {
      return {
        ...prev,
        'skills': skills
      } 
    })

  }, [skills])
  const submitHandler = (event)=>{
    event.preventDefault();
    navigate("/");   
  }
  return (
    <div className='w-[60%] lg:w-[40%] min-w-[320px] p-2 mx-auto mt-[4rem]'>
        <div>
            <label htmlFor='skills' className='text-slate-600'>Skills*</label>
            <input type='text' id='skills' onChange={changeHandler} className='w-full p-4 border-slate-400 border-2 rounded-sm'/>
        </div>
        <div className='flex flex-col items-start mt-2 gap-2'>
          {
            profile.skills.map((skill)=>{
              return (<div className='text-[#0b67c2] rounded-md bg-[#0b67c2]/20 p-2  inline-block cursor-pointer text-md font-bold hover:scale-95 duration-200'>
                {
                  skill
                }
              </div>)
            })
          }
        </div>
        <div className='flex flex-col '>
            <button className='text-[#0b67c2] rounded-md bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200' onClick={addHandler}>Add</button>
            <button className='text-[#0b67c2] rounded-md bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200' onClick={submitHandler}>Next</button>
        </div>
    </div>
  )
}

export default BuildProfile3