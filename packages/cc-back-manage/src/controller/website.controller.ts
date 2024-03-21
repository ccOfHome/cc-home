import { Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ArticleService } from '../service/article.service';
import { InfoService } from '../service/info.service';

@Controller('/website')
export class WebsiteController {
  @Inject()
  articleService: ArticleService;
  @Inject()
  infoService: InfoService;

  @Inject()
  ctx: Context;

  @Post('/getArticleList')
  async getArticleList(): Promise<any> {
    const data = Object.assign({}, this.ctx.request.body, {
      status: 2,
    });
    return await this.articleService.getArticleList(data);
  }

  @Get('/getEnableInfo')
  async getEnableInfo(): Promise<any> {
    return await this.infoService.getEnableInfo();
  }

  @Post('/queryArticleById')
  async queryArticleById(): Promise<any> {
    const data = this.ctx.request.body;
    return await this.articleService.queryArticleById(data);
  }
}
