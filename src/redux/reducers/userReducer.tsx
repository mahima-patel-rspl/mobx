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
  SEARCH_FILTER_POST_SUCCESS,
  SEARCH_FILTER_POST_REQUEST,
  VIEW_COMPONENT_GET_REQUEST,
  VIEW_COMPONENT_GET_SUCCESS,
  TOTALCOMPONENTS_REQUEST,
  TOTALCOMPONENTS_SUCCESS,
  TOTALDOWNLOADS_SUCCESS,
  TOTALDOWNLOADS_REQUEST,
  TOTALVIEWS_SUCCESS,
  TOTALVIEWS_REQUEST,
  FETCHUSER_PROFILEREQUEST,
  FETCHUSER_PROFILESUCCESS,
  TECHSTACK_LIST_REQUEST,
  TECHSTACK_LIST_SUCCESS,
  DOWNLOADS_REQUEST,
  DOWNLOADS_SUCCESS,
  FETCH_USER_FAVOURITES_REQUEST,
  FETCH_USER_FAVOURITES_SUCCESS,
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_USER_CONTRIBUTION_REQUEST,
  FETCH_USER_CONTRIBUTION_SUCCESS,
  FETCH_PENDINGITEMS_REQUEST,
  FETCH_PENDINGITEMS_SUCCESS,
  FETCH_FAVOURITES_SEARCH_REQUEST,
  FETCH_FAVOURITES_SEARCH_SUCCESS,
  DISCOVERMYINTERESTS_REQUEST,
  DISCOVERMYINTERESTS_SUCCESS,
  MYINTERESTSADD_REQUEST,
  MYINTERESTSADD_SUCCESS,
  CHANGELOGS_DATA_REQUEST,
  CHANGELOGS_DATA_SUCCESS,
  VIEW_DEPENDENCIES_REQUEST,
  VIEW_DEPENDENCIES_SUCCESS,
  MOSTVIEWED_REQUEST,
  MOSTVIEWED_SUCCESS,
  ALL_ISSUES_SUCCESS,
  ALL_ISSUES_REQUEST,
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
  RAISE_ISSUE_SUBMIT_REQUEST,
  RAISE_ISSUE_SUBMIT_SUCCESS,
  VIEW_ISSUE_REQUEST,
  VIEW_ISSUE_SUCCESS,
  EDIT_REPORTED_ISSUE_REQUEST,
  EDIT_REPORTED_ISSUE_SUCCESS,
  REVIEWERS_REQUEST,
  REVIEWERS_SUCCESS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
} from "../../constants/userConstant";

export const userReducer = (
  state = {
    user: {
      email: String,
      password: String,
    },
  },
  action: any
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        status: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

// fetchUserPost data
export const fetchUserPost = (
  state = { fetchUserPostData: {} },
  action: any
) => {
  switch (action.type) {
    case FETCHUSER_POSTREQUEST:
      return {
        loading: true,
        status: false,
      };
    case FETCHUSER_POSTSUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        fetchUserPostData: action.payload,
      };
    default:
      return state;
  }
};

// for refresh token
export const userRefreshtoken = (state = { refreshToken: {} }, action: any) => {
  switch (action.type) {
    case NEW_TOKEN_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case NEW_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        refreshToken: action.payload,
      };
    default:
      return state;
  }
};

// Top Categories Data In Home Page
export const topCategories = (state = { categories: [] }, action: any) => {
  switch (action.type) {
    case TOP_CATEOGRIES_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case TOP_CATEOGRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        categories: action.payload,
      };
    default:
      return state;
  }
};
// Recently Added In Home Page
export const RecentlyAdded = (state = { Recentlydata: [] }, action: any) => {
  switch (action.type) {
    case RECENTLYDATA_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case RECENTLYDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        Recentlydata: action.payload,
      };
    default:
      return state;
  }
};

// trending component In Home Page
export const TrendingData = (state = { Trendingdata: [] }, action: any) => {
  switch (action.type) {
    case TRENDINGDATA_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case TRENDINGDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        Trendingdata: action.payload,
      };
    default:
      return state;
  }
};

// search data in search bar for USER
export const userSearchData = (state = { userSearchData: {} }, action: any) => {
  switch (action.type) {
    case USER_SEARCH_DATA_GET_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case USER_SEARCH_DATA_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        userSearchData: action.payload,
      };
    default:
      return state;
  }
};

// search data in search bar from search page in User
export const userSearchfilterData = (
  state = { userSearchfilterData: {} },
  action: any
) => {
  switch (action.type) {
    case SEARCH_FILTER_POST_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case SEARCH_FILTER_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        userSearchfilterData: action.payload,
      };
    default:
      return state;
  }
};

