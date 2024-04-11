import con from "./connection.js";

export async function criarOrcamento(orcamento) {
  const {
    servico,
    marca,
    moto,
    ano,
    dataEntrada,
    dataRetiradaPrevisao,
    valor,
    desconto,
    valorFinal,
    tipoPagamento,
    clienteId,
  } = orcamento;

  const comando = `
    INSERT INTO orcamentos (servico, marca, moto, ano, dataEntrada, dataRetiradaPrevisao, valor, desconto, valorFinal, tipoPagamento, clienteId) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const resp = await con.query(comando, [
    servico,
    marca,
    moto,
    ano,
    dataEntrada,
    dataRetiradaPrevisao,
    valor,
    desconto,
    valorFinal,
    tipoPagamento,
    clienteId,
  ]);
  const info = resp[0];

  orcamento.id = info.insertId;
  return orcamento;
}

export async function listarOrcamentosPorClienteId(clienteId) {
  const comando = `
    SELECT * FROM orcamentos
    WHERE clienteId = ?
  `;

  const resp = await con.query(comando, [clienteId]);
  return resp[0];
}

export async function deletarOrcamento(orcamentoId) {
  const comando = `
    DELETE FROM orcamentos
    WHERE id = ?
  `;

  const resp = await con.query(comando, [orcamentoId]);
  return resp[0].affectedRows > 0;
}

export async function atualizarOrcamento(
  orcamentoId,
  dadosOrcamentoAtualizados
) {
  const {
    servico,
    marca,
    moto,
    ano,
    dataEntrada,
    dataRetiradaPrevisao,
    valor,
    desconto,
    valorFinal,
    tipoPagamento,
    clienteId,
  } = dadosOrcamentoAtualizados;

  const comando = `
    UPDATE orcamentos
    SET servico = ?, marca = ?, moto = ?, ano = ?, dataEntrada = ?, dataRetiradaPrevisao = ?, valor = ?, desconto = ?, valorFinal = ?, tipoPagamento = ?, clienteId = ?
    WHERE id = ?
  `;

  const resp = await con.query(comando, [
    servico,
    marca,
    moto,
    ano,
    dataEntrada,
    dataRetiradaPrevisao,
    valor,
    desconto,
    valorFinal,
    tipoPagamento,
    clienteId,
    orcamentoId,
  ]);
  return resp[0].affectedRows > 0;
}
