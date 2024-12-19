import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_PREFIX } from 'src/common/constants/constants';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { setRequestProcessOptions } from 'src/common/utils/set_request_process_options';

const CONTROLLER_NAME = 'auth' as const;
const TAGS = [CONTROLLER_NAME] as const;
@ApiTags(...TAGS)
@Controller(`${API_PREFIX}/${CONTROLLER_NAME}`)
@UseGuards(AuthorizationGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // #region Sign Up --------------------------------------------------------------------------------------------------------------------------
  @ApiResponse({ status: HttpStatus.CREATED })
  @Post('sign-up')
  async signUp(@Body() body: any) {
    const routeName = 'signUp';
    // const options = setRequestProcessOptions(res.locals);
    // const { user, token } = await this.authService.signUpProcess(body);
    // return { user, token };
  }
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Sign In --------------------------------------------------------------------------------------------------------------------------
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Sign Out -------------------------------------------------------------------------------------------------------------------------
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Refresh Token --------------------------------------------------------------------------------------------------------------------
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Verify Email ---------------------------------------------------------------------------------------------------------------------
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Reset Password -------------------------------------------------------------------------------------------------------------------
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
  // #region Change Password ------------------------------------------------------------------------------------------------------------------
  // #endregion -------------------------------------------------------------------------------------------------------------------------------
}
