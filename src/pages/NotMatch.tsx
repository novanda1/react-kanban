import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to="/v1">Go to the v1 home page</Link>
      </p>
    </div>
  )
}

export default NoMatch
