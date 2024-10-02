// TODO: Write your fs functions that affect the puppy data in this file and export them.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PuppyData } from './models/Puppy'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dataPath = path.resolve(__dirname, 'storage/example.json')

function loadData(): { puppies: PuppyData[] } {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    const data: { puppies: PuppyData[] } = JSON.parse(raw)
    return data
  } catch (error) {
    throw new Error('Failed to read or parse data: ' + (error as Error).message)
  }
}

export async function getPuppies(): Promise<{ puppies: PuppyData[] }> {
  const data = loadData()
  return data
}

export async function getPuppyById(
  id: number,
): Promise<{ puppy: PuppyData } | undefined> {
  const data = loadData()
  const puppy = data.puppies.find((puppy) => puppy.id === id)
  return puppy ? { puppy } : undefined
}

export async function addPuppy(puppyData: Partial<PuppyData>): Promise<number> {
  const data = loadData()
  const newId =
    data.puppies.length > 0 ? data.puppies[data.puppies.length - 1].id + 1 : 1
  const newPuppy = { ...puppyData, id: newId } as PuppyData
  data.puppies.push(newPuppy)
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8')
  return newId
}

export async function updatePuppy(
  id: number,
  puppyData: Partial<PuppyData>,
): Promise<void> {
  const data = loadData()
  const index = data.puppies.findIndex((puppy) => puppy.id === id)

  if (index === -1) {
    throw new Error('Puppy not found.')
  }

  data.puppies[index] = { ...data.puppies[index], ...puppyData }
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function deletePuppy(id: number): Promise<PuppyData> {
  const data = loadData()
  const index = data.puppies.findIndex((puppy) => puppy.id === id)

  if (index === -1) {
    throw new Error('Puppy not found.')
  }

  const [deletedPuppy] = data.puppies.splice(index, 1)
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8')
  return deletedPuppy
}
