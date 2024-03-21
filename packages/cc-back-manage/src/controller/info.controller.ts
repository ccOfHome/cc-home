import { Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { InfoService } from '../service/info.service';
import { Context } from '@midwayjs/koa';
import { nanoid } from 'nanoid';

@Controller('/info')
export class InfoController {
  @Inject()
  infoService: InfoService;

  @Inject()
  ctx: Context;

  @Get('/getAllInfo')
  async getAllInfo(): Promise<any> {
    return await this.infoService.getAllInfo();
  }

  @Post('/addInfo')
  async addInfo(): Promise<any> {
    const data = this.ctx.request.body;
    const info = Object.assign(data, {
      id: nanoid(),
    });
    return await this.infoService.addInfo(info);
  }

  @Post('/updateInfo')
  async updateInfo(): Promise<any> {
    const info = this.ctx.request.body;
    return await this.infoService.updateInfo(info);
  }

  // @Post('/deleteInfo')
  // async deleteInfo(): Promise<any> {
  //   const info = this.ctx.request.body;
  //   return await this.infoService.deleteInfo(info);
  // }
}
