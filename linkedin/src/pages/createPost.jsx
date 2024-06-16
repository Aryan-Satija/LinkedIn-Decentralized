import React, {useState, useEffect} from 'react'
import {pinFileToIPFS} from '../utils/ipfsUploadHandler';
import { GetGlobalProps } from '../context'
import {useNavigate} from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();

    const {currentAccount, getUserProfile, addPost} = GetGlobalProps();
    const [user, setUser] = useState(null);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [ipfsUrl, setIpfsUrl] = useState('');

    useEffect(()=>{
        (async()=>{
            if(currentAccount !== ''){
                const me = await getUserProfile(currentAccount)
                setUser(me);
            }
        })()
    }, [currentAccount])
    
    const changeHandler = async (event) => {
        setDescription(event.target.value);
    }
    
    const submitHandler = async()=>{
        await addPost(description, ipfsUrl);
        navigate("/");   
    }

    const handleFileChange = (event)=>{
        setFile(event.target.files[0]);
    }
    
    const uploadHandler = async(event)=>{
        event.preventDefault();
        if(file){
            try{
                console.log('waiting....');
                
                const formData = new FormData();
                
                formData.append("file", file);
                
                const data = await pinFileToIPFS(formData);

                // console.log(data);
                setIpfsUrl(data.IpfsHash);
            } catch(err){
                console.log(err);
            }
        }
    }
    return (
    <div className='bg-[#f4f2ee] pt-[5rem] flex flex-col gap-4 justify-center items-center p-4 min-h-screen'>
        <div className='bg-[#fefefe] w-[80%] md:w-[60%] min-w-[320px] p-4 rounded-md shadow-md'>
            <div>
                <div className='flex flex-row items-center justify-between text-slate-950 text-lg'>
                    <div className='hover:underline hover:text-sky-800 cursor-pointer'>{user?.name.toUpperCase()}</div>
                    <div>{user?.lives}</div>
                </div>
                <div className='text-sm text-slate-600'>{user?.organisation}</div>
                <div className='text-sm text-slate-400'>{currentAccount}</div>
            </div>
            <div className='mt-8'>
                <div className='flex flex-col items-start'>
                    <label htmlFor='description'>Description<span className='text-sky-600 font-bold text-xl'>*</span></label>
                    <textarea id='description' className='p-2 border-2 border-slate-200 rounded-sm w-full' rows={10} onChange={changeHandler}/>
                </div>
            </div>
            <div>
                <input type="file" onChange={handleFileChange} />
                {ipfsUrl === '' ? <button className='text-[#0b67c2] rounded-sm bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200' onClick={uploadHandler}>Upload Image</button> : <button className='text-[#53EC5D] rounded-sm bg-[#53EC5D]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200' onClick={uploadHandler}>Uploaded</button>}
            </div>
            <div>
                
                <button className='text-[#0b67c2] rounded-sm bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200' onClick={submitHandler}>Submit</button>

            </div>
        </div>
    </div>
  )
}

export default CreatePost