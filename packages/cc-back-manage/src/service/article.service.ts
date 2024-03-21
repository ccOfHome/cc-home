import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Article } from '../entity/article.entity';
import { format } from 'date-fns';

@Provide()
export class ArticleService {
  @InjectEntityModel(Article)
  article;

  async getArticleList(article: any): Promise<any> {
    try {
      let sql = 'select * from article where isDelete=0';
      if (article.title) sql += `&& title LIKE '%${article.title}%'`;
      if (article.status) sql += ` && status='${article.status}'`;
      if (!!article.createStartTime && !!article.createEndTime)
        sql += ` && createTime between '${article.createStartTime}' and '${article.createEndTime}'`;
      if (!!article.publishStartTime && !!article.publishEndTime)
        sql += ` && publishTime between '${article.publishStartTime}' and '${article.publishEndTime}'`;
      sql += ' order by createTime desc';
      const result = await this.article.query(sql);
      return {
        code: 0,
        msg: '查询成功',
        data: result,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async addArticle(article: any): Promise<any> {
    try {
      const sql = `insert into article(id, title, createTime, content, status, backgroundUrl, userId, publishTime, isDelete) values('${article.id}', '${article.title}', '${article.createTime}', '${article.content}', '${article.status}', '${article.backgroundUrl}', '${article.userId}', '${article.publishTime}', '${article.isDelete}')`;
      const result = await this.article.query(sql);
      if (result && article.status === 1) {
        return {
          code: 0,
          data: {
            id: article.id,
          },
          msg: '保存成功',
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async editArticle(
    article: any,
    action: 'save' | 'publish' | 'edit'
  ): Promise<any> {
    try {
      const sql = `update article set title='${article.title}', content='${article.content}', status='${article.status}', backgroundUrl='${article.backgroundUrl}', createTime='${article.createTime}', userId='${article.userId}', publishTime='${article.publishTime}' where id='${article.id}'`;
      const result = await this.article.query(sql);
      if (result) {
        if (action === 'publish') {
          return {
            code: 0,
            msg: '发布成功',
          };
        } else if (action === 'edit') {
          return {
            code: 0,
            msg: '编辑成功',
          };
        } else if (action === 'save') {
          return {
            code: 0,
            msg: '保存成功',
          };
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async queryArticleById(article: any): Promise<any> {
    try {
      const sql = `select userId, publishTime, title, content from article where id='${article.id}'`;
      const result = await this.article.query(sql);
      return {
        code: 0,
        msg: '查询成功',
        data: {
          userId: result[0].userId,
          publishTime: result[0].publishTime,
          title: result[0].title,
          content: result[0].content,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateStatus(id: string, status: number): Promise<any> {
    try {
      const publishTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      const result = await this.article.query(
        `update article set status='${status}', publishTime='${publishTime}' where id='${id}'`
      );
      if (result) {
        return {
          code: 0,
          msg: '更新成功',
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteArticle(id: string): Promise<any> {
    try {
      const result = await this.article.query(
        `update article set isDelete=1 where id='${id}'`
      );
      if (result) {
        return {
          code: 0,
          msg: '删除成功',
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
