import React from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

export default function TCGFilters({ filtros, atualizarFiltro, lingua, mudarLingua }) {
    const limparFiltros = () => {
        atualizarFiltro("");
        mudarLingua("en");
    };

    const langs = [
        {
            code: "en",
            flag: "https://flagsapi.com/US/flat/64.png",
            label: "English"
        },
        {
            code: "ja",
            flag: "https://flagsapi.com/JP/flat/64.png",
            label: "Japanese"
        },
        {
            code: "pt",
            flag: "https://flagsapi.com/PT/flat/64.png",
            label: "Portuguese"
        },
        {
            code: "zh-tw",
            flag: "https://flagsapi.com/CN/flat/64.png",
            label: "Chinese"
        }
    ];

    const selectedIndex = Math.max(0, langs.findIndex(l => l.code === lingua));

    return (
        <div className="filtros-tcg">
            <div className="filtros">
                <Input
                    className="pesquisar"
                    placeholder="Search"
                    value={filtros.nome}
                    onChange={e => atualizarFiltro(e.target.value)}
                />

                <Button className="limpar-filtros" onClick={limparFiltros}>
                    Clear Filters
                </Button>
            </div>

            <div className="slider-bg">
                <div
                    className="slider-indicator"
                    style={{ transform: `translateX(${selectedIndex * 100}%)` }}
                />

                {langs.map(l => (
                    <Button
                        key={l.code}
                        className="flag-btn"
                        onClick={() => mudarLingua(l.code)}
                    >
                        <img src={l.flag} alt={l.label} title={l.label} />
                    </Button>
                ))}
            </div>
        </div>
    );
}