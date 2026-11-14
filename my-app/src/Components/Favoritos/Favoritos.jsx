import React, { useContext, useState, useEffect, useRef } from "react";
import PokemonList from "../Pokedex/PokemonList";
import Button from "../UI/Button/Button";
import TCGGrid from "../TCG/TCGGrid";
import { PokemonContext } from "../Contextos/PokemonContext";
import "./Favoritos.css";

export default function Favoritos() {
    const {
        favoritos, cartasFavoritas, abrirDetalhes,
        carregarPokemon, pokemonList,
        user, redirecionar
    } = useContext(PokemonContext);

    const [countdown, setCountdown] = useState(3);
    const [tabAtiva, setTabAtiva] = useState("pokemon");

    // Referências para guardar a posição inicial e final do toque
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // redirecionar se não estiver logado
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

    // navegação do slider - setas left & right
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                setTabAtiva("pokemon");
            } else if (e.key === "ArrowRight") {
                setTabAtiva("cartas");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Gestão do Swipe no telemóvel
    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50; // Distância mínima em pixéis para considerar swipe

        if (distance > minSwipeDistance) {
            // Swipe para a esquerda -> muda para Cartas
            setTabAtiva("cartas");
        } else if (distance < -minSwipeDistance) {
            // Swipe para a direita -> muda para Pokémon
            setTabAtiva("pokemon");
        }
    };

    // abrir Pokémon - carrega detalhes e abre
    const handleClickPokemon = async (nome) => {
        await carregarPokemon(nome);
        abrirDetalhes(nome);
        redirecionar("/pokedex");
    };

    const cartasFavoritasCompletas = cartasFavoritas || [];

    if (!user) {
        return (
            <div className="pokedex-pag">
                <p className="fav">You need to be logged in to see your favorites.</p>
                <p className="fav">Redirecting to the login page in {countdown}...</p>
            </div>
        );
    }

    const pokemonsFavoritos = favoritos
        .map(name => pokemonList.find(p => p.name === name))
        .filter(Boolean);

    return (
        <div
            className="pokedex-pag"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* slider de seleção */}
            <div className="favoritos-slider">
                <Button
                    className={tabAtiva === "pokemon" ? "ativa" : ""}
                    onClick={() => setTabAtiva("pokemon")}
                >
                    Pokémon
                </Button>

                <Button
                    className={tabAtiva === "cartas" ? "ativa" : ""}
                    onClick={() => setTabAtiva("cartas")}
                >
                    TCG Cards
                </Button>

                <div
                    className="slider-indicador"
                    style={{ transform: `translateX(${(tabAtiva !== "pokemon") * 100}%)` }}
                />
            </div>

            {/* tab pokemon */}
            {tabAtiva === "pokemon" && (() => {
                if (pokemonsFavoritos.length > 0) {
                    return (
                        <>
                            <h2 className="fav">All your favorite Pokemon</h2>
                            <PokemonList
                                pokemonList={pokemonsFavoritos.map(p => ({ name: p.name }))}
                                onSelect={handleClickPokemon}
                            />
                        </>
                    );
                }
                return <p className="sem-pokemon">No favorite Pokémon yet.</p>;
            })()}

            {/* tab cartas */}
            {tabAtiva === "cartas" && (() => {
                if (cartasFavoritasCompletas.length > 0) {
                    return (
                        <>
                            <h2 className="fav">All your favorite Pokemon TCG Cards</h2>
                            <TCGGrid
                                cartas={cartasFavoritasCompletas.map(carta => ({
                                    ...carta,
                                    image: carta.image
                                }))}
                            />
                        </>
                    );
                }
                return <p className="sem-pokemon">No favorite TCG cards yet.</p>;
            })()}
        </div>
    );
}