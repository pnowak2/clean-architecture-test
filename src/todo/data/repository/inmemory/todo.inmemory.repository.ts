import { TodoRepository } from "../../../domain/repository/todo.repository";
import { Todo } from "../../../domain/model/todo.model";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

const todos = [
  { name: 'todo 1' },
  { name: 'todo 2' },
  { name: 'todo 3' },
];

export class TodoInMemoryRepository implements TodoRepository {
  getAllTodos(): Observable<Array<Todo>> {
    return of(todos);
  }

  searchTodos(keyword: string): Observable<Array<Todo>> {
    return this.getAllTodos().pipe(
      map(todos => todos.filter(todo => todo.name.includes(keyword)))
    );
  }

  addTodo(name: string): Observable<Todo> {
    const todo = { name };

    todos.push(todo);
    return of(todo);
  }
}