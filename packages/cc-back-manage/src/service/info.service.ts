import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Info } from '../entity/info.entity';

@Provide()
export class InfoService {
  @InjectEntityModel(Info)
  info;

  async getAllInfo(): Promise<any> {
    try {
      const sql = `select * from info`;
      const result = await this.info.query(sql);
      return {
        code: 0,
        mag: '获取成功',
        data: result,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getEnableInfo(): Promise<any> {
    try {
      const sql = `select * from info where enable='1'`;
      const result = await this.info.query(sql);
      return {
        code: 0,
        mag: '获取成功',
        data: result,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async addInfo(info: any): Promise<any> {
    try {
      const enable = 0;
      const sql = `insert into info(id, title, description, enable) values('${info.id}', '${info.title}', '${info.description}', '${enable}')`;
      const result = await this.info.query(sql);
      if (result) {
        return {
          code: 0,
          mag: '添加成功',
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateInfo(info: any): Promise<any> {
    try {
      const sql = `insert into info(id, title, description, enable) values('${info.id}', '${info.title}', '${info.description}', '${info.enable}')`;
      const result = await this.info.query(sql);
      if (result) {
        return {
          code: 0,
          mag: '修改成功',
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteInfo(info: any): Promise<any> {
    try {
      const sql = `insert into info(id, title, description, enable) values('${info.id}', '${info.title}', '${info.description}', '${info.enable}')`;
      const result = await this.info.query(sql);
      if (result) {
        return {
          code: 0,
          mag: '删除成功',
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
