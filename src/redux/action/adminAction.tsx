import {
  ADMIN_VIEW_REQUEST,
  ADMIN_VIEW_SUCCESS,
  ADMIN_FEATURE_REQUEST,
  ADMIN_FEATURE_SUCCESS,
  ADMIN_PERMISSION_REQUEST,
  ADMIN_PERMISSION_SUCCESS,
  ADMIN_ROLEPOST_REQUEST,
  ADMIN_ROLEPOST_SUCCESS,
  ADMIN_ROLEUPDATE_REQUEST,
  ADMIN_ROLEUPDATE_SUCCESS,
  ADMIN_MANAGEUSER_POSTREQUEST,
  ADMIN_MANAGEUSER_POSTSUCCESS,
  ADMIN_MANAGEUSER_GETREQUEST,
  ADMIN_MANAGEUSER_GETSUCCESS,
  MANAGE_COMPONENTS_SUCCESS,
  MANAGE_COMPONENTS_REQUEST,
  ADMIN_MANAGEUSER_DELETEREQUEST,
  ADMIN_MANAGEUSER_DELETESUCCESS,
  ADMIN_ROLEDELETE_REQUEST,
  ADMIN_ROLEDELETE_SUCCESS,
  ADMIN_ROLEGET_REQUEST,
  ADMIN_ROLEGET_SUCCESS,
  ADMIN_MANAGEUSER_SINGLEUSERREQUEST,
  ADMIN_MANAGEUSER_SINGLEUSERSUCCESS,
  ADMIN_MANAGECOMPONENTS_POSTREQUEST,
  ADMIN_MANAGECOMPONENTS_POSTSUCCESS,
  ADMIN_TAGLIST_REQUEST,
  ADMIN_TAGLIST_SUCCESS,
  ADMIN_MANAGECOMPONENTS_POSTEDIT_REQUEST,
  ADMIN_MANAGECOMPONENTS_POSTEDIT_SUCCESS,
  ADMIN_MANAGECOMPONENTS_GETVIEWREQUEST,
  ADMIN_MANAGECOMPONENTS_GETVIEWSUCCESS,
  ADMIN_GET_FIELDS_DATA_REQUEST,
  ADMIN_GET_FIELDS_DATA_SUCCESS,
  ADMIN_MANAGEUSER_UPDATEREQUEST,
  ADMIN_MANAGEUSER_UPDATESUCCESS,
  ADMIN_COMPONENTSTATUS_POST_REQUEST,
  ADMIN_COMPONENTSTATUS_POST_SUCCESS,
  ADMIN_TECHSTACKS_REQUEST,
  ADMIN_TECHSTACKS_SUCCESS,
  ADMIN_COMPONENTS_REQUEST,
  ADMIN_COMPONENTS_SUCCESS,
  ADMIN_FILES_REQUEST,
  ADMIN_FILES_SUCCESS,
  TREDENSOFCOMPONENT_GET_REQUEST,
  TREDENSOFCOMPONENT_GET_SUCCESS,
  ADMIN_TECHSTACKSAPPROVALREPORT_GET_REQUEST,
  ADMIN_TECHSTACKS_GET_SUCCESS,
  ADMIN_TECHSTACKSAPPROVALREPORT_GET_SUCCESS,
  ADMIN_TECHSTACKS_GET_REQUEST,
} from "../../constants/adminConstant";
import {
  fetchFunction,
  postFunction,
  patchFunction,
  deleteFunction,
  postFunctionFormData,
} from "../../components/common/AxiosInstance";

