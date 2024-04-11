import { Router } from "express";
import {
  atualizarOrcamento,
  criarOrcamento,
  deletarOrcamento,
  listarOrcamentosPorClienteId,
} from "../repository/orcamentoRepository.js";

let router = Router();

router.post("/orcamento/cadastrar", async (req, resp) => {
  let {
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
  } = req.body;

  if (
    !servico ||
    !marca ||
    !moto ||
    !ano ||
    !dataEntrada ||
    !dataRetiradaPrevisao ||
    !valor ||
    !tipoPagamento ||
    !clienteId
  ) {
    return resp
      .status(400)
      .send(
        "Solicitação inválida. Verifique os dados enviados e tente novamente."
      );
  }

  let budget = await criarOrcamento({
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
  });

  return resp.status(201).send(budget);
});

router.get("/orcamento/listar/:clientId", async (req, resp) => {
  let clientId = req.params.clientId;
  let budgets = await listarOrcamentosPorClienteId(clientId);
  return resp.status(200).send(budgets);
});

router.delete("/orcamento/:id", async (req, resp) => {
  let budgetId = req.params.id;
  let deleteStatus = await deletarOrcamento(budgetId);

  if (!deleteStatus) {
    return resp
      .status(400)
      .send("Solicitação inválida. Verifique o id, e tente novamente");
  }

  return resp.status(200).send("Orçamento excluído com sucesso.");
});

router.put("/orcamento/:id", async (req, resp) => {
  let budgetId = req.params.id;
  let updatedBudgetData = req.body;

  if (!updatedBudgetData) {
    return resp
      .status(400)
      .send(
        "Solicitação inválida. Verifique os dados enviados e tente novamente."
      );
  }

  let updateStatus = await atualizarOrcamento(budgetId, updatedBudgetData);

  if (!updateStatus) {
    return resp
      .status(400)
      .send("Solicitação inválida. Verifique o id, e tente novamente");
  }

  return resp.status(200).send("Orçamento atualizado com sucesso.");
});

export default router;
