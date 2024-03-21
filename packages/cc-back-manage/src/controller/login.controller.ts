import { Controller, Inject, Post } from '@midwayjs/decorator';
import { LoginService } from '../service/login.service';
import { Context } from '@midwayjs/koa';

@Controller('/user')
export class UserController {
  @Inject()
  loginService: LoginService;

  @Inject()
  ctx: Context;

  @Post('/login')
  async login(): Promise<any> {
    const { nickName, password } = Object.assign(
      {
        nickName: '',
        password: '',
      },
      this.ctx.request.body
    );
    return await this.loginService.login(nickName, password);
  }
}
