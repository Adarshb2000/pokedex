import { useState, useEffect } from 'react'
import './Legendaries.css'
import { LegendaryPokemon } from './types'
import LegendariesDisplay from './LegendariesDisplay'

const Legendaries = () => {
  document.getElementsByTagName('body')[0].style.background = 'black'
  document
    .getElementsByTagName('footer')[0]
    ?.style.setProperty('color', 'white')

  const [legendaries, setLegendaries] = useState<
    { type: string; pokemons: LegendaryPokemon[] }[]
  >([])

  useEffect(() => {
    fetch('https://poke-api.blehhh.me/legendaries')
      .then((ret) => ret.json())
      .then((res) => {
        setLegendaries(res.data)
      })
      .catch(console.error)
  }, [])

  return legendaries.map((legendary, index) => (
    <LegendariesDisplay legendary={legendary} key={index + 'legendary'} />
  ))
}

export default Legendaries
