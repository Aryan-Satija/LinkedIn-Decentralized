import express from "express";
import {config} from "dotenv";
import cors from "cors";
import { getRoomChats, sendMessage } from './database.js';

config();

const app = express();

app.use(cors());
app.use(express.json());

app.post(
    '/sendMessage', async(req, res)=>{  
        try{
            const {from, to, message} = req.body;
            await sendMessage(from, to, message);
            const response = await getRoomChats(from, to);
            return res.status(200).json({
                success: true,
                message: 'data sent successfully', 
                data: response.data
            })
        } catch(err){
            console.log(err);
            return res.status(500).json({
                success: true,
                message: "something went wrong"
            })
        }
    } 
)

app.post(
    '/roomInit', async(req, res)=>{  
        const {from, to} = req.body;
        try{
            const response = await getRoomChats(from, to);
            return res.status(response.status).json({
                success: true,
                data: response.data,
                messsage: response.message
            })
        } catch(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "something went wrong"
            })
        }
    } 
)

app.listen(3000, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})