import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER, //tell  reducer what action it should take,
  payload: user, // the data that your reducer will use to update the state
});
