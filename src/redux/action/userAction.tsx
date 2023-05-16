import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  NEW_TOKEN_REQUEST,
  NEW_TOKEN_SUCCESS,
  TOP_CATEOGRIES_REQUEST,
  TOP_CATEOGRIES_SUCCESS,
  RECENTLYDATA_REQUEST,
  RECENTLYDATA_SUCCESS,
  TRENDINGDATA_REQUEST,
  TRENDINGDATA_SUCCESS,
  FETCHUSER_POSTREQUEST,
  FETCHUSER_POSTSUCCESS,
  USER_SEARCH_DATA_GET_REQUEST,
  USER_SEARCH_DATA_GET_SUCCESS,
  SEARCH_FILTER_POST_REQUEST,
  SEARCH_FILTER_POST_SUCCESS,
  VIEW_COMPONENT_GET_REQUEST,
  VIEW_COMPONENT_GET_SUCCESS,
  TOTALVIEWS_REQUEST,
  TOTALVIEWS_SUCCESS,
  TOTALDOWNLOADS_REQUEST,
  TOTALDOWNLOADS_SUCCESS,
  TOTALCOMPONENTS_REQUEST,
  TOTALCOMPONENTS_SUCCESS,
  FETCHUSER_PROFILESUCCESS,
  FETCHUSER_PROFILEREQUEST,
  TECHSTACK_LIST_SUCCESS,
  TECHSTACK_LIST_REQUEST,
  DOWNLOADS_REQUEST,
  DOWNLOADS_SUCCESS,
  FETCH_USER_FAVOURITES_REQUEST,
  FETCH_USER_FAVOURITES_SUCCESS,
  FETCH_FAVOURITES_SEARCH_REQUEST,
  FETCH_FAVOURITES_SEARCH_SUCCESS,
  ADD_REMOVE_FAVORITES_REQUEST,
  ADD_REMOVE_FAVORITES_SUCCESS,
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_USER_CONTRIBUTION_REQUEST,
  FETCH_USER_CONTRIBUTION_SUCCESS,
  FETCH_PENDINGITEMS_REQUEST,
  FETCH_PENDINGITEMS_SUCCESS,
  DISCOVERMYINTERESTS_REQUEST,
  DISCOVERMYINTERESTS_SUCCESS,
  MYINTERESTSADD_SUCCESS,
  MYINTERESTSADD_REQUEST,
  CHANGELOGS_DATA_REQUEST,
  CHANGELOGS_DATA_SUCCESS,
  VIEW_DEPENDENCIES_REQUEST,
  VIEW_DEPENDENCIES_SUCCESS,
  MOSTVIEWED_REQUEST,
  MOSTVIEWED_SUCCESS,
  RAISE_ISSUE_SUBMIT_REQUEST,
  RAISE_ISSUE_SUBMIT_SUCCESS,
  ALL_ISSUES_REQUEST,
  ALL_ISSUES_SUCCESS,
  REPORTED_ISSUES_REQUEST,
  REPORTED_ISSUES_SUCCESS,
  ASSIGNED_ISSUES_REQUEST,
  ASSIGNED_ISSUES_SUCCESS,
  COMPONENTREVIEW_REQUEST,
  COMPONENTREVIEW_SUCCESS,
  ADDREVIEW_REQUEST,
  ADDREVIEW_SUCCESS,
  ADDREPLY_REQUEST,
  ADDREPLY_SUCCESS,
  EDITREPLY_REQUEST,
  EDITREPLY_SUCCESS,
  DElETEREPLY_REQUEST,
  DElETEREPLY_SUCCESS,
  CATEGORYLIST_REQUEST,
  CATEGORYLIST_SUCCESS,
  SUBCATEGORYLIST_REQUEST,
  SUBCATEGORYLIST_SUCCESS,
  VIEW_ISSUE_REQUEST,
  VIEW_ISSUE_SUCCESS,
  EDIT_REPORTED_ISSUE_REQUEST,
  REVIEWERS_REQUEST,
  REVIEWERS_SUCCESS,
  CANCEL_ISSUE_REQUEST,
  CANCEL_ISSUE_SUCCESS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
} from "../../constants/userConstant";
import SecureLS from "secure-ls";
import {
  deleteFunction,
  fetchFunction,
  patchFunction,
  postFunction,
} from "../../components/common/AxiosInstance";
import { Permissions } from "../../constants/PermissionConstant";

