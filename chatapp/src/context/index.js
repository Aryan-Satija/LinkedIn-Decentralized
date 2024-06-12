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
    

    return (<myContext.Provider value={{}}>
        {
            children
        }
    </myContext.Provider>)
}

export const GetGlobalProps = async()=>{
    return useContext(myContext);
}