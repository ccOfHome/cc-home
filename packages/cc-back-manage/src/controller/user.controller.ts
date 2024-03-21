import { Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { UserService } from '../service/user.service';
import { Context } from '@midwayjs/koa';
import { User } from '../entity/user.entity';
import { nanoid } from 'nanoid';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  ctx: Context;

  @Get('/getUserList')
  async getUserList(): Promise<any> {
    const result = await this.userService.getUserList();
    return {
      code: 0,
      mag: 'success',
      data: result,
    };
  }

  @Post('/addUser')
  async addUser(user: User): Promise<any> {
    const id = nanoid();
    const newUser = Object.assign(user, { id });
    return await this.userService.addUser(newUser);
  }

  @Post('/updateStatus')
  async updateStatus(id: string, status: number): Promise<any> {
    const result = await this.userService.updateStatus(id, status);
    if (result) {
      return {
        code: 0,
        mag: 'success',
      };
    }
  }
}
