import { Config, DataSourceManager, Init, Inject } from '@midwayjs/core';
import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import * as mysql from 'mysql2';

@Provide()
@Scope(ScopeEnum.Singleton)
export class MySqlDataSourceManager extends DataSourceManager<mysql.Connection> {
  @Config('orm')
  mysqlConfig;

  @Inject()
  baseDir: string;

  @Init()
  async init() {
    // 需要注意的是，这里第二个参数需要传入一个实体类扫描地址
    // console.log('====================================');
    // console.log(this.mysqlConfig, this.baseDir);
    // console.log('====================================');
    await this.createDataSource(this.mysqlConfig);
  }

  // 创建单个实例
  protected async createDataSource(config: any): Promise<mysql.Connection> {
    console.log(config);
    return mysql.createConnection(config);
  }

  getName(): string {
    return 'mysql';
  }

  async checkConnected(dataSource: mysql.Connection): Promise<boolean> {
    // 伪代码
    // return dataSource?.config === 'connected';
    return true;
  }

  async destroyDataSource(dataSource: mysql.Connection): Promise<void> {
    if (await this.checkConnected(dataSource)) {
      await dataSource.destroy();
    }
  }
}
