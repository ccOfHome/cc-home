import { Controller, Inject, Post } from '@midwayjs/decorator';
import { ArticleService } from '../service/article.service';
import { Context } from '@midwayjs/koa';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';

@Controller('/article')
export class ArticleController {
  @Inject()
  articleService: ArticleService;

  @Inject()
  ctx: Context;

  @Post('/getArticleList')
  async getArticleList(): Promise<any> {
    const data = this.ctx.request.body;
    return await this.articleService.getArticleList(data);
  }

  @Post('/addArticle')
  async addArticle(): Promise<any> {
    const data: any = this.ctx.request.body;
    const createTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const status = data?.status ?? 1;
    const backgroundUrl =
      data?.backgroundUrl ??
      'https://typora-imgae-cloud.oss-cn-beijing.aliyuncs.com/ccmama/header-background.jpg';
    if (!data.id) {
      // id不存在时的保存/发布
      const article = Object.assign(data, {
        id: nanoid(),
        status,
        backgroundUrl,
        createTime,
        publishTime: '',
        userId: '1',
        isDelete: 0,
      });
      return await this.articleService.addArticle(article);
    } else {
      // 发布 id存在时的保存
      const publishTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      const article = Object.assign(data, {
        id: data.id,
        status,
        backgroundUrl,
        createTime,
        userId: '1',
        publishTime,
        isDelete: data.isDelete,
      });
      return await this.articleService.editArticle(
        article,
        status === 1 ? 'save' : 'publish'
      );
    }
  }

  @Post('/editArticle')
  async editArticle(): Promise<any> {
    const article = this.ctx.request.body;
    return await this.articleService.editArticle(article, 'edit');
  }

  @Post('/queryArticleById')
  async queryArticleById(): Promise<any> {
    const article = this.ctx.request.body;
    return await this.articleService.queryArticleById(article);
  }

  @Post('/updateStatus')
  async updateStatus(): Promise<any> {
    const article: any = this.ctx.request.body;
    return await this.articleService.updateStatus(article.id, article.status);
  }

  @Post('/deleteArticle')
  async deleteArticle(): Promise<any> {
    const article: any = this.ctx.request.body;
    return await this.articleService.deleteArticle(article.id);
  }
}
