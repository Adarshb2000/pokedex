import './MobileFilter.css'
import { POKEMON_TYPES } from './config'

const MobileFilter = ({
  closeAction,
  changeValues,
  typesFilter,
  attackFilter,
  experienceFilter,
}: {
  closeAction: { (): void }
  changeValues: {
    ({
      typesFilter,
      experienceFilter,
      attackFilter,
    }: {
      typesFilter?: string[]
      experienceFilter?: string[]
      attackFilter?: string[]
    }): void
  }
  typesFilter: string[]
  attackFilter: string[]
  experienceFilter: string[]
}) => {
  return (
    <div className="mobile-filter">
      <button className="close-btn" onClick={closeAction}>
        <img src="public/images/close-icon.svg" alt="close" />
      </button>
      <div className="mobile-filters-container">
        <h4>Type</h4>
        <div className="mobile-filter-types">
          {POKEMON_TYPES.map((type) => (
            <label htmlFor="filter-types">
              <input
                type="checkbox"
                name="filter-types"
                defaultChecked={typesFilter.indexOf(type) !== -1}
                key={type}
                value={type}
              />
              {type}
            </label>
          ))}
        </div>
        <div className="w-full">
          <button
            className="apply-button"
            onClick={() => {
              const types = Array.from(
                document.querySelectorAll("input[type='checkbox']")
              )
                .filter((ele) => ele.checked)
                .map((ele) => ele.value)
              changeValues({ typesFilter: types })
            }}
          >
            Apply
          </button>

          <button
            onClick={() => {
              document
                .querySelectorAll("input[type='checkbox']")
                .forEach((inp) => {
                  inp.checked = false
                })

              changeValues({ typesFilter: POKEMON_TYPES })
            }}
          >
            Clear All
          </button>
          <button
            onClick={() => {
              document
                .querySelectorAll("input[type='checkbox']")
                .forEach((inp) => {
                  inp.checked = true
                })

              changeValues({ typesFilter: POKEMON_TYPES })
            }}
          >
            Select All
          </button>
        </div>
      </div>
      <hr color="#f2f2f2" />
      <div className="mobile-filters-container">
        <h4>Experience</h4>
        <div className="filter-card-container">
          <div>
            <label htmlFor="experience-filter">
              From
              <input
                type="number"
                defaultValue={experienceFilter[0]}
                name="experience-filter"
              />
            </label>
            <hr />
            <label htmlFor="experience-filter">
              To
              <input
                type="number"
                name="experience-filter"
                defaultValue={experienceFilter[1] ?? ''}
                placeholder="inf"
              />
            </label>
          </div>
          <button
            className="apply-button"
            onClick={() => {
              const values = Array.from(
                document.getElementsByName('experience-filter')
              ).map((ele) => ele.value)
              changeValues({ experienceFilter: values })
            }}
          >
            Apply
          </button>
        </div>
      </div>
      <hr color="#f2f2f2" />
      <div className="mobile-filters-container">
        <h4>Attack</h4>
        <div className="filter-card-container">
          <div>
            <label htmlFor="attack-filter">
              From
              <input
                type="number"
                defaultValue={attackFilter[0]}
                name="attack-filter"
              />
            </label>
            <hr />
            <label htmlFor="attack-filter">
              To
              <input
                type="number"
                name="attack-filter"
                defaultValue={attackFilter[1] ?? ''}
                placeholder="inf"
              />
            </label>
          </div>
          <button
            className="apply-button"
            onClick={() => {
              const values = Array.from(
                document.getElementsByName('attack-filter')
              ).map((ele) => ele.value)
              changeValues({ attackFilter: values })
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileFilter
