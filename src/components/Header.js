import { useState } from 'react';
import Region from './Region';
import Area from './Area';
import Pages from './Pages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownZA, faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
  const { orderHandler, data, region, countries, pageChange, areaSize } = props;

  const [order, setOrder] = useState('DownZA');

  const showIcon = () => {
    const icon = order ? (
      <FontAwesomeIcon icon={faArrowUpAZ} />
    ) : (
      <FontAwesomeIcon icon={faArrowDownZA} />
    );
    return icon;
  };

  return (
    <header>
      <div className="section-width">
        <h1>countries of the world</h1>
        <div className="header-nav">
          <button
            onClick={() => {
              orderHandler();
              setOrder((prevState) => !prevState);
            }}
          >
            {showIcon()}
          </button>
          <Region data={data} region={region} filterName={'Select region'} />
          <Area
            data={data}
            filterName="Show smaller countries than"
            areaSize={areaSize}
          />
        </div>
        <Pages pages={countries} pageChange={(e) => pageChange(e)} />
      </div>
    </header>
  );
};

export default Header;
