import { useState, useEffect } from 'react';
import useFetch from './components/useFetch';
import paginate from './components/utils';
import Header from './components/Header';
import Country from './components/Country';
import './index.css';
const url = 'https://restcountries.com/v2/all?fields=name,region,area';

function App() {
  const { data, loading, error } = useFetch(url);
  const [countries, setCountries] = useState([]);
  const [order, setOrder] = useState(true);
  const [page, setPage] = useState(0);
  const [region, setRegion] = useState('');
  const [area, setArea] = useState(0);


  useEffect(() => {
    let newCountries;
    if (order) {
      newCountries = data.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      newCountries = data.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (region) {
      newCountries = data.filter((item) => {
        return region !== 'all' ? item.region === region : item;
      });

      setPage((prevPage) => (prevPage = 0));
    }
    if (area) {
      newCountries = data
        .filter((item) => {
          if (area) {
            return item.area <= area;
          }
          if (area === 'all') {
            setArea((prevArea) => (prevArea = 0));
          }
        })

        .sort((a, b) => b.area - a.area);
    }

    setCountries(paginate(newCountries));
  }, [order, region, data, area]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.log(error);
  }

  function getRegion(value) {
    setRegion(value);
  }

  function getAreaSize(size) {
    setArea(Number(size));
  }

  function getPage(page) {
    setPage(page);
  }

  return (
    <div className='wrapper'>
      <Header
        data={data}
        orderHandler={() => setOrder(!order)}
        region={getRegion}
        areaSize={getAreaSize}
        countries={countries}
        pageChange={getPage}
      />
      <div className='countries-container'>
      {countries[page]?.map((item) => {
        return <Country key={item.name} {...item} />;
      })}
      </div>
    </div>
  );
}

export default App;
