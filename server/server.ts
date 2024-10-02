import express from 'express'
import puppies from './routes/puppies'

const server = express()

server.use(express.json())
server.use('/api/v1/puppies', puppies)

export default server
