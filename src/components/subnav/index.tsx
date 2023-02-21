import { useState } from 'react';

//styles
import classes from './Subnav.module.scss';

// Utils
import { useAppDispatch } from 'src/utils/useAppDispatch';

// Redux
import { setActiveTab } from 'src/redux/slices/subNav';

const Subnav = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const tabs = ['Templates', 'Entries', 'Taxonomies'];
  const [active, setActive] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    return () => {
      setActive(tab);
      dispatch(setActiveTab(tab));
    };
  };
  return (
    <div className={classes.subnav}>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={handleTabClick(tab)}
            className={`${active === tab ? classes.active : ''}`}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div>
        {/* TODO: Use link instead?? on Click render quickUpload component */}
        <button type="button" className="orange_link">
          Quick Upload
        </button>
      </div>
    </div>
  );
};

export default Subnav;
