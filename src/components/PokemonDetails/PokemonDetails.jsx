import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

function PokemonDetails() {

    const { id } = useParams();
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonGenderUrl = `https://pokeapi.co/api/v2/gender/${id}/`

    const [pokemon, setPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    async function downloadPokemon() {
        setIsLoading(true);
        const response = await axios.get(pokemonUrl);
        console.log(response);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            abilities: response.data.abilities.map((a) => a.ability.name),
        })

        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemon();
    }, []);

    return (
        <>
            <div className="pokemon-wrapper">
                {(isLoading) ? <div className="loader"></div> :
                    <>
                        <div className="pokemon-image-wrapper">
                            <div className="pokemon-name">{pokemon.name}</div>
                            <div className="pokemon-image"><img src={pokemon.image} width={300} height={300} /></div>
                        </div>
                        <div className="break"><hr /></div>
                        <div className="pokemon-details-wrapper">
                            <div className="basic-details">
                                <h2 className="text">Weight : {pokemon.weight / 10} Kg</h2>
                                <h2 className="text">Height : {pokemon.height / 10} m</h2>
                                <h2 className="text">Ability : {pokemon.abilities && pokemon.abilities.map((t) => <div className="inner-text" key={t}> {t} { } </div>)}</h2>
                                <h2 className="text">Types : {pokemon.types && pokemon.types.map((t) => <div className="inner-text" key={t}> {t} </div>)}
                                </h2>
                            </div>

                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default PokemonDetails;