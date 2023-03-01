import { useState } from 'react';

//styles
import classes from './Subnav.module.scss';

// Utils
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useAppSelector } from '../../utils/useAppSelector';
// Redux
import { setActiveTab } from '../../redux/slices/subNav';
import { setCurrentProcess } from '../../redux/slices/process';

const Subnav = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const tabs = ['Templates', 'Entries', 'Taxonomies'];
  const activeTab = useAppSelector((state: any) => state.subNav.activeTab);
  const [active, setActive] = useState(activeTab || tabs[0]);

  const handleTabClick = (tab: string) => {
    return () => {
      setActive(tab);
      dispatch(setActiveTab(tab));
    };
  };

  const quickUploadHandler = () => {
    dispatch(setCurrentProcess('quickUpload'));
  };

  return (
    <nav className={classes.subnav}>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={handleTabClick(tab)}
            className={`${active === tab ? classes.active : ''}`}
          >
            <button>{tab}</button>
          </li>
        ))}
      </ul>
      <div>
        <button
          type="button"
          className="orange_link"
          onClick={quickUploadHandler}
        >
          Quick Upload
        </button>
      </div>
    </nav>
  );
};

export default Subnav;
