import { useState, useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css"
function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "cdd4ea8595b0e609530406def772b7b8",
                    language: "pt-BR",
                    page: 1,
                }
            })
            setFilmes(response.data.results.slice(0, 20))

        }

        loadFilmes();
    }, [])
    return (
        <div className="Container">
            <div className="lista-filmes">
                {filmes.map((item) => {
                    return (
                        <article key={item.id}>
                            <strong>{item.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title} />
                            <Link to={`/Filmes/${item.id}`}>Acessar</Link>
                            <p>{item.overview}</p>


                        </article>
                    );
                })}
            </div>
        </div>
    );

}
export default Home;
