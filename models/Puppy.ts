export interface Puppy {
  id: number
  name: string
  breed: string
  owner: string
  image: string
}

export type PuppyData = Omit<Puppy, 'id'>
