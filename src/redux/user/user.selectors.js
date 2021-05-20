import { createSelector } from "reselect";
const selectUser = (state) => state.user; // got whole reducer state == state.user=> currentUser: state.user.currentUser
export const selectCurrentUser = createSelector(
  [selectUser], //store state in here,
  (user) => user.currentUser //
);
