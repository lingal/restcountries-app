const Area = (props) => {
  const { data, filterName, areaSize } = props;

  return (
    <>
      <label>
        {filterName}: &nbsp;
        <select onChange={(e) => {
          areaSize(e.target.value)
        }}>
          <option value="all">All</option>
          {data.map((item) => {
            return (
              <option key={item.name} value={item.area}>
                {item.name}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
};

export default Area;
