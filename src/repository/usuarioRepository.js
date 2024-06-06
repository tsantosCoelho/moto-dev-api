import con from "./connection.js";

export async function criarUsuario(usuario) {
  const { nome, cpf, email, senha } = usuario;

  const comando = `
    INSERT INTO usuarios (nome, cpf, email, senha) 
    VALUES (?, ?, ?, ?)
  `;

  const resposta = await con.query(comando, [nome, cpf, email, senha]);
  const info = resposta[0];

  usuario.id = info.insertId;
  return usuario;
}

export async function listarUsuarios() {
  const comando = `
    SELECT * FROM usuarios
  `;

  const resposta = await con.query(comando);
  return resposta[0];
}

export async function deletarUsuario(usuarioId) {
  const comando = `
    DELETE FROM usuarios
    WHERE id = ?
  `;

  const resposta = await con.query(comando, [usuarioId]);
  return resposta[0].affectedRows > 0;
}

export async function atualizarUsuario(usuarioId, dadosUsuarioAtualizados) {
  const { nome, cpf, email, senha } = dadosUsuarioAtualizados;

  const comando = `
    UPDATE usuarios
    SET nome = ?, cpf = ?, email = ?, senha = ?
    WHERE id = ?
  `;

  const resposta = await con.query(comando, [
    nome,
    cpf,
    email,
    senha,
    usuarioId,
  ]);
  return resposta[0].affectedRows > 0;
}

export async function obterUsuarioPorId(usuarioId) {
  const comando = `
    SELECT * FROM usuarios
    WHERE id = ?
  `;

  const resposta = await con.query(comando, [usuarioId]);
  return resposta[0][0];
}

export async function obterUsuarioPorEmail(email) {
  const comando = `
    SELECT * FROM usuarios
    WHERE email = ?
  `;

  const resposta = await con.query(comando, [email]);
  return resposta[0][0];
}
