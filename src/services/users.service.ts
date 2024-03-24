import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { UserResponse } from '../types/ServiceResponse';

async function list(): Promise<UserResponse> {
  const users = await UserModel.findAll({
    attributes: ['username'],
    include: [{ model: ProductModel, as: 'productIds', attributes: ['id'] }],
  });

  const editionStep = users.map((user) => user.dataValues);
  const data = editionStep.map((user) => ({
    username: user.username,
    productIds: user.productIds?.map((product) => product.id),
  }));

  return { status: 'SUCCESSFUL', data };
}

export default {
  list,
};