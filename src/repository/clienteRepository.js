import con from "./connection.js";

export async function criarCliente(cliente) {
  let { nome, endereco, cpf, telefone, email } = cliente;

  let comando = `
    INSERT INTO clientes (nome, cpf, endereco, telefone, email) 
    VALUES (?, ?, ?, ?, ?)
  `;

  let resp = await con.query(comando, [nome, cpf, endereco, telefone, email]);
  let info = resp[0];

  cliente.id = info.insertId;
  return cliente;
}

export async function listarClientes() {
  let comando = `
    SELECT * FROM clientes
  `;

  let resp = await con.query(comando);
  return resp[0];
}

export async function deletarCliente(clienteId) {
  let comando = `
    DELETE FROM clientes
    WHERE id = ?
  `;

  let resp = await con.query(comando, [clienteId]);
  return resp[0].affectedRows > 0;
}

export async function atualizarCliente(clienteId, dadosClienteAtualizados) {
  const { nome, endereco, cpf, telefone, email } = dadosClienteAtualizados;

  let comando = `
    UPDATE clientes
    SET nome = ?, endereco = ?, cpf = ?, telefone = ?, email = ?
    WHERE id = ?
  `;

  let resp = await con.query(comando, [
    nome,
    endereco,
    cpf,
    telefone,
    email,
    clienteId,
  ]);

  return resp[0].affectedRows > 0;
}

export async function obterClientePorId(clienteId) {
  let comando = `
    SELECT * FROM clientes
    WHERE id = ?
  `;

  let resp = await con.query(comando, [clienteId]);
  return resp[0][0];
}
