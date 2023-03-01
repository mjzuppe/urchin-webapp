// Styles
import classes from './EntriesEditor.module.scss';
//  Utils
import { useAppDispatch } from '../../utils/useAppDispatch';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';

// Components
import BackButton from '../shared/backButton';
import OrangeButton from '../shared/orangeButton';

const EntriesEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // Handlers
  const handleBackClick = () => {
    dispatch(setCurrentProcess('default'));
  };
  // TODO: change when ready1
  const handleSaveClick = () => {
    console.log('handleSaveClick');
  };

  return (
    <section className={classes.entries_editor_section}>
      <BackButton onClickHandler={handleBackClick} />
      {/* Breadcrumbs section */}
      <div className="breadcrumbs_section">
        <p>Entries &gt; New Blog Post</p>
      </div>
      <div className="editors_action_btn_wrapper">
        {/* if Edit add Revision nbr + last updated date */}
        <OrangeButton
          // change text if Edit
          btnText={'Save'}
          type="submit"
          // TODO: change callback when available (add template in templates array from redux)
          callBack={handleSaveClick}
          className="save_btn"
        />
      </div>
      {/* Editor section */}
    </section>
  );
};

export default EntriesEditor;
