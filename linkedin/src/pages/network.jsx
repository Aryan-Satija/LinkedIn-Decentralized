import React, { useEffect, useState } from 'react'

const Network = () => {
    const [requests, setRequests] = useState([]);

    useEffect(()=>{
        // get requests
        setRequests([
            {
                from: "0xc78fF2b7cF14E12513A7475146D69Db7818bb161",
                to: "0x19B69fAfa794911232E24e2c33dC171471469f01",
                time: "01/12/2024 08:24"
            },
            {
                from: "0xc78fF2b7cF14E12513A7475146D69Db7818bb161",
                to: "0x19B69fAfa794911232E24e2c33dC171471469f01",
                time: "02/12/2024 13:09"
            },
            {
                from: "0xc78fF2b7cF14E12513A7475146D69Db7818bb161",
                to: "0x19B69fAfa794911232E24e2c33dC171471469f01",
                time: "02/12/2024 05:45"
            },
            {
                from: "0xc78fF2b7cF14E12513A7475146D69Db7818bb161",
                to: "0x19B69fAfa794911232E24e2c33dC171471469f01",
                time: "04/12/2024 07:15"
            }
        ])
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
        </div>
    </div>);
}

export default Network;