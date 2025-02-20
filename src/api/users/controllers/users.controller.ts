import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { API_PREFIX } from 'src/common/constants/constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { setRequestProcessOptions } from 'src/common/types/request-process';
import { AuthorizationActions } from 'src/common/decorators/authorization-action.decorator';
import { USER_ROUTE_ACTIONS } from '../constants/users.actions';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { UserDto } from '../models/users.model';
import { createUserValidationSchema, CreateUserDto } from '../dtos/create-user.dto';
import { listUsersValidationSchema, ListUsersDto } from '../dtos/list-users.dto';
import { updateUserValidationSchema, UpdateUserDto } from '../dtos/update-user.dto';

const CONTROLLER_NAME = 'users' as const;
const CONTROLLER_VERSION = 'v1' as const;
const TAGS = [CONTROLLER_NAME] as const;
@ApiTags(...TAGS)
@Controller({
  path: `${API_PREFIX}/${CONTROLLER_NAME}/${CONTROLLER_VERSION}`,
})
@UseGuards(AuthenticationGuard)
// @UseGuards(AuthorizationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // #region Get User -------------------------------------------------------------------------------------------------------------------
  @ApiOperation({ summary: 'Get existing user.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns user.', type: UserDto })
  @Get(':id')
  async getUser(@Param('id') id: string, @Res() res: Response) {
    const routeName = 'getUser';
    const options = setRequestProcessOptions(res.locals, false, [...USER_ROUTE_ACTIONS[routeName]]);
    const user = await this.usersService.getUserProcess(id, options);
    return res.status(HttpStatus.OK).json({ user });
  }
  // #region Create User ----------------------------------------------------------------------------------------------------------------
  @ApiOperation({ summary: 'Create new user.' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created successfully.', type: UserDto })
  @Post()
  async createUser(@Body(new ZodValidationPipe(createUserValidationSchema)) body: CreateUserDto, @Res() res: Response) {
    const routeName = 'createUser';
    const options = setRequestProcessOptions(res.locals, false, [...USER_ROUTE_ACTIONS[routeName]]);
    const user = await this.usersService.createUserProcess(body, options);
    return res.status(HttpStatus.CREATED).json({ user });
  }
  // #region Update User ----------------------------------------------------------------------------------------------------------------
  @ApiOperation({ summary: 'Update existing user.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Updates existing user.', type: UserDto })
  // @AuthorizationActions(...USER_ROUTE_ACTIONS.updateUser)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserValidationSchema)) body: UpdateUserDto,
    @Res() res: Response,
  ) {
    const routeName = 'updateUser';
    const options = setRequestProcessOptions(res.locals, false, [...USER_ROUTE_ACTIONS[routeName]]);
    const user = await this.usersService.updateUserProcess(id, body, options);
    return res.status(HttpStatus.OK).json({ user });
  }
  // #region Delete User ----------------------------------------------------------------------------------------------------------------
  @ApiOperation({ summary: 'Delete user.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Deletes user.' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    const routeName = 'deleteUser';
    const options = setRequestProcessOptions(res.locals);
    await this.usersService.deleteUserProcess(id, options);
    return res.status(HttpStatus.OK).json({ message: 'User deleted successfully' });
  }
  // #region List Users ----------------------------------------------------------------------------------------------------------------
  @ApiOperation({ summary: 'List users.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns list of users.', type: 'object' })
  @Get()
  async listUsers(
    @Query(new ZodValidationPipe(listUsersValidationSchema)) queries: ListUsersDto,
    @Res() res: Response,
  ) {
    const routeName = 'listUsers';
    const options = setRequestProcessOptions(res.locals, false, [...USER_ROUTE_ACTIONS[routeName]]);
    const users = await this.usersService.listUsersProcess(queries, options);
    return users;
  }
}

Codeshare logo
 ShareSign UpLog In
Disconnected. Click here to refresh.
function findSecondLargest(numbers: number[]) {
  numbers.sort((x,y) => x - y);
  return numbers[numbers.length - 2];
}
46
​
47
// Write a SQL query that selects all columns from a table called orders
48
// where the total price is greater than 100. Group the results by customerID
49
// and only include those with more than 2 orders.
50
​
51
// Orders table:
52
// | order_id | customer_id | total_price |
53
​
54
//===============================
55
​
56
// Problem Statement:
57
// Design a real-time collaborative whiteboard application. This application should allow multiple users to draw on a shared canvas in real-time, with changes reflected to all users almost instantaneously.
58
​
59
// Requirements
60
​
61
// Functional Requirements:
62
// Multiple users can draw, add shapes, or text on the whiteboard simultaneously.
63
// Real-time updates: All users should see changes on the board in real-time.
64
// The whiteboard state should persist so users can revisit it later.
65
// Support for basic features like undo/redo and session management.
66
​
67
// Non-functional Requirements:
68
// Low latency to ensure real-time collaboration.
69
// Scalable to hundreds of users working on a single board.
70
// Scalable to dozens of thouthands of users working on different boards.
71
// Scalable to hundreds of thouthands of users working with service every month.
72
// High availability to avoid downtime during active sessions.
73
​
74
// Questions for the Candidate
75
// 1. Real-time Communication
76
// How would you implement real-time collaboration in a Node.js environment?
77
// Which technology would you choose (e.g., WebSockets, Server-Sent Events)? Why?
78
// 2. Event Broadcasting
79
// How would you handle broadcasting updates from one user to all others in a room?
80
// How would you ensure updates are ordered correctly?
81
// 3. State Management
82
// Where and how would you store the state of the whiteboard for persistence?
83
// How would you handle state recovery in case of application failure?
84
// 4. Database Design
85
// What kind of database would you use to store whiteboard data? Why?
86
// How would you structure the data model to support features like undo/redo?
87
// 5. Scalability
88
// How would you design this system to scale for multiple active boards with hundreds of users each?
89
// What would you do to distribute load effectively across servers?
90
// 6. Conflict Resolution
91
// How would you handle concurrent updates to the same part of the whiteboard (e.g., two users drawing in the same spot)?
92
// Would you prioritize consistency or availability? Why?
93
// 7. Frontend Integration
94
// What kind of API would you expose for the frontend to interact with the backend?
95
// How would you handle large amounts of data being sent to/from the server in real-time?
96
// 8. Testing
97
// How would you test real-time synchronization for correctness and performance?
98
// What edge cases would you consider when testing?
