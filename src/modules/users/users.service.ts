import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError } from 'src/common/errors/custom_error';
import { RequestProcessOptions } from 'src/common/types/requestProcess';
import { CreateUserDto, ListUsersDto, UpdateUserDto } from './dtos/users.dto';
import { CreateUserData } from './types/users_repository_data.type';
import { UsersRepositoryService } from './users-repository.service';
import { generateVerificationCode } from 'src/common/utils/generate_verification_code';
import { VERIFICATION_CODE_MIN } from 'src/common/constants/constants';
import { User, USER_COLS } from './models/users.model';

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
    return user as User;
  }
  // #endregion
  // #region Get User ---------------------------------------------------------------------------------------------------------------------------
  async getUserProcess(id: string, options: RequestProcessOptions) {
    // Step 1: Check if the user exists
    const admin = options.admin;
    let existingUser = options.user || null;
    if (admin) {
      existingUser = await this.checkUserExists(id, null);
    } else {
      if (!existingUser) {
        throw new CustomError('User does not exist', HttpStatus.NOT_FOUND, 'Validation error');
      }
      if (existingUser.id !== id) {
        throw new CustomError('Unauthorized!', HttpStatus.UNAUTHORIZED, 'Authorization error');
      }
    }
    return existingUser;
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
    // Step 1: Check if the user already exists
    const existingUser = await this.usersRepository.getUser(null, body.email);
    if (existingUser) {
      throw new CustomError('User already exists', HttpStatus.BAD_REQUEST, 'Validation error');
    }
    // Step 3: Create the user
    const date = new Date();
    const userData: CreateUserData = {
      email: body.email,
      username: body.username,
      password: body.password,
      temporary_password: null,
      verification_code: generateVerificationCode(VERIFICATION_CODE_MIN),
      type: body.type || 'user',
      last_login_at: date,
      last_online_at: date,
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
      if (body.isDisabled !== undefined) {
        userData.is_disabled = body.isDisabled;
      }
      userData.created_by = admin.id;
    }
    const user = await this.usersRepository.createUser(userData);
    // Step 4: Send verification email
    return user;
  }
  // #endregion
  // #region Update User -------------------------------------------------------------------------------------------------------------------------
  async updateUserProcess(id: string, body: UpdateUserDto, options: RequestProcessOptions) {
    // Step 1: Check if the user exists
    const existingUser = await this.checkUserExists(id, null);
    // Step 3: Check if email is already taken
    if (body.email && body.email !== existingUser.email) {
      await this.checkUserExists(null, body.email);
    }
  }
  // #endregion
  // # region Disable User -----------------------------------------------------------------------------------------------------------------------
  async disableUserProcess(body: any, options: RequestProcessOptions) {}
  // #endregion
  // #region Delete User -------------------------------------------------------------------------------------------------------------------------
  async deleteUserProcess(id: string, options: RequestProcessOptions) {
    const admin = options.admin;
    const existingUser = options.user;
    // Step 1: Check if the user exists
    const user = await this.checkUserExists(id, null);
    if (!user) {
      throw new CustomError('User does not exist', HttpStatus.NOT_FOUND, 'Validation error');
    }
    // Step 2: Delete the user
    if (admin || existingUser?.id === user.id) {
      await this.usersRepository.deleteUser(id);
    } else {
      throw new CustomError('Unauthorized!', HttpStatus.UNAUTHORIZED, 'Authorization error');
    }
  }
  // #endregion
  // #region List Users -------------------------------------------------------------------------------------------------------------------------
  async listUsersProcess(queries: ListUsersDto, options: RequestProcessOptions) {
    const admin = options.admin;
    const selectedKeys = new Set(USER_COLS);
    if (!admin) {
      selectedKeys.delete('password');
      selectedKeys.delete('temporary_password');
      selectedKeys.delete('verification_code');
    }
    // Step 2: List users
    const users = await this.usersRepository.listUsers(queries, { returning: Array.from(selectedKeys) });
    return users;
  }
  // #endregion
}
