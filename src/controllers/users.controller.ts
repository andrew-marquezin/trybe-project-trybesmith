import { Request, Response } from 'express';
import usersService from '../services/users.service';

async function list(_req: Request, res: Response) {
  const serviceResponse = await usersService.list();

  res.status(200).json(serviceResponse.data);
}

export default {
  list,
};