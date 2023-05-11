import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import { fetchFunction } from "../components/common/AxiosInstance";

export interface IDashTopCategories {
  avatar_url: string | null;
  categoryId: number;
  categoryName: string;
  id: number;
  name: string;
  total_components: number;
  total_views: string;
  web_url: string;
}

export class DashTopCategoriesStore {
  categories: IDashTopCategories[] = [];
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
    console.log("getData----->", getData.payload);
    console.log("this.categories----->", this.categories);
  }

  get getCategories() {
    return this.categories;
  }
}
