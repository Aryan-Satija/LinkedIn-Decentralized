import mysql from "mysql2";
import {config} from "dotenv";

config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function sendMessage(from, to, message){
    try{
        const query = `
            INSERT INTO Messages (_from, _to, _text) values (?, ?, ?)
        `
        const values = [from, to, message];

        await pool.query(query, values);
        
        return  { 
            status: 200,
            success: true,
            message: "query successfull"
        }
    } catch(error){
        console.log(error);
        return {
            status: 500,
            success: false,
            message: "something went wrong"
        }
    }
}

async function getRoomChats(from, to){
    try{
        const query = `
            select * from Messages where _from = ? and _to = ? 
        `
        const values = [from, to];

        const [result1] = await pool.query(query, values);
        const [result2] = await pool.query(query, values.reverse());
    
        

        return  { 
            status: 200,
            success: true,
            data : result1.concat(result2),
            message: "query successfull"
        }
        
    } catch(error){
        console.log(error);
        return {
            status: 500,
            success: false,
            message: "something went wrong"
        }
    }
}

export {getRoomChats, sendMessage};