import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entity/user.entity';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  user;

  async getUserList(): Promise<any> {
    try {
      const result = await this.user.query('select * from user');
      return {
        code: 0,
        msg: '查询成功',
        data: result,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async addUser(user: User): Promise<any> {
    try {
      const result = await this.user.query(
        `insert into user (id, nickName, password, avtarImage) values(${user.id}, ${user.nickName}, ${user.password}, ${user.avtarImage})`
      );
      return {
        code: 0,
        msg: '查询成功',
        data: result[0].content,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateStatus(id: string, status: number): Promise<boolean> {
    try {
      const result = await this.user.query(
        `update article set status=${status} where id=${id}`
      );
      return !!result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
