const { uriRoutes, apiVersion } = require('./../support/constants.js');
const randomString = require('randomstring');
const { createPetBody } = require('../utils/utils.js');
const name = randomString.generate();
const categoryName = randomString.generate();
const randomTag = randomString.generate();
const randomTags = [randomString.generate(), randomString.generate()]; // WHAT ABOUT RECURSION

describe('Scenario#1 e2e via API request - Basic case to cover creating a pet, getting a request', () => {
  it('User creates a pet and then get a result of it by tagName with updating tags case', () => {
    cy.request(
      uriRoutes.createPet.method,
      apiVersion + uriRoutes.createPet.path,
      createPetBody({
        categoryName,
        name,
        tags: [
          {
            name: randomTag,
          },
        ],
      }),
    ).then(({ body, status }) => {
      // response.body is automatically serialized into JSON
      expect(body.id).eq(10);
      expect(body.category.name).eq(categoryName);
      expect(body.category.id).eq(1);
      expect(body.tags[0].name).eq(randomTag);
      expect(body.status).eq('available');
      expect(status).eq(200);
    });

    cy.request({
      url: apiVersion + uriRoutes.searchPetByTag.path,
      qs: { tags: randomTag },
    }).then(({ body, status }) => {
      const pathToFirstTag = body[0];
      expect(pathToFirstTag.id).eq(10);
      expect(pathToFirstTag.category.name).eq(categoryName);
      expect(pathToFirstTag.category.id).eq(1);
      expect(pathToFirstTag.tags[0].name).eq(randomTag);
      expect(pathToFirstTag.status).eq('available');
      expect(status).eq(200);
    });

    cy.request(
      uriRoutes.updateExistingPet.method,
      apiVersion + uriRoutes.updateExistingPet.path,
      createPetBody({
        categoryName,
        name,
        tags: randomTags.map((tag) => {
          return {
            name: tag,
          };
        }),
      }),
    ).then(({ body, status }) => {
      // response.body is automatically serialized into JSON
      expect(body.id).eq(10);
      expect(body.category.name).eq(categoryName);
      expect(body.category.id).eq(1);
      const res = body.tags.every((tag) => {
        return randomTags.includes(tag.name);
      });
      expect(res).eq(true);
      expect(body.status).eq('available');
      expect(status).eq(200);
    });

    // tried to use cypress approach to make a call via commands feature
    cy.findPetsByTags(randomTags[0]).then(({ body, status }) => {
      const pathToFirstTag = body[0];
      expect(pathToFirstTag.id).eq(10);
      expect(pathToFirstTag.category.name).eq(categoryName);
      expect(pathToFirstTag.category.id).eq(1);
      expect(pathToFirstTag.tags[0].name).eq(randomTags[0]);
      expect(pathToFirstTag.tags[1].name).eq(randomTags[1]);
      expect(pathToFirstTag.status).eq('available');
      expect(status).eq(200);
    });
  });
});
