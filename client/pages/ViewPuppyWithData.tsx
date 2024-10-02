import React from 'react'
import { useParams } from 'react-router-dom'
import { useDeletePuppy, usePuppy } from '../hooks/api'
import ViewPuppy from './ViewPuppy'

const ViewPuppyWithData: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const puppyId = id ? Number(id) : 0
  const { data: puppyData, isLoading, isError, error } = usePuppy(puppyId)
  const { mutate: deletePuppy } = useDeletePuppy()
  console.log(puppyId)
  if (isLoading) return <div>Loading...</div>
  if (isError)
    return (
      <div>
        Error loading puppy data:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  if (!puppyData) return <div>Puppy not found</div>

  return (
    <ViewPuppy
      puppy={puppyData.puppy}
      deletePuppy={() => deletePuppy(puppyId)}
    />
  )
}

export default ViewPuppyWithData
