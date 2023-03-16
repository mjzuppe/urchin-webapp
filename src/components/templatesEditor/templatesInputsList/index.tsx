import { useState } from 'react';

// Styles
import classes from './TemplatesInputsList.module.scss';

// Utils
import { useAppSelector } from '../../../utils/useAppSelector';
import { useAppDispatch } from '../../../utils/useAppDispatch';

// redux
import {
  addOrUpdateTemplateInput,
  addOrUpdateTemplateTitle,
} from '../../../redux/slices/templates';

// Types
import { TemplatesInputs } from '../../../types/Templates';

// Components
import OrangeButton from '../../shared/orangeButton';
import TemplatesInputsRow from '../templatesInputsRow';

const TemplatesInputsList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [templateTitleError, setTemplateTitleError] = useState<boolean>(false);
  const [titleNameError, setTitleNameError] = useState<boolean>(false);

  const templates = useAppSelector((state) => state.templates.templates);
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
        input: templateInputs,
      } as any)
    );
  };

  const onChangeTemplateTitleHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value !== '' && setTemplateTitleError(false);
    const templateTitles = templates.map(template => template.title.toLowerCase().trim())

    if(templateTitles.includes(event.target.value.toLowerCase().trim())) {
      setTitleNameError(true)
    } else  {
      setTitleNameError(false)
      dispatch(
        addOrUpdateTemplateTitle({
          templateIndex: currentTemplateIndex,
          title: event.target.value,
        } as any)
      );
    }
  };

  const onBlurTemplateTitleHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // if value empty render an error
    event.target.value === '' && setTemplateTitleError(true);
    const templateTitles = templates.map(template => template.title.toLowerCase().trim())
    
    if(templateTitles.includes(event.target.value.toLowerCase().trim())) {
      setTitleNameError(true)
    } else {
      setTitleNameError(false)
      dispatch(
        addOrUpdateTemplateTitle({
          templateIndex: currentTemplateIndex,
          title: event.target.value,
        } as any)
      );
    }
  };

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
            onChange={(event) => onChangeTemplateTitleHandler(event)}
            onBlur={onBlurTemplateTitleHandler}
          />
          {templateTitleError && (
            <span className="error_message">Template title is required</span>
          )}
          {titleNameError && (
            <span className="error_message">Template title already exists</span>
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
