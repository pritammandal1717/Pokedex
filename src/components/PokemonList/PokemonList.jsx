import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import usePokemonList from '../../hooks/usePokemonList';

function PokemonList(){
    
    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true); 

    // const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    // const[nextUrl, setNextUrl] = useState("");
    // const[prevUrl, setPrevUrl] = useState("");

    const {pokemonListState, setPokemonListState} = usePokemonList();

    return(
        <div className="pokemon-list-wrapper">
            <h1 className="heading">Pokemons</h1>
            <div className="pokemon-list">
                {(pokemonListState.isLoading) ? <div className="loader"></div> : 
                    pokemonListState.pokemonList.map((p) => {
                        return <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>
                    })
                }
            </div>
            <div className="controls">
                <button className="btn" disabled = {pokemonListState.prevUrl == null} onClick={() => setPokemonListState( () => (
                    {...pokemonListState, pokedexUrl : pokemonListState.prevUrl}
                    
                ))}><SlArrowLeft /></button>
                <button className="btn" disabled = {pokemonListState.nextUrl == null} onClick={() => setPokemonListState( () => (
                    {...pokemonListState, pokedexUrl : pokemonListState.nextUrl}))}><SlArrowRight /></button>
            </div>
        </div>
    )
}

export default PokemonList;