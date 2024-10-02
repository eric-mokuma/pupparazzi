import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Puppy, PuppyData } from '../../models/Puppy'

export function usePuppies() {
  return useQuery({
    queryKey: ['puppies'],
    queryFn: async () => {
      const res = await request.get('/api/v1/puppies')
      return res.body.puppies as Array<Puppy>
    },
  })
}

export function usePuppy(id: number) {
  return useQuery({
    queryKey: ['puppy', id],
    queryFn: async () => {
      const res = await request.get(`/api/v1/puppies/${id}`)
      return res.body as Puppy
    },
  })
}

export function useDeletePuppy(id: number) {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await request.delete(`/api/v1/puppies/${id}`)
    },
    onSuccess: () => {
      client.invalidateQueries(['puppies'])
    },
  })
}

export function useCreatePuppy() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async ({ puppy }: { puppy: PuppyData }) => {
      const res = await request.post('/api/v1/puppies').send(puppy)
      return res.body as { id: number; location: string }
    },
    onSuccess: () => {
      client.invalidateQueries(['puppies'])
    },
  })
}

export function useUpdatePuppy(id: number) {
  const client = useQueryClient()
  return useMutation<void, Error, Partial<PuppyData>>({
    mutationFn: async (puppyData) => {
      await request.patch(`/api/v1/puppies/${id}`).send(puppyData)
    },
    onSuccess: () => {
      client.invalidateQueries(['puppy', id])
    },
  })
}
