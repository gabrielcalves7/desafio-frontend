export async function fetchPokemonData(){
  const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
  return fetch(`${url}`)
  .then( response => response.json())
  .then(response => response.results)
}

export async function fetchPokemonDetailedData(url){
  return fetch(`${url}`)
  .then( response => response.json())
}

