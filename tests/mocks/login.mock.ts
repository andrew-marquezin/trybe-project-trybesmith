const validUsername = 'Hagar'
const validPassword = 'terrível'
const hashedPassword = '$2a$10$L2Q2bUhOIUfuW9c/cT5q3uy8kNAtXCc4Cfo7CB6dDiA8RaJL8.Wke';

const existingUser = {
  id: 1,
  username: validUsername,
  vocation: 'Guerreiro',
  level: 10,
  password: hashedPassword,
};

const validLoginBody = {
  username: validUsername,
  password: validPassword,
};

const noUsernameLoginBody = {
  username: '',
  password: validPassword,
};

const noPasswordLoginBody = {
  username: validUsername,
  password: '',
};

const invalidUserLoginBody = {
  username: 'Jorgin',
  password: validPassword,
};

const wrongPasswordLoginBody = {
  username: validUsername,
  password: 'sortudo',
};

export default {
  existingUser,
  validLoginBody,
  noUsernameLoginBody,
  noPasswordLoginBody,
  invalidUserLoginBody,
  wrongPasswordLoginBody,
};