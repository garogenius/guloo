import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  profileImage?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('text')
  review: string;

  @Column('int')
  rating: number;

  @Column()
  tenant: 'nattypay' | 'valarpay';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
