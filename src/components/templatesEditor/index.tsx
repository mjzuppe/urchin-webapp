import { useState } from 'react';

// Styles
import classes from './TemplatesEditor.module.scss';

// Libs
//  Utils
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useAppSelector } from '../../utils/useAppSelector';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';
import {
  addNewTemplate,
  setTemplatesEditorActiveTab,
} from '../../redux/slices/templates';

// Components
import BackButton from '../shared/backButton';
import OrangeButton from '../shared/orangeButton';
import TemplatesInputsList from './templatesInputsList';

const TemplatesEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const tabs = ['Inputs', 'Taxonomies'];
  const templatesEditorActiveTab = useAppSelector(
    (state: any) => state.templates.templatesEditorActiveTab
  );
  const [active, setActive] = useState(templatesEditorActiveTab || tabs[0]);
  // const templates = useAppSelector((state) => state.templates.templates);
  // const initialTaxonomiesCount = templates.length;
  // const [taxonomiesCount, setTaxonomiesCount] = useState<number>(
  //   initialTaxonomiesCount
  // );

  // Handlers
  const handleBackClick = () => {
    dispatch(setCurrentProcess('default'));
  };

  const handleTabClick = (tab: string) => {
    return () => {
      setActive(tab);
      dispatch(setTemplatesEditorActiveTab(tab));
    };
  };

  return (
    <section className={classes.templates_editor_section}>
      <BackButton onClickHandler={handleBackClick} />
      {/* Breadcrumbs section */}
      <div className={classes.breadcrumbs_section}>
        <p>Templates &gt; Blog Post</p>
      </div>
      <div className="editors_action_btn_wrapper">
        {/* if Edit add Revision nbr + last updated date */}
        <OrangeButton
          // change text if Edit
          btnText={'Save'}
          type="submit"
          // TODO: change callback when available (add template in templates array from redux)
          callBack={() => console.log('save')}
          className={classes.save_btn}
        />
      </div>
      {/*  Templates Editor Nav */}
      <nav className={classes.templates_editor_nav}>
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
      </nav>
      {templatesEditorActiveTab === 'Inputs' && <TemplatesInputsList />}
      {/* {templatesEditorActiveTab === 'Taxonomies' && <TaxonomiesRow />} */}
    </section>
  );
};

export default TemplatesEditor;
