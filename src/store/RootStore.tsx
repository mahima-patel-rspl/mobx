import { DashboardStore } from "./dashboardStore";
import { UserStore } from "./UserStore";

export interface IRootStore {
  userStore: UserStore;
  dashboardStore: DashboardStore;
}

export class RootStore implements IRootStore {
  userStore: UserStore;
  dashboardStore: DashboardStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.dashboardStore = new DashboardStore(this);
  }
}
