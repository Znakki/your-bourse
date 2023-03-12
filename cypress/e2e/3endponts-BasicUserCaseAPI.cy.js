const { uriRoutes, apiVersion } = require('./../support/constants.js');
const randomString = require('randomstring');
const { createPetBody } = require('../utils/utils.js');
const name = randomString.generate();
const categoryName = randomString.generate();
const randomTag = randomString.generate();
const randomTags = [randomString.generate(), randomString.generate()]; // WHAT ABOUT RECURSION

const repeatedExpects = ({ path, status }) => {
  expect(path.id).to.eq(10);
  expect(path.category.name).to.eq(categoryName);
  expect(status).to.eq(200);
  expect(path.status).to.eq('available');
  expect(path.category.id).to.eq(1);
};

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
      repeatedExpects({ path: body, status: status });
      expect(body.tags[0].name).to.eq(randomTag);
    });

    cy.request({
      url: apiVersion + uriRoutes.searchPetByTag.path,
      qs: { tags: randomTag },
    }).then(({ body, status }) => {
      const pathToFirstTag = body[0];
      repeatedExpects({ path: pathToFirstTag, status: status });
      expect(pathToFirstTag.tags[0].name).to.eq(randomTag);
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
      repeatedExpects({ path: body, status: status });
      const res = body.tags.every((tag) => {
        return randomTags.includes(tag.name);
      });
      expect(res).to.eq(true);
    });

    // tried to use cypress approach to make a call via commands feature
    cy.findPetsByTags(randomTags[0]).then(({ body, status }) => {
      const pathToFirstTag = body[0];
      repeatedExpects({ path: pathToFirstTag, status: status });
      expect(pathToFirstTag.tags[0].name).to.eq(randomTags[0]);
      expect(pathToFirstTag.tags[1].name).to.eq(randomTags[1]);
    });
  });
});
