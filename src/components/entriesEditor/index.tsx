import Image from 'next/image';
import dynamic from 'next/dynamic';

// Styles
import classes from './EntriesEditor.module.scss';

//  Utils
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useAppSelector } from '../../utils/useAppSelector';

// lib
import { FileUploader } from 'react-drag-drop-files';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// Redux
import { setCurrentProcess } from '../../redux/slices/process';
import {} from '../../redux/slices/entries';

// Components
import BackButton from '../shared/backButton';
import OrangeButton from '../shared/orangeButton';
import { CustomSelectMulti } from '../shared/customSelectMulti';
import { CustomSelectSingle } from '../shared/customSelectSingle';

const EntriesEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.entries.entries);
  const currentEntry = entries[entries.length - 1];
  console.log('currentEntry', currentEntry);

  // find template
  const templates = useAppSelector((state) => state.templates.templates);
  const entryTemplate = templates.find(
    (template) => template.id === currentEntry.template
  );
  console.log('entryTemplate Inputs', entryTemplate?.inputs);
  // console.log('entryTemplate Taxonomies', entryTemplate?.taxonomies);

  // const currentEntryIndex = entries.findIndex(
  //   (entry) => entry.id === currentEntry.id
  // );

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
      // index: currentEntryIndex,
    };
    console.log('newEntry on change', newEntry);

    // if (newEntry.hasOwnProperty('title')) {
    //   dispatch(updateEntryTitle(newEntry));
    // }
  };

  // const onBlurEntryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   const newEntry = {
  //     [name]: value,
  //     // index: currentEntryIndex,
  //   };

  //   console.log('newEntry on blur', newEntry);

  //   if (newEntry.hasOwnProperty('title')) {
  //     dispatch(updateEntryTitle(newEntry));
  //   }
  // };

  const handleFileOnChange = (file: File) => {
    console.log('file', file);
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
          {/* Taxonomies */}
          <div className={classes.entry_input_wrapper}>
            <div className={`input_wrapper`}>
              <CustomSelectMulti
                id="entry_taxonomies"
                name="entry_taxonomies"
                label="Choose taxonomies"
                displayValue="label"
                optionsList={entryTemplate?.taxonomies || []}
                onChange={(event: any) => onChangeEntryHandler(event)}
                value={currentEntry.taxonomies}
                placeholder={'Select one or more'}
                selectionLimit={3}
              />
            </div>
            <span className="filler"></span>
          </div>
          {/* Inputs */}
          {entryTemplate?.inputs.map((input: any, index) => (
            <div className={classes.entry_input_wrapper} key={input.label}>
              {input.type === 'text' && (
                <div className={`input_wrapper`}>
                  <label className="form_label">{input.label}</label>
                  <input
                    type="text"
                    name="label"
                    placeholder={`Enter your ${input.label}`}
                    className="form_input"
                    value={currentEntry.inputs || ''}
                    minLength={input.validateInputs ? input.minLength : 0}
                    maxLength={input.validateInputs ? input.maxLength : 1000}
                    // onChange={(event) =>
                    //   onChangeTemplateInputHandler(event, index)
                    // }
                    // onBlur={onBlurTaxonomyHandler}
                  />
                </div>
              )}
              {input.type === 'select' && (
                <div className={classes.select_wrapper}>
                  <CustomSelectSingle
                    id={`input_select_${index}`}
                    name={`input_select_${index}`}
                    label={input.label}
                    displayValue="label"
                    optionsList={input.options.map((option: any) => {
                      return {
                        label: option,
                        value: option,
                      };
                    })}
                    // onChange={(event: any) =>
                    //   onChangeSelectTemplatesHandler(event)
                    // }
                    // value={templateSelected.template}
                    placeholder={'Select one template'}
                    className={classes.select}
                  />
                </div>
              )}
              {input.type === 'file' && (
                <div className={classes.upload_section_left}>
                  <label className="form_label">{input.label}</label>
                  <FileUploader
                    handleChange={handleFileOnChange}
                    name="upload_file_form"
                    multiple={true}
                    // eslint-disable-next-line react/no-children-prop
                    children={
                      <div className={classes.drop_area}>
                        <Image
                          src="/assets/camera-icon.svg"
                          alt="camera icon - upload a file"
                          height={40}
                          width={35}
                        />
                        <span className="muted_text_small">
                          Drop your file here
                        </span>
                      </div>
                    }
                  />
                </div>
              )}
              {input.type === 'textarea' && (
                <div className={`input_wrapper ${classes.wysiwig_editor}`}>
                  <label className="form_label">{input.label}</label>
                  {/* <textarea
                    name={input.label}
                    placeholder={`Enter your ${input.label}`}
                    className="form_input"
                    value={currentEntry.inputs || ''}
                    minLength={input.validateInputs ? input.minLength : 0}
                    maxLength={input.validateInputs ? input.maxLength : 1000}
                    // onChange={(event) =>
                    //   onChangeTemplateInputHandler(event, index)
                    // }
                    // onBlur={onBlurTaxonomyHandler}
                  /> */}
                  <QuillNoSSRWrapper theme="snow" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EntriesEditor;
