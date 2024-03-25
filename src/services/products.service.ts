import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

function validateParams({ name, price, userId }: ProductInputtableTypes): string | null {
  if (!name) return '"name" is required';
  if (!price) return '"price" is required';
  if (!userId) return '"userId" is required';
  return null;
}

function checkFieldsPart2({ name, price }: ProductInputtableTypes): string | null {
  if (typeof (name) !== 'string') return '"name" must be a string';
  if (name.length < 3) return '"name" length must be at least 3 characters long';

  if (typeof (price) !== 'string') return '"price" must be a string';
  if (price.length < 3) return '"price" length must be at least 3 characters long';

  return null;
}

async function checkFields({
  name,
  price,
  userId,
}: ProductInputtableTypes): Promise<string | null> {
  const part2 = checkFieldsPart2({ name, price, userId });
  if (part2) return part2;

  if (typeof (userId) !== 'number') return '"userId" must be a number';

  const verifyUser = await ProductModel.findOne({ where: { userId } });
  if (!verifyUser) return '"userId" not found';

  return null;
}

async function create(
  product: ProductInputtableTypes,
): Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;

  const error = validateParams(product);

  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  const productError = await checkFields(product);

  if (productError) {
    responseService = { status: 'UNPROCESSABLE_CONTENT', data: { message: productError } };
    return responseService;
  }

  const newProduct = await ProductModel.create(product);

  responseService = { status: 'SUCCESSFUL', data: newProduct.dataValues };
  return responseService;
}

async function list(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: products };
}

export default {
  create,
  list,
};