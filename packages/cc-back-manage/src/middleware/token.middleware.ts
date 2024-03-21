import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { WhiteList } from '../config/white-list';
const fs = require('fs');
const jwt = require('jsonwebtoken');

const publicKey = fs.readFileSync('rsa_public_key.pem');

@Middleware()
export class TokenMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        if (
          WhiteList.find(item => item === ctx.url) ||
          WhiteList.find(item => item.match(/^\/websit\//g))
        )
          return await next();
        const authorization: string | string[] = ctx.header.authorization;
        const token =
          typeof authorization === 'string' ? authorization.split(' ')[1] : '';
        const verify = await jwt.verify(token, publicKey);
        if (verify?.data?.status === '正常') {
          return await next();
        } else {
          ctx.body = {
            code: 0,
            msg: '无效的token, 请重新登录',
            type: 'token',
          };
        }
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          ctx.body = {
            code: 0,
            msg: 'token已过期, 请重新登录',
            type: 'token',
          };
        } else if (err.name === 'JsonWebTokenError') {
          ctx.body = {
            code: 0,
            msg: '无效的token, 请重新登录',
            type: 'token',
          };
        }
      }
    };
  }

  static getName(): string {
    return 'token';
  }
}