// Login
export const login =
  (username: String, password: String) => async (dispatch: any) => {
    const ls = new SecureLS();
    try {
      dispatch({ type: LOGIN_REQUEST });
      const dataObj: any = { username, password };

      const data = await postFunction(`api/login`, dataObj);

      dispatch({ type: LOGIN_SUCCESS, payload: data });
      if (data?.status) {
        ls?.set("token", { data: data?.payload?.token });
        ls?.set("refreshtoken", { data: data?.payload?.refreshtoken });

        // set user permissions
        let userPermission: any = [];
        data?.payload?.permissions.map((per: any) => {
          userPermission.push(parseInt(per?.id));
        });
        ls?.set("userPermissions", { data: userPermission });

        if (data?.payload?.role === Permissions.Admin) {
          ls?.set("role", { data: data?.payload?.role });
        }
        ls?.set("isNewUser", { data: data?.payload?.isNewUser });
      }
    } catch (error) {
      console.error(error);
    }
  };

// fetchUser post data

export const fetchUserPost = (email: any) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: FETCHUSER_POSTREQUEST });

      const getData = await postFunction(`api/fetchuser`, email);
      dispatch({ type: FETCHUSER_POSTSUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// refresh token
export const refreshToken = (token: any) => async (dispatch: any) => {
  const ls = new SecureLS();
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: NEW_TOKEN_REQUEST });

      const getData = await postFunction(`api/refreshtoken`, token);

      dispatch({ type: NEW_TOKEN_SUCCESS, payload: getData });
      ls?.set("token", { data: getData?.payload?.refreshtoken });

      return Promise.resolve();
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// TOP_CATEOGRIES DATA
export const topcategories = (limit: any) => async (dispatch: any) => {
  try {
    dispatch({ type: TOP_CATEOGRIES_REQUEST });

    const getData: any = await fetchFunction(
      `api/techstack/top?limit=${limit}`
    );

    dispatch({ type: TOP_CATEOGRIES_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// Recently Added In Home Page
export const RecentlyAdded = () => async (dispatch: any) => {
  try {
    dispatch({ type: RECENTLYDATA_REQUEST });
    const getData: any = await fetchFunction("api/component/recent");

    dispatch({ type: RECENTLYDATA_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};
// trending component In Home Page
export const TrendingData = () => async (dispatch: any) => {
  try {
    dispatch({ type: TRENDINGDATA_REQUEST });

    const getData: any = await fetchFunction("api/component/trending");

    dispatch({ type: TRENDINGDATA_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// search data from reuseable compo. page search bar in USER
export const userSearchGetData = (searchWord: any) => async (dispatch: any) => {
  try {
    dispatch({ type: USER_SEARCH_DATA_GET_REQUEST });
    const getData: any = await fetchFunction(
      `api/component/search?search=${searchWord}`
    );
    dispatch({ type: USER_SEARCH_DATA_GET_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// search filter Post  in user section
export const searchFilterPost = (dataObj: any) => async (dispatch: any) => {
  try {
    dispatch({ type: SEARCH_FILTER_POST_REQUEST });
    const getData = await postFunction(`api/component/filter`, dataObj);
    dispatch({ type: SEARCH_FILTER_POST_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// view component get data api for user
// search data from reuseable compo. page searchbar in USER
export const userViewComponent = (id: any) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: VIEW_COMPONENT_GET_REQUEST });
      const getData: any = await fetchFunction(`api/component/view?id=${id}`);
      dispatch({ type: VIEW_COMPONENT_GET_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// total views
export const totalViewsFun = () => async (dispatch: any) => {
  try {
    dispatch({ type: TOTALVIEWS_REQUEST });

    const getData: any = await fetchFunction("api/dashboard/views");

    dispatch({ type: TOTALVIEWS_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// total downloads
export const totalDownload = () => async (dispatch: any) => {
  try {
    dispatch({ type: TOTALDOWNLOADS_REQUEST });
    const getData: any = await fetchFunction("api/dashboard/downloads");
    dispatch({ type: TOTALDOWNLOADS_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// total components
export const totalComponents = () => async (dispatch: any) => {
  try {
    dispatch({ type: TOTALCOMPONENTS_REQUEST });

    const getData: any = await fetchFunction("api/dashboard/totalcomponents");

    dispatch({ type: TOTALCOMPONENTS_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// get mostViewed Data
export const mostViewed = (duration: any) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: MOSTVIEWED_REQUEST });
      const getData: any = await fetchFunction(
        `api/dashboard/mostviewed?duration=${duration}`
      );

      dispatch({ type: MOSTVIEWED_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// fetchUser post data
export const fetchUserProfile = (email: any) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: FETCHUSER_PROFILEREQUEST });
      const getData = await postFunction(`api/fetchuser`, email);
      dispatch({ type: FETCHUSER_PROFILESUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// Techstack List for all users and admin GET
export const techStackList = () => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: TECHSTACK_LIST_REQUEST });

      const getData: any = await fetchFunction("api/techstack/list");

      dispatch({ type: TECHSTACK_LIST_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

//  downloadCount
export const downloadCount = (dataObj: any) => async (dispatch: any) => {
  try {
    dispatch({ type: DOWNLOADS_REQUEST });

    const getData = await patchFunction(`api/component/download`, dataObj);
    dispatch({ type: DOWNLOADS_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// user favourites list GET Api
export const favouritesList = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_USER_FAVOURITES_REQUEST });

    const getData: any = await fetchFunction("api/myfavourites/getList");

    dispatch({ type: FETCH_USER_FAVOURITES_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// user favourites search result list GET Api
export const favouriteSearchList =
  (searchWord: any) => async (dispatch: any) => {
    try {
      dispatch({ type: FETCH_FAVOURITES_SEARCH_REQUEST });

      const getData: any = await fetchFunction(
        `api/myfavourites/search?search=${searchWord}`
      );

      dispatch({ type: FETCH_FAVOURITES_SEARCH_SUCCESS, payload: getData });
    } catch (error) {
      console.error(error);
    }
  };

// add / remove favorites POST call
export const addRemoveFevorites =
  (compId: any, favFlag: any) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: ADD_REMOVE_FAVORITES_REQUEST });
        const getData = await postFunction(`api/myfavourites`, {
          isFavorite: favFlag,
          componentId: compId,
        });
        dispatch({ type: ADD_REMOVE_FAVORITES_SUCCESS, payload: getData });
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  };

// user leaderboard GET Api
export const leaderboards = (duration: any) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: FETCH_LEADERBOARD_REQUEST });
      const getData: any = await fetchFunction(
        `api/dashboard/leaderboards?duration=${duration}`
      );
      dispatch({ type: FETCH_LEADERBOARD_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// user my contribution GET Api
export const myContribution = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_USER_CONTRIBUTION_REQUEST });

    const getData: any = await fetchFunction(`api/dashboard/mycontributions`);

    dispatch({ type: FETCH_USER_CONTRIBUTION_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// user pending Items GET Api
export const pendingItems = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_PENDINGITEMS_REQUEST });

    const getData: any = await fetchFunction(`api/dashboard/pendingitems`);

    dispatch({ type: FETCH_PENDINGITEMS_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// Discover Your Interest result list GET Api
export const discoverMyInterests = () => async (dispatch: any) => {
  try {
    dispatch({ type: DISCOVERMYINTERESTS_REQUEST });

    const getData: any = await fetchFunction(`api/myInterests/get`);

    dispatch({ type: DISCOVERMYINTERESTS_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// MyInterestsAdd Post Api
export const MyInterestsAdd = (techStackId: any) => async (dispatch: any) => {
  try {
    dispatch({ type: MYINTERESTSADD_REQUEST });

    const getData = await postFunction(`api/myInterests/add`, techStackId);

    dispatch({ type: MYINTERESTSADD_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// changelogs data in view component GET Api
export const changelogsData = (compId: any) => async (dispatch: any) => {
  try {
    dispatch({ type: CHANGELOGS_DATA_REQUEST });

    const getData = await fetchFunction(
      `api/component/changelogs?id=${compId}`
    );

    dispatch({ type: CHANGELOGS_DATA_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// view dependencies in view component GET Api
export const viewDependencies = (compId: any) => async (dispatch: any) => {
  try {
    dispatch({ type: VIEW_DEPENDENCIES_REQUEST });
    const getData = await fetchFunction(
      `api/component/view/dependencies?id=${compId}`
    );
    dispatch({ type: VIEW_DEPENDENCIES_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// Raise an issue submit Post Api
export const raiseIssueSubmit =
  (id: any, formData: any) => async (dispatch: any) => {
    try {
      dispatch({ type: RAISE_ISSUE_SUBMIT_REQUEST });
      const getData = await postFunction(`api/issue/${id}`, formData);
      dispatch({ type: RAISE_ISSUE_SUBMIT_SUCCESS, payload: getData });
    } catch (error) {
      console.error(error);
    }
  };

// edit Reported issue patch Api
export const editReportedIssue =
  (id: any, formData: any) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: EDIT_REPORTED_ISSUE_REQUEST });
        const getData = await patchFunction(`api/issue/${id}`, formData);
        dispatch({ type: EDIT_REPORTED_ISSUE_REQUEST, payload: getData });
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  };

// all issues List GET Api
export const allIssuesList = () => async (dispatch: any) => {
  try {
    dispatch({ type: ALL_ISSUES_REQUEST });
    const getData = await fetchFunction(`api/issues`);
    dispatch({ type: ALL_ISSUES_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// reported issues List GET Api
export const reportedIssuesList = () => async (dispatch: any) => {
  try {
    dispatch({ type: REPORTED_ISSUES_REQUEST });
    const getData = await fetchFunction(`api/issues/reported`);
    dispatch({ type: REPORTED_ISSUES_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// assigned issues List GET Api
export const assignedIssuesList = () => async (dispatch: any) => {
  try {
    dispatch({ type: ASSIGNED_ISSUES_REQUEST });
    const getData = await fetchFunction(`api/issues/assigned`);
    dispatch({ type: ASSIGNED_ISSUES_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// VIew Particular GET Api
export const viewIssue = (compId: any) => async (dispatch: any) => {
  try {
    dispatch({ type: VIEW_ISSUE_REQUEST });
    const getData = await fetchFunction(`api/issue/${compId}`);
    dispatch({ type: VIEW_ISSUE_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// view review comment in view component
export const AllReviewComments =
  (compId: any, rating: any, sortBy: any) => async (dispatch: any) => {
    try {
      dispatch({ type: COMPONENTREVIEW_REQUEST });

      const getData = await fetchFunction(
        `api/review/${compId}?rating=${rating}&sortBy=${sortBy}`
      );

      dispatch({ type: COMPONENTREVIEW_SUCCESS, payload: getData });
    } catch (error) {
      console.error(error);
    }
  };

// Add review comment in view component
export const AddReviewComments = (reviewData: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ADDREVIEW_REQUEST });

    const getData = await postFunction(`api/review`, reviewData);

    dispatch({ type: ADDREVIEW_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// Add review comment in view component
export const AddReply = (replyData: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ADDREPLY_REQUEST });

    const getData = await postFunction(`api/reply`, replyData);

    dispatch({ type: ADDREPLY_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// Add review comment in view component
export const EditReply = (dataObj: any) => async (dispatch: any) => {
  try {
    dispatch({ type: EDITREPLY_REQUEST });

    const getData = await patchFunction(`api/reply`, dataObj);

    dispatch({ type: EDITREPLY_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// Delete review comment in view component
export const DeleteReply = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: DElETEREPLY_REQUEST });

    const getData = await deleteFunction(`api/reply/${id}`);

    dispatch({ type: DElETEREPLY_SUCCESS, payload: getData });
  } catch (error) {
    console.error(error);
  }
};

// CategoryList
export const CategoryListFun = () => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: CATEGORYLIST_REQUEST });
      const getData = await fetchFunction(`api/category/list`);
      dispatch({ type: CATEGORYLIST_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// CategoryList
export const SubCategoryListFun = (id: any) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: SUBCATEGORYLIST_REQUEST });

      const getData = await postFunction(`api/category/techstack`, id);

      dispatch({ type: SUBCATEGORYLIST_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// Reviewers LIst
export const ReviewersList = () => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: REVIEWERS_REQUEST });
      const getData = await fetchFunction(`api/reviewers`);
      dispatch({ type: REVIEWERS_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// Cancel Issue
export const cancelIssue = (id: Number) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: CANCEL_ISSUE_REQUEST });
      const getData = await deleteFunction(`api/issue/${id}`);
      dispatch({ type: CANCEL_ISSUE_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

// Edit Comment
export const editComment =
  (id: any, formData: any) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: EDIT_COMMENT_REQUEST });
        const getData = await patchFunction(`api/comment/${id}`, formData);
        dispatch({ type: EDIT_COMMENT_SUCCESS, payload: getData });
        return resolve(getData);
      } catch (error) {
        console.error(error);
        return resolve([]);
      }
    });
  };

// Delete Comment
export const deleteComment = (id: Number) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: DELETE_COMMENT_REQUEST });
      const getData = await deleteFunction(`api/comment/${id}`);
      dispatch({ type: DELETE_COMMENT_SUCCESS, payload: getData });
      return resolve(getData);
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};
