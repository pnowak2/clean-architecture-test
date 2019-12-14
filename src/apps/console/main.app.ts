import { TodoPresenter } from "../../features/todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../../features/todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../../features/todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../../features/todo/data/repository/inmemory/todo.inmemory.repository";
import { UserPresenter } from "../../features/user/presentation/user.presenter";
import { Observable } from "rxjs";
import { Todo } from "../../features/todo/presentation/state/todos.state";

export class ConsoleApp {
  todos$: Observable<Array<Todo>>;
  todoPresenter: TodoPresenter;
  userPresenter: UserPresenter;

  constructor() {
    const inMemoryTodoRepo: TodoRepository = new TodoInMemoryRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(inMemoryTodoRepo);

    this.todoPresenter = new TodoPresenter(
      getAllTodosUC,
    );
  }

  run() {
    this.todoPresenter.getAllTodos();
  }
}