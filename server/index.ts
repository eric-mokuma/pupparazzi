import server from './server'

const port = 3000

server.listen(port, function () {
  console.log('Server is listening on port', port)
})
