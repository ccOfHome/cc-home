import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ArticleEmptyDataError } from '../error/article.error';

@Catch(ArticleEmptyDataError)
export class WeatherErrorFilter {
  async catch(err: ArticleEmptyDataError, ctx: Context) {
    ctx.logger.error(err);
    return '<html><body><h1>article data is empty</h1></body></html>';
  }
}
