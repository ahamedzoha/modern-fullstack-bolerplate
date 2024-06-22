import { Column, Entity, PrimaryColumn } from 'typeorm';
import { User as UserInterface } from '@clerk/clerk-sdk-node';

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
}
