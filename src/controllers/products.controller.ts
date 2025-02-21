import { Request, Response } from 'express';
import productService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response) {
  const { name, price, userId } = req.body;
  const serviceResponse = await productService.create({ name, price, userId });

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  res.status(201).json(serviceResponse.data);
}

async function list(_req: Request, res: Response) {
  const serviceResponse = await productService.list();

  res.status(200).json(serviceResponse.data);
}

export default {
  create,
  list,
};