import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

import "./filme.css"

function Filmes() {
    const { id } = useParams()
    const [filme, setFilme] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loading() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "cdd4ea8595b0e609530406def772b7b8",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log("Filme Não Encontrado")
                    navigate("/", { replace: true });
                    return;
                })
        }


        loading()
        return () => {
            console.log("Desmontou")
        }
    }, [navigate, id])

    if (loading) {
        return (
            <div>
                <h1>Carregando detalhes...</h1>
            </div>
        )

    }
    function salvarFilme() {
        const minhaLista = localStorage.getItem("@PrimeFlix");
        let filmeSalvos = JSON.parse(minhaLista) || [];
        
        const hasFilme = filmeSalvos.some((filmesalvo)=>filmesalvo.id===filme.id)

        if(hasFilme){
            toast.warn("Esse Filme já esta na Lista");
            return;
        }
        filmeSalvos.push(filme);
        localStorage.setItem("@PrimeFlix",JSON.stringify(filmeSalvos));
        toast.success("Filme Salvo Com Sucesso")

    }
    return (
        <div key={filme.id} className="container">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação:{filme.vote_average}/10</strong>

            <div className="divButtons">

                <button className="Button" onClick={salvarFilme}>Salvar</button>

                <button>
                    <a target="_black" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title}`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    );
}

export default Filmes;