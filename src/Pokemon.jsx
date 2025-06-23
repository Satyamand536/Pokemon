import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards.jsx";
export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      console.log(data);
      const pokeurl = data.results.map(async (curPokemon) => {
        // console.log(curPokemon.url)
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        // console.log(data);//ab return data likne se pokeurl ke andar sara data store ho jayega.
        return data;
      });
      // console.log(pokeurl);//ab ye promise array hai isliye ye nahi dikha raha hai.
      const prom = await Promise.all(pokeurl); //ye promise ko resolve karega.
      console.log(prom); //ab ye data dikha raha hai.
      setPokemon(prom); //ab ye data ko set karega.
      setLoading(false); //loading ko false karega.
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setLoading(false); //loading ko false karega.
      setError(error); //error ko set karega.
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  //search functionality
  //to find any data exist in array
  const searchData = pokemon.filter((curPokemon) => 
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }

  if (error) {
    return <h1 className="error">Error: {error.message}</h1>;
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Let's catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search for a Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {
              // pokemon.map((curPokemon) => {
              searchData.map((curPokemon) => {
                return (
                  <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
                );
              })
            }
          </ul>
        </div>
      </section>
    </>
  );
};
