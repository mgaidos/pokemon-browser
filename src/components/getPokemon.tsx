import React, { useEffect } from 'react'
import axios from 'axios'

type Props = {}


let pokemonData: any = []
useEffect(() => {

    axios.get('https://pokeapi.co/api/v2/pokemon/')
    .then(function (response) {

        pokemonData = response.data.results
        //console.log(pokemonData)
    })
    .catch(function (error) {
        console.log(error);
    })
}, [])




const getPokemon = (props: Props) => {
    return (
        <div>{pokemonData}</div>
    )
}

export default pokemonData