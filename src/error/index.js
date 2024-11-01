import { Link } from "react-router-dom";
import "./error.css"

function Error(){
    return(
        <div className="Container-Error">
            <h1>404</h1>
            <h3>Pagina Não Encontrada!</h3>
            <Link to={"/"} className="link">Veja Todos Filme</Link>
        </div>
    );
}

export default Error;