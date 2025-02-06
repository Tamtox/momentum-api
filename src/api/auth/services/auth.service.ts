import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepositoryService } from './auth-repository.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { RequestProcessOptions } from 'src/common/types/request-process';
import { CustomError } from 'src/common/errors/custom-error';
import { UsersService } from '../../users/services/users.service';
import { SignInDto } from '../dtos/auth.dto';
import { AdminsService } from '../../admins/services/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminsService: AdminsService,
    private readonly authRepositoryService: AuthRepositoryService,
    private readonly jwtService: JwtService,
  ) {}
  // Hash password
  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
  // Compare password
  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
  // #region Sign Up --------------------------------------------------------------------------------------------------------------------------
  async signUpProcess() {}
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Sign In --------------------------------------------------------------------------------------------------------------------------
  async signInProcess(body: SignInDto) {
    // Step 1: Validate the request body
    const user = this.usersService.checkUserExists(null, body.email);
    // const admin = this.adminsService.checkAdminExists(null, body.email);
  }
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Sign Out -------------------------------------------------------------------------------------------------------------------------
  async signOutProcess() {}
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Refresh Token --------------------------------------------------------------------------------------------------------------------
  async refreshTokenProcess() {}
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Verify Email ---------------------------------------------------------------------------------------------------------------------
  async verifyEmailProcess() {}
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Reset Password -------------------------------------------------------------------------------------------------------------------
  async resetPasswordProcess() {}
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Change Password ------------------------------------------------------------------------------------------------------------------
  async changePasswordProcess() {}
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
}