// view component data in User
export const viewComponentData = (
  state = { viewComponentData: {} },
  action: any
) => {
  switch (action.type) {
    case VIEW_COMPONENT_GET_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case VIEW_COMPONENT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        viewComponentData: action.payload,
      };
    default:
      return state;
  }
};

// totalViews
export const totalViews = (state = { totalViews: [] }, action: any) => {
  switch (action.type) {
    case TOTALVIEWS_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case TOTALVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        totalViews: action.payload,
      };
    default:
      return state;
  }
};

// totalDownload
export const totalDownload = (state = { totalDownloads: [] }, action: any) => {
  switch (action.type) {
    case TOTALDOWNLOADS_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case TOTALDOWNLOADS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        totalDownloads: action.payload,
      };
    default:
      return state;
  }
};

// totalComponents
export const totalComponents = (
  state = { totalComponent: [] },
  action: any
) => {
  switch (action.type) {
    case TOTALCOMPONENTS_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case TOTALCOMPONENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        totalComponent: action.payload,
      };
    default:
      return state;
  }
};

// mostViewed
export const mostViewed = (state = { mostViewedData: [] }, action: any) => {
  switch (action.type) {
    case MOSTVIEWED_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case MOSTVIEWED_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        mostViewedData: action.payload,
      };
    default:
      return state;
  }
};

// fetchUserProfile data
export const fetchUserProfile = (
  state = { fetchUserProfileData: {} },
  action: any
) => {
  switch (action.type) {
    case FETCHUSER_PROFILEREQUEST:
      return {
        loading: true,
        status: false,
      };
    case FETCHUSER_PROFILESUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        fetchUserProfileData: action.payload,
      };
    default:
      return state;
  }
};

// Techstack list in Manage filter
export const techStacks = (state = { techStacks: [] }, action: any) => {
  switch (action.type) {
    case TECHSTACK_LIST_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case TECHSTACK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        techStacks: action.payload,
      };
    default:
      return state;
  }
};

// totalDownload
export const downloadCount = (
  state = { totalDownloadsCount: {} },
  action: any
) => {
  switch (action.type) {
    case DOWNLOADS_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case DOWNLOADS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        totalDownloadsCount: action.payload,
      };
    default:
      return state;
  }
};
//Kuldip
// fevourites data GET
export const favouritesData = (state = { favouritesData: {} }, action: any) => {
  switch (action.type) {
    case FETCH_USER_FAVOURITES_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case FETCH_USER_FAVOURITES_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        favouritesData: action.payload,
      };
    default:
      return state;
  }
};

//leaderBoard for Dashboard
export const leaderboardData = (
  state = { leaderboardData: [] },
  action: any
) => {
  switch (action.type) {
    case FETCH_LEADERBOARD_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case FETCH_LEADERBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        leaderboardData: action.payload,
      };
    default:
      return state;
  }
};

//user contribution for Dashboard
export const userContribution = (
  state = { userContribution: {} },
  action: any
) => {
  switch (action.type) {
    case FETCH_USER_CONTRIBUTION_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case FETCH_USER_CONTRIBUTION_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        userContribution: action.payload,
      };
    default:
      return state;
  }
};

//user pending Items for Dashboard
export const pendingItemsdata = (
  state = { pendingItemsdata: {} },
  action: any
) => {
  switch (action.type) {
    case FETCH_PENDINGITEMS_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case FETCH_PENDINGITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        pendingItemsdata: action.payload,
      };
    default:
      return state;
  }
};

//searchfavourties
export const searchFavourtiesList = (
  state = { searchFavourtiesList: {} },
  action: any
) => {
  switch (action.type) {
    case FETCH_FAVOURITES_SEARCH_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case FETCH_FAVOURITES_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        searchFavourtiesList: action.payload,
      };
    default:
      return state;
  }
};

//discoverMyInterests
export const discoverMyInterests = (
  state = { discoverMyInterestsData: [] },
  action: any
) => {
  switch (action.type) {
    case DISCOVERMYINTERESTS_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case DISCOVERMYINTERESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        discoverMyInterestsData: action.payload,
      };
    default:
      return state;
  }
};

//discoverMyInterests
export const MyInterestsAdd = (
  state = { MyInterestsAddData: [] },
  action: any
) => {
  switch (action.type) {
    case MYINTERESTSADD_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case MYINTERESTSADD_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        MyInterestsAddData: action.payload,
      };
    default:
      return state;
  }
};

//change logs in view component
export const changeLogs = (state = { changeLogs: [] }, action: any) => {
  switch (action.type) {
    case CHANGELOGS_DATA_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case CHANGELOGS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        changeLogs: action.payload,
      };
    default:
      return state;
  }
};

