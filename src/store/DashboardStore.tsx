import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import { fetchFunction } from "../components/common/AxiosInstance";
import {
  MostViewedData,
  RecentlyData,
  TopCategoriesData,
} from "../components/pages/InterfaceTypes";

// Dashboard Store

//Interfaces
export interface ITotalComponents {
  components: number;
}
export interface ITotalViews {
  payload: number;
}
export interface ITotalDownloads {
  payload: number;
}

export class DashboardStore {
  rootStore: IRootStore;

  categories: TopCategoriesData[] = [];
  recentlyAddedItems: RecentlyData[] = [];
  mostViewedData: MostViewedData[] = [];
  components: ITotalComponents | undefined;
  payloadViews: ITotalViews | undefined;
  payloadDownloads: ITotalDownloads | undefined;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      categories: observable,
      fetchCategories: action,
      getCategories: computed,
      recentlyAddedItems: observable,
      fetchAddedItems: action,
      getAddedItems: computed,
      mostViewedData: observable,
      fetchMostViewedData: action,
      getMostViewedData: computed,
      components: observable,
      fetchComponents: action,
      getComponents: computed,
      payloadViews: observable,
      fetchViews: action,
      getViews: computed,
      payloadDownloads: observable,
      fetchDownloads: action,
      getDownloads: computed,
    });
    this.rootStore = rootStore;
  }
  // Top categories
  async fetchCategories(limit: any) {
    const getData: any = await fetchFunction(
      `api/techstack/top?limit=${limit}`
    );
    this.categories = getData.payload;
  }

  get getCategories() {
    return this.categories;
  }

  // Recently Added
  async fetchAddedItems() {
    const getData: any = await fetchFunction("api/component/recent");
    this.recentlyAddedItems = getData.payload;
  }

  get getAddedItems() {
    return this.recentlyAddedItems;
  }

  //Most Viewed
  async fetchMostViewedData(duration: any) {
    const getData: any = await fetchFunction(
      `api/dashboard/mostviewed?duration=${duration}`
    );
    this.mostViewedData = getData.payload;
  }

  get getMostViewedData() {
    return this.mostViewedData;
  }

  // Total component
  async fetchComponents() {
    const getData: any = await fetchFunction("api/dashboard/totalcomponents");
    this.components = getData.payload;
  }
  get getComponents() {
    return this.components;
  }

  // Total views
  async fetchViews() {
    const getData: any = await fetchFunction("api/dashboard/views");
    this.payloadViews = getData;
  }
  get getViews() {
    return this.payloadViews;
  }

  // Total downloads
  async fetchDownloads() {
    const getData: any = await fetchFunction("api/dashboard/downloads");
    this.payloadDownloads = getData;
  }
  get getDownloads() {
    return this.payloadDownloads;
  }
}
