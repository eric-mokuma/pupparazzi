import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { usePuppy, useUpdatePuppy } from '../hooks/api'
import { PuppyData } from '../../models/Puppy'

interface EditPuppyFormProps {
  puppyId: number
}

const EditPuppyForm: React.FC<EditPuppyFormProps> = ({ puppyId }) => {
  const { data, isLoading, error } = usePuppy(puppyId)
  const { mutate: updatePuppy, isLoading: isUpdating } = useUpdatePuppy(puppyId)
  const [formData, setFormData] = useState<Partial<PuppyData>>({})
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    if (data?.puppy) {
      setFormData(data.puppy)
    }
  }, [data])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const updatedData = { ...formData, image: image || formData.image }

    await updatePuppy(updatedData)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading puppy details</div>

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-item">
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          id="name"
          value={formData.name || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="breed">Breed:</label>
        <input
          name="breed"
          id="breed"
          value={formData.breed || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="owner">Owner:</label>
        <input
          name="owner"
          id="owner"
          value={formData.owner || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit" disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Submit'}
      </button>
    </form>
  )
}

export default EditPuppyForm
