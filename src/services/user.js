import jwt from 'jsonwebtoken'
// sem o banco.
let users = []

const PASS = process.env.JWT_LKT_SECRET

function createToken(user) {
  return jwt.sign({ email: user.email, name: user.name }, PASS, { expiresIn: '1h'})
}

function readToken(token) {
  try {
    return jwt.verify(token, PASS)

  } catch (err) {
    throw new Error('Token inválido')
  }
}

//verificar se o token existe
export function validToken(token) {
  return readToken(token)
}


//cadastrar
export function signup(body) { 
  // find => função de array para buscar dados
  const user = users.find(({ email }) => email === body.email)
  if (user) throw new Error('Usuário(a) já cadastrado(a)')

// com banco de dados
// user.create(body)...
  users.push(body)

  const token = createToken(body)
  return token
}

 //login
export function signin(body) {
  const user = users.find(({ email }) => email === body.email)
  if (!user) throw new Error('Usuário(a) não encontrado(a)')
  if (user.password !== body.password) throw new Error('Senha incorreta')

  const token = createToken(user)
  return token
}