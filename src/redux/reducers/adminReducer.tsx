import {
  ADMIN_VIEW_REQUEST,
  ADMIN_VIEW_SUCCESS,
  ADMIN_FEATURE_REQUEST,
  ADMIN_FEATURE_SUCCESS,
  ADMIN_PERMISSION_SUCCESS,
  ADMIN_PERMISSION_REQUEST,
  ADMIN_ROLEPOST_REQUEST,
  ADMIN_ROLEPOST_SUCCESS,
  ADMIN_ROLEUPDATE_SUCCESS,
  ADMIN_ROLEUPDATE_REQUEST,
  ADMIN_MANAGEUSER_POSTREQUEST,
  ADMIN_MANAGEUSER_POSTSUCCESS,
  ADMIN_MANAGEUSER_GETREQUEST,
  ADMIN_MANAGEUSER_GETSUCCESS,
  MANAGE_COMPONENTS_REQUEST,
  MANAGE_COMPONENTS_SUCCESS,
  ADMIN_MANAGEUSER_DELETESUCCESS,
  ADMIN_MANAGEUSER_DELETEREQUEST,
  ADMIN_ROLEDELETE_REQUEST,
  ADMIN_ROLEDELETE_SUCCESS,
  ADMIN_ROLEGET_REQUEST,
  ADMIN_ROLEGET_SUCCESS,
  ADMIN_MANAGEUSER_SINGLEUSERREQUEST,
  ADMIN_MANAGEUSER_SINGLEUSERSUCCESS,
  ADMIN_MANAGECOMPONENTS_POSTREQUEST,
  ADMIN_MANAGECOMPONENTS_POSTSUCCESS,
  ADMIN_MANAGECOMPONENTS_GETVIEWREQUEST,
  ADMIN_MANAGECOMPONENTS_GETVIEWSUCCESS,
  ADMIN_TAGLIST_REQUEST,
  ADMIN_TAGLIST_SUCCESS,
  ADMIN_GET_FIELDS_DATA_REQUEST,
  ADMIN_GET_FIELDS_DATA_SUCCESS,
  ADMIN_MANAGEUSER_UPDATEREQUEST,
  ADMIN_MANAGEUSER_UPDATESUCCESS,
  ADMIN_TECHSTACKS_REQUEST,
  ADMIN_TECHSTACKS_SUCCESS,
  ADMIN_COMPONENTS_REQUEST,
  ADMIN_COMPONENTS_SUCCESS,
  ADMIN_FILES_REQUEST,
  ADMIN_FILES_SUCCESS,
  ADMIN_COMPONENTSTATUS_POST_REQUEST,
  ADMIN_COMPONENTSTATUS_POST_SUCCESS,
  ADMIN_MANAGECOMPONENTS_POSTEDIT_SUCCESS,
  ADMIN_MANAGECOMPONENTS_POSTEDIT_REQUEST,
  TREDENSOFCOMPONENT_GET_REQUEST,
  ADMIN_TECHSTACKSAPPROVALREPORT_GET_REQUEST,
  ADMIN_TECHSTACKSAPPROVALREPORT_GET_SUCCESS,
  TREDENSOFCOMPONENT_GET_SUCCESS,
  ADMIN_TECHSTACKS_GET_REQUEST,
  ADMIN_TECHSTACKS_GET_SUCCESS
} from '../../constants/adminConstant';

// adminViewRole in Admin section
export const adminViewRole = (state = { adminViewRole: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_VIEW_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminViewRole: action.payload
      };

    default:
      return state;
  }
};

// adminfeatures in Admin section
export const adminFeatures = (state = { adminFeatures: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_FEATURE_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_FEATURE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminFeatures: action.payload
      };

    default:
      return state;
  }
};
// ADMIN_ROLE_PERMISSION in Admin section
export const adminRolePermission = (state = { adminRolePermission: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_PERMISSION_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminRolePermission: action.payload
      };

    default:
      return state;
  }
};

// ADMIN_MANAGE_ROLE_POST in Admin section
export const adminRolePost = (state = { adminRolePost: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_ROLEPOST_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_ROLEPOST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminRolePost: action.payload
      };

    default:
      return state;
  }
};

// ADMIN_MANAGE_ROLE_GET in Admin section
export const adminRoleGetData = (state = { adminRoleGetData: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_ROLEGET_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_ROLEGET_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminRoleGetData: action.payload
      };

    default:
      return state;
  }
};

// ADMIN_MANAGE_ROLE_DELETE in Admin section
export const adminRoleDelete = (state = { adminRoleDelete: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_ROLEDELETE_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_ROLEDELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminRoleDelete: action.payload
      };

    default:
      return state;
  }
};

// ADMIN_MANAGE_ROLE_DELETE in Admin section
export const adminRoleUpdate = (state = { adminRoleUpdate: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_ROLEUPDATE_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_ROLEUPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminRoleDelete: action.payload
      };

    default:
      return state;
  }
};

// adminManageUser get in Admin section
export const adminManageUserGet = (state = { adminManageUserGetData: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_MANAGEUSER_GETREQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_MANAGEUSER_GETSUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminManageUserGetData: action.payload
      };

    default:
      return state;
  }
};

// adminManageUser Post in Admin section
export const adminManageUserPost = (state = { adminManageUserPost: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_MANAGEUSER_POSTREQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_MANAGEUSER_POSTSUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminManageUserPost: action.payload
      };

    default:
      return state;
  }
};

// adminManageUser get one user in Admin section
export const adminManageUserGetOne = (state = { adminManageUserOneData: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_MANAGEUSER_SINGLEUSERREQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_MANAGEUSER_SINGLEUSERSUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminManageUserOneData: action.payload
      };

    default:
      return state;
  }
};

