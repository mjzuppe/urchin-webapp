import { useState, useEffect } from 'react';

// Styles
import classes from './TemplatesInputsList.module.scss';

// Utils
import { useAppSelector } from '../../../utils/useAppSelector';
import { useAppDispatch } from '../../../utils/useAppDispatch';

// redux
import {
  addOrUpdateTemplateInput,
  addOrUpdateTemplateTitle,
  updateTemplateErrors, 
  removeTemplateErrors
} from '../../../redux/slices/templates';

// Types
import { TemplatesInputs, Templates } from '../../../types/Templates';

import { templatesList } from '../../../helpers/templateList'

// Components
import OrangeButton from '../../shared/orangeButton';
import TemplatesInputsRow from '../templatesInputsRow';

const TemplatesInputsList = (): JSX.Element => {
  const DUPLICATE_TITLE_ERROR = "Title must be unique"

  const dispatch = useAppDispatch();
  const [templateTitleError, setTemplateTitleError] = useState<boolean>(false);

  const templates = templatesList(useAppSelector((state) => state.templates));

  const errors = useAppSelector((state) => state.templates.errors);
  const currentTemplateId = useAppSelector(
    (state) => state.templates.currentTemplateId
  );

  const currentTemplate = templates.find(
    (template) => template.id === currentTemplateId
  );

  const currentTemplateIndex = templates.findIndex(
    (template) => template.id === currentTemplate?.id
  );

  const [templateInputs, setTemplateInputs] = useState<TemplatesInputs>(
    currentTemplate && currentTemplate.inputs.length > 0
      ? currentTemplate.inputs
      : [
          {
            label: '',
            type: 'text',
            validateInputs: false,
          },
        ]
  );

  const initialTemplateInputsCount = templateInputs.length;
  const [templateInputsCount, setTemplateInputsCount] = useState<number>(
    initialTemplateInputsCount
  );

  const addRowHandler = () => {
    setTemplateInputs((prevState) => {
      const newState = [...prevState];
      newState.push({
        label: '',
        type: 'text',
        validateInputs: false,
      });
      return newState;
    });
    setTemplateInputsCount(templateInputsCount + 1);
    dispatch(
      addOrUpdateTemplateInput({
        templateIndex: currentTemplateIndex,
        inputs: templateInputs,
        id: currentTemplateId
      } as any)
    );
  };

  const checkDuplicateTitleErrors = (template: Templates, index: number) => {
    const titles = templates.map((template: { title: string; }) => template.title || ''.toLowerCase().trim())
    
    const toFindDuplicates = () => titles.filter((item, index) => titles.indexOf(item) !== index)
    const duplicateTitles = toFindDuplicates();

    if(duplicateTitles.includes(template.title || ''.toLowerCase().trim())) {
      dispatch(
        updateTemplateErrors({
          id: template.id, 
          index, 
          message: DUPLICATE_TITLE_ERROR
        }),
      )
    } 
    else {
      dispatch(
        removeTemplateErrors({
          id: template.id
        })
      )
    }
  }
    
  useEffect(() => {
    templates.map((template, index )=> {
      checkDuplicateTitleErrors(template, index)
    })
  }, [templates.map(template => template.title)])


  const onChangeTemplateTitleHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value !== '' && setTemplateTitleError(false);

    dispatch(
      addOrUpdateTemplateTitle({
        templateIndex: currentTemplateIndex,
        id: currentTemplateId,
        title: event.target.value,
      } as any)
    );
  };

  const onBlurTemplateTitleHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // if value empty render an error
    event.target.value === '' && setTemplateTitleError(true);
    
    dispatch(
      addOrUpdateTemplateTitle({
        templateIndex: currentTemplateIndex,
        id: currentTemplateId,
        title: event.target.value,
      } as any)
    );
  };

  const renderErrorMessage = () => {
    let inputErrors = errors.filter((err: { id: string, index: number }) => err?.id === currentTemplate?.id)
    if(inputErrors.length > 0) {
      return(
        <span className="error_message">{inputErrors[0].message}</span>
      ) 
    }
  }

  const currentTitle = currentTemplate?.title || ""
  return (
    <section className={classes.templates_inputs_list}>
      <div className="single_row_form">
        <div className={`single_input input_wrapper`}>
          <label className="form_label" data-required={'required'}>
            Template Title
          </label>
          <input
            required
            type="text"
            name="label"
            placeholder="Enter template Name"
            className="form_input"
            maxLength={200}
            value={currentTitle}
            onChange={(event) => onChangeTemplateTitleHandler(event)}
            onBlur={onBlurTemplateTitleHandler}
          />
          {
            renderErrorMessage()
          }
          {templateTitleError && (
            <span className="error_message">Template title is required</span>
          )}
        </div>
      </div>
      <div className={classes.templates_inputs_form}>
        <TemplatesInputsRow
          templateInputs={templateInputs}
          setTemplateInputs={setTemplateInputs}
        />
      </div>
      <div className="create_btn_wrapper">
        <OrangeButton
          btnText="Create New"
          invert
          type="button"
          callBack={addRowHandler}
          id="create_btn"
        />
      </div>
    </section>
  );
};

export default TemplatesInputsList;
