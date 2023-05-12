import { DashboardStore } from "./dashboardStore";
import { ManageComponentStore } from "./manageComponentsStore";
import { UserStore } from "./UserStore";

export interface IRootStore {
  userStore: UserStore;
  dashboardStore: DashboardStore;
  manageComponentStore: ManageComponentStore;
}

export class RootStore implements IRootStore {
  userStore: UserStore;
  dashboardStore: DashboardStore;
  manageComponentStore: ManageComponentStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.dashboardStore = new DashboardStore(this);
    this.manageComponentStore = new ManageComponentStore(this);
  }
}