// adminViewRole Added In Admin
export const adminViewRoleFun = () => async (dispatch: any) => {
  try {
    dispatch({ type: ADMIN_VIEW_REQUEST });
    const getData: any = await fetchFunction(`api/role/all`);

    dispatch({ type: ADMIN_VIEW_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// adminFeatures in Admin section
export const adminFeaturesFun = () => async (dispatch: any) => {
  try {
    dispatch({ type: ADMIN_FEATURE_REQUEST });
    const getData: any = await fetchFunction(`api/feature`);
    dispatch({ type: ADMIN_FEATURE_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// adminRolePermission  Get data in Admin section
export const adminRolePermissionFun = () => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADMIN_PERMISSION_REQUEST });
      const getData: any = await fetchFunction(`api/permission`);
      dispatch({ type: ADMIN_PERMISSION_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// adminRolePost Post  in Admin section
export const adminRolePost = (dataObj: any) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADMIN_ROLEPOST_REQUEST });
      const getData = await postFunction(`api/role`, dataObj);
      dispatch({ type: ADMIN_ROLEPOST_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// adminRole Update  in Admin section
export const adminRoleUpdate =
  (id: any, roleData: any) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: ADMIN_ROLEUPDATE_REQUEST });
        const getData = await patchFunction(`api/role/${id}`, roleData);
        dispatch({ type: ADMIN_ROLEUPDATE_SUCCESS, payload: getData });
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  };

// adminRole Delete  in Admin section
export const adminRoleDelete = (id: any) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADMIN_ROLEDELETE_REQUEST });

      const getData = await deleteFunction(`api/role/${id}`);
      dispatch({ type: ADMIN_ROLEDELETE_SUCCESS, payload: getData });

      return resolve(getData);
    } catch (error) {
      console.error(error);

      return resolve([]);
    }
  });
};

