import { useEffect, useState } from "react";
import "./Search.css";
import { Link } from "react-router-dom";

function Search() {
    const [apiPokemons, setApiPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchItem, setSearchItem] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0')
            .then(response => response.json())
            .then(data => {
                setApiPokemons(data.results);
                setFilteredPokemons(data.results);
            })
            .catch(err => {
                console.error(err);
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filteredItems = apiPokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredPokemons(filteredItems);
    };

    // Function to extract the Pokémon ID from the URL
    const extractPokemonId = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 2];
    };


    return (
        <>
            <div className="search">
                <input
                    id="search-box"
                    type="text"
                    value={searchItem}
                    onChange={handleInputChange}
                    placeholder="Enter Pokemon Name Here..........."
                />
            </div>
            <div>
                {loading && <div className="loader"></div>}
                {error && <p>There was an error loading the pokemons</p>}
                {!loading && !error && searchItem && filteredPokemons.length > 0 && (
                    <ul className="search-list">
                        {filteredPokemons.slice(0, 10).map(pokemon => <Link to={`/pokemon/${extractPokemonId(pokemon.url)}`} style={{textDecoration:"none"}}><li className="search-pokemon" key={pokemon.url}>{pokemon.name}</li>
                        </Link>)}
                    </ul>
                )}
                {!loading && !error && searchItem && filteredPokemons.length === 0 && (
                    <p>No Pokemons Found</p>
                )}
            </div>
        </>

    );
}

export default Search;