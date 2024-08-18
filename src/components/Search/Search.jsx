import "./Search.css"

function Search(){
    return(
        <div className="search-wrapper">
            <input
                id="pokemon-name-search"
                type="text"
                placeholder="Enter Pokemon Name Here..........."
            />
        </div>
    )
}

export default Search;