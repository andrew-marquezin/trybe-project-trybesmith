import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import productsMock from '../../mocks/products.mock'
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Ao não receber um name, retorne um erro', async function (){
    const requestBody = productsMock.noNameRequest;

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"Name" is required' });
  });
  it('ao não receber um price, retorne um erro', async function () {
    const requestBody = productsMock.noPriceRequest;

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"Price" is required' });
  });
  it('ao não receber um userId, retorne um erro', async function () {
    const requestBody = productsMock.noUserIdRequest;

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"UserId" is required' });
  });
  it('ao receber um body válido, retorne o produto criado', async function () {
    const requestBody = productsMock.validRequest;
    const mockCreateReturn = ProductModel.build(requestBody);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(201);
    expect(response.body).to.be.deep.equal(mockCreateReturn.dataValues);
  });
});
