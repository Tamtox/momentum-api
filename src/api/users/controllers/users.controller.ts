import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { API_PREFIX } from 'src/common/constants/constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
const TAGS = [CONTROLLER_NAME] as const;
@ApiTags(...TAGS)
@Controller(`${API_PREFIX}/${CONTROLLER_NAME}`)
@UseGuards(AuthenticationGuard)
// @UseGuards(AuthorizationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // #region Get User -------------------------------------------------------------------------------------------------------------------
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns user.', type: UserDto })
  @Get(':id')
  async getUser(@Param('id') id: string, @Res() res: Response) {
    const routeName = 'getUser';
    const options = setRequestProcessOptions(res.locals, false, [...USER_ROUTE_ACTIONS[routeName]]);
    const user = await this.usersService.getUserProcess(id, options);
    return res.status(HttpStatus.OK).json({ user });
  }
  // #region Create User ----------------------------------------------------------------------------------------------------------------
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Creates new user.', type: UserDto })
  @Post()
  async createUser(@Body(new ZodValidationPipe(createUserValidationSchema)) body: CreateUserDto, @Res() res: Response) {
    const routeName = 'createUser';
    const options = setRequestProcessOptions(res.locals, false, [...USER_ROUTE_ACTIONS[routeName]]);
    const user = await this.usersService.createUserProcess(body, options);
    return res.status(HttpStatus.CREATED).json({ user });
  }
  // #region Update User ----------------------------------------------------------------------------------------------------------------
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
  @ApiResponse({ status: HttpStatus.OK, description: 'Deletes user.' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    const routeName = 'deleteUser';
    const options = setRequestProcessOptions(res.locals);
    await this.usersService.deleteUserProcess(id, options);
    return res.status(HttpStatus.OK).json({ message: 'User deleted successfully' });
  }
  // #region List Users ----------------------------------------------------------------------------------------------------------------
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
