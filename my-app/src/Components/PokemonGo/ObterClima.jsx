import weatherBoosts from "../../data/weatherBoosts.json";

export default function ObterClima() {


    // Mapeamento dos códigos WMO para os climas do Pokémon GO
    const tempoMap = {
        0: "Clear",
        1: "Clear",
        2: "Partly Cloudy",
        3: "Cloudy",

        45: "Fog",
        48: "Fog",

        51: "Rainy",
        53: "Rainy",
        55: "Rainy",
        56: "Rainy",
        57: "Rainy",
        61: "Rainy",
        63: "Rainy",
        65: "Rainy",
        66: "Rainy",
        67: "Rainy",
        80: "Rainy",
        81: "Rainy",
        82: "Rainy",
        95: "Rainy",
        96: "Rainy",
        97: "Rainy",
        99: "Rainy",

        71: "Snow",
        73: "Snow",
        75: "Snow",
        77: "Snow",
        85: "Snow",
        86: "Snow"
    };

    // Obtém os dados meteorológicos
    const obterClima = async (latitude, longitude) => {

        const resposta = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        if (!resposta.ok) {
            throw new Error("Erro ao obter dados meteorológicos");
        }

        return await resposta.json();
    };

    // Converte o código meteorológico
    const obterTempo = (code) => {
        return tempoMap[code] || null;
    };

    // Obtém os tipos de Pokémon com boost
    const obterBoosts = async (tempo) => {
        return weatherBoosts[tempo] || [];
    };

    return { obterClima, obterTempo, obterBoosts };
}