// dependencies data in view component
export const viewDependenciesData = (
  state = { viewDependenciesData: [] },
  action: any
) => {
  switch (action.type) {
    case VIEW_DEPENDENCIES_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case VIEW_DEPENDENCIES_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        viewDependenciesData: action.payload,
      };
    default:
      return state;
  }
};

// Review and Comment

export const AllReviewComments = (
  state = { AllReviewCommentsData: [] },
  action: any
) => {
  switch (action.type) {
    case COMPONENTREVIEW_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case COMPONENTREVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        AllReviewCommentsData: action.payload,
      };
    default:
      return state;
  }
};

// Add Review and Comment

export const AddReviewComments = (
  state = { AddReviewCommentsData: [] },
  action: any
) => {
  switch (action.type) {
    case ADDREVIEW_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case ADDREVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        AddReviewCommentsData: action.payload,
      };
    default:
      return state;
  }
};

// Add AddReply and Comment

export const AddReply = (state = { AddReplyData: [] }, action: any) => {
  switch (action.type) {
    case ADDREPLY_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case ADDREPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        AddReplyData: action.payload,
      };
    default:
      return state;
  }
};

//  EditReply and Comment

export const EditReply = (state = { EditReplyData: [] }, action: any) => {
  switch (action.type) {
    case EDITREPLY_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case EDITREPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        EditReplyData: action.payload,
      };
    default:
      return state;
  }
};

//  DeleteReply and Comment

export const DeleteReply = (state = { DeleteReplyData: [] }, action: any) => {
  switch (action.type) {
    case DElETEREPLY_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case DElETEREPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        DeleteReplyData: action.payload,
      };
    default:
      return state;
  }
};

// all issues list for issue tracker
export const allIssues = (state = { allIssues: {} }, action: any) => {
  switch (action.type) {
    case ALL_ISSUES_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case ALL_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        allIssues: action.payload,
      };
    default:
      return state;
  }
};

// reported issues list for issue tracker
export const reportedIssues = (state = { reportedIssues: [] }, action: any) => {
  switch (action.type) {
    case REPORTED_ISSUES_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case REPORTED_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        reportedIssues: action.payload,
      };
    default:
      return state;
  }
};

// assigned issues list for issue tracker
export const assignedIssues = (state = { assignedIssues: [] }, action: any) => {
  switch (action.type) {
    case ASSIGNED_ISSUES_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case ASSIGNED_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        assignedIssues: action.payload,
      };
    default:
      return state;
  }
};

// CategoryList
export const categoryList = (state = { categoryListData: [] }, action: any) => {
  switch (action.type) {
    case CATEGORYLIST_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case CATEGORYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        categoryListData: action.payload,
      };
    default:
      return state;
  }
};

// SubCategoryList
export const SubcategoryList = (
  state = { SubcategoryListData: [] },
  action: any
) => {
  switch (action.type) {
    case SUBCATEGORYLIST_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case SUBCATEGORYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        SubcategoryListData: action.payload,
      };
    default:
      return state;
  }
};

// create issue for issue tracker
export const raiseIssue = (state = { raiseIssue: {} }, action: any) => {
  switch (action.type) {
    case RAISE_ISSUE_SUBMIT_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case RAISE_ISSUE_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        raiseIssue: action.payload,
      };
    default:
      return state;
  }
};

// view issue
export const viewEachIssue = (state = { viewEachIssue: {} }, action: any) => {
  switch (action.type) {
    case VIEW_ISSUE_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case VIEW_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        viewEachIssue: action.payload,
      };
    default:
      return state;
  }
};

// editReportedIssues for issue tracker
export const editReportedIssues = (
  state = { editReportedIssues: {} },
  action: any
) => {
  switch (action.type) {
    case EDIT_REPORTED_ISSUE_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case EDIT_REPORTED_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        editReportedIssues: action.payload,
      };
    default:
      return state;
  }
};

// Reviewers for issue tracker
export const Reviewers = (state = { Reviewers: [] }, action: any) => {
  switch (action.type) {
    case REVIEWERS_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case REVIEWERS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        Reviewers: action.payload,
      };
    default:
      return state;
  }
};

// Cancel Issue
export const cancelIssueRes = (state = { cancelIssueRes: {} }, action: any) => {
  switch (action.type) {
    case REVIEWERS_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case REVIEWERS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        cancelIssueRes: action.payload,
      };
    default:
      return state;
  }
};

//Delete Comment
export const deleteCommentRes = (
  state = { deleteCommentRes: {} },
  action: any
) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        deleteCommentRes: action.payload,
      };
    default:
      return state;
  }
};

//Edit Comment
export const editCommentRes = (state = { editCommentRes: {} }, action: any) => {
  switch (action.type) {
    case EDIT_COMMENT_REQUEST:
      return {
        loading: true,
        status: true,
      };
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        editCommentRes: action.payload,
      };
    default:
      return state;
  }
};
