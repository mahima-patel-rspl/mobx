import { action, computed, makeObservable, observable } from "mobx";
import { Techstacks } from "../components/pages/InterfaceTypes";
import { IRootStore } from "./RootStore";
import { fetchFunction } from "../components/common/AxiosInstance";

export interface IAdminTagList {
  feature_tags: {
    id: number;
    name: string;
    createdAt: string;
    type: string;
    updatedAt: string;
  };

  frameworks: [
    {
      id: number;
      name: string;
      createdAt: string;
      type: string;
      updatedAt: string;
    }
  ];
  functionalTags: {
    id: number;
    name: string;
    createdAt: string;
    type: string;
    updatedAt: string;
  };
  tags: [
    {
      id: number;
      name: string;
      createdAt: string;
      type: string;
      updatedAt: string;
    }
  ];
}

export class ManageComponentStore {
  rootStore: IRootStore;

  techStacks: Techstacks[] = [];
  adminTagList: IAdminTagList | undefined;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      techStacks: observable,
      fetchTechstacks: action,
      getTechstacks: computed,
      adminTagList: observable,
      fetchAdminTagList: action,
      getAdminTagList: computed,
    });
  }

  //tech stack list
  async fetchTechstacks() {
    const getData: any = await fetchFunction("api/techstack/list");
    this.techStacks = getData.payload;
  }

  get getTechstacks() {
    return this.techStacks;
  }

  //admin tag list
  async fetchAdminTagList() {
    const getData: any = await fetchFunction("api/tag/list");
    this.adminTagList = getData.payload;
    console.log(this.adminTagList);
  }

  get getAdminTagList() {
    return this.adminTagList;
  }
}
