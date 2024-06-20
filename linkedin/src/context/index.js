import React, {createContext, useContext, useState} from 'react';
import {ethers} from 'ethers';
import {contractAddress, contractAbi} from '../constants'

const {ethereum} = window;
const myContext = createContext();

const createContract = async()=>{
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
}

export const ContextProvider = ({children})=>{
    const [currentAccount, setCurrentAccount] = useState('');
    const connectToWallet = async()=>{
        try{    
            if(!ethereum){
                // alert the user to install metamask
                return;
            }

            const accounts =  await ethereum.request({
                method: "eth_accounts"
            })

            if(accounts.length > 0){
                setCurrentAccount(accounts[0]);
            }
            else{
                requestToConnectWallet();
            }
        } catch(error){
            console.log("Something went wrong");
            console.log(error);
        }
    }

    const requestToConnectWallet = async()=>{
        try{    
            if(!ethereum){
                // alert the user to install metamsk
                return;
            }
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            if(accounts.length > 0) setCurrentAccount(accounts[0]);
        } catch(error){
            console.log("Something went wrong");
            console.log(error);
        }
    }
    
    const sendFriendRequest = async(to)=>{
        try{
            connectToWallet();
            if(currentAccount === ''){
                // alert te user to first connect his/her wallet inorder to send friend requests
                return; 
            }
            const contract = await createContract();
            
            // added tx to the mempool
            const tx = await contract.sendFriendRequest(to);

            // waiting for tx to be mined
            await tx.wait()

            return true;
        } catch(err){
            console.log('Something went wrong');
            console.log(err);
            return false;
        }
    }

    const getAllFriendRequests = async(user)=>{
        const contract = await createContract();
        try{
            const friends = await contract.getAllRequests(user);
            const requests = []
            
            friends.forEach((request, index) => {
                requests.push({
                    from: request.from,
                    to: request.to,
                    time: new Date(Number(request.time) * 1000).toLocaleString()
                })
            })

            return requests;
        } catch(err){
            console.log(err);
        }
    }

    const addPost = async(content, imageHash)=>{
        const contract = await createContract();
        try{
            await contract.addPost(content, imageHash);
        } catch(err){
            console.log(err);
        }
    }

    const getAllPosts = async(user)=>{
        const contract = await createContract();
        try{
            const results = await contract.getPosts(user);
            const posts = [];
            results.forEach((post)=>{
                posts.push({
                    id: Number(post.id),
                    author: post.author,
                    content: post.content,
                    image: post.image,
                    time: new Date(Number(post.time )* 1000).toLocaleString(),
                    likes: Number(post.likes),
                })
            });
            return posts;
        } catch(err){
            console.log(err);
        }
    }
    const updateProfile = async(_name, _lives, _organisation, _about) => {
        const contract = await createContract();
        connectToWallet();
        if(currentAccount === ''){
            // alert te user to first connect his/her wallet inorder to update/edit his profile
            return; 
        }
        await contract.updateProfile(_name, _lives, _organisation, _about);
    }

    const updateDesc = async(_desc) => {
        const contract = await createContract();
        connectToWallet();
        if(currentAccount === ''){
            // alert te user to first connect his/her wallet inorder to update/edit his profile
            return; 
        }
        await contract.updateDesc(_desc);
    }

    const updateSkills = async(_newSkill) => {
        const contract = await createContract();
        connectToWallet();
        if(currentAccount === ''){
            // alert te user to first connect his/her wallet inorder to update/edit his profile
            return; 
        }
        await contract.updateSkills(_newSkill);
    }
    const getUserProfile = async(user)=>{
        try{
            const contract = await createContract();
            const profile = await contract.getUserProfile(user);
            const skills = [];
            profile.skills.forEach((skill)=>{
                skills.push(skill)
            })
            
            const userProfile = {
                name: profile.name,
                pronoun: profile.pronoun,
                description: profile.description,
                organisation: profile.organisation,
                lives: profile.lives,
                about: profile.about,
                image: profile.image,
                skills: skills
            }

            return userProfile;
        } catch(err){
            console.log(err);
        }
    }
    return (<myContext.Provider 
    value={{
                currentAccount,
                connectToWallet, 
                requestToConnectWallet, 
                sendFriendRequest, 
                getAllFriendRequests, 
                addPost, 
                getAllPosts,
                getUserProfile,
                updateProfile,
                updateDesc,
                updateSkills
            }}>
        {
            children
        }
    </myContext.Provider>)
}

export const GetGlobalProps = ()=>{
    return useContext(myContext);
}