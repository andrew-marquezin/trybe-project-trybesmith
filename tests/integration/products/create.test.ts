import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import productsMock from '../../mocks/products.mock'
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Ao não receber um name, retorne um erro', async function () {
    const requestBody = productsMock.noNameRequest;

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"name" is required' });
  });

  it('ao não receber um price, retorne um erro', async function () {
    const requestBody = productsMock.noPriceRequest;

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"price" is required' });
  });

  it('ao não receber um userId, retorne um erro', async function () {
    const requestBody = productsMock.noUserIdRequest;

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"userId" is required' });
  });
  
  it('ao receber um body válido, retorne o produto criado', async function () {
    const requestBody = productsMock.validRequest;
    const mockCreateReturn = ProductModel.build(requestBody);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(201);
    expect(response.body).to.be.deep.equal(mockCreateReturn.dataValues);
  });

  it('ao receber um name curto, retorne um erro', async function () {
    const requestBody = productsMock.shortNameRequest;
    const mockCreateReturn = ProductModel.build(requestBody);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal({ message: '"name" length must be at least 3 characters long' });
  });
  it('ao receber um price curto, retorne um erro', async function () {
    const requestBody = productsMock.shortPriceRequest;
    const mockCreateReturn = ProductModel.build(requestBody);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal({ message: '"price" length must be at least 3 characters long' });
  });
  it('ao não receber uma string de nome, retorne um erro', async function () {
    const requestBody = productsMock.numberNameRequest;

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal({ message: '"name" must be a string' });
  });
  it('ao não receber uma string de price, retorne um erro', async function () {
    const requestBody = productsMock.numberPriceRequest;

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal({ message: '"price" must be a string' });
  });
  it('ao não receber um number userId, retorne um erro', async function () {
    const requestBody = productsMock.stringUserIdRequest;

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal({ message: '"userId" must be a number'});
  });

  it('ao receber um userId inexistente, retorne um erro', async function () {
    const requestBody = productsMock.invalidUserIdRequest;
    const mockCreateReturn = ProductModel.build(requestBody);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(422);
    expect(response.body).to.be.deep.equal({ message: '"userId" not found'});
  });
});
