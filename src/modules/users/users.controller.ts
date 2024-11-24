import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { API_PREFIX } from 'src/common/constants/constants';
import { CreateUserDto, ListUsersDto, UpdateUserDto } from './dtos/users.dtos';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

const CONTROLLER_NAME = 'users' as const;
const TAGS = ['users'] as const;
@ApiTags(...TAGS)
@Controller(`${API_PREFIX}/${CONTROLLER_NAME}`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // #region Get User -------------------------------------------------------------------------------------------------------------------
  @ApiResponse({ status: HttpStatus.OK })
  @Get(':id')
  async getUser() {
    const routeName = 'getUser';
  }
  // #endregion
  // #region Create User ----------------------------------------------------------------------------------------------------------------
  @ApiResponse({ status: HttpStatus.CREATED })
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const routeName = 'createUser';
    const user = await this.usersService.createUser(body, { applicationId: 'application123' });
  }
  // #endregion
  // #region Update User ----------------------------------------------------------------------------------------------------------------
  @ApiResponse({ status: HttpStatus.OK })
  @Patch(':id')
  async updateUser(@Body() body: UpdateUserDto) {
    const routeName = 'updateUser';
  }
  // #endregion
  // #region List Users ----------------------------------------------------------------------------------------------------------------
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async listUsers(@Query() query: ListUsersDto) {
    const routeName = 'listUsers';
    const users = await this.usersService.listUsers(query, {});
  }
  // #endregion
}
