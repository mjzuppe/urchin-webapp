import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Styles
import classes from './EntriesEditor.module.scss';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

//  Utils
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useAppSelector } from '../../utils/useAppSelector';
import useWindowSize from '../../utils/useWindowSize';

// lib
import { FileUploader } from 'react-drag-drop-files';
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

// Redux
import { setCurrentProcess } from '../../redux/slices/process';
import {
  addEntryTaxonomies,
  updateEntryInputs,
} from '../../redux/slices/entries';

// Components
import BackButton from '../shared/backButton';
import OrangeButton from '../shared/orangeButton';
import { CustomSelectMulti } from '../shared/customSelectMulti';
import { CustomSelectSingle } from '../shared/customSelectSingle';
import Breadcrumbs from '../shared/breadcrumbs';

const EntriesEditor = (): JSX.Element => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const entries = useAppSelector((state) => state.entries.entries);
  const taxonomiesFromState = useAppSelector(
    (state) => state.taxonomies.taxonomies
  );

  const currentEntryId = useAppSelector(
    (state) => state.entries.currentEntryId
  );

  const currentEntry = entries.find((entry) => entry.id === currentEntryId);

  const currentEntryIndex = entries.findIndex(
    (entry) => entry.id === currentEntry?.id
  );

  const templates = useAppSelector((state) => state.templates.templates);

  const entryTemplate = templates.find(
    (template) => template.publicKey === currentEntry?.template
  );

  // get label and value for taxonomies
  const taxonomiesTransformed = taxonomiesFromState.map((taxonomy) => {
    return {
      label: taxonomy.label,
      publicKey: taxonomy.publicKey,
    };
  });

  // find entryTemplate.taxonomies in taxonomiesX
  const templatesTaxoWithValue = taxonomiesTransformed?.filter(
    (taxonomytoDisplay: any) => {
      return entryTemplate?.taxonomies?.includes(taxonomytoDisplay.publicKey);
    }
  );

  const [entryInputs, setEntryInputs] = useState<any>(
    currentEntry?.inputs.length !== 0 ? currentEntry?.inputs : ''
  );

  // Handlers
  const handleBackClick = () => {
    dispatch(setCurrentProcess('default'));
  };
  // TODO: change when ready
  const handleSaveClick = () => {
    console.log('handleSaveClick');
  };

  const onChangeEntryTaxonomiesHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value }: { value: any } = event.target;

    const publickKeyValues = value.map((value: any) => {
      return {
        label: value.label,
        publicKey: value.publicKey,
      };
    });

    dispatch(
      addEntryTaxonomies({
        entryIndex: currentEntryIndex,
        taxonomies: publickKeyValues,
      })
    );
  };

  const onChangeEntryInputsHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    const newEntryInput = {
      [name]: value,
    };

    setEntryInputs((prevState: any) => {
      const newState = [...prevState];
      newState[0] = { ...newState[0], ...newEntryInput };
      return newState;
    });

    dispatch(
      updateEntryInputs({
        entryIndex: currentEntryIndex,
        inputs: entryInputs,
      } as any)
    );
  };

  const onBlurEntryHandler = (event: any) => {
    dispatch(
      updateEntryInputs({
        entryIndex: currentEntryIndex,
        inputs: entryInputs,
      } as any)
    );
  };

  const [fileName, setFileName] = useState<string>('');
  const [imgSrc, setImgSrc] = useState('');

  const handleFileOnChange = () => {
    const inputElement: HTMLInputElement =
      document.querySelector('input[type=file]')!;
    if (!inputElement.files) return;
    const file = inputElement.files[0];

    setFileName(file.name);
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        file.type === 'image/jpeg' && setImgSrc(reader.result as string);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }

    //TODO: Pass image file to current entry inputs
  };

  const removeImageHandler = () => {
    setImgSrc('');
    setFileName('');
  };

  const onChangeMarkdownHandler = (
    value: string | undefined,
    label: string
  ) => {
    setEntryInputs((prevState: any) => {
      const newState = [...prevState];
      newState[0] = { ...newState[0], [label]: value };
      return newState;
    });
    dispatch(
      updateEntryInputs({
        entryIndex: 0,
        inputs: entryInputs,
      } as any)
    );
  };

  return (
    <section className={classes.entries_editor_section}>
      <BackButton onClickHandler={handleBackClick} />
      <Breadcrumbs section="Entries" title={currentEntry?.title || ''} />

      <div className="editors_action_btn_wrapper">
        {/* if Edit add Revision nbr + last updated date */}
        <OrangeButton
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
                name="taxonomies"
                label="Choose taxonomies"
                displayValue="label"
                optionsList={templatesTaxoWithValue || []}
                onChange={(event: any) => onChangeEntryTaxonomiesHandler(event)}
                value={currentEntry?.taxonomies}
                placeholder={'Select one or more'}
                selectionLimit={3}
              />
            </div>
            <span className="filler"></span>
          </div>
          {/* Inputs */}
          {entryTemplate?.inputs.map((input: any, templateEntryInputIndex) => (
            <div className={classes.entry_input_wrapper} key={input.label}>
              {input.type === 'text' && (
                <div className={`input_wrapper`}>
                  <label className="form_label">{input.label}</label>
                  <input
                    type="text"
                    name={`${input.label}`}
                    placeholder={`Enter your ${input.label}`}
                    className="form_input"
                    value={
                      entryInputs.length !== 0
                        ? entryInputs[0][input.label]
                        : ''
                    }
                    minLength={input.validateInputs ? input.minLength : 0}
                    maxLength={input.validateInputs ? input.maxLength : 1000}
                    onChange={(event: any) => onChangeEntryInputsHandler(event)}
                    onBlur={onBlurEntryHandler}
                  />
                </div>
              )}
              {input.type === 'numeric' && (
                <div
                  className={`number_input input_wrapper`}
                  id={classes.nbr_input_large}
                >
                  <label className="form_label">{input.label}</label>
                  <input
                    type="number"
                    name={`${input.label}`}
                    placeholder={`Enter your ${input.label}`}
                    className="form_input"
                    value={
                      entryInputs.length !== 0
                        ? entryInputs[0][input.label]
                        : ''
                    }
                    minLength={input.validateInputs ? input.minLength : 0}
                    maxLength={input.validateInputs ? input.maxLength : 1000}
                    onChange={(event: any) => onChangeEntryInputsHandler(event)}
                    onBlur={onBlurEntryHandler}
                  />
                </div>
              )}
              {input.type === 'select' && (
                <div className={classes.select_wrapper}>
                  <CustomSelectSingle
                    id={`input_select_${templateEntryInputIndex}`}
                    name={`${input.label}`}
                    label={input.label}
                    displayValue="label"
                    optionsList={input.options.map((option: any) => {
                      return {
                        label: option,
                        value: option,
                      };
                    })}
                    onChange={(event: any) => onChangeEntryInputsHandler(event)}
                    onBlur={onBlurEntryHandler}
                    value={
                      entryInputs.length !== 0
                        ? entryInputs[0][input.label]
                        : ''
                    }
                    placeholder={'Select one option'}
                    className={classes.select}
                  />
                </div>
              )}
              {input.type === 'file' && (
                <div className={classes.upload_section_left}>
                  <div className={classes.uploader}>
                    <label className="form_label">{input.label}</label>
                    <FileUploader
                      handleChange={handleFileOnChange}
                      name={`${input.label}`}
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
                    {imgSrc && (
                      <>
                        <div className={classes.preview_img_wrapper}>
                          <Image
                            src={imgSrc}
                            id="image_preview"
                            width={width! < 950 ? 350 : 320}
                            height={200}
                            alt="Thumbnail of uploaded image"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="actions_right">
                    <p className={classes.file_name}>{fileName}</p>
                    <p
                      className={`orange_link ${classes.remove_img}`}
                      onClick={removeImageHandler}
                    >
                      Remove File
                    </p>
                  </div>
                </div>
              )}
              {input.type === 'textarea' && (
                <div className={`input_wrapper ${classes.wysiwig_editor}`}>
                  <label className="form_label">{input.label}</label>
                  <div data-color-mode="dark">
                    <MDEditor
                      textareaProps={{
                        name: `${input.label}`,
                      }}
                      value={
                        entryInputs.length !== 0
                          ? entryInputs[0][input.label]
                          : ''
                      }
                      onChange={(value) =>
                        onChangeMarkdownHandler(value, input.label)
                      }
                      onBlur={onBlurEntryHandler}
                    />
                  </div>
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
