import React from 'react'
import { useParams } from 'react-router-dom'
import EditPuppyForm from '../../client/components/EdithPuppyForm'

const EditPuppy: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const puppyId = id ? Number(id) : 0

  return puppyId ? (
    <EditPuppyForm puppyId={puppyId} />
  ) : (
    <div>No puppy ID provided</div>
  )
}

export default EditPuppy
