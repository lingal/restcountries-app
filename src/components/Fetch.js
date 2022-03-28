import { useState, useEffect } from 'react';
import axios from 'axios';

const FirstResponse = () => {
  const [data, setData] = useState([]);
  const [reset, setReset] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all?fields=name,region,area')
      .then((response) => {
        const reset = response.data;
        const data = response.data;
        const data2 = response.data;
        setReset(reset);
        setData(data);
        setData2(data2);
      })
      .catch((err) => {
        setError(err);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, setData, data2, reset };
};

export default FirstResponse;
