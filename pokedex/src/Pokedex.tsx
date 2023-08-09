import './Pokedex.css'
import { useState, useEffect } from 'react'
import Select from 'react-select'

import Modal from './Modal'
import Card from './Card'
import DetailsCard from './DetailsCard'
import { Pokemon } from './types'
import { POKEMON_TYPES } from './config'
import MobileFilter from './MobileFilter'

const Pokedex = () => {
  document.getElementsByTagName('body')[0].style.background = 'white'
  document
    .getElementsByTagName('footer')[0]
    ?.style.setProperty('color', 'black')
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(9)
  const [query, setQuery] = useState('')

  const [details, setDetails] = useState<Pokemon | null>(null)

  const [cardModal, showCardModal] = useState(false)

  const [typesFilter, setTypesFilter] = useState<string[]>([])
  const [attackFilter, setAttackFilter] = useState(['0'])
  const [experienceFilter, setExperienceFilter] = useState(['0'])
  const [filterModal, showFilterModal] = useState(false)
  const [mobileView, setMobileView] = useState(window.innerWidth <= 480)

  const options = [
    { value: '', label: 'type' },
    ...POKEMON_TYPES.map((type) => {
      return { value: type, label: type }
    }),
  ]

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const ret = await fetch(
          `https://poke-api.blehhh.me/pokemon?${
            query ? `query=${query}&` : ''
          }${typesFilter.length ? `types=${typesFilter.join(',')}&` : ''}${
            attackFilter ? `attack=${attackFilter.join('-')}&` : ''
          }${
            experienceFilter ? `experience=${experienceFilter.join('-')}&` : ''
          }page=${page}&pageSize=${pageSize}`
        )
        const { data: pokemons, count }: { data: Pokemon[]; count: number } =
          await ret.json()

        console.log(pokemons)
        setPokemons(pokemons)
        setCount(count)
      } catch (e) {
        console.log(e)
      }
    }
    getPokemons()
  }, [page, pageSize, typesFilter, experienceFilter, attackFilter, query])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setMobileView(window.innerWidth <= 480)
    })
    setPageSize(window.innerWidth > 768 ? 9 : window.innerWidth > 480 ? 6 : 3)
  }, [])

  return (
    <div className="pokedex">
      <h1>
        800 <span>Pokemons</span> for you to choose your favorite
      </h1>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Find your pokemon..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <>
        {mobileView ? (
          <button onClick={() => showFilterModal(true)}>Filter</button>
        ) : (
          <div className="filters">
            <Select
              options={options}
              isMulti={true}
              onChange={(e) => {
                setTypesFilter(e.map((option) => option.value))
              }}
            />
            <div>
              Attack:{' '}
              <div>
                <input
                  className="filter-input"
                  type="number"
                  name="attack-min"
                  id="attack-min"
                  defaultValue={0}
                  onChange={(e) => {
                    setAttackFilter([e.target.value, attackFilter[1]])
                  }}
                />{' '}
                -{' '}
                <input
                  className="filter-input"
                  type="number"
                  name="attack-min"
                  id="attack-min"
                  placeholder="inf"
                  onChange={(e) => {
                    setAttackFilter([attackFilter[0], e.target.value])
                  }}
                />
              </div>
            </div>
            <div>
              Experience:{' '}
              <div>
                <input
                  className="filter-input"
                  type="number"
                  name="attack-min"
                  id="attack-min"
                  defaultValue={0}
                  onChange={(e) => {
                    setExperienceFilter([e.target.value, experienceFilter[1]])
                  }}
                />{' '}
                -{' '}
                <input
                  className="filter-input"
                  type="number"
                  name="attack-min"
                  id="attack-min"
                  placeholder="inf"
                  onChange={(e) => {
                    setExperienceFilter([experienceFilter[0], e.target.value])
                  }}
                />
              </div>
            </div>
            <button>Done</button>
          </div>
        )}
      </>
      <div className="pokedex-grid">
        {pokemons.map((pokemon, index) => (
          <div
            onClick={() => {
              showCardModal(true)
              setDetails(pokemon)
            }}
          >
            <Card pokemon={pokemon} key={index} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => {
            setPage(Math.max(page - 1, 1))
          }}
        >
          &larr;
        </button>
        Page number{' '}
        <input
          name="page"
          id="page"
          type="number"
          maxLength={1}
          pattern="d?"
          min={1}
          max={Math.ceil(count / pageSize)}
          value={page}
          onChange={(e) => {
            setPage(parseInt(e.target.value || ''))
          }}
        />{' '}
        / {Math.ceil(count / pageSize)}
        <button
          onClick={() => {
            setPage(Math.min(page + 1, Math.ceil(count / pageSize)))
          }}
        >
          &rarr;
        </button>
      </div>
      {cardModal ? (
        <Modal closeModal={() => showCardModal(false)}>
          <DetailsCard
            closeButton={
              <button>
                <img
                  src="images/close-icon.svg"
                  alt="close"
                  onClick={() => {
                    showCardModal(false)
                  }}
                />
              </button>
            }
            pokemon={details!}
          />
        </Modal>
      ) : null}
      {filterModal ? (
        <Modal closeModal={() => showFilterModal(false)}>
          <MobileFilter
            typesFilter={typesFilter}
            attackFilter={attackFilter}
            experienceFilter={experienceFilter}
            closeAction={() => {
              showFilterModal(false)
            }}
            changeValues={({ typesFilter, attackFilter, experienceFilter }) => {
              if (typesFilter) setTypesFilter(typesFilter)
              if (attackFilter) setAttackFilter(attackFilter)
              if (experienceFilter) setExperienceFilter(experienceFilter)
            }}
          />
        </Modal>
      ) : null}
    </div>
  )
}

export default Pokedex
