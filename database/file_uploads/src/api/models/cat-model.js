const cats = [
  {
    cat_id: 1,
    name: 'Matti',
    birthdate: '2020-01-01',
    weight: 5,
    owner: 'Ilkka',
    image: 'https://loremflickr.com/320/240/cat'
  }
];

const listAllCats = () => {
  return cats;
};

const findCatById = (id) => {
  return cats.find((cat) => cat.cat_id === Number(id));
};

const addCat = (cat) => {
  const newCat = {
    ...cat,
    cat_id: cats.length + 1
  };

  cats.push(newCat);
  return newCat;
};

export { addCat, findCatById, listAllCats };