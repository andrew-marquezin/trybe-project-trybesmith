const validRequest = {
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  userId: 1,
}

const noNameRequest = {
  name: null,
  price: "30 peças de ouro",
  userId: 1,
}

const noPriceRequest = {
  name: "Martelo de Thor",
  price: null,
  userId: 1,
}

const noUserIdRequest = {
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  userId: null,
}

const invalidUserIdRequest = {
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  userId: 9999,
}

export default {
  validRequest,
  noNameRequest,
  noPriceRequest,
  noUserIdRequest,
  invalidUserIdRequest,
}