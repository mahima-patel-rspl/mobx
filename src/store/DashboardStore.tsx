import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import { fetchFunction } from "../components/common/AxiosInstance";
import {
  MostViewedData,
  RecentlyData,
  TopCategoriesData,
} from "../components/pages/InterfaceTypes";

//Dashboard - Top categories store
// export interface IDashTopCategories {
//   avatar_url: string | null;
//   categoryId: number;
//   categoryName: string;
//   id: number;
//   name: string;
//   total_components: number;
//   total_views: string;
//   web_url: string;
// }

export class DashTopCategoriesStore {
  categories: TopCategoriesData[] = [];
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      categories: observable,
      fetchCategories: action,
      getCategories: computed,
    });
    this.rootStore = rootStore;
  }

  async fetchCategories(limit: any) {
    const getData: any = await fetchFunction(
      `api/techstack/top?limit=${limit}`
    );
    this.categories = getData.payload;
    // console.log("getData----->", getData.payload);
    // console.log("this.categories----->", this.categories);
  }

  get getCategories() {
    return this.categories;
  }
}

//Dashboard - Recently Added store
export class RecentlyAddedStore {
  recentlyAddedItems: RecentlyData[] = [];
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      recentlyAddedItems: observable,
      fetchAddedItems: action,
      getAddedItems: computed,
    });
    this.rootStore = rootStore;
  }

  async fetchAddedItems() {
    const getData: any = await fetchFunction("api/component/recent");
    this.recentlyAddedItems = getData.payload;
  }

  get getAddedItems() {
    return this.recentlyAddedItems;
  }
}

//Dashboard - Most Viewed store
export class MostViewedStore {
  mostViewedData: MostViewedData[] = [];
  rootstore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      mostViewedData: observable,
      fetchMostViewedData: action,
      getMostViewedData: computed,
    });

    this.rootstore = rootStore;
  }

  async fetchMostViewedData(duration: any) {
    const getData: any = await fetchFunction(
      `api/dashboard/mostviewed?duration=${duration}`
    );
    this.mostViewedData = getData.payload;
    console.log("getData----->", getData.payload);
  }

  get getMostViewedData() {
    return this.mostViewedData;
  }
}
