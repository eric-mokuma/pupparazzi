import express from 'express'
import { PuppyData } from '../../models/Puppy'
import {
  getPuppies,
  getPuppyById,
  addPuppy,
  updatePuppy,
  deletePuppy,
} from '../../store'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const puppies = await getPuppies()
    res.json(puppies)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const puppy = await getPuppyById(parseInt(req.params.id, 10))
    if (puppy) {
      res.json(puppy)
    } else {
      res.status(404).json({ error: 'Puppy not found' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.post('/', async (req, res) => {
  try {
    const newPuppy = await addPuppy(req.body as Partial<PuppyData>)
    res.status(201).json({ id: newPuppy })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.patch('/:id', async (req, res) => {
  const puppyId = parseInt(req.params.id, 10)
  const puppyData: Partial<PuppyData> = req.body

  if (isNaN(puppyId)) {
    return res.status(400).json({ error: 'Invalid Puppy ID' })
  }

  try {
    await updatePuppy(puppyId, puppyData)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedPuppy = await deletePuppy(parseInt(req.params.id, 10))
    res.status(200).json(deletedPuppy)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
