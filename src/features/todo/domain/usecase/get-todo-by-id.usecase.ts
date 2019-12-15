import { Observable } from "rxjs";
import { UseCase } from "../../../../core/domain/usecase/usecase";
import { Todo } from "../model/todo.model";
import { TodoRepository } from "../repository/todo.repository";

export class GetTodoByIdUseCase implements UseCase<string, Todo> {
  constructor(private todoRepository: TodoRepository) { }

  execute(id: string): Observable<Todo> {
    return this.todoRepository.getTodoById(id);
  }
}