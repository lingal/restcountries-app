import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownZA,
  faArrowUpAZ
} from '@fortawesome/free-solid-svg-icons';


const Header = (props) => {
  const [descen, setDescen] = useState(false);

  const changeIcon = () => {
    if (descen) {
      setDescen(false);
    } else {
      setDescen(true);
    }
  };

  return (
    <header>
      <div className="section-width">
        <h1>countries of the world</h1>
        <div className="header-nav">
          <button
            onClick={() => {
              props.data();
              changeIcon();
            }}
          >
            {descen ? (
              <FontAwesomeIcon icon={faArrowDownZA} />
            ) : (
              <FontAwesomeIcon icon={faArrowUpAZ} />
            )}
          </button>
          {props.children}
        </div>
      </div>
    </header>
  );
};

export default Header;
