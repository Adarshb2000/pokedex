import { useState, useEffect } from 'react'
import './Legendaries.css'
import { LegendaryPokemon } from './types'
import LegendariesDisplay from './LegendariesDisplay'
import { host } from './config'

const Legendaries = () => {
  document.body.style.background = 'black'

  const [legendaries, setLegendaries] = useState<
    { type: string; pokemons: LegendaryPokemon[] }[]
  >([])

  useEffect(() => {
    fetch(`${host}/legendaries`)
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
