import { Model } from "./base.js";
import { Buyer } from "./Buyer.model.js";
export class Auction extends Model{
    get defaults(){
        return{
            Product: null,
            inRoom: [],
        }
    }
    joinRoom(name,id){(
        this.inRoom.push(new Buyer({
            id: id,
            name: name
        })))
    }
    leaveRoom(id){
        this.inRoom.filter((item)=> {
            item.name !== id
        })
        
    }

}