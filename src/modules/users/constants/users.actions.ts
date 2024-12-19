export enum UserActions {
  GET_USER = 'users.get_user',
  CREATE_USER = 'users.create_user',
  UPDATE_USER = 'users.update_user',
  DELETE_USER = 'users.delete_user',
  GET_USERS = 'users.get_users',
}

export const CHECK_USER_EXISTS_ACTIONS = [UserActions.GET_USER] as const;
export const CREATE_USER_ACTIONS = [UserActions.GET_USER, UserActions.CREATE_USER] as const;
export const UPDATE_USER_ACTIONS = [UserActions.GET_USER, UserActions.UPDATE_USER] as const;
export const DELETE_USER_ACTIONS = [UserActions.GET_USER, UserActions.DELETE_USER] as const;
export const LIST_USERS_ACTIONS = [UserActions.GET_USERS] as const;
