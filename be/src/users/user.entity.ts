import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { User as UserInterface } from '@clerk/clerk-sdk-node';
import { Role } from '../roles/roles.entity';

@Entity()
export class User implements Partial<UserInterface> {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  username: string | null;

  @Column()
  email1: string;

  @Column({ nullable: true })
  email2: string | null;

  @Column({ nullable: true })
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

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
