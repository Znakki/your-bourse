export const createPetBody = ({ categoryName, mainName, tags }) => {
  return {
    id: 10,
    name: mainName,
    category: {
      id: 1,
      name: categoryName,
    },
    photoUrls: ['string'],
    tags: tags,
    status: 'available',
  };
};
