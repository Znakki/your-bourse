module.exports = {
  apiVersion: '/v3',
  selectors: {
    createPet: '#operations-pet-addPet',
    updateExistingPet: '#operations-pet-updatePet',
    searchPetByTag: '#operations-pet-findPetsByTags',
  },
  uriRoutes: {
    createPet: { method: 'POST', path: '/pet' },
    updateExistingPet: { method: 'PUT', path: '/pet' },
    searchPetByTag: { method: 'GET', path: '/pet/findByTags' },
  },
};
