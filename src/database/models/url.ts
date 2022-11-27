import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToOne,
} from "typeorm";
import { Visit } from "./visit";

@Entity()
export class ShortURL {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  source: string;

  @OneToOne(() => Visit, (visit) => visit.shortURL, { cascade: true })
  visit: Visit;

  @Index({ unique: true })
  @Column()
  code: string;
}
