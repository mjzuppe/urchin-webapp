import { useState } from 'react';

// Styles
import classes from './TemplatesEditor.module.scss';

// Libs

//  Utils
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useAppSelector } from '../../utils/useAppSelector';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';
import { setTemplatesEditorActiveTab } from '../../redux/slices/templates';

// Components
import BackButton from '../shared/backButton';
import TemplatesInputsList from './templatesInputsList';
import TemplatesTaxonomies from './templatesTaxonomies';
import Breadcrumbs from '../shared/breadcrumbs';

const TemplatesEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const tabs = ['Inputs', 'Taxonomies'];
  const templatesEditorActiveTab = useAppSelector(
    (state: any) => state.templates.templatesEditorActiveTab
  );

  const [active, setActive] = useState(templatesEditorActiveTab || tabs[0]);

  // Handlers
  const handleBackClick = () => {
    // prevent Handle back if errors
    dispatch(setCurrentProcess('default'));
  };

  const handleTabClick = (tab: string) => {
    return () => {
      setActive(tab);
      dispatch(setTemplatesEditorActiveTab(tab));
    };
  };

  const templates = useAppSelector((state) => state.templates.templates);

  const currentTemplateId = useAppSelector(
    (state) => state.templates.currentTemplateId
  );

  const currentTemplate = templates.find(
    (template) => template.id === currentTemplateId
  );

  return (
    <section className={classes.templates_editor_section}>
      <BackButton onClickHandler={handleBackClick} />
      <Breadcrumbs
        section="Templates"
        title={currentTemplate?.title || 'Untitled'}
      />

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
      {templatesEditorActiveTab === 'Taxonomies' && <TemplatesTaxonomies />}
    </section>
  );
};

export default TemplatesEditor;
