import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractBaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Product } from './product.entity';

export enum QuoteStatus {
  PENDING = 'Pending',
  PROCESSED = 'Processed',
}

@Entity('quotes')
export class Quote extends AbstractBaseEntity {
  @ApiProperty({ example: 100 })
  @Column()
  quantity: number;

  @ApiProperty({ example: 'Lagos, Nigeria' })
  @Column()
  location: string;

  @ApiProperty({ example: 'My Company Ltd' })
  @Column()
  businessName: string;

  @ApiProperty({ example: 'I need it asap' })
  @Column()
  notes: string;

  @ApiProperty({ enum: QuoteStatus, default: QuoteStatus.PENDING })
  @Column({
    type: 'simple-enum',
    enum: QuoteStatus,
    default: QuoteStatus.PENDING,
  })
  status: QuoteStatus;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;

  @ApiProperty({ example: 'user-uuid' })
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => Product, (product) => product.quotes, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ApiProperty({ example: 'product-uuid' })
  @Column()
  productId: string;
}
