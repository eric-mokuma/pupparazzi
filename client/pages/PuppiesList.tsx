import { Link } from 'react-router-dom'
import { usePuppies } from '../hooks/api'
import ErrorMessage from '../components/ErrorMessage'
import LoadingIndicator from '../components/LoadingIndicator'

const PuppiesList: React.FC = () => {
  const { data, isLoading, isError, error } = usePuppies()

  if (isLoading) return <LoadingIndicator />
  if (isError) return <ErrorMessage error={error} />

  const puppies = data || []

  return (
    <div>
      <Link to="/new">Add Puppy</Link>
      <h1>Puppy List</h1>
      <div className="container">
        {puppies.length > 0 ? (
          puppies.map((puppy) => (
            <div key={puppy.id} className="puppy-list">
              <Link to={`/${puppy.id}`}>
                <img
                  className="img-circle"
                  src={puppy.image}
                  alt={puppy.name}
                />
                <div>{puppy.name}</div>
              </Link>
            </div>
          ))
        ) : (
          <div>No puppies available.</div>
        )}
      </div>
    </div>
  )
}

export default PuppiesList
