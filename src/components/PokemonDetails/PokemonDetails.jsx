import { useParams } from "react-router-dom";
import './PokemonDetails.css'
import usePokemonDetalis from "../../hooks/usePokemonDetalis";
import { Link } from "react-router-dom";
import axios from "axios";

function PokemonDetails() {

    const { id } = useParams();
    const [pokemon] = usePokemonDetalis(id);

    const extractPokemonId = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 2];
    };

    const toDataURL = async (url) => {
        const response = await axios.get(url, { responseType: "blob" });
        const imageDataUrl = URL.createObjectURL(response.data);
    
        return imageDataUrl;
      };

    const handleDownload = async () => {
        const a = document.createElement("a");
        a.href = await toDataURL(pokemon.image);
        a.download = `${pokemon.name}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    return (
        <>
            <div className="pokemon-wrapper" key={id}>
                {(pokemon.isLoading) ? <div className="loader"></div> :
                    <>
                        <div className="pokemon-image-wrapper">
                            <div className="pokemon-name">{pokemon.name}</div>
                            <div className="pokemon-image"><img src={pokemon.image} width={300} height={300} /></div>
                            <button className="download" onClick={handleDownload}>Download SVG</button>
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
                            <div>
                                {
                                    pokemon.types && pokemon.similarPokemons &&
                                    <div className="more-pokemons">
                                        <p>-- More {pokemon.types[0]} type pokemons --</p>
                                        <ul style={{ listStyle: "none", display: "flex", justifyContent: "center", margin: "0px" }}>
                                            {pokemon.similarPokemons.map((p) => <Link to={`/pokemon/${extractPokemonId(p.pokemon.url)}`}    style={{textDecoration:"none"}} key={p.pokemon.url}><li className="search-pokemon" key={p.pokemon.url}>{p.pokemon.name}</li></Link>)}
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default PokemonDetails;