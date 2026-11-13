import React, { useContext, useState, useEffect } from "react";
import { EquipaContext } from "../Contextos/EquipaContext";
import { PokemonContext } from "../Contextos/PokemonContext";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import "./Equipa.css";

export default function EquipaDetails() {
    const {
        pokemonSelecionado: pokemon, adicionarAoSlot,
        removerDoSlot, equipa, slotSelecionado,
        setOverlayAberta, setPokemonSelecionado,
        mensagemErro, setMensagemErro, mostrarMensagem,
        setEquipa, cap, redirecionar
    } = useContext(EquipaContext);

    const { carregarPokemon } = useContext(PokemonContext);

    const [selecionados, setSelecionados] = useState([]);
    const [searchMove, setSearchMove] = useState("");

    const handleClickPokemon = async (nome) => {
        await carregarPokemon(nome);
        redirecionar("/pokedex", { state: { pokemonSelecionado: nome } });
        setPokemonSelecionado(null);
    };

    const formatarNomeMove = (m) => {
        return m.replace(/-/g, " ")
            .split(" ")
            .map(cap).join(" ");
    };

    const equipaEditada = equipa[slotSelecionado] && equipa[slotSelecionado].name === pokemon.name;

    let pokemonNaEquipa = false;
    for (let i = 0; i < equipa.length; i++) {
        if (i !== slotSelecionado && equipa[i] && equipa[i].name === pokemon.name) {
            pokemonNaEquipa = true;
            break;
        }
    }

    const toggleMove = (move) => {
        if (pokemonNaEquipa) {
            mostrarMensagem("Pokemon is already on the team.");
            return;
        }

        setMensagemErro("");

        let novo;
        if (selecionados.includes(move)) {
            novo = selecionados.filter((m) => m !== move);
        } else {
            if (selecionados.length >= 4) return;
            novo = [...selecionados, move];
        }
        setSelecionados(novo);

        setEquipa((prev) => {
            const copia = [...prev];
            if (slotSelecionado !== null && copia[slotSelecionado]) {
                copia[slotSelecionado] = {
                    ...copia[slotSelecionado],
                    selectedMoves: novo,
                };
            }
            return copia;
        });
    };

    const handleAdicionar = () => {
        if (selecionados.length !== 4) {
            mostrarMensagem("Select exactly 4 moves before adding them.");
            return;
        }

        if (slotSelecionado !== null) {
            adicionarAoSlot(pokemon.name, selecionados);
        }
    };

    useEffect(() => {
        if (pokemon) setSelecionados(pokemon.selectedMoves || []);
    }, [pokemon]);

    if (!pokemon) return null;

    return (
        <div className="overlay">
            <Button
                className="close-btn"
                onClick={() => {
                    setPokemonSelecionado(null);
                    setOverlayAberta(true);
                }}
            >
                Close
            </Button>

            <div className="details-container">
                <div className="details-section">
                    <div className="sprite-container">
                        <img
                            className="sprite"
                            src={pokemon.sprite}
                            alt={cap(pokemon.name)}
                            onClick={() => handleClickPokemon(pokemon.name)}
                            title="Click to learn more about this Pokemon"
                        />

                        <div className="tipos">
                            {pokemon.types && pokemon.types.map((t, i) => (
                                <img
                                    key={i}
                                    className="tipo-icone"
                                    src={`/Assets/Icones/${t}.png`}
                                    alt={cap(t)}
                                    title={cap(t)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="nome-e-botao">
                        <h2>{cap(pokemon.name)}</h2>

                        {equipaEditada && (
                            <Button className="remove-pokemon-team" onClick={() => removerDoSlot(slotSelecionado)}>
                                Remove
                            </Button>
                        )}

                        {!equipaEditada && !pokemonNaEquipa && slotSelecionado !== null && (
                            <Button className="add-pokemon-team" onClick={handleAdicionar}>
                                Add to Slot {slotSelecionado + 1}
                            </Button>
                        )}
                    </div>

                    <div className="erro-mov">
                        {mensagemErro && <p className="erro-moves">{mensagemErro}</p>}
                    </div>

                    <p>ID: {pokemon.id}</p>
                    <p>Height: {(pokemon.height / 10).toFixed(1)} m</p>
                    <p>Weight: {(pokemon.weight / 10).toFixed(1)} kg</p>
                    <p>Rarity: {cap(pokemon.rarity)}</p>
                    <p>Abilities: {(pokemon.abilities || []).map(cap).join(", ")}</p>

                    <h3>Stats</h3>
                    {pokemon.stats && pokemon.stats.map((stat) => (
                        <p key={stat.name} className="stat-row">
                            <span>{cap(stat.name)}</span>
                            <span>{stat.value}</span>
                        </p>
                    ))}
                </div>

                <div className="moves-section">
                    <div className="moves-header">
                        <h3>Moves ({selecionados.length}/4)</h3>
                        <Input
                            type="text"
                            placeholder="Search move..."
                            value={searchMove}
                            onChange={(e) => setSearchMove(e.target.value)}
                            className="search-move-input"
                        />
                    </div>

                    <ul className="moves-list">
                        {pokemon.moves
                            .filter((m) => m.toLowerCase().includes(searchMove.toLowerCase()))
                            .map((m, i) => (
                                <li
                                    key={i}
                                    className={`move-item ${selecionados.includes(m) ? "selected" : ""}`}
                                    onClick={() => toggleMove(m)}
                                >
                                    {formatarNomeMove(m)}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}