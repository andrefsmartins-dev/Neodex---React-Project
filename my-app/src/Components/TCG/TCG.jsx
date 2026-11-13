import React, { useContext, useEffect, useState } from "react";
import "./TCG.css";
import TCGFilters from "./TCGFilters.jsx";
import Button from "../UI/Button/Button.jsx";
import TCGGrid from "./TCGGrid";
import { PokemonContext } from "../Contextos/PokemonContext.jsx";

export default function TCG() {
    const [todasCartas, setTodasCartas] = useState([]);
    const [carregar, setCarregar] = useState(false);
    const [erro, setErro] = useState(null);
    const cartasPorPagina = 100;
    const [pagina, setPagina] = useState(1);

    const [filtros, setFiltros] = useState({ nome: "" });
    const [lingua, setLingua] = useState("en");

    const [countdown, setCountdown] = useState(3);
    const { redirecionar, user } = useContext(PokemonContext);

    useEffect(() => {
        const carregarTCG = async () => {
            setCarregar(true);
            setErro(null);

            try {
                const resp = await fetch(`https://api.tcgdex.net/v2/${lingua}/cards`);
                const dados = await resp.json();

                let cards = [];
                if (dados.cards && dados.cards.length) {
                    cards = dados.cards;
                } else if (dados && dados.length) {
                    cards = dados;
                }

                // garante que cada carta guarda o idioma atual para os favoritos
                setTodasCartas(cards.map(c => ({ ...c, lingua: c.lingua || lingua })));
            } catch (err) {
                setErro(err.message);
            } finally {
                setCarregar(false);
            }
        };

        carregarTCG();
    }, [lingua]);

    const nomeLower = filtros.nome.trim().toLowerCase();
    const cartasFiltradas = (todasCartas || []).filter(c => {
        return (
            !nomeLower ||
            (c.name && c.name.toLowerCase().includes(nomeLower)) ||
            (c.localId && String(c.localId).toLowerCase().includes(nomeLower)) ||
            (c.id && String(c.id).toLowerCase().includes(nomeLower))
        );
    });

    const totalPaginas = Math.max(1, Math.ceil(cartasFiltradas.length / cartasPorPagina));

    useEffect(() => {
        setPagina(1);
    }, [filtros.nome, lingua]);

    const indiceAtual = (pagina - 1) * cartasPorPagina;
    const cartasPagina = cartasFiltradas.slice(indiceAtual, indiceAtual + cartasPorPagina);

    useEffect(() => {
        if (!user) {
            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            const timeout = setTimeout(() => {
                redirecionar("/login");
            }, 3000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [user, redirecionar]);

    if (!user) {
        return (
            <div className="pokedex-pag">
                <p className="fav">You need to be logged in to see the TCG cards.</p>
                <p className="fav">Redirecting to the login page in {countdown}...</p>
            </div>
        );
    }

    return (
        <div className="tcg-tracker">
            <TCGFilters
                filtros={filtros}
                atualizarFiltro={valor => setFiltros({ nome: valor })}
                lingua={lingua}
                mudarLingua={setLingua}
            />

            <div>
                {carregar && <p className="tcg-status">Loading cards...</p>}
                {erro && <p className="error">Error: {erro}</p>}

                <TCGGrid cartas={cartasPagina} />

                <div className="paginas">
                    <Button
                        onClick={() => setPagina(p => Math.max(1, p - 1))}
                        disabled={pagina === 1}
                        className="btn-simples-1"
                    >
                        Back
                    </Button>

                    <span className="paginas-texto">
                        Page {pagina} of {totalPaginas}
                    </span>

                    <Button
                        onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                        disabled={pagina === totalPaginas}
                        className="btn-simples-1"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}