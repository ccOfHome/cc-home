import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel('info')
export class Info {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  enable: number;

  @Column()
  description: string;
}
