import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Image from "./Image";

@Entity("post")
export default class Post {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  message: string;

  @OneToMany(() => Image, (image) => image.post, {
    cascade: ["insert", "update", "remove"],
  })
  images: Image[];
}
