///<reference types="cypress"/>
import {
  ValidaBusca,
  validaRetornoEmOrdemDeDatas,
} from "../../../support/pages/Home/homeAction";
const validarBusca = new ValidaBusca();
const validarRetornoEmOrdemDeDatas = new validaRetornoEmOrdemDeDatas();

describe("Validar resultados de busca", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("/");
    validarBusca.validarPaginaInicialCarregada();
  });
  it("Pesquisa por uma palavra-chave e verifica resultados", () => {
    const palavraChave = "software";
    validarBusca.validarCampoDePesquisa();
    validarBusca.realizarPesquisa(palavraChave);

    validarBusca.validarResultadoDaPesquisa(palavraChave);
  });
  it("Deve verificar se as datas estão em ordem", () => {
    validarBusca.validarCampoDePesquisa();
    validarRetornoEmOrdemDeDatas.realizarPesquisaSemPalavraChave();

    validarRetornoEmOrdemDeDatas.validarResultadoComAsDatasEmOrdem();
  });
});
