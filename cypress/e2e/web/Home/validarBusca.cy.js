///<reference types="cypress"/>
import {
  ValidaBusca,
  validaRetornoEmOrdemDeDatas,
} from "../../../support/pages/Home/homeAction";
const validarBusca = new ValidaBusca();
const validarRetornoEmOrdemDeDatas = new validaRetornoEmOrdemDeDatas();

describe("Validar resultados de busca", () => {
  it.skip("Pesquisa por uma palavra-chave e verifica resultados", () => {
    // Desabilitar exceções não capturadas
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    // Carregar a página inicial
    cy.visit("/");

    // Definir a palavra-chave da pesquisa
    const palavraChave = "software";

    // Validar se a página inicial carregou corretamente
    validarBusca.validarPaginaInicialCarregada();

    // Realizar a pesquisa
    validarBusca.validarCampoDePesquisa();
    validarBusca.realizarPesquisa(palavraChave);

    // Validar os resultados da pesquisa
    validarBusca.validarResultadoDaPesquisa(palavraChave);
  });

  it("Deve verificar se as datas estão em ordem", () => {
    // Desabilitar exceções não capturadas
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    // Carregar a página inicial
    cy.visit("/");

    // Definir a palavra-chave da pesquisa
    

    // Validar se a página inicial carregou corretamente
    validarBusca.validarPaginaInicialCarregada();

    // Realizar a pesquisa
    validarBusca.validarCampoDePesquisa();
    validarRetornoEmOrdemDeDatas.realizarPesquisaSemPalavraChave();

    // Validar os resultados da pesquisa
    validarRetornoEmOrdemDeDatas.validarResultadoComAsDatasEmOrdem();
  });
});
