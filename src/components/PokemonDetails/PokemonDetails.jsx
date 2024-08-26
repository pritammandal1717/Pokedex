import {useParams } from "react-router-dom";
import './PokemonDetails.css'
import usePokemonDetalis from "../../hooks/usePokemonDetalis";

function PokemonDetails() {

    const { id } = useParams();
    const [pokemon] = usePokemonDetalis(id);

    return (
        <>
            <div className="pokemon-wrapper">
                {(pokemon.isLoading) ? <div className="loader"></div> :
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

            <div>
                {
                    pokemon.types && pokemon.similarPokemons &&
                    <div className="more-pokemons">
                        <h2>--- More {pokemon.types[0]} type pokemons ---</h2>
                        <ul style={{listStyle:"none", display:"flex",justifyContent: "center",margin: "0px"}}>
                            {pokemon.similarPokemons.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                        </ul>
                    </div>
                }
            </div>
        </>
    )
}

export default PokemonDetails;