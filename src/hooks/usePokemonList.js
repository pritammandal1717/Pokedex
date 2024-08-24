import { useState, useEffect } from "react";
import axios from 'axios';

function usePokemonList(){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList : [],
        isLoading : true,
        pokedexUrl : 'https://pokeapi.co/api/v2/pokemon',
        nextUrl : '',
        prevUrl : '',
    })

    async function downloadPokemons(){
        //setIsLoading(true);
        setPokemonListState(() => ({...pokemonListState, isLoading: true}) );
        const response = await axios.get(pokemonListState.pokedexUrl); // This downloads the list of 20 pokemons 
        console.log(response);
        const pokemonResults = response.data.results; // Getting the array of pokemons from result

        //setNextUrl(response.data.next);
        //setPokemonListState({...pokemonListState, nextUrl : response.data.next});
        //setPrevUrl(response.data.previous);
        //setPokemonListState({...pokemonListState, prevUrl : response.data.previous});

        setPokemonListState((state) => ({
            ...state, 
            nextUrl : response.data.next, 
            prevUrl : response.data.previous
        }));

        // Iterating over the array of pokemons, and use the url to to create an array of promises that will extract the details of individual pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        //Passing the array of promises to the axios.all()
        const pokemonData = await axios.all(pokemonResultPromise);

        //Extract each of the pokemon details
        const res = (pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id : pokemon.id,
                name : pokemon.name,
                image : pokemon.sprites.other.dream_world.front_default,
                types : pokemon.types,
            }
        }))

        //setPokemonList(res);
        setPokemonListState( (state) => (
            {...state, pokemonList : res, isLoading : false}
        ));
        //setIsLoading(false);
    }
    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    return{
        pokemonListState,
        setPokemonListState,
    }
}

export default usePokemonList;