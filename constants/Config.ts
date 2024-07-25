export default {
  apiRootUrl: "api-end-point",
  apiVersionUpdateUrl: "",
  googleMapAPIKey: "your-google-map-api-key",//this is api key from Mehak account
};

export type ContextMenuType =
  | "REFRESH"
  | "SETTINGS"
  | "LOGOUT"
  | "ADD"
  | "CHANGE_PASSWORD"
  | "";

export const PageNames = {
  DASHBOARD: "DASHBOARD",
  BRANCH: "BRANCH",
  ADD_BRANCH: "ADD_BRANCH",
  ADD_LEAVE: "ADD_LEAVE",
  ADD_BRANCH_AFTER_REGISTER: "ADD_BRANCH_AFTER_REGISTER",
  ADD_USERS: "ADD_USERS",
  USERS: "USERS",
  REGISTER: "REGISTER",
  ATTENDANCE: "ATTENDANCE",
  ATTENDANCE_REPORT: "ATTENDANCE_REPORT",
  EXPLORE: "EXPLORE",
  LEAVES: "LEAVES",
  VIEWMEETING: "VIEWMEETING",
  HOLIDAY: "HOLIDAY",
  ADD_HOLIDAY: "ADD_HOLIDAY",
};
