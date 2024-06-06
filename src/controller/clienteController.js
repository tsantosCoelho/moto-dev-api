import {
  criarCliente,
  listarClientes,
  obterClientePorId,
  deletarCliente,
  atualizarCliente,
} from "../repository/clienteRepository.js";
import { Router } from "express";
let router = Router();

router.post("/cliente/cadastrar", async (req, resp) => {
  let { nome, endereco, cpf, telefone, email } = req.body;

  if (!nome || !endereco || !cpf || !telefone || !email) {
    return resp
      .status(400)
      .send(
        "Solicitação inválida. Verifique os dados enviados e tente novamente."
      );
  }

  let client = await criarCliente({
    nome,
    endereco,
    cpf,
    telefone,
    email,
  });

  return resp.status(201).send(client);
});

router.get("/cliente/listar", async (req, resp) => {
  let clients = await listarClientes();
  return resp.status(200).send(clients);
});

router.get("/cliente/:id", async (req, resp) => {
  let idClient = req.params.id;
  let client = await obterClientePorId(idClient);

  if (!client) {
    return resp
      .status(400)
      .send(
        "Solicitação inválida. Verifique os dados enviados e tente novamente."
      );
  }

  return resp.status(200).send(client);
});

router.delete("/cliente/:id", async (req, resp) => {
  let idClient = req.params.id;
  let deleteStatus = await deletarCliente(idClient);

  if (!deleteStatus) {
    return resp
      .status(400)
      .send("Solicitação inválida. Verifique o id, e tente novamente");
  }

  return resp.status(200).send("sucesso");
});

router.put("/cliente/:id", async (req, resp) => {
  let idClient = req.params.id;
  let dataClient = req.body;
  
  if (
    !dataClient.nome ||
    !dataClient.endereco ||
    !dataClient.cpf ||
    !dataClient.telefone ||
    !dataClient.email
  ) {
    return resp
      .status(400)
      .send(
        "Solicitação inválida. Verifique os dados enviados e tente novamente."
      );
  }

  let updateStatus = await atualizarCliente(idClient,dataClient);

  if (!updateStatus) {
    return resp
      .status(400)
      .send("Solicitação inválida. Verifique o id, e tente novamente");
  }

  return resp.status(200).send("cliente atualizado com sucesso");
});

export default router;
