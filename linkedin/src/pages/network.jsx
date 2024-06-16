import React, { useEffect, useState } from 'react'
import { GetGlobalProps } from '../context';

const Network = () => {
    const [requests, setRequests] = useState([]);
    const { getAllFriendRequests } = GetGlobalProps();
    useEffect(()=>{
        // get requests
        (async()=>{
            const requests = await getAllFriendRequests();
            setRequests(requests);
            console.log(requests);
        })()
    }, [])
    
    return (<div className='bg-[#f4f2ee] pt-[5rem] flex flex-col gap-4 items-center p-4 min-h-screen'>
        <div className='bg-[#ffffff] p-4 rounded-md'>
            <div className='text-4xl text-sky-800 font-semibold mb-4'>Invitations</div>
            {
                requests.map((request, id)=>{
                    return (<div className='cursor-pointer my-8' ky={id}>
                        <div className='text-sm text-slate-600'>{id}</div>
                        <div className='hover:underline hover:text-sky-800'>{request.from}</div>
                        <div className='text-sm text-slate-600'>{request.time}</div>
                    </div>)
                })
            }
            {
                requests.length === 0
            }
        </div>
    </div>);
}

export default Network;