import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError } from 'src/common/errors/customError';
import { RequestProcessOptions } from 'src/common/types/requestProcess';
import {
  CreateUserDto,
  createUserValidationSchema,
  ListUsersDto,
  listUsersValidationSchema,
  UpdateUserDto,
  updateUserValidationSchema,
} from './dtos/users.dtos';
import { CreateUserData } from './types/users.types';
import { UsersRepositoryService } from './users-repository.service';
import { generateVerificationCode } from 'src/common/utils/generate_verification_code';
import { VERIFICATION_CODE_MIN } from 'src/common/constants/constants';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepositoryService) {}
  // #region Check User Exists ------------------------------------------------------------------------------------------------------------------
  async checkUserExists(id: string | null, email: string | null) {
    if (!id && !email) {
      throw new CustomError('Id or email is required', HttpStatus.BAD_REQUEST, 'Validation error');
    }
    const user = await this.usersRepository.getUser(id, email);
    if (!user) {
      throw new CustomError('User does not exist', HttpStatus.NOT_FOUND, 'Validation error');
    }
    return user;
  }
  // #endregion
  // #region Create User -------------------------------------------------------------------------------------------------------------------------
  async createUserProcess(body: CreateUserDto, options: RequestProcessOptions) {
    const processName = 'createUserProcess';
    const applicationId = options.applicationId;
    // if (!applicationId) {
    //   throw new CustomError('Application Id is required', HttpStatus.BAD_REQUEST, 'Validation error');
    // }
    const admin = options.admin;
    // Step 1: Validate the request body
    const userBody = createUserValidationSchema.parse(body);
    // Step 2: Check if the user already exists
    const existingUser = await this.usersRepository.getUser(null, userBody.email);
    if (existingUser) {
      throw new CustomError('User already exists', HttpStatus.BAD_REQUEST, 'Validation error');
    }
    // Step 3: Create the user
    const userData: CreateUserData = {
      email: userBody.email,
      username: userBody.username,
      password: userBody.password,
      temporary_password: null,
      verification_code: generateVerificationCode(VERIFICATION_CODE_MIN),
      type: userBody.type || 'user',
    };
    if (admin) {
      if (body.isVerified !== undefined) {
        userData.is_verified = true;
      }
      if (body.verificationCode) {
        userData.verification_code = body.verificationCode;
      }
      if (body.temporaryPassword) {
        userData.temporary_password = body.temporaryPassword;
      }
      userData.created_by = admin.id;
    }
    const user = await this.usersRepository.createUser(userData);
    // Step 4: Send verification email
    return user;
  }
  // #endregion
  // #region Update User -------------------------------------------------------------------------------------------------------------------------
  async updateUserProcess(body: UpdateUserDto, options: RequestProcessOptions) {
    // Step 1: Validate the request body
    const userBody = updateUserValidationSchema.parse(body);
    // Step 2: Check if the user exists
    const existingUser = await this.checkUserExists(userBody.id, null);
    // Step 3: Check if email is already taken
    if (userBody.email && userBody.email !== existingUser.email) {
      await this.checkUserExists(null, userBody.email);
    }
  }
  // #endregion
  // # region Disable User -----------------------------------------------------------------------------------------------------------------------
  async disableUserProcess(body: any, options: RequestProcessOptions) {}
  // #endregion
  // #region Delete User -------------------------------------------------------------------------------------------------------------------------
  async deleteUserProcess(body: any, options: RequestProcessOptions) {
    // Step 1: Validate the request body
    // Step 2: Check if the user exists
    // Step 3: Delete the user
  }
  // #endregion
  // #region List Users -------------------------------------------------------------------------------------------------------------------------
  async listUsersProcess(queries: ListUsersDto, options: RequestProcessOptions) {
    // Step 1: Validate the request body
    if (options.skipValidationCheck !== true) {
      queries = listUsersValidationSchema.parse(queries);
    }
    // Step 2: List users
  }
  // #endregion
}
