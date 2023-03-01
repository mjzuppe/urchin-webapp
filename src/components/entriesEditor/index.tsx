// Styles
import classes from './EntriesEditor.module.scss';
//  Utils
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useAppSelector } from '../../utils/useAppSelector';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';
import {
  updateEntryTitle,
  updateEntryMetaDescription,
} from '../../redux/slices/entries';

// Components
import BackButton from '../shared/backButton';
import OrangeButton from '../shared/orangeButton';

const EntriesEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.entries.entries);
  console.log('entries', entries);

  const currentEntry = entries[entries.length - 1];
  console.log('currentEntry', currentEntry);

  const currentEntryIndex = entries.findIndex(
    (entry) => entry.id === currentEntry.id
  );

  // Handlers
  const handleBackClick = () => {
    dispatch(setCurrentProcess('default'));
  };
  // TODO: change when ready
  const handleSaveClick = () => {
    console.log('handleSaveClick');
  };

  const onChangeEntryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newEntry = {
      [name]: value,
      index: currentEntryIndex,
    };
    console.log('newEntry on change', newEntry);

    if (newEntry.hasOwnProperty('title')) {
      dispatch(updateEntryTitle(newEntry));
    }
  };

  const onBlurEntryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newEntry = {
      [name]: value,
      index: currentEntryIndex,
    };

    console.log('newEntry on blur', newEntry);

    if (newEntry.hasOwnProperty('title')) {
      dispatch(updateEntryTitle(newEntry));
    }
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
      <div className={classes.editor_section}>
        <h3>Create New</h3>
        <div className={classes.entry_editor_form}>
          <div className={classes.entry_input_wrapper}>
            <label className="form_label" data-required={'required'}>
              Title
            </label>
            <input
              required
              type="text"
              name="title"
              placeholder="Post title"
              className="form_input"
              value={currentEntry.title || ''}
              onChange={(event) => onChangeEntryHandler(event)}
              onBlur={onBlurEntryHandler}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntriesEditor;
