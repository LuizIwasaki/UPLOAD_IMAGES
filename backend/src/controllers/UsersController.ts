import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";

export default {
  async create(request: Request, response: Response) {
    //desestruturar o corpo da requisição (JSON)
    const { nome, salario } = request.body;

    const userRepository = AppDataSource.getRepository(User);

    const user = userRepository.create({
      nome,
      salario,
    });

    await userRepository.save(user);

    return response.status(StatusCodes.ACCEPTED).json(user);
  },
  async index(request: Request, response: Response) {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    response.json(users);
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
      id: +id,
    });

    response.json(user);
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
      id: +id,
    });

    if (user) {
      await userRepository.remove(user);
      return response.status(StatusCodes.NO_CONTENT).json(user);
    }
    response.status(StatusCodes.NOT_FOUND).json();
  },
};
