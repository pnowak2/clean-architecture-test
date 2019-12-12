import * as React from 'react';
import { GetAllTodosUseCase } from '../../features/todo/domain/usecase/get-all-todos.usecase';
import { TodoRepository } from '../../features/todo/domain/repository/todo.repository';
import { TodoInMemoryRepository } from '../../features/todo/data/repository/inmemory/todo.inmemory.repository';
import { GetCompletedTodosUseCase } from '../../features/todo/domain/usecase/get-completed-todos.usecase';
import { GetIncompletedTodosUseCase } from '../../features/todo/domain/usecase/get-incompleted-todos.usecase';
import { SearchTodosUseCase } from '../../features/todo/domain/usecase/search-todos.usecase';
import { AddTodoUseCase } from '../../features/todo/domain/usecase/add-todo.usecase';
import { GetTodoByIdUseCase } from '../../features/todo/domain/usecase/get-todo-by-id.usecase';
import { RemoveTodoUseCase } from '../../features/todo/domain/usecase/remove-todo-id.usecase';
import { MarkTodoAsCompletedUseCase } from '../../features/todo/domain/usecase/mark-todo-as-complete.usecase';
import { MarkTodoAsIncompletedUseCase } from '../../features/todo/domain/usecase/mark-todo-as-incomplete.usecase';
import { TodoPresenter } from '../../features/todo/presentation/todo.presenter';

const inMemoryTodoRepo: TodoRepository = new TodoInMemoryRepository();
const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(inMemoryTodoRepo);
const getCompletedTodosUC: GetCompletedTodosUseCase = new GetCompletedTodosUseCase(inMemoryTodoRepo);
const getIncompletedTodosUC: GetIncompletedTodosUseCase = new GetIncompletedTodosUseCase(inMemoryTodoRepo);
const searchTodosUC: SearchTodosUseCase = new SearchTodosUseCase(inMemoryTodoRepo);
const addTodoUC: AddTodoUseCase = new AddTodoUseCase(inMemoryTodoRepo);
const getTodoByIdUC: GetTodoByIdUseCase = new GetTodoByIdUseCase(inMemoryTodoRepo);
const removeTodoUC: RemoveTodoUseCase = new RemoveTodoUseCase(inMemoryTodoRepo);
const markTodoAsCompletedUC: MarkTodoAsCompletedUseCase = new MarkTodoAsCompletedUseCase(inMemoryTodoRepo);
const markTodoAsIncompletedUC: MarkTodoAsIncompletedUseCase = new MarkTodoAsIncompletedUseCase(inMemoryTodoRepo);

const todoPresenter = new TodoPresenter(
  getAllTodosUC,
  getCompletedTodosUC,
  getIncompletedTodosUC,
  searchTodosUC,
  addTodoUC,
  getTodoByIdUC,
  removeTodoUC,
  markTodoAsCompletedUC,
  markTodoAsIncompletedUC
);

todoPresenter.todos$.subscribe(todos => {
  console.log('loaded todos', todos);
})

type CardProps = {
  title: string,
  paragraph: string
}

function getTodos() {
  getAllTodosUC.execute().subscribe(todos => {
    console.log('uc todos', todos);
  });

  getTodoByIdUC.execute('2').subscribe(todo => {
    console.log('uc todo', todo);
  })
}

function addTodo() {
  addTodoUC.execute('new' + Math.random()).subscribe(todo => {
    console.log('todo added:', todo);
  });
}

export const App = ({ title, paragraph }: CardProps) => (
  <div>
    {title}, {paragraph}
    <button onClick={getTodos}>Get Todos!</button>
    <button onClick={addTodo}>Add todo</button>

  </div>
)