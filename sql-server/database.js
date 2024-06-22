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
            INSERT INTO linkedin (_from, _to, _text) values (?, ?, ?)
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
            select * from linkedin where _from = ? and to = ? 
        `
        const values = [from, to];

        const result = await pool.query(query, values);

        return  { 
            status: 200,
            success: true,
            data : result,
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