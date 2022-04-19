const Pages = (props) => {
  const { pages, pageChange } = props;

  return (
    <div className="pages-container">
      {pages.map((_, idx) => {
        return (
          <button key={idx} onClick={() => pageChange(idx)}>
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pages;
