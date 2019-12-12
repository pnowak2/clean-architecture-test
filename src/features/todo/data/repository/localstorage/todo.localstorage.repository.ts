import { TodoRepository } from "../../../domain/repository/todo.repository";
import { Todo } from "../../../domain/model/todo.model";
import { Observable, of } from "rxjs";
import { map, find, flatMap } from "rxjs/operators";

const todos = [
  new Todo({ id: '1', name: 'todo 1' }),
  new Todo({ id: '2', name: 'todo 2' }),
  new Todo({ id: '3', name: 'todo 3' }),
];

export class TodoLocalStorageRepository implements TodoRepository {
  constructor(private storage: Storage) { }

  getAllTodos(): Observable<Array<Todo>> {
    return of(JSON.parse(this.storage.getItem('items')) || []);
  }

  getCompletedTodos(): Observable<Array<Todo>> {
    return of(todos.filter(todo => todo.completed));
  }

  getIncompletedTodos(): Observable<Array<Todo>> {
    return of(todos.filter(todo => !todo.completed));
  }

  searchTodos(keyword: string): Observable<Array<Todo>> {
    return this.getAllTodos().pipe(
      map(todos => todos.filter(todo => todo.name.includes(keyword)))
    );
  }

  addTodo(name: string): Observable<Todo> {
    return this.getAllTodos().pipe(
      flatMap((todos) => {
        const todo = new Todo({
          id: Math.random() + '',
          name: name
        });

        const todosJSON = JSON.stringify([...(todos || []), todo]);
        this.storage.setItem('items', todosJSON);
        return of(todo);
      })
    );
  }

  getTodoById(id: string): Observable<Todo> {
    return of(todos.find(todo => todo.id === id));
  }

  removeTodo(id: string): Observable<Todo> {
    const idx = todos.findIndex(todo => todo.id === id);
    const todo = todos.find(todo => todo.id === id);

    todos.splice(idx, 1);

    return of(todo);
  }

  markTodoAsCompleted(id: string, isCompleted: boolean): Observable<Todo> {
    const todo = todos.find(todo => todo.id === id);
    todo.completed = isCompleted;

    return of(todo);
  }
}