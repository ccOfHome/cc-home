import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entity/user.entity';
const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync('rsa_private_key.pem');

const jwtConfig = {
  algorithm: 'RS256',
  expiresIn: 60 * 60,
};

@Provide()
export class LoginService {
  @InjectEntityModel(User)
  user;

  async login(nickName: string, password: string): Promise<any> {
    try {
      const sql = `select * from user where nickName='${nickName}' and password='${password}'`;
      const result = await this.user.query(sql);
      if (!result.length) {
        return {
          code: 0,
          msg: '用户名或者密码错误',
        };
      } else if (result.length === 1) {
        const token = jwt.sign(
          {
            data: {
              nickName: result[0].nickName,
              status: '正常',
            },
          },
          privateKey,
          jwtConfig
        );
        return {
          code: 0,
          data: {
            token,
          },
          msg: '登陆成功',
        };
      } else {
        return {
          code: 0,
          msg: '用户名或者密码错误',
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
