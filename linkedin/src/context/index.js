import React, {createContext, useContext, useState} from 'react';
import {ethers} from 'ethers';
import {contractAddress, contractAbi} from '../constants'

const {ethereum} = window;
const myContext = createContext();

const createContract = async()=>{
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    console.log(signer);
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
                // alert te user to first connect his/her wallet inorder to send friend rrequests
                return; 
            }
            const contract = await createContract();
            
            // added tx to the mempool
            const tx = await contract.sendFriendRequest(to);

            // waiting for tx to be mined
            await tx.wait()
        } catch(err){
            console.log('Something went wrong');
            console.log(err);
        }
    }

    const getAllFriendRequests = async()=>{
        const contract = await createContract();
        try{
            const friends = await contract.getAllRequests(currentAccount);
            const requests = []
            friends.forEach((request, index) => {
                requests.push({
                    from: request.from,
                    to: request.to,
                    time: new Date(Number(request.time) * 1000).toLocaleString()
                })
            })
            console.log(requests);
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
    return (<myContext.Provider 
    value={{
                connectToWallet, 
                requestToConnectWallet, 
                sendFriendRequest, 
                getAllFriendRequests, 
                addPost, 
                getAllPosts
            }}>
        {
            children
        }
    </myContext.Provider>)
}

export const GetGlobalProps = ()=>{
    return useContext(myContext);
}