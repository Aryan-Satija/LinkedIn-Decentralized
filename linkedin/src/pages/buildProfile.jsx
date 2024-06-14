import React, {useEffect, useState} from 'react'
import { GetGlobalProps } from '../context';
import BuildProfile1 from '../components/buildProfile1';
import BuildProfile2 from '../components/buildProfile2';
import BuildProfile3 from '../components/buildProfile3';
const BuildProfile = () => {
    const {connectToWallet, currentAccount, getUserProfile} = GetGlobalProps();
    const [profile, setProfile] = useState(null);
    const [step, setStep] = useState(1); 
    useEffect(()=>{
        (async()=>{
            await connectToWallet()
        })()
    }, [])
    useEffect(()=>{
        (async()=>{
            if(currentAccount !== '' && profile == null){
                const userProfile = await getUserProfile(currentAccount)
                setProfile(userProfile);
            }
        })();
    }, [currentAccount])
    console.log(currentAccount)
    return (
            profile && (
            <div className='pt-[8rem]'>
                <div className='flex w-[80%] text-lg text-slate-600 font-bold min-w-[320px] items-center justify-between mx-auto'> 
                    <div className={step == 1 ? 'text-sky-600 bg-sky-400/40 p-4 w-16 aspect-square flex items-center justify-center rounded-full' : 'p-4 w-16 aspect-square flex items-center justify-center'}>1</div>
                    <div className={step == 2 ? 'text-sky-600 bg-sky-400/40 p-4 w-16 aspect-square flex items-center justify-center rounded-full' : 'p-4 w-16 aspect-square flex items-center justify-center'}>2</div>
                    <div className={step == 3 ? 'text-sky-600 bg-sky-400/40 p-4 w-16 aspect-square flex items-center justify-center rounded-full' : 'p-4 w-16 aspect-square flex items-center justify-center'}>3</div>
                </div>
                <BuildProfile1 profile={profile} setProfile={setProfile}/>
            </div>)
    )
}

export default BuildProfile