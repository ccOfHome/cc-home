import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel('article')
export class Article {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: number;

  @Column()
  backgroundUrl: string;

  @Column()
  createTime: string;

  @Column()
  publishTime: string;

  @Column()
  userId: string;

  @Column()
  isDelete: number;
}
