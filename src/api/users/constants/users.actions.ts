export enum UserActions {
  GET_USER = 'users.get_user',
  CREATE_USER = 'users.create_user',
  UPDATE_USER = 'users.update_user',
  DELETE_USER = 'users.delete_user',
  GET_USERS = 'users.get_users',
}

export const USER_ROUTE_ACTIONS = {
  getUser: [UserActions.GET_USER],
  createUser: [UserActions.GET_USER, UserActions.CREATE_USER],
  updateUser: [UserActions.GET_USER, UserActions.UPDATE_USER],
  deleteUser: [UserActions.GET_USER, UserActions.DELETE_USER],
  listUsers: [UserActions.GET_USERS],
} as const;
