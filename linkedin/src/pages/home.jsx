import React from 'react'
import { useState, useEffect } from 'react';
import { GetGlobalProps } from '../context'
const Home = () => {
    const {getAllPosts, sendFriendRequest, tipAuthor} = GetGlobalProps();
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        (async()=>{
            const result = await getAllPosts('0xc78fF2b7cF14E12513A7475146D69Db7818bb161')
            setPosts(result);
        })()
    },[])
    async function tip(author){
        try{
            const sent = await tipAuthor(author);
            console.log(sent);
        } catch(err){
            console.log(err);
        }
    }
  return (
    <div className='bg-[#f4f2ee] pt-[5rem] flex flex-col gap-4 justify-center items-center p-4 min-h-screen'>
        {
            posts.map((post) => {
                return <div className='bg-[#fefefe] w-[80%] md:w-[40%] min-w-[320px] p-4 rounded-md shadow-md'>
                    <div className='text-sm text-slate-400 cursor-pointer'>
                        Author Post Id : { post.id }
                    </div>
                    <div className='flex flex-col lg:flex-row items-center w-full justify-between text-lg font-bold'>
                        <div>Author: {post.author.substr(0, 20)}...</div>
                        <button onClick={async()=>{
                            await sendFriendRequest(post.author);
                        }} className='text-[#0b67c2] bg-[#0b67c2]/20 p-2 rounded-md cursor-pointer text-md font-bold hover:scale-95 duration-200'>
                            Send Friend Request
                        </button>
                    </div>
                    <div className='text-slate-600 mb-4'>{post.content.split('\n').map((sentence)=>{
                        return (<div>{sentence}</div>)
                    })}</div>
                    <div>
                    {
                        post.image && <img className='rounded-md shadow-md shadow-slate-400' src={`https://emerald-effective-scorpion-239.mypinata.cloud/ipfs/${post.image}`}/>
                    }
                    </div>
                    <div className='flex flex-col mt-4 lg:flex-row items-center w-full justify-between text-base text-slate-500 font-bold'>
                        <div>{post.likes}</div>
                        <div>{post.time}</div>
                        <button className='text-[#0b67c2] bg-[#0b67c2]/20 p-2 rounded-md cursor-pointer text-md font-bold hover:scale-95 duration-200' onClick={()=>{
                            tip(post.author)
                        }}>Tip Author</button>
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default Home