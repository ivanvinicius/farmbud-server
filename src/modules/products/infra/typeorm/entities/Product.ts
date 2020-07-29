import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Subcategory from '@modules/subcategories/infra/typeorm/entities/Subcategory';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  subcategory_id: string;

  @Column()
  name: string;

  @Column()
  composition?: string;

  @ManyToOne(() => Subcategory, subcategory => subcategory.product, {
    eager: true,
  })
  @JoinColumn({ name: 'subcategory_id', referencedColumnName: 'id' })
  subcategory: Subcategory;
}
