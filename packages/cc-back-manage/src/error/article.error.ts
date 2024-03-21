import { MidwayError } from '@midwayjs/core';

export class ArticleEmptyDataError extends MidwayError {
  constructor(err?: Error) {
    super('article data is empty', {
      cause: err,
    });
    if (err?.stack) {
      this.stack = err.stack;
    }
  }
}
