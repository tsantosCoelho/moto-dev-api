import {
  criarUsuario,
  listarUsuarios,
  obterUsuarioPorId,
  deletarUsuario,
  atualizarUsuario,
  obterUsuarioPorCpf,
} from "../repository/usuarioRepository.js";

import { Router } from "express";
let router = Router();

router.post("/usuario/cadastrar", async (req, resp) => {
  let { nome, cpf, email, senha } = req.body;

  if (!nome || !cpf || !senha || !email) {
    return resp
      .status(400)
      .send(
        "Solicitação inválida. Verifique os dados enviados e tente novamente."
      );
  }

  let client = await criarUsuario({
    nome,
    cpf,
    senha,
    email,
  });

  return resp.status(201).send(client);
});

router.get("/usuario/listar", async (req, resp) => {
  let clients = await listarUsuarios();
  return resp.status(200).send(clients);
});

router.get("/usuario/:id", async (req, resp) => {
  let idClient = req.params.id;
  let client = await obterUsuarioPorId(idClient);

  if (!client) {
    return resp
      .status(400)
      .send(
        "Solicitação inválida. Verifique os dados enviados e tente novamente."
      );
  }

  return resp.status(200).send(client);
});

router.delete("/usuario/:id", async (req, resp) => {
  let idClient = req.params.id;
  let deleteStatus = await deletarUsuario(idClient);

  if (!deleteStatus) {
    return resp
      .status(400)
      .send("Solicitação inválida. Verifique o id, e tente novamente");
  }

  return resp.status(200);
});

router.put("/usuario/:id", async (req, resp) => {
  let idClient = req.params.id;
  let dataClient = req.body;

  if (
    !dataClient.nome ||
    !dataClient.cpf ||
    !dataClient.senha ||
    !dataClient.email
  ) {
    return resp
      .status(400)
      .send(
        "Solicitação inválida. Verifique os dados enviados e tente novamente."
      );
  }

  let updateStatus = await atualizarUsuario(dataClient, idClient);

  if (!updateStatus) {
    return resp
      .status(400)
      .send("Solicitação inválida. Verifique o id, e tente novamente");
  }

  return resp.status(200);
});

router.post("/login", async (req, res) => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).send("Email e senha são obrigatórios.");
  }

  try {
    const user = await obterUsuarioPorCpf(email);

    if (!user) {
      return res.status(404).send("Usuário não encontrado.");
    }

    if (user.senha !== senha) {
      return res.status(401).send("Senha incorreta.");
    }

    return res.status(200).send("Usuário logado com sucesso.");
  } catch (error) {
    return res.status(500).send("Erro no servidor");
  }
});

export default router;
