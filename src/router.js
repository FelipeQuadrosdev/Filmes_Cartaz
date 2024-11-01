import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Filmes from "./Pages/Filmes";
import Header from "./Components/Header";
import Favoritos from "./Pages/Favoritos";

import Error from "./error";

function RouterApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filmes/:id" element={<Filmes/>} />
                <Route path="/Favoritos" element={< Favoritos/>} />

                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouterApp;