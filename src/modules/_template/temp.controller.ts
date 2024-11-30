import { Controller } from '@nestjs/common';
import { AuthService } from './temp.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
