import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { API_PREFIX } from 'src/common/constants/constants';
import { CreateUserDto, ListUsersDto, UpdateUserDto } from './dtos/users.dtos';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestProcessOptions } from 'src/common/types/requestProcess';
import { Request, Response } from 'express';

const CONTROLLER_NAME = 'users' as const;
const TAGS = [CONTROLLER_NAME] as const;
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
  @ApiResponse({ status: HttpStatus.CREATED, type: '' })
  @Post()
  async createUser(@Body() body: CreateUserDto, @Req() req: Request, @Res() res: Response) {
    const routeName = 'createUser';
    const locals = res.locals;
    const options = new RequestProcessOptions({
      applicationId: res.locals.applicationId,
      skipAccessCheck: res.locals.admin ? true : false,
      skipAuthCheck: res.locals.admin ? true : false,
      skipValidationCheck: false,
      user: res.locals.user,
      admin: res.locals.admin,
    });
    console.log('options', options);
    const user = await this.usersService.createUserProcess(body, options);
    return res.status(HttpStatus.CREATED).json({ user });
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
  }
  // #endregion
}
