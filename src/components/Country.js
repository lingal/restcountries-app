const Country = (props) => {
  const { name, region, area } = props;

  return (
    <article className="country">
      <h4>{name}</h4>
      <p>{region}</p>
      <p>{area}</p>
    </article>
  );
};

export default Country;
