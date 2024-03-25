import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import loginMock from '../../mocks/login.mock';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Ao não receber um username, retorne um erro', async function () {
    const requestBody = loginMock.noUsernameLoginBody;

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"username" and "password" are required' });
  });
  
  it('Ao não receber um password, retorne um erro', async function () {
    const requestBody = loginMock.noPasswordLoginBody;

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"username" and "password" are required' });
  });

  it('Ao não encontrar o username, retorne um erro', async function () {
    const requestBody = loginMock.invalidUserLoginBody;
    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Username or password invalid' });
  });

  it('Ao não receber uma password errada, retorne um erro', async function () {
    const requestBody = loginMock.wrongPasswordLoginBody;
    const mockFindOneReturn = UserModel.build(loginMock.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Username or password invalid' });
  });

  it('Ao receber os campos válidos, retorne um token', async function () {
    const requestBody = loginMock.validLoginBody;
    const mockFindOneReturn = UserModel.build(loginMock.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.key('token');
  });
});
