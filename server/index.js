import  express from 'express';
import morgan from "morgan";
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';
import mariadb from 'mariadb';

import {PORT} from './config.js';

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
const conn = await asyncConnection();
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: 'http://localhost:3000'
    }
});

io.on('connection',async (socket)=>{
        var data = await getProducts();
        console.log(data);
        socket.on('message', (data) => {
            console.log(socket.id,data);
        })
    }
)

server.listen(PORT);
console.log('Server started on: localhost:',PORT);
