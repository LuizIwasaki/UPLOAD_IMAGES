import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../data-source";
import Post from "../models/Post";

export default {
  async index(request: Request, response: Response) {
    const postRepository = AppDataSource.getRepository(Post);

    const posts = await postRepository.find({
      relations: ["images"],
    });

    response.json(posts);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
      where: {
        id: +id,
      },
      // relations: ["images"],
      relations: { images: true }, // trás as imagens
    });

    console.log(post);

    response.json(post);
  },

  async create(request: Request, response: Response) {
    //desestruturar o corpo da requisição (JSON)
    console.log(request.body);
    console.log(request.files);

    const { message } = request.body; // tem que usar o mesmo nome da classe Post

    const postRepository = AppDataSource.getRepository(Post);

    const requestImagens = request.files as Express.Multer.File[]; // Recebe vetor de arquivos.

    const images = requestImagens.map((image) => { //Percorre cada objeto do array e retorna a imagem formatada
      return { path: image.filename }; // caminho da imagem.
    });

    const post = postRepository.create({
      message, // se caso o nome do atributo fosse diferente poderia colocar o nome do atributo na frente
      images,
    });

    await postRepository.save(post);

    return response.status(StatusCodes.CREATED).json(post);
  },
};
