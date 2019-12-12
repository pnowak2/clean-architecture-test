import { TodoPresenter } from "../features/todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../features/todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../features/todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../features/todo/data/repository/inmemory/todo.inmemory.repository";
import { TodoRestfulRepository } from "../features/todo/data/repository/restful/todo.restful.repository";
import { SearchTodosUseCase } from "../features/todo/domain/usecase/search-todos.usecase";
import { AddTodoUseCase } from "../features/todo/domain/usecase/add-todo.usecase";
import { GetTodoByIdUseCase } from "../features/todo/domain/usecase/get-todo-by-id.usecase";
import { UserRepository } from "../features/user/domain/repository/user.repository";
import { UserInMemoryRepository } from "../features/user/data/repository/inmemory/user.inmemory.repository";
import { GetAllUsersUseCase } from "../features/user/domain/usecase/get-all-users.usecase";
import { UserPresenter } from "../features/user/presentation/user.presenter";
import { RemoveTodoUseCase } from "../features/todo/domain/usecase/remove-todo-id.usecase";
import { MarkTodoAsCompletedUseCase } from "../features/todo/domain/usecase/mark-todo-as-complete.usecase";
import { MarkTodoAsIncompletedUseCase } from "../features/todo/domain/usecase/mark-todo-as-incomplete.usecase";
import { GetCompletedTodosUseCase } from "../features/todo/domain/usecase/get-completed-todos.usecase";
import { GetIncompletedTodosUseCase } from "../features/todo/domain/usecase/get-incompleted-todos.usecase";
import { screen, box, checkbox, program } from "blessed";

export class ConsoleApp {
  todoPresenter: TodoPresenter;
  userPresenter: UserPresenter;

  constructor() {
    const restfulTodoRepo: TodoRepository = new TodoRestfulRepository();
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

    this.todoPresenter = new TodoPresenter(
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

    const inMemoryUserRepo: UserRepository = new UserInMemoryRepository();
    const getAllUsersUC: GetAllUsersUseCase = new GetAllUsersUseCase(inMemoryUserRepo);
    this.userPresenter = new UserPresenter(getAllUsersUC);

    this.todoPresenter.todos$.subscribe(todos => {
      const prg = program();

      prg.key('q', () => {
        chk.uncheck();
        // prg.clear();
        // prg.disableMouse();
        // prg.showCursor();
        // prg.normalBuffer();
        // process.exit(0);
      });

      const scr = screen({
        smartCSR: true
      });

      scr.title = 'my window title';

      const bx = box({
        top: 'center',
        left: 'center',
        width: '50%',
        height: '50%',
        content: 'Hello {bold}world{/bold}!' + todos,
        tags: true,
        border: {
          type: 'line'
        },
        style: {
          fg: 'white',
          bg: 'magenta',
          border: {
            fg: '#f0f0f0'
          },
          hover: {
            bg: 'green'
          }
        }
      });

      // Append our box to the screen.
      scr.append(bx);
      const chk = checkbox({
        checked: true,
        mouse: true,
      });

      chk.on('click', (el) => {
        chk.toggle();
        chk.uncheck();
      });

      bx.append(chk);

      bx.focus();

      // Render the screen.
      scr.render();
    });
    
    this.todoPresenter.todo$.subscribe(todos => {
      console.log('todo:', todos);
    });

    this.todoPresenter.errorMessage$.subscribe(error => {
      console.log('got error:', error);
    });

    this.userPresenter.users$.subscribe(users => {
      console.log('users:', users);
    })
  }

  run() {
    this.todoPresenter.addTodo('added 1');
    this.todoPresenter.addTodo('added 2');
    this.todoPresenter.removeTodo('1');
    // this.todoPresenter.removeTodo('3');
    this.todoPresenter.markTodoAsCompleted('2')
    this.todoPresenter.markTodoAsCompleted('3')
    // this.todoPresenter.searchTodos('2');
    this.todoPresenter.getTodo('3');

    // this.todoPresenter.getCompletedTodos();
    this.todoPresenter.getIncompletedTodos();

    this.userPresenter.getAllUsers();

    this.todoPresenter.onDestroy();
    this.userPresenter.onDestroy();
  }
}