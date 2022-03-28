import { useState, useEffect } from 'react';
import FirstResponse from './components/Fetch';
import pagination from './components/utils';
import Header from './components/Header';
import Country from './components/Country';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';

function App() {
  const { data, loading, setData, data2, reset } = FirstResponse();
  const [pages, setPages] = useState([0]);
  const [count, setCount] = useState(0);
  const [reversed, setReversed] = useState(false);
  const [filter, setFilter] = useState(null);
  const [region, setRegion] = useState(null);
  const regions = new Set(data2.map((item) => item.region));

  useEffect(() => {
    if (reversed) {
      const descData = data.sort((a, b) => b.name.localeCompare(a.name));
      setData(descData);
    }
    if (!reversed) {
      const ascData = data.sort((a, b) => a.name.localeCompare(b.name));
      setData(ascData);
    }

    if (filter) {
      if (data2.length >= 250) {
        const filterByArea = data2.filter((item) => {
          if (item.area) {
            return item.area < Number(filter);
          } else {
            return [];
          }
        });
        setData(filterByArea);
        setFilter(false);
      } else {
        setData(data);
      }
    }

    if (region) {
      const filterByRegion = data2.filter((item) => item.region === region);
      setData(filterByRegion);
      setRegion(false);
    }
    setPages(pagination(data));
  }, [data, reversed, setData, filter, data2, region]);

  if (loading) return <h1>loading...</h1>;

  const nextPage = () => {
    setCount((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > pages.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };

  const prevPage = () => {
    setCount((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = pages.length - 1;
      }
      return prevPage;
    });
  };

  return (
    <>
      <Header data={() => setReversed(reversed ? false : true)}>
        <div className="filters">
          <label htmlFor="area-input">Show smaller countries than:</label>
          <select
            id="area-input"
            onChange={(e) => setFilter(e.currentTarget.value)}
          >
            <option>choose country</option>
            {data2.map((item, id) => (
              <option key={id} value={item.area}>
                {item.name}
              </option>
            ))}
          </select>
          <label htmlFor="region-input"> Sort by region:</label>
          <select
            id="region-input"
            onChange={(e) => setRegion(e.currentTarget.value)}
          >
            <option>choose region</option>
            {[...regions].map((region, id) => (
              <option key={id}>{region}</option>
            ))}
          </select>
        </div>

        <button
          className={`button ${
            region !== null || filter !== null ? 'show-reset' : 'reset'
          }`}
          onClick={() => {
            setData(reset);
            setRegion(null);
            setFilter(null);
          }}
        >
          Reset
        </button>
      </Header>

      <div className="countries-container">
        <button onClick={() => prevPage()} className="prev-btn">
          <FontAwesomeIcon icon={faLessThan} />
        </button>
        <button className="prev-next" onClick={() => nextPage()}>
          <FontAwesomeIcon icon={faGreaterThan} />
        </button>
        <div className="pages-display">
          <p>
            <span>{count + 1}</span> /<span> {pages.length}</span>
          </p>
        </div>
        {pages[count].map((country, id) => {
          return <Country key={id} {...country} />;
        })}
      </div>

      <div className="btns"></div>
    </>
  );
}

export default App;
