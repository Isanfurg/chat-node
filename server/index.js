import  express from 'express';
import morgan from "morgan";
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';
import mariadb from 'mariadb';

import {PORT} from './config.js';
import { time } from 'console';

async function asyncConnection() {
       
    const conn = mariadb.createConnection({
        host:'4.227.201.55',
        user:'backend',
        password:'backend',
        database: 'subastas'
    });
    return conn;
}
async function getProducts(){
    let res = await conn.query(
        "SELECT * from producto;")
    delete res.meta;
    return res;
}
async function saveConnection(userName){
    let res = await conn.query(
        "INSERT INTO connected (username,date) VALUES ('"+userName+"','"+ (new Date).toString().slice(0,24) +"');"
    )
}
const conn = await asyncConnection();
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: '*'
    }
});

io.on('connection',(socket)=>{
        
        socket.on('message', async (data) => {
            await saveConnection(data);
            var res = await getProducts();
            socket.emit('products',res);
            console.log(socket.id,res);
        })
    }
)

server.listen(PORT);
console.log('Server started on: localhost:',PORT);
