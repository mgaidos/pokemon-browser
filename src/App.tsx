import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


//components
import PokemonButton from "./components/PokemonButton";


//styles
import './App.css'

function App() {

  const [namePokemon, setNamePokemon] = useState([])
  const [limit, setLimit] = useState(20)

  useEffect(() => {
    const getName = async () => {
      await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`)
        .then(function (response) {
          setNamePokemon(response.data.results)
          //console.log(namePokemon)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    getName()
  }, [limit])


  const nextPokemons = () => {
    setLimit(limit + 20)
  }

  return (
    <div className="App">
      <h1 className='main-heading'>Pokémon Browser</h1>
      {namePokemon.map((item:any, index) => <PokemonButton idPokemon={index + 1} key={index} name={item.name} urlPokemon={item.url} />)}

      <button className='next-pokemon-button' onClick={() => nextPokemons()}>NEXT</button>


    </div>
  )
}

export default App