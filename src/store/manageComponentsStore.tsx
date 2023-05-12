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
  feature_tags: [
    {
      id: number;
      name: string;
      createdAt: string;
      type: string;
      updatedAt: string;
    }
  ];
  frameworks: [
    {
      id: number;
      name: string;
      createdAt: string;
      type: string;
      updatedAt: string;
    }
  ];
  functionalTags: [
    {
      id: number;
      name: string;
      createdAt: string;
      type: string;
      updatedAt: string;
    }
  ];
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

export interface IManageFilteredList {
  author: [
    {
      id: number;
      name: string;
    }
  ];
  version: [
    {
      id: number;
      name: string;
    }
  ];
}

export interface IAdminSyncTechstack {
  count: number;
  message: string;
  status: boolean;
}

export interface IAdminSyncComponents {
  count: number;
  message: string;
  status: boolean;
}

export interface IAdminSyncFiles {
  count: number;
  message: string;
  status: boolean;
}

export class ManageComponentStore {
  rootStore: IRootStore;

  techStacks: Techstacks[] = [];
  adminTagList: IAdminTagList | undefined;
  manageComponentList: ManageComponents[] = [];
  manageFilteredList: IManageFilteredList | undefined;
  adminSyncTechstack: IAdminSyncTechstack | undefined;
  adminSyncComponents: IAdminSyncComponents | undefined;
  adminSyncFiles: IAdminSyncFiles | undefined;

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
      manageFilteredList: observable,
      fetchManageFilteredData: action,
      getManageFilteredData: computed,
      adminSyncTechstack: observable,
      fetchAdminSyncTechstack: action,
      getAdminSyncTechstack: computed,
      adminSyncComponents: observable,
      fetchAdminSyncComponents: action,
      getAdminSyncComponents: computed,
      adminSyncFiles: observable,
      fetchAdminSyncFiles: action,
      getAdminSyncFiles: computed,
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

  //manage filtered data
  async fetchManageFilteredData() {
    const getData: any = await fetchFunction(`api/component/managefilterdata`);
    this.manageFilteredList = getData.payload;
  }

  get getManageFilteredData() {
    return this.manageFilteredList;
  }

  //admin sync techstack
  async fetchAdminSyncTechstack() {
    const getData: any = await fetchFunction(`api/gitlab/sync/techstacks`);
    this.adminSyncTechstack = getData;
  }

  get getAdminSyncTechstack() {
    return this.adminSyncTechstack;
  }

  //admin sync components
  async fetchAdminSyncComponents() {
    const getData: any = await fetchFunction(`api/gitlab/sync/components`);
    this.adminSyncComponents = getData;
  }

  get getAdminSyncComponents() {
    return this.adminSyncComponents;
  }

  //admin sync files
  async fetchAdminSyncFiles() {
    const getData: any = await fetchFunction(`api/gitlab/sync/files`);
    this.adminSyncFiles = getData;
  }

  get getAdminSyncFiles() {
    return this.adminSyncFiles;
  }
}
