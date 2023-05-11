import { DashTopCategoriesStore } from "./DashboardStore";
import { UserStore } from "./UserStore";

export interface IRootStore {
  userStore: UserStore;
  dashTopCategoriesStore: DashTopCategoriesStore;
}

export class RootStore implements IRootStore {
  userStore: UserStore;
  dashTopCategoriesStore: DashTopCategoriesStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.dashTopCategoriesStore = new DashTopCategoriesStore(this);
  }
}
