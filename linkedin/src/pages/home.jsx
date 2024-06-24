import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetGlobalProps } from '../context';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const navigate = useNavigate();
    const {getAllPosts, sendFriendRequest, tipAuthor} = GetGlobalProps();
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        (async()=>{
            const arr1 = await getAllPosts('0x19B69fAfa794911232E24e2c33dC171471469f01')
            const arr2 = await getAllPosts('0xbdAdCfE39E57490c689495B011885ec40086d801')
            const arr3 = await getAllPosts('0xc78fF2b7cF14E12513A7475146D69Db7818bb161')
            const arr4 = await getAllPosts('0x9b51FB6fE636f979059bd90B375Fc3e153B9F537')
            const new_arr = [...arr1, ...arr2, ...arr3, ...arr4];
            setPosts(new_arr);
        })()
    },[]);
    async function tip(author){
        try{
            const id = toast.loading("just a second...");
            const sent = await tipAuthor(author);
            toast.update(id, {render: 'Funded Author', type: 'success', isLoading: false, autoClose: 5000})
            console.log(sent);
        } catch(err){
            console.log(err);
        }
    }
  return (
    <div className='bg-[#f4f2ee] pt-[5rem] flex flex-col gap-4 justify-center items-center p-4 min-h-screen'>
        <button className='text-[#0b67c2] bg-[#0b67c2]/20 p-2 rounded-md cursor-pointer text-md w-[80%] md:w-[40%] min-w-[320px] font-bold hover:scale-95 duration-200' onClick={()=>{
            navigate("/createPost");
        }}>Create Post</button>
        {
            posts.map((post) => {
                return <div className='bg-[#fefefe] w-[80%] md:w-[40%] min-w-[320px] p-4 rounded-md shadow-md'>
                    <div className='text-sm text-slate-400 cursor-pointer'>
                        Author Post Id : { post.id }
                    </div>
                    <div className='flex flex-col lg:flex-row items-center w-full justify-between text-lg font-bold'>
                        <div onClick={()=>{
                        navigate('/user/'+post.author)
                    }} className='cursor-pointer hover:text-blue-900 hover:underline'>Author: {post.author.substr(0, 20)}...</div>
                        <button onClick={async()=>{
                            const id = toast.loading("just a second...");
                            await sendFriendRequest(post.author);
                            toast.update(id, {render: 'Request Sent', type: 'success', isLoading: false, autoClose: 5000})
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