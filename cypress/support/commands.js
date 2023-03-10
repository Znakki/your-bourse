const { apiVersion, uriRoutes } = require('./constants.js');
Cypress.Commands.add('hitEndpointById', (selector) => {
  cy.get(selector).click();
});

Cypress.Commands.add('findPetsByTags', (tags) => {
  cy.request({
    url: apiVersion + uriRoutes.searchPetByTag.path,
    qs: { tags: tags },
  });
});
