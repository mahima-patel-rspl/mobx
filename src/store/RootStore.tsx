import {
  DashTopCategoriesStore,
  MostViewedStore,
  RecentlyAddedStore,
} from "./DashboardStore";
import { UserStore } from "./UserStore";

export interface IRootStore {
  userStore: UserStore;
  dashTopCategoriesStore: DashTopCategoriesStore;
  recentlyAddedStore: RecentlyAddedStore;
  mostViewedStore: MostViewedStore;
}

export class RootStore implements IRootStore {
  userStore: UserStore;
  dashTopCategoriesStore: DashTopCategoriesStore;
  recentlyAddedStore: RecentlyAddedStore;
  mostViewedStore: MostViewedStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.dashTopCategoriesStore = new DashTopCategoriesStore(this);
    this.recentlyAddedStore = new RecentlyAddedStore(this);
    this.mostViewedStore = new MostViewedStore(this);
  }
}