// adminManageUser Delete in Admin section
export const adminManageUserDelete = (state = { adminManageUserDelete: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_MANAGEUSER_DELETEREQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_MANAGEUSER_DELETESUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminManageUserDelete: action.payload
      };

    default:
      return state;
  }
};

// manage components in admin section
export const manageComponents = (state = { manageComponents: [] }, action: any) => {
  switch (action.type) {
    case MANAGE_COMPONENTS_REQUEST:
      return {
        loading: true,
        status: true
      };
    case MANAGE_COMPONENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        manageComponents: action.payload
      };

    default:
      return state;
  }
};

// AdminManageComponents POST in admin section
export const adminManageComponentsPost = (
  state = { adminManageComponentsPost: [] },
  action: any
) => {
  switch (action.type) {
    case ADMIN_MANAGECOMPONENTS_POSTREQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_MANAGECOMPONENTS_POSTSUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminManageComponentsPost: action.payload
      };
    default:
      return state;
  }
};

// AdminManageComponents GET in admin section
export const adminManageComponentsGetview = (state = { manageComponents: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_MANAGECOMPONENTS_GETVIEWREQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_MANAGECOMPONENTS_GETVIEWSUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminManageComponentsGetview: action.payload,
        adminManageCompImage: action.payload?.payload?.image_url
      };

    default:
      return state;
  }
};

// AdminManageComponents POST TO SAVE EDITABLE DATA in admin section
export const adminManageComponentsEditPost = (
  state = { adminManageComponentsEditPost: [] },
  action: any
) => {
  switch (action.type) {
    case ADMIN_MANAGECOMPONENTS_POSTREQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_MANAGECOMPONENTS_POSTSUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminManageComponentsEditPost: action.payload
      };
    default:
      return state;
  }
};

// AdminTagList GET in admin section
export const adminTagList = (state = { adminTagList: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_TAGLIST_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_TAGLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminTagList: action.payload
      };
    default:
      return state;
  }
};

// filter field data GET in admin section
export const adminFilterFieldsData = (state = { adminFilterFieldsData: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_GET_FIELDS_DATA_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_GET_FIELDS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminFilterFieldsData: action.payload
      };
    default:
      return state;
  }
};

// filter field data GET in admin section
export const adminFilteredCompData = (state = { adminManageComponentsPost: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_GET_FIELDS_DATA_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_GET_FIELDS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminManageComponentsPost: action.payload
      };
    default:
      return state;
  }
};

// adminManageUser Delete in Admin section
export const adminManageUserUpdate = (state = { adminManageUserUpdateData: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_MANAGEUSER_UPDATEREQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_MANAGEUSER_UPDATESUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminManageUserUpdateData: action.payload
      };

    default:
      return state;
  }
};

// adminSyncTechstack for sync data from git
export const adminSyncTechstack = (state = { adminSyncTechstackData: {} }, action: any) => {
  switch (action.type) {
    case ADMIN_TECHSTACKS_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_TECHSTACKS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminSyncTechstackData: action.payload
      };

    default:
      return state;
  }
};

// adminSyncComponents for sync data from git
export const adminSyncComponents = (state = { adminSyncComponentsData: {} }, action: any) => {
  switch (action.type) {
    case ADMIN_COMPONENTS_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_COMPONENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminSyncComponentsData: action.payload
      };

    default:
      return state;
  }
};

// adminSyncFiles for sync data from git
export const adminSyncFiles = (state = { adminSyncFilesData: {} }, action: any) => {
  switch (action.type) {
    case ADMIN_FILES_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminSyncFilesData: action.payload
      };

    default:
      return state;
  }
};

// adminSyncComponents for sync data from git
export const componentStatusData = (state = { componentStatusData: {} }, action: any) => {
  switch (action.type) {
    case ADMIN_COMPONENTSTATUS_POST_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_COMPONENTSTATUS_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        componentStatusData: action.payload
      };

    default:
      return state;
  }
};

// adminSyncComponents for sync data from git
export const adminManageCompsaveData = (state = { adminManageCompsaveData: {} }, action: any) => {
  switch (action.type) {
    case ADMIN_MANAGECOMPONENTS_POSTEDIT_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_MANAGECOMPONENTS_POSTEDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        adminManageCompsaveData: action.payload
      };

    default:
      return state;
  }
};

// phase-2
// techStackGetReport for report
export const techStackGetReport = (state = { techStackGetReportData: [] }, action: any) => {
  switch (action.type) {
    case ADMIN_TECHSTACKS_GET_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_TECHSTACKS_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        techStackGetReportData: action.payload
      };

    default:
      return state;
  }
};

// techStackGetApprovalReport for admin Report
export const techStackGetApprovalReport = (
  state = { techStackGetReportApprovalData: [] },
  action: any
) => {
  switch (action.type) {
    case ADMIN_TECHSTACKSAPPROVALREPORT_GET_REQUEST:
      return {
        loading: true,
        status: true
      };
    case ADMIN_TECHSTACKSAPPROVALREPORT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        techStackGetReportApprovalData: action.payload
      };

    default:
      return state;
  }
};

// techStackGetApprovalReport for admin Report
export const trendComponent = (state = { trendComponentData: [] }, action: any) => {
  switch (action.type) {
    case TREDENSOFCOMPONENT_GET_REQUEST:
      return {
        loading: true,
        status: true
      };
    case TREDENSOFCOMPONENT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        trendComponentData: action.payload
      };

    default:
      return state;
  }
};
