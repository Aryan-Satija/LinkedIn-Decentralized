import React, {useEffect, useState} from 'react'

const Message = () => {
  const [room, setRoom] = useState(true);
  return (
    <div className='bg-[#f6f6f6] pt-[5rem] flex flex-col gap-4 justify-center items-center p-4 min-h-screen'>
        <div className='bg-[#ffffff] w-[80%] md:w-[40%] min-w-[320px] h-[80vh] rounded-md border-2 flex flex-col justify-between'>  
            <div className='p-2'>
                <div className='mb-2 text-slate-600'>Messaging</div>
                <hr/>
            </div>   
            <div>

            </div>
            <div className='p-2 flex items-end justify-between gap-4'>
                <div className='w-full'>
                    <input type='text' className='w-full p-2 border-slate-300 border-2 rounded-sm'></input>
                </div>
                <div>
                    {
                      !room && 
                      <button className='text-[#0b67c2] rounded-md bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200 w-32'>Create Room</button>
                    }
                </div>
                <div>
                    {
                      room && 
                      <button className='text-[#01744e] rounded-md bg-[#01744e]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200 w-32'>Send Message</button>
                    }
                </div>
                <div>
                    {
                      room && 
                      <button className='text-[#0b67c2] rounded-md bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200 w-32'>Switch Room</button>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Message