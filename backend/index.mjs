import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { readFile } from 'fs/promises'
import { TYPES, generateLegendaries } from './config.mjs'

const POKEMON_DATA = JSON.parse(
  await readFile(new URL('./data.json', import.meta.url))
)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({ messsage: 'Hello World' })
})

app.get('/pokemon', (req, res) => {
  const pageNumber = req.query.page ?? 1
  const pageSize = req.query.pageSize ?? 9
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = pageNumber * pageSize
  const query = req.query.query ?? ''

  const types = (req.query.types?.split(',') ?? TYPES).map((type) =>
    type.toLowerCase()
  )

  const attackRange = ('0' + req.query.attack ?? '')
    ?.split('-')
    .map((i) => parseInt(i))
    .filter((i) => !isNaN(i))
  if (attackRange.length !== 2) attackRange.push(Infinity)

  const experienceRange = ('0' + req.query.experience ?? '')
    ?.split('-')
    .map((i) => parseInt(i))
    .filter((i) => !isNaN(i))

  if (experienceRange.length !== 2) experienceRange.push(Infinity)

  const data = POKEMON_DATA.filter((data) => {
    const queryFilter =
      data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1

    const typesFilter = types.indexOf(data.type.toLowerCase()) !== -1

    const attack = data.stats.attack
    const attackFilter = attack >= attackRange[0] && attack <= attackRange[1]

    const experienceFilter =
      data.base_experience >= experienceRange[0] &&
      data.base_experience <= experienceRange[1]

    return queryFilter && typesFilter && attackFilter && experienceFilter
  })
  res.json({ data: data.slice(startIndex, endIndex), count: data.length })
})

app.get('/legendaries', (req, res) => {
  const legendaries = generateLegendaries()
  console.log(legendaries)
  res.json({ data: legendaries })
})

app.get('/**/*', (req, res) => {
  res.status(404).json({
    messsage: 'Ye kaha aa gaye aap?',
  })
})

app.listen(3000, '0.0.0.0', () => {
  console.log('listening on http://localhost:3000')
})
