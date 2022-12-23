import classNames from 'classnames'
import Button from '../components/Button'
import Container from '../components/Container'
import KanbanBoard from '../components/kanban/KanbanBoard'

const Home: React.FC = () => {
  return (
    <div>
      <div
        className={classNames(
          'mx-auto max-w-app',
          'px-5 py-4.5',
          'flex flex-wrap flex-row items-center gap-2.5',
          'border-b border-b-neutral-40',
        )}
      >
        <h1 className="font-bold text-lg text-neutral-200">Product Roadmap</h1>
        <Button variant="primary">Add New Group</Button>
      </div>
      <Container className="mt-6">
        <KanbanBoard />
      </Container>
    </div>
  )
}

export default Home
