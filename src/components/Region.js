const Region = (props) => {
  const { data, region, filterName} = props;
  const regions = new Set(data.map((item) => item.region));

  return (
    <>
      <label>
        {filterName}: &nbsp;
        <select onChange={(e) => region(e.target.value)}>
          <option value="all">All</option>
          {[...regions].map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
};

export default Region;
