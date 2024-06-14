import React, {useEffect, useState} from 'react'
import { FaHome, FaBell  } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GetGlobalProps } from '../context';
const Navbar = () => {
    const {connectToWallet, requestToConnectWallet, currentAccount, getUserProfile} = GetGlobalProps();
    const [profile, setProfile] = useState(null);
    useEffect(()=>{
        (async()=>{
            await requestToConnectWallet()
        })()
    }, [])
    useEffect(()=>{
        (async()=>{
            if(currentAccount !== ''){
                const userProfile = await getUserProfile(currentAccount)
                setProfile(userProfile);
            }
        })();
    }, [currentAccount])
    useEffect(()=>{
        (async()=>{
            if(profile && profile.name === ''){
                // navigate to create profile page
                console.log('navigate to create profile page')
            }
        })()
    }, [profile])
    console.log(profile);
    return (
    <div className='bg-[#fefeff] w-full flex flex-row items-center justify-center gap-16 p-4 fixed'>
        <div className='flex flex-col items-center cursor-pointer hover:text-[#0E4980] font-bold text-slate-600'>
            <div><CgProfile/></div>
            <div className='hidden md:block'>Profile</div>
        </div>
        <div className='flex flex-row items-center gap-8 md:gap-16'>
            <div className='flex flex-col items-center cursor-pointer hover:text-[#0E4980] font-bold text-slate-600'>
                <div><FaHome/></div>
                <div className='hidden md:block'>Home</div>
            </div>
            <div className='flex flex-col items-center cursor-pointer hover:text-[#0E4980] font-bold text-slate-600'>
                <div><IoPeopleOutline/></div>
                <div className='hidden md:block'>Network</div>
            </div>
            <div className='flex flex-col items-center cursor-pointer hover:text-[#0E4980] font-bold text-slate-600'>
                <div><FaSuitcase/></div>
                <div className='hidden md:block'>Jobs</div>
            </div>
            <div className='flex flex-col items-center cursor-pointer hover:text-[#0E4980] font-bold text-slate-600'>
                <div><MdOutlineMessage/></div>
                <div className='hidden md:block'>Messaging</div>
            </div>
            <div className='flex flex-col items-center cursor-pointer hover:text-[#0E4980] font-bold text-slate-600'>
                <div><FaBell/></div>
                <div className='hidden md:block'>Notifications</div>
            </div>
        </div>
        <div>
            <button className='text-[#0b67c2] bg-[#0b67c2]/20 p-2 rounded-md cursor-pointer text-md font-bold hover:scale-95 duration-200' onClick={async()=>{
                await connectToWallet()
            }}>Connect</button>
        </div>
    </div>
  )
}

export default Navbar