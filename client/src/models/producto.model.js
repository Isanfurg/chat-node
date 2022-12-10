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
            socket: null,
        }
    }
    
    get toHMTL(){
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
                        this.socket.emit()
                    }}>Entrar</button>
                    </li>
                </ul>
            </div>
        );
    }
}