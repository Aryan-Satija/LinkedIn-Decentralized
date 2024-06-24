import React, {useEffect, useState } from 'react'
import { GetGlobalProps } from '../context'
const Profile = () => {
    const {getUserProfile, currentAccount, getAllPosts} = GetGlobalProps();
    const [me, setMe] = useState(null);
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        (async()=>{
            if(currentAccount !== ''){
                const user = await getUserProfile(currentAccount)
                const posts = await getAllPosts(currentAccount)
                setMe(user);
                setPosts(posts);
            }
        })()
    }, [currentAccount])
    console.log(posts);
    return (
        <div className='bg-[#f4f2ee] pt-[5rem] flex flex-col gap-4 justify-center items-center p-4 min-h-screen'>
            <div className='w-[80%] min-w-[320px] bg-[#fefffe] p-4 rounded-md relative'>
                <div className='bg-slate-800 w-full h-[150px] rounded-t-md'>
                </div>
                <img src="https://api.dicebear.com/9.x/identicon/svg?seed=Miss%20kitty" alt="profile_pic" className='w-[150px] absolute top-20 left-8 bg-white rounded-full'/>
                <div className='font-bold mt-16'>{me?.name}<span className='text-sm text-slate-600 font-semibold'>(He/Him)</span></div>
                <div className='text-slate-600'>
                    {me?.about}
                </div>
                <div className='text-slate-500 mt-4'>{me?.organisation}</div>
                <div className='text-slate-500 mt-4'>{me?.lives}</div>
            </div>
            <div className='w-[80%] min-w-[320px] bg-[#fefffe] p-4 rounded-md'>
                <div className='font-bold'>About</div>
                <div>
                    {
                        me?.description.split("\n").map((line)=>{
                            return <p>{line}</p>
                        })
                    }
                </div>
            </div>
            <div className='w-[80%] min-w-[320px] bg-[#fefffe] p-4 rounded-md'>
                <div className='font-bold mb-2'>Skills</div>
                <div className='flex flex-col items-start justify-between gap-4'>
                    {
                        me?.skills.map((skill, i)=>{
                            return (<div key={i} className='text-cyan-600 text-sm font-bold bg-[#D3E1E3] p-1 rounded-md'>
                                {
                                    skill.toUpperCase()
                                }
                            </div>)         
                        })
                    }
                </div>
            </div>
            <div className='bg-[#fefefe] w-[80%] min-w-[320px] p-4 rounded-md shadow-md'>
                <div className='font-bold mb-2'>My Posts</div>
                {
                    posts.length > 0 && 
                    <>
                        <div className='text-sm text-slate-400 cursor-pointer'>
                            Author Post Id : { posts[0]?.id }
                        </div>
                        <div className='flex flex-col lg:flex-row items-center w-full justify-between text-lg font-bold'>
                            <div>Author: {posts[0]?.author.substr(0, 20)}...</div>
                            <button className='text-[#0b67c2] bg-[#0b67c2]/20 p-2 rounded-md cursor-pointer text-md font-bold hover:scale-95 duration-200'>
                                Send Friend Request
                            </button>
                        </div>
                        <div className='text-slate-600 mb-4'>{posts[0]?.content.split('\n').map((sentence)=>{
                            return (<div>{sentence}</div>)
                        })}</div>
                        <div>
                        {
                            posts[0]?.image && <img className='rounded-md shadow-md shadow-slate-400' src={`https://emerald-effective-scorpion-239.mypinata.cloud/ipfs/${posts[0]?.image}`}/>
                        }
                        </div>
                        <div className='flex flex-col mt-4 lg:flex-row items-center w-full justify-between text-base text-slate-500 font-bold'>
                            <div>{posts[0]?.likes}</div>
                            <div>{posts[0]?.time}</div>
                            <button className='text-[#0b67c2] bg-[#0b67c2]/20 p-2 rounded-md cursor-pointer text-md font-bold hover:scale-95 duration-200'>Tip Author</button>
                        </div>
                        <div className='text-sm text-blue-700 cursor-pointer hover:underline'>see more...</div>
                    </>
                }
                {
                    posts.length === 0 && <>Nothing posted so far</>
                }
            </div>
        </div>
      )
}

export default Profile