const paginate = (countries) => {
  const items = 15;
  const pages = Math.ceil(countries.length / items);
  const newCountries = Array.from({ length: pages }, (_, index) => {
    const start = index * items;
    return countries.slice(start, start + items);
  });
  return newCountries;
};

export default paginate;
