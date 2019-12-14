import { GetAllTodosUseCase } from "../domain/usecase/get-all-todos.usecase";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import { takeUntil, map, catchError } from "rxjs/operators";
import { TodoViewModelMapper } from "./todo.mapper";
import { TodoViewModel } from "./todo.viewmodel";
import { Presenter } from "../../../core/presentation/presenter";
import { TodoState, Todo } from "./state/todos.state";

export class TodoPresenter extends Presenter {
  private state = new TodoState();
  private dispatch = new BehaviorSubject<TodoState>(this.state);
  
  todos$: Subject<Array<TodoViewModel>> = new Subject<Array<TodoViewModel>>();
  mapper = new TodoViewModelMapper();

  constructor(
    private getAllTodosUC: GetAllTodosUseCase,
  ) {
    super();
  }

  getAllTodos(): Observable<Array<Todo>> {
    return this.getAllTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
      )
  }
}