import { useTodo, useTodoAdd, useTodoFilter, useTodoUpdate } from '../reducers'
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from 'react'

const uuid = () => Math.random().toString().slice(-8)

export default function List() {
  const [todo, loadTodo] = useTodo()
  const [todoAdd, loadTodoAdd] = useTodoAdd()
  const [todoFilter] = useTodoFilter()
  const [title, setTitle] = useState('')

  useEffect(() => {
    loadTodo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleKeyPress: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      setTitle('')
      loadTodoAdd({
        id: uuid(),
        title,
        done: false,
      })
    }
  }

  return (
    <div style={{ width: 400, margin: 'auto' }}>
      <h1>todos</h1>
      <input
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Filter />
      {todoAdd.status === 'loading' && 'adding'}
      <div>
        {todo.status === 'loading' && 'loading'}
        {todo.data
          ?.filter((item) => todoFilter.type === 'all' || item.done)
          .map((item) => (
            <Item key={item.id} dataSource={item} />
          ))}
      </div>
    </div>
  )
}

function Filter() {
  const [todoFilter, todoFilterDispatcher] = useTodoFilter()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    todoFilterDispatcher.set({
      ...todoFilter,
      type: event.target.value as any,
    })
  }

  return (
    <div>
      Filter:
      <label>
        <input type="radio" name="type" value="all" onChange={handleChange} checked={todoFilter.type === 'all'} />
        all
      </label>
      <label>
        <input type="radio" name="type" value="done" onChange={handleChange} checked={todoFilter.type === 'done'} />
        done
      </label>
    </div>
  )
}

function Item({ dataSource }: { dataSource: Model.Todo }) {
  const [title, setTitle] = useState(dataSource.title)
  const [done, setDone] = useState(dataSource.done)
  const [todoSave, loadTodoSave] = useTodoUpdate()

  const handleSave = (updateDone: boolean = done) => {
    loadTodoSave({
      ...dataSource,
      done: updateDone,
      title,
    })
  }

  const handleDone: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDone(event.target.checked)
    handleSave(event.target.checked)
  }

  return (
    <div>
      <input type="checkbox" checked={done} onChange={handleDone} />
      <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} onBlur={() => handleSave()} />
      {todoSave.processing?.[dataSource.id] && 'saving'}
    </div>
  )
}
