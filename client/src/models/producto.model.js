import { Model } from "./base";

export class Producto extends Model{
    get defaults(){
        return{
            id:"",
            name: "",
            state: "",
            price: "",
            actual_price: "",
            url: "",
            buyer: ""
        }
    }

}