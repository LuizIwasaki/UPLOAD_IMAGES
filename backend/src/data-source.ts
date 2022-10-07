import "reflect-metadata";
import { DataSource } from "typeorm";
import { createPost1611190121914 } from "./database/migrations/1665152767256-CreatePostTable";
import { createImage1611196493673 } from "./database/migrations/1665152780088-CreateImageTable";
import { createUser1663943193093 } from "./database/migrations/1663943193093-create_user";
import Image from "./models/Image";
import Post from "./models/Post";
import User from "./models/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "ifsp",
  database: "db_aula",
  synchronize: false,
  logging: false,
  entities: [User,Post,Image],
  migrations: [createUser1663943193093, createImage1611196493673,createPost1611190121914],
  subscribers: [],
});