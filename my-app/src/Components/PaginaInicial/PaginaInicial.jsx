import React from 'react';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';
import './PaginaInicial.css';

export default function PaginaInicial() {
    return (
        <div className="pagina-inicial-wrapper">
            <section className="primeira-div">
                <div className="col-container">
                    <div className="col-text">
                        <h1>Welcome to NeoDex</h1>
                        <h3>The new generation of the Pokédex</h3>

                        <p className="p-1">
                            NeoDex is the next generation of the Pokédex, an interactive and
                            modern experience, completely reimagined from a true Pokémon fan to
                            true Pokémon fans. Explore NeoDex and enjoy this real Pokémon experience!
                        </p>

                        <Link to="/pokedex">
                            <Button className="btn-1">Explore the Pokédex</Button>
                        </Link>
                    </div>

                    <div className="col-image">
                        <img src="/Assets/Pagina_Inicial/charizard.png" alt="Charizard" />
                    </div>
                </div>
            </section>

            <section className="segunda-div">
                <div className="col-container">
                    <div className="col-text">
                        <h2>Build Your Team</h2>
                        <p className="p-2">
                            Choose your favorite Pokémon and assemble a team capable of defeating
                            the 7 gyms, overcoming Victory Road, and destroying the Elite Four!
                            Rise to the top of the Pokémon League in any region, from Kanto to Alola.
                        </p>

                        <Link to="/equipa">
                            <Button className="btn-2">Build Your Team</Button>
                        </Link>
                    </div>

                    <div className="col-image-left">
                        <img src="/Assets/Pagina_Inicial/team.png" alt="Build Your Team" />
                    </div>
                </div>
            </section>

            <section className="terceira-div">
                <div className="col-container">
                    <div className="col-text">
                        <h2>Search for your favorite Pokémon Cards</h2>
                        <p className="p-3">
                            Discover every Pokémon card and explore the world of the Pokémon
                            TCG! Uncover rare and hidden cards, dive into every set and
                            expansion, and uncover the stories behind each collectible. Explore,
                            collect, and become the ultimate TCG adventurer!
                        </p>

                        <Link to="/tcg">
                            <Button className="btn-3">Discover TCG</Button>
                        </Link>
                    </div>

                    <div className="col-image">
                        <img src="/Assets/Pagina_Inicial/tcg.png" alt="Pokémon TCG" />
                    </div>
                </div>
            </section>

            <section className="quarta-div">
                <div className="col-container">
                    <div className="col-text">
                        <h2>Pokémon GO Insights</h2>
                        <p className="p-4">
                            Get real-time information about Pokémon GO! Find out which Pokémon types
                            are boosted by the current weather and see examples of each one!
                        </p>

                        <Link to="/go">
                            <Button className="btn-4">GO!</Button>
                        </Link>
                    </div>

                    <div className="col-image-left">
                        <img src="/Assets/Pagina_Inicial/go.png" alt="Pokémon GO" />
                    </div>
                </div>
            </section>
        </div>
    );
}