interface TopCategoriesData {
  avatar_url: string;
  total_components: number;
  name: string;
  id: number;
}

interface FavouritesData {
  display_name: string;
  componentimage: string;
  id: number;
  title: string;
  techstack: string;
  description: string;
  Author_name: string;
  createdOn: string;
}

interface PendingItemsData {
  image_url: string;
  id: number;
  display_name: string;
  techstack: {
    name: string;
  };
  description: string;
  author_name: string;
  draftAt: string;
}

interface MostViewedData {
  display_name: string;
  componentId: number;
  name: string;
  views: string;
}

interface RecentlyData {
  display_name: string;
  id: number;
  name: string;
  createdAt: moment.MomentInput;
}

interface RemainingLeadersData {
  image: String;
  name: string;
  rank: string;
  score: string;
}

interface SearchData {
  id: string;
  avatar_url: string;
  name: string;
}

interface Top3LeadersData {
  image: String;
  rank: string;
  name: string;
  score: string;
}

interface AllTags {
  id: number;
  name: string;
}

interface AdminTagList {
  id: number;
  name: string;
  createdAt: string;
  type: string;
  updatedAt: string;
}

interface FavouriteData {
  Author_name: string;
  avgRating: number;
  componentimage: string;
  createdOn: string;
  description: string;
  display_name: string;
  downloads: number;
  id: number;
  modifiedOn: string;
  status: string;
  techimage: string;
  techstack: string;
  techstackId: number;
  title: string;
  updated_by: string;
  reviewCount: number;
  rating: number;
  views: number;
}

interface ManageComponents {
  display_name: string;
  Author_name: string;
  author_email: string;
  componentimage: string;
  createdOn: string;
  gitlab_url: string;
  id: number;
  modifiedOn: string;
  status: string;
  techimage: string;
  techstack: string;
  techstackId: number;
  title: string;
  updated_by: string;
  git_updated_at: string;
  version: string;
}

interface Techstacks {
  avatar_url: string;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  total_components: number;
  updatedAt: string;
  web_url: string;
}
interface ViewComponent {
  name: string;
}

interface TechstackReportData {
  count: number;
  downloads: number;
  id: number;
  name: string;
  views: number;
}

interface ChangeLogData {
  author_email: string;
  author_name: string;
  authored_date: string;
  committed_date: string;
  committer_email: string;
  committer_name: string;
  created_at: string;
  id: string;
  message: string;
  parent_ids: string[];
  short_id: string;
  title: string;
}
interface ReplyCommentData {
  image: string;
  name: string;
  rating: number;
  createdAt: moment.MomentInput;
  headline: string;
  review: string;
  reply: "default";
  replierName: string;
  replierImage: string;
  reviewId: number;
  updatedAt: moment.MomentInput;
}
interface ManageRole {
  title: string;
  usercount: string;
  permissioncount: string;
  isActive: boolean;
  id: number;
  permissions: string[];
  total_users: number;
}

interface ManageUser {
  isActive: boolean;
  name: string;
  email: string;
  designation: string;
  userpermission: string;
  id: number;
  role: { permissions: string[]; title: string };
}

interface IssueTrackerData {
  id: number;
  title: string;
  reporterName: string;
  status: string;
  assignedName: string;
  createdAt: moment.MomentInput;
  updatedAt: moment.MomentInput;
}

interface Mycontributions {
  text: string;
  date: moment.MomentInput;
}

export type {
  TopCategoriesData,
  FavouritesData,
  PendingItemsData,
  MostViewedData,
  RecentlyData,
  RemainingLeadersData,
  SearchData,
  Top3LeadersData,
  AllTags,
  AdminTagList,
  FavouriteData,
  ManageComponents,
  Techstacks,
  TechstackReportData,
  ChangeLogData,
  ViewComponent,
  ReplyCommentData,
  ManageRole,
  ManageUser,
  IssueTrackerData,
  Mycontributions,
};
