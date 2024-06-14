import React from 'react'
import { GetGlobalProps } from '../context';

const BuildProfile1 = ({profile, setProfile, setStep}) => {
    const {updateProfile} = GetGlobalProps();
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
        (async()=>{
            await updateProfile(profile.name, profile.lives, profile.organisation, profile.about)
        })()
        setStep(2);
    }
    return (
    <div className='w-[60%] lg:w-[40%] min-w-[320px] p-2 mx-auto mt-[4rem]'>
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor='name' className='text-slate-600'>Name*</label>
                <input type='text' id='name' placeholder={profile.name} onChange={changeHandler} className='w-full p-4 border-slate-400 border-2 rounded-sm'/>
            </div>
            <div>
                <label htmlFor='organisation' className='text-slate-600'>Organisation*</label>
                <input type='text' id='organisation' placeholder={profile.organisation} onChange={changeHandler} className='w-full p-4 border-slate-400 border-2 rounded-sm'/>
            </div>
            <div>
                <label htmlFor='lives' className='text-slate-600'>Lives*</label>
                <input type='text' id='lives' placeholder={profile.lives} onChange={changeHandler} className='w-full p-4 border-slate-400 border-2 rounded-sm'/>
            </div>
            <div>
                <label htmlFor='about' className='text-slate-600'>About*</label>
                <input type='text' id='about' placeholder={profile.about} onChange={changeHandler} className='w-full p-4 border-slate-400 border-2 rounded-sm'/>
            </div>
            <div>
                <label className='text-slate-600'>Pronoun*</label>
                <div className='flex flex-row items-center justify-center gap-16 text-slate-800 p-2 bg-sky-400/40 w-[18rem] rounded-full '>
                    <div className={profile.pronoun == true ? 'bg-sky-800/80 p-4 rounded-full cursor-pointer' : 'p-4 cursor-pointer'} onClick={()=>{
                        setProfile((prev)=>{
                            return {
                                ...prev,
                                'pronoun' : true
                            }
                    })}}>He/Him</div>
                    <div className={profile.pronoun == false ? 'bg-sky-800/80 p-4 rounded-full cursor-pointer' : 'p-4 cursor-pointer'} onClick={()=>{
                        setProfile((prev)=>{
                            return {
                                ...prev,
                                'pronoun' : false
                            }
                        })
                    }}>She/Her</div>
                </div>
            </div>
            <div className='flex flex-col'>
                <button className='text-[#0b67c2] rounded-md bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200'>Next</button>
            </div>
        </form>
    </div>
  )
}

export default BuildProfile1