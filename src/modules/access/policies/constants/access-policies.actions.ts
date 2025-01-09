export enum AccessPolicyActions {
  GET_USER = 'users.get_user',
  CREATE_USER = 'users.create_user',
  UPDATE_USER = 'users.update_user',
  DELETE_USER = 'users.delete_user',
  GET_USERS = 'users.get_users',
}

export const USER_ROUTE_ACTIONS = {
  getUser: [AccessPolicyActions.GET_USER],
  createUser: [AccessPolicyActions.GET_USER, AccessPolicyActions.CREATE_USER],
  updateUser: [AccessPolicyActions.GET_USER, AccessPolicyActions.UPDATE_USER],
  deleteUser: [AccessPolicyActions.GET_USER, AccessPolicyActions.DELETE_USER],
  listUsers: [AccessPolicyActions.GET_USERS],
} as const;
