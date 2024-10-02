import { useNavigate, useParams } from 'react-router-dom'
import { useDeletePuppy, usePuppy } from '../hooks/api'
import ErrorMessage from '../components/ErrorMessage'
import LoadingIndicator from '../components/LoadingIndicator'

export default function ViewPuppy() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const puppyId = id ? Number(id) : 0

  if (isNaN(puppyId)) {
    return <div>Route param id is missing or invalid</div>
  }

  const puppy = usePuppy(puppyId)
  const deletePuppy = useDeletePuppy(puppyId)

  if (puppy.isLoading) {
    return <LoadingIndicator />
  }

  if (puppy.isError || !puppy.data) {
    return <ErrorMessage error={puppy.error} />
  }

  async function handleDelete(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    evt.preventDefault()

    if (deletePuppy.isLoading) {
      return
    }

    await deletePuppy.mutateAsync()

    navigate('/')
  }

  const { name, breed, owner, image } = puppy.data.puppy

  return (
    <div className="puppy">
      <img
        className="img-circle"
        src={image || '/path/to/default/image.jpg'}
        alt={name}
      />
      <h2>{name}</h2>
      <div>Breed: {breed}</div>
      <div>Owner: {owner}</div>
      <button onClick={handleDelete}>Delete</button>
      <a href={`/${puppyId}/edit`}>Edit</a>
    </div>
  )
}
