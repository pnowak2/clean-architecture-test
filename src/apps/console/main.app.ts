import { TodoPresenter } from "../../features/todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../../features/todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../../features/todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../../features/todo/data/repository/inmemory/todo.inmemory.repository";
import { Observable } from "rxjs";
import { Todo } from "../../features/todo/presentation/state/todos.state";
import { TodoLocalStorageRepository } from "../../features/todo/data/repository/localstorage/todo.localstorage.repository";
import { LocalStorageService } from "../../core/domain/service/localstorage.service";
import { LocalStorageBrowserService } from "../../core/data/service/localstorage-browser.service";
import { AddTodoUseCase } from "../../features/todo/domain/usecase/add-todo.usecase";

export class ConsoleApp {
  todos$: Observable<Array<Todo>>;
  todoPresenter: TodoPresenter;

  constructor() {
    const localStorageService: LocalStorageService = new LocalStorageBrowserService(
      window.localStorage
    );
    const localStorageTodoRepo: TodoRepository = new TodoLocalStorageRepository(localStorageService);
    const inMemoryTodoRepo: TodoRepository = new TodoInMemoryRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(inMemoryTodoRepo);
    const addTodoUC: AddTodoUseCase = new AddTodoUseCase(inMemoryTodoRepo);
    this.todoPresenter = new TodoPresenter(
      getAllTodosUC,
      addTodoUC
    );
    this.todos$ = this.todoPresenter.todos$;
  }

  run() {
    this.todos$.subscribe(todos => {
      console.log('got todos', todos);
    });

    document.querySelector('#getAllTodos').addEventListener('click', () => {
      this.todoPresenter.getAllTodos();
    });

    document.querySelector('#addTodo').addEventListener('click', () => {
      this.todoPresenter.addTodo('Hello!');
    });
  }
}