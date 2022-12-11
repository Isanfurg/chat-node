import  express from 'express';
import morgan from "morgan";
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';
import mariadb from 'mariadb';

import {PORT} from './config.js';
import { time } from 'console';
import {Producto} from './models/producto.model.js';
import {Auction } from './models/auction.model.js';
import { Buyer } from './models/Buyer.model.js';
var rooms = []
var connected = []
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
let products = await getProducts();
products.forEach(e => {
    var p = new Producto({
        id: e.id,
        price: e.price,
        actual_price: e.actual_price,
        state: e.state,
        name: e.name,
        url: e.url,
    })
    var room = new Auction({
        product: p,
    })
    rooms.push(room)
});
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: '*'
    }
});

io.on('connection',(socket)=>{
    var buyer = null
    socket.on('username', async (data) => {
        await saveConnection(data);
        var res = await getProducts();
        socket.emit('products',res);
        buyer=new Buyer({
            id: socket.id,
            name: data
        })
    })
    socket.on('joinAuction', async (data) => {
        console.log(buyer)
        rooms.forEach(room => {
            if(room.product.id === data){
                console.log(buyer.name + " se unio a la puja por " + room.product.name)
                room.joinRoom(buyer)
                socket.emit("joinRoom",room);
                console.log(room)
            }
        })
    })
    socket.on("disconnect", (reason) => {

        console.log(reason);
        });

    }
)

server.listen(PORT);
console.log('Server started on: localhost:',PORT);
