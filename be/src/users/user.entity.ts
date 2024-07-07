import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { User as UserInterface } from '@clerk/clerk-sdk-node';
import { Role } from 'src/roles/roles.entity';
import { IsEmail, Length } from 'class-validator';

@Entity()
export class User implements Partial<UserInterface> {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  @Length(3, 50)
  username: string | null;

  @Column()
  @IsEmail()
  @Index()
  email1: string;

  @Column({ nullable: true })
  @IsEmail()
  email2: string | null;

  @Column({ nullable: true })
  @IsEmail()
  email3: string | null;

  @Column({ default: false })
  hasImage: boolean;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  firstName: string | null;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: false })
  passwordEnabled: boolean;

  @ManyToMany(() => Role, { cascade: ['insert', 'update'] })
  @JoinTable()
  roles: Role[];

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseInt(value),
    },
  })
  createdAt: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseInt(value),
    },
  })
  updatedAt: number;

  @Column({ default: false })
  isDeleted: boolean;
}
