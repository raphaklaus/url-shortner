import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ShortURL } from "./url";

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ShortURL, (shortURL) => shortURL.visit)
  @JoinColumn()
  shortURL: ShortURL;

  @Column()
  count: number;
}
