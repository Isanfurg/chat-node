import { Model } from "./base.js";
import { Buyer } from "./Buyer.model.js";
export class Auction extends Model{
    get defaults(){
        return{
            product: null,
            inRoom: [],
        }
    }
    joinRoom(buyer){(
        this.inRoom.push(buyer)
    )}
    leaveRoom(id){
        this.inRoom.filter((item)=> {
            item.name !== id
        })
        
    }

}