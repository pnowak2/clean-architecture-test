import { Subject } from "rxjs";
import { UserViewModel } from "./user.viewmodel";
import { UserViewModelMapper } from "./user.mapper";
import { GetAllUsersUseCase } from "../domain/usecase/get-all-users.usecase";
import { map, takeUntil } from "rxjs/operators";

export class UserPresenter {
  users$: Subject<Array<UserViewModel>> = new Subject<Array<UserViewModel>>();
  private destroy$: Subject<any> = new Subject<any>();
  private mapper = new UserViewModelMapper();

  constructor(
    private getAllUsersUC: GetAllUsersUseCase
  ) { }

  getAllUsers() {
    this.getAllUsersUC
      .execute()
      .pipe(
        map(users => users.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$)
      )
      .subscribe(this.users$);
  }

  onDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}