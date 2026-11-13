import { useRef, useState, useContext } from "react";
import Button from "../UI/Button/Button";
import { PokemonContext } from "../Contextos/PokemonContext";
import "./Pokedex.css";

export default function PokemonTCGSlide({ cartas, carregarCartas, setLingua, lingua }) {
    const { toggleCartaFavorita, cartasFavoritas } = useContext(PokemonContext);

    const carrosselRef = useRef(null);
    const [indice, setIndice] = useState(0);

    const langs = [
        { code: "en", flag: "https://flagsapi.com/US/flat/64.png", label: "English" },
        { code: "ja", flag: "https://flagsapi.com/JP/flat/64.png", label: "Japanese" },
        { code: "pt", flag: "https://flagsapi.com/PT/flat/64.png", label: "Portuguese" },
        { code: "zh-tw", flag: "https://flagsapi.com/CN/flat/64.png", label: "Chinese" }
    ];

    const selectedIndex = Math.max(0, langs.findIndex(l => l.code === lingua));

    const slide = (direcao) => {
        if (!carrosselRef.current || cartas.length === 0) return;

        const totalSlides = cartas.length;
        const passos = window.innerWidth <= 600 ? 1 : 3;
        let novoIndice = indice + direcao * passos;

        if (novoIndice < 0)
            novoIndice = totalSlides + (novoIndice % totalSlides);

        if (novoIndice >= totalSlides)
            novoIndice = novoIndice % totalSlides;

        setIndice(novoIndice);

        const container = carrosselRef.current;
        if (!container.firstChild) return;

        const slideWidth = container.firstChild.offsetWidth + 16;
        container.scrollTo({ left: novoIndice * slideWidth, behavior: "smooth" });
    };

    const cartasComEstrela = cartas.map(carta => {
        const isFavorito = cartasFavoritas.some(
            fav => fav.id === carta.id && fav.lingua === carta.lingua
        );

        const imagem = isFavorito
            ? "/Assets/Favoritos/estrela_hover.png"
            : "/Assets/Favoritos/estrela.png";

        const estrela = (
            <img
                src={imagem}
                alt="Favorite card"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleCartaFavorita(carta);
                }}
                className="estrela-tcgslider"
            />
        );

        return { ...carta, estrela };
    });

    return (
        <div className="carrossel-container">
            {carregarCartas && <p className="loading-msg">Loading cards...</p>}

            {!carregarCartas && (
                <div className="carrossel-div">
                    <div className="flow">
                        <Button onClick={() => slide(-1)} className="btn-simples-2">
                            &laquo;
                        </Button>

                        <div className="slider-bg-details">
                            <div
                                className="slider-indicator"
                                style={{ transform: `translateX(${selectedIndex * 100}%)` }}
                            />
                            {langs.map(l => (
                                <Button
                                    key={l.code}
                                    className="flag-btn"
                                    onClick={() => setLingua(l.code)}
                                >
                                    <img src={l.flag} alt={l.label} title={l.label} />
                                </Button>
                            ))}
                        </div>

                        <Button onClick={() => slide(1)} className="btn-simples-2">
                            &raquo;
                        </Button>
                    </div>

                    {cartas.length === 0 && (
                        <p className="sem-pokemon">No Cards were found</p>
                    )}

                    {cartas.length > 0 && (
                        <div className="carrossel-cartas" ref={carrosselRef}>
                            {cartasComEstrela.map(carta => (
                                <div
                                    key={`${carta.id}_${carta.lingua}`}
                                    className="carta-slide"
                                >
                                    <img
                                        src={`${carta.image}/high.png`}
                                        alt={carta.name}
                                        title={carta.name}
                                        className="carta-pokemon"
                                    />
                                    <div className="carta-info">
                                        <span className="nome-da-carta">{carta.name}</span>
                                        {carta.estrela}
                                    </div>
                                    <p className="carta-id-tcgslider">Card ID: {carta.id}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}