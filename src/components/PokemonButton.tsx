import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from "./Modal"

import './PokemonButton.css'

type Props = {
    name: string,
    idPokemon: number,
    urlPokemon: string,
}

const PokemonButton = (props: Props) => {

    const [color, setColor] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [isActive, setIsActive] = useState(false)

    //Pokémon colours by Pokémon type
    const colours: any = {
        normal: '#A8A77A',
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


    //loading pokemon type to assign a color
    useEffect(() => {
        const getColor = async () => {
            await axios.get(props.urlPokemon)
                .then(function (response) {
                    setColor(response.data.types[0].type.name)
                    //console.log(props.urlPokemon)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        getColor()

    }, [])

    const closeModal = () => {
        setOpenModal(false)
    }

    //dynamic assignment of background color
    const buttonStyle = {
        backgroundColor: colours[color],
    }

    return (

        <div>
            <button className="one-button"
                style={buttonStyle}
                id={props.idPokemon}
                onClick={() => {
                    setIsActive(true)
                    setOpenModal(true)

                }}>
                {props.name}
            </button>
            {openModal && <Modal urlPokemon={props.urlPokemon} open={openModal} onCloseModal={closeModal} isActive={isActive} />}

        </div>
    )
}

export default PokemonButton

