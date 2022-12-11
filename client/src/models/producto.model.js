import { Model } from "./base";
import '../views/css/App.css'; 
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
    toHMTL(username){
        return(
            <div className="app">
                <ul className="horizontal">
                    <li>{this.name}</li>
                    <li>|</li>
                    <li><b>Valor inicial:</b>{this.price} </li>
                    <li>|</li>
                    <li><b>Valor actual:</b>{this.actual_price}</li>
                    <li>|</li>
                    <li><button  onClick={()=>{
                        console.log(this.id)
                        this.socket.emit('joinAuction',this.id)
                    }}>Entrar</button>
                    </li>
                </ul>
            </div>
        );
    }
    
 
}