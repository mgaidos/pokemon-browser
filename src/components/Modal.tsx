import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Modal.css'

type Props = {
  open: boolean
  urlPokemon: string,
  isActive: boolean,
  onCloseModal: () => void
}

const Modal = (props: Props) => {

  const [pokemonName, setPokemonName] = useState("")
  const [pokemonType, setPokemonType] = useState([])
  const [pokemonWeight, setPokemonWeight] = useState("")
  const [pokemonHeight, setPokemonHeight] = useState("")
  const [pokemonImage, setPokemonImage] = useState("")

  useEffect(() => {
    const getPokemonInfo = async () => {
      await axios.get(props.urlPokemon)
        .then(function (response) {
          const types = response.data.types
          console.log(types)
          const justTypes = types.map((element: any) => {
            return element.type.name
          })
          setPokemonName(response.data.forms[0].name)
          setPokemonType(justTypes)
          setPokemonWeight(response.data.weight)
          setPokemonHeight(response.data.height)
          setPokemonImage(response.data.sprites.front_default)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    getPokemonInfo()
  }, [])

  const colours: any = {
    normal: '#a8a77a',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  }

  const modalStyle = {
    backgroundColor: colours[pokemonType[0]],
    boxShadow: `0px 0px 25px 0px ${colours[pokemonType[0]]}`
  }

  if (!props.open) return null

  return (

    <div onClick={props.onCloseModal} className={`modal  ${props.isActive ? "active" : "active"}`}>
      <div onClick={(e) => { e.stopPropagation() }} className='modal-container' style={modalStyle}>
        <header>
          <h1  >{pokemonName}</h1>
        </header>
        
        <main>
          <article className='img-wrapper col-1'>
            <img src={pokemonImage} alt="" style={{ minWidth: "150px" }} />
          </article>

          <article className='modal-pokemon-data col-2'>
            <p>Weigth: {pokemonWeight} </p>
            <p>Height: {pokemonHeight}</p>
            <p>Type: {pokemonType.toString()}</p>
          </article>
          <p className='close-button' onClick={props.onCloseModal}>X</p>
        </main>
      </div>
    </div>
  )
}



export default Modal