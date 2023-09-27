import { ELEMENTS } from "./elements.js";

const moment = require("moment");

export class ValidaBusca {
  validarPaginaInicialCarregada() {
    cy.get(ELEMENTS.iconePesquisa).should("be.visible");
    cy.get(ELEMENTS.logotipoCabecalho).should("be.visible");
    cy.get(ELEMENTS.itensMenuSocial)
      .should("be.visible")
      .should("have.length", 3);
    cy.get(ELEMENTS.itensMenuPrincipal).should("be.visible");
  }

  validarCampoDePesquisa() {
    cy.get(ELEMENTS.iconePesquisa).click();
    cy.get(ELEMENTS.caixaPesquisaDesktop).should("be.visible");
    cy.get(ELEMENTS.inputPesquisaDesktop).should("be.visible");
    cy.get(ELEMENTS.botaoEnviarPesquisaDesktop).should("be.visible");
  }

  realizarPesquisa(palavraChave) {
    cy.get(ELEMENTS.inputPesquisaDesktop).type(palavraChave);
    cy.get(ELEMENTS.botaoEnviarPesquisaDesktop).click();
  }

  validarResultadoDaPesquisa(palavraChave) {
    cy.url().should("include", `?s=${palavraChave}`);
    cy.get(ELEMENTS.rotuloResultado).contains(palavraChave);
    cy.get(ELEMENTS.listaDeArtigos).should("have.length.at.least", 1);
  }
}

export class validaRetornoEmOrdemDeDatas {
  realizarPesquisaSemPalavraChave() {
    cy.get(ELEMENTS.botaoEnviarPesquisaDesktop).click();
  }

  validarResultadoComAsDatasEmOrdem() {
    cy.get(".entry-date").then((dates) => {
      const dateTexts = [];

      dates.each((index, date) => {
        const dateText = date.textContent;
        dateTexts.push(dateText);

        cy.log(`Elemento ${index + 1}: ${dateText}`);
      });

      const datesArray = dateTexts.map((dateText) => {
        const momentDate = moment(dateText, "DD-MM-YYYY");

        return momentDate.toDate();
      });
      datesArray.forEach((date, index) => {
        cy.log(`Data ${index + 1}: ${date.toDateString()}`);
      });

      function assertDatesEmOrdemDecrescente(datesArray) {
        for (let i = 0; i < datesArray.length - 1; i++) {
          const currentDate = datesArray[i];
          const nextDate = datesArray[i + 1];

          if (!(currentDate > nextDate)) {
            throw new Error(
              `Datas não estão em ordem decrescente: ${currentDate} não é maior que ${nextDate}`
            );
          }
        }
      }
      try {
        assertDatesEmOrdemDecrescente(datesArray);
        cy.log("Todas as datas estão em ordem decrescente.");
      } catch (error) {
        cy.log(error.message);
      }
    });
  }
}
