import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel('user')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  nickName: string;

  @Column()
  password: string;

  @Column()
  avtarImage: string;
}
