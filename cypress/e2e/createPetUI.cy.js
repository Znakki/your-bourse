const SwaggerUISelectors = {
  ADD_PET: '#operations-pet-addPet',
};
const { createPetBody } = require('../utils/utils.js');
const randomString = require('randomstring');
const categoryName = randomString.generate();
const randomTag = randomString.generate();
const getBasicBody = createPetBody({
  categoryName,
  name,
  tags: [
    {
      name: randomTag,
    },
  ],
});
describe('Scenario 1 via Swagger UI - Basic case to cover creating a pet', () => {
  it('Create a pet', { baseUrl: 'https://petstore3.swagger.io/' }, () => {
    cy.visit('/');
    cy.hitEndpointById(SwaggerUISelectors.ADD_PET);
    cy.get(`${SwaggerUISelectors.ADD_PET} div.try-out button`).click();
    cy.get(`${SwaggerUISelectors.ADD_PET} div.body-param`).clear();
    cy.log(JSON.stringify(getBasicBody));
    cy.get(`${SwaggerUISelectors.ADD_PET} div.body-param`).type(JSON.stringify(getBasicBody), {
      parseSpecialCharSequences: false,
    });
    cy.get(`${SwaggerUISelectors.ADD_PET} div.execute-wrapper button.execute`).click();
    cy.contains(
      `${SwaggerUISelectors.ADD_PET} table.responses-table.live-responses-table tbody div.highlight-code`,
      randomTag,
    );
    cy.contains(
      `${SwaggerUISelectors.ADD_PET} table.responses-table.live-responses-table tbody div.highlight-code`,
      categoryName,
    );
    // I planed to automate calls APIs via Swagger UI by mistake
  });
});
