import { action, computed, makeObservable, observable } from "mobx";
import {
  ManageComponents,
  Techstacks,
} from "../components/pages/InterfaceTypes";
import { IRootStore } from "./RootStore";
import {
  fetchFunction,
  postFunction,
} from "../components/common/AxiosInstance";

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
  manageComponentList: ManageComponents[] = [];

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      techStacks: observable,
      fetchTechstacks: action,
      getTechstacks: computed,
      adminTagList: observable,
      fetchAdminTagList: action,
      getAdminTagList: computed,
      manageComponentList: observable,
      fetchManageComponents: action,
      getManageComponents: computed,
    });

    this.rootStore = rootStore;
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
  }

  get getAdminTagList() {
    return this.adminTagList;
  }

  //manage component post
  async fetchManageComponents(dataObj: any) {
    const getData: any = await postFunction(
      `api/component/managecomponent`,
      dataObj
    );
    this.manageComponentList = getData.payload;
  }

  get getManageComponents() {
    return this.manageComponentList;
  }
}