// adminRole Get  in Admin section
export const adminRoleGet = (id: any) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADMIN_ROLEGET_REQUEST });
      const getData: any = await fetchFunction(`api/role/${id}`);
      dispatch({ type: ADMIN_ROLEGET_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// adminManageUser All Get in Admin section
export const adminManageUserGet = () => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADMIN_MANAGEUSER_GETREQUEST });
      const getData: any = await fetchFunction(`api/user/all`);
      dispatch({ type: ADMIN_MANAGEUSER_GETSUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// adminManageUser Post in Admin section
export const adminManageUserPost = (dataObj: any) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADMIN_MANAGEUSER_POSTREQUEST });
      const getData = await postFunction(`api/user`, dataObj);
      dispatch({ type: ADMIN_MANAGEUSER_POSTSUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// adminManageUser getOne user detail in admin section
export const adminManageUserGetOne = (id: any) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADMIN_MANAGEUSER_SINGLEUSERREQUEST });
      const getData: any = await fetchFunction(`api/user/${id}`);

      dispatch({ type: ADMIN_MANAGEUSER_SINGLEUSERSUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// adminManageUser Delete in Admin section
export const adminManageUserDelete = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ADMIN_MANAGEUSER_DELETEREQUEST });

    const getData = await deleteFunction(`api/user/${id}`);
    dispatch({ type: ADMIN_MANAGEUSER_DELETESUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

//manage components
export const manageComps = (dataObj: Object) => async (dispatch: any) => {
  try {
    dispatch({ type: MANAGE_COMPONENTS_REQUEST });
    const getData = await postFunction(
      `api/component/managecomponent`,
      dataObj
    );
    dispatch({ type: MANAGE_COMPONENTS_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

//adminManageComponents Post in Admin section
export const adminManageComponentsPostRequest =
  (dataObj: Object) => async (dispatch: any) => {
    try {
      dispatch({ type: ADMIN_MANAGECOMPONENTS_POSTREQUEST });

      const getData = await postFunction(
        `api/component/managecomponent`,
        dataObj
      );
      dispatch({ type: ADMIN_MANAGECOMPONENTS_POSTSUCCESS, payload: getData });
    } catch (error) {
      console.error(error);
    }
  };

// adminTaglist GET - Admin
export const adminTagListGet = () => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADMIN_TAGLIST_REQUEST });
      const getData: any = await fetchFunction(`api/tag/list`);
      dispatch({ type: ADMIN_TAGLIST_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// admin filter field data GET - Admin
export const adminfilterfieldsData = () => async (dispatch: any) => {
  try {
    dispatch({ type: ADMIN_GET_FIELDS_DATA_REQUEST });
    const getData: any = await fetchFunction(`api/component/managefilterdata`);
    dispatch({ type: ADMIN_GET_FIELDS_DATA_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// adminManageComponent Post to save edit data in Admin section
export const adminManageCompsaveDataPost =
  (compId: any, dataObj: any) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: ADMIN_MANAGECOMPONENTS_POSTEDIT_REQUEST });
        const getData = await postFunctionFormData(
          `api/component/edit?id=${compId}`,
          dataObj
        );
        dispatch({
          type: ADMIN_MANAGECOMPONENTS_POSTEDIT_SUCCESS,
          payload: getData,
        });
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  };

//adminManageComponents Get in Admin section
export const adminManageComponentsGetViewRequest =
  (compId: any) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: ADMIN_MANAGECOMPONENTS_GETVIEWREQUEST });
        const getData: any = await fetchFunction(
          `api/component/view?id=${compId}`
        );
        dispatch({
          type: ADMIN_MANAGECOMPONENTS_GETVIEWSUCCESS,
          payload: getData,
        });
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  };

// adminManageUser Update in Admin section
export const adminManageUserUpdate =
  (id: any, userData: any) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: ADMIN_MANAGEUSER_UPDATEREQUEST });
        const getData = await patchFunction(`api/user/${id}`, userData);
        dispatch({ type: ADMIN_MANAGEUSER_UPDATESUCCESS, payload: getData });
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  };

// adminSyncTechstack for sync data from git
export const adminSyncTechstack = () => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADMIN_TECHSTACKS_REQUEST });
      const getData: any = await fetchFunction(`api/gitlab/sync/techstacks`);
      dispatch({ type: ADMIN_TECHSTACKS_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// adminSyncComponents for sync data from git
export const adminSyncComponents = () => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADMIN_COMPONENTS_REQUEST });
      const getData: any = await fetchFunction(`api/gitlab/sync/components`);
      dispatch({ type: ADMIN_COMPONENTS_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// adminSyncFiles for sync data from git
export const adminSyncFiles = () => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADMIN_FILES_REQUEST });

      const getData: any = await fetchFunction(`api/gitlab/sync/files`);
      dispatch({ type: ADMIN_FILES_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// update status of component Admin section
export const componentStatus =
  (Obj: any, formdata: any) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: ADMIN_COMPONENTSTATUS_POST_REQUEST });
        const getData = await postFunction(
          `api/component/publish?id=${Obj.id}&publish=${Obj.publishFlag}`,
          formdata
        );

        dispatch({
          type: ADMIN_COMPONENTSTATUS_POST_SUCCESS,
          payload: getData,
        });
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  };
// phase2
// techStackGetReport  Get data in Admin section
export const techStackGetReport = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ADMIN_TECHSTACKS_GET_REQUEST });
    const getData: any = await fetchFunction(
      `api/techstack/component/report?techstackid=${id}`
    );
    dispatch({ type: ADMIN_TECHSTACKS_GET_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// techStackGetReport  Get data in Admin section
export const techStackGetApprovalReport = () => async (dispatch: any) => {
  try {
    dispatch({ type: ADMIN_TECHSTACKSAPPROVALREPORT_GET_REQUEST });
    const getData: any = await fetchFunction(
      `api/techstack/component/approval/report`
    );
    dispatch({
      type: ADMIN_TECHSTACKSAPPROVALREPORT_GET_SUCCESS,
      payload: getData,
    });
  } catch (error) {
    console.error(error);
  }
};

// trendComponent  Get data in Admin section
export const trendComponent =
  (id: any, duration: any) => async (dispatch: any) => {
    try {
      dispatch({ type: TREDENSOFCOMPONENT_GET_REQUEST });
      const getData: any = await fetchFunction(
        `api/techstack/component/trend/report?techstackid=${id}&duration=${duration}`
      );
      dispatch({
        type: TREDENSOFCOMPONENT_GET_SUCCESS,
        payload: getData,
      });
    } catch (error) {
      console.error(error);
    }
  };
