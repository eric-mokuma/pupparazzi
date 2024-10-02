import { useCreatePuppy } from '../hooks/api'
import { PuppyData } from '../../models/Puppy'
import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const empty: PuppyData = {
  name: '',
  breed: '',
  owner: '',
  image: '/images/puppy1.jpg',
  id: 0,
}

export default function AddNewPuppyForm() {
  const createPuppy = useCreatePuppy()
  const navigate = useNavigate()

  const [formState, setFormState] = useState(empty)

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()

    if (createPuppy.isPending) {
      return
    }

    const { id } = await createPuppy.mutateAsync({ puppy: formState })
    navigate(`/${id}`)
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.currentTarget

    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-item">
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          id="name"
          value={formState.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="breed">Breed:</label>
        <input
          name="breed"
          id="breed"
          value={formState.breed}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="owner">Owner:</label>
        <input
          name="owner"
          id="owner"
          value={formState.owner}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          name="image"
          id="image"
          value={formState.image}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={createPuppy.isPending}>
        {createPuppy.isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
