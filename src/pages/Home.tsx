import classNames from 'classnames'
import Button from '../components/Button'
import Container from '../components/Container'

const Home: React.FC = () => {
  return (
    <div>
      <div
        className={classNames(
          'px-5 py-4.5',
          'flex flex-row items-center gap-2.5',
          'border-b border-b-neutral-40',
        )}
      >
        <h1 className="font-bold text-lg text-neutral-200">Product Roadmap</h1>
        <Button variant="primary">Add New Group</Button>
      </div>
      <Container className="mt-6">Kanban here</Container>
    </div>
  )
}

export default Home
