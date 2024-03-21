import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1672841023343_4714',
  koa: {
    port: 7001,
  },
  view: {
    defaultViewEngine: 'nunjucks',
  },
  orm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '463752412',
    database: 'blog',
    // synchronize: true,
  },
  // mysql: {
  //   dataSource: {
  //     dataSource1: {
  //       host: 'localhost',
  //       username: 'root',
  //       database: 'blog',
  //       entities: [
  //         User,
  //         Article,
  //         'entity', // 特定目录（等价于目录通配）
  //         '**/abc/**', // 仅获取包含 abc 字符的目录下的文件
  //         'abc/**/*.ts', // 特定目录 + 通配
  //         'abc/*.entity.ts', // 匹配后缀
  //         '**/*.entity.ts', // 通配加后缀匹配
  //         '**/*.{j,t}s', // 后缀匹配
  //       ],
  //     },
  //     dataSource2: {
  //       host: 'localhost',
  //       user: 'root',
  //       database: 'test',
  //     },
  //     dataSource3: {
  //       host: 'localhost',
  //       user: 'root',
  //       database: 'test',
  //     },
  //     defaultDataSourceName: 'dataSource1',
  //   },
  // },
} as MidwayConfig;
