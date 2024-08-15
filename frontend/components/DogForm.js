import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const initialForm = { name: '', breed: '', adopted: false }

// Use this form for both POST and PUT requests!
export default function DogForm({ dog, reset, getDogs }) {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialForm)
  const [breeds, setBreeds] = useState([])
  useEffect(() => {
    fetch('/api/dogs/breeds')
    .then(res => res.json())
    .then(breeds => setBreeds(breeds.toSorted()))
    .catch(err => console.error(err))
  }, [])
  useEffect(() => {
    if (dog) setValues(dog)
      else setValues(initialForm)
  }, [dog])
  const postDog = () => {
    console.log('POSTing a new dog!')
  }
  const putDog = () => {
    console.log('PUTing a existing dog!')
  }
  const onReset = (event) => {
    event.preventDefault()
    setValues(initialForm)
    reset()
  }
  const onSubmit = (event) => {
    event.preventDefault()
    const action = dog ? putDog : postDog
    action()
  }
  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues({
      ...values, [name]: type === 'checkbox' ? checked : value
    })
  }
  return (
    <div>
      <h2>
      {dog ?  'Update Dog': 'Create Dog'}
      </h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
        >
          <option value="">---Select Breed---</option>
          {/* Populate this dropdown using data obtained from the API */
          breeds.map(br => <option key={br}>{br}</option>)
          }
        </select>
        <label>
          Adopted: <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button type="submit">
            {dog ?  'Update Dog': 'Create Dog'}
          </button>
          <button aria-label="Reset form" onClick={onReset}>Reset</button>
        </div>
      </form>
    </div>
  )
}
