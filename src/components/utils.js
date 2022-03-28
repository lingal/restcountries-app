const pagination = (data) => {
  const itemsPerPage = 15;
  const pages = Math.ceil(data.length / itemsPerPage);
  const newCountries = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  });
  return newCountries;
};

export default pagination;
