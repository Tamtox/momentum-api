import { SetMetadata } from '@nestjs/common';

// Key to attach actions to route handlers
export const ACTION_KEY = 'actions';

// Custom decorator to assign an action
export const AuthorizationActions = (...actions: string[]) => SetMetadata(ACTION_KEY, actions);
