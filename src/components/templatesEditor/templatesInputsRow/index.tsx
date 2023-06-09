import { useEffect } from 'react';

// Styles
import classes from './TemplatesInputsRow.module.scss';

// Types
import { TemplatesInputs, TemplateInput, TemplateInputsError} from '../../../types/Templates';

// Utils
import { useAppDispatch } from '../../../utils/useAppDispatch';
import { useAppSelector } from '../../../utils/useAppSelector';


// Helpers
import { templatesList } from '../../../helpers/templateList'

// redux
import {
  addOrUpdateTemplateInput,
  deleteTemplateInput,
  updateTemplateInputErrors,
  removeTemplateInputsErrors
} from '../../../redux/slices/templates';

// Components
import Separator from '../../shared/separator';
import { CustomSelectSingle } from '../../shared/customSelectSingle';
import { CustomCheckBox } from '../../shared/customCheckBox';

const DUPLICATE_LABEL_ERROR = "Label must be unique"
interface TemplatesInputsRowProps {
  templateInputs: TemplatesInputs;
  setTemplateInputs: React.Dispatch<React.SetStateAction<TemplatesInputs>>;
}

const TemplatesInputsRow = ({
  templateInputs,
  setTemplateInputs,
}: TemplatesInputsRowProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const templates = templatesList(useAppSelector((state) => state.templates));
  const inputErrors = useAppSelector((state) => state.templates.inputsErrors);

  const currentTemplateId = useAppSelector(
    (state) => state.templates.currentTemplateId
  );

  const currentTemplate = templates.find(
    (template) => template.id === currentTemplateId
  );

  const currentTemplateIndex = templates.findIndex(
    (template) => template.id === currentTemplate?.id
  );

  const onChangeTemplateInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value, checked } = event.target;
    const newTemplateInput = {
      [name]: value,
      index,
    };

    if (name === 'validateInputs') {
      setTemplateInputs((prevState) => {
        const newState = [...prevState];
        newState[index] = { ...newState[index], [name]: checked };
        return newState;
      });
      return;
    }

    if (name === 'options') {
      const newOptions = value.split(',').map((option) => option);
      setTemplateInputs((prevState) => {
        const newState = [...prevState];
        newState[index] = { ...newState[index], [name]: newOptions };
        return newState;
      });
      return;
    }

    setTemplateInputs((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], ...newTemplateInput };
      return newState;
    });

    dispatch(
      addOrUpdateTemplateInput({
        templateIndex: currentTemplateIndex,
        inputs: templateInputs,
        id: currentTemplateId,
      } as any)
    );
  };

  const onBlurTemplateInputHandler = (event: any) => {
    dispatch(
      addOrUpdateTemplateInput({
        templateIndex: currentTemplateIndex,
        inputs: templateInputs,
        id: currentTemplateId,
      } as any)
    );
  };

  const removeRowHandler = (index: number) => {
    if (templateInputs.length <= 1) return;

    const nextInputs = templateInputs.filter((input, i) => i !== index);
    setTemplateInputs(nextInputs);

    dispatch(
      deleteTemplateInput({
        templateIndex: currentTemplateIndex,
        inputIndex: index,
      })
    );
    dispatch(
      addOrUpdateTemplateInput({
        templateIndex: currentTemplateIndex,
        inputs: nextInputs,
        id: currentTemplateId,
      } as any)
    );
  };

  const checkDuplicateLabelErrors = (input: TemplateInput, index: number) => {
    const labels = templateInputs.map((input: { label: string; }) => input.label.toLowerCase().trim())
    
    const toFindDuplicates = () => labels.filter((label, index) => labels.indexOf(label) !== index)
    const duplicateLabels = toFindDuplicates();

    if(duplicateLabels.includes(input.label.toLowerCase().trim())) {
      dispatch(
        updateTemplateInputErrors({
          templateId: currentTemplate.id, 
          index, 
          message: DUPLICATE_LABEL_ERROR
        }),
      )
    } else {
      dispatch(
        removeTemplateInputsErrors({
          templateId: currentTemplate.id, 
          index
        })
      )
    }
  }
  
  useEffect(() => {
    templateInputs.map((input, index )=> {
      checkDuplicateLabelErrors(input, index)
    })
  }, [ templateInputs ] )

  const renderInputErrorMessage = () => {
    let errors = inputErrors.filter((err: TemplateInputsError) => err.templateId === currentTemplate.id)
    if(errors.length > 0) {
      return(
        <span className="error_message">{inputErrors[0].message}</span>
      ) 
    }
  }

  return (
    <div>
      {templateInputs?.map((templateInput, index) => (
        <div key={index} className={classes.template_input_row_container}>
          <div className="single_row_form">
            <div className={`single_input input_wrapper`}>
              <label className="form_label" data-required={'required'}>
                Label
              </label>
              <input
                required
                type="text"
                name="label"
                placeholder="Enter your label"
                className="form_input"
                value={templateInput.label || ''}
                maxLength={24}
                onChange={(event) => onChangeTemplateInputHandler(event, index)}
                onBlur={onBlurTemplateInputHandler}
              />
              {
                renderInputErrorMessage()
              }
            </div>
            <div className={`single_input input_wrapper`}>
              <CustomSelectSingle
                id="type"
                name="type"
                label="Type"
                isRequired
                displayValue="label"
                optionsList={[
                  { value: 'text', label: 'Text input' },
                  { value: 'textarea', label: 'TextArea' },
                  { value: 'select', label: 'Select' },
                  { value: 'numeric', label: 'Numeric input' },
                  // { value: 'file', label: 'File uploader' },
                ]}
                onChange={(event: any) =>
                  onChangeTemplateInputHandler(event, index)
                }
                onBlur={onBlurTemplateInputHandler}
                value={templateInput.type}
                className={`${classes.genres_container}`}
                placeholder={'No parent Selected'}
              />
            </div>
            {/* options */}
            {templateInput.type === 'select' && (
              <div className={`single_input input_wrapper`}>
                <label className="form_label" data-required={'required'}>
                  Options
                </label>
                <input
                  required
                  type="text"
                  name="options"
                  placeholder="Enter options (comma separated)"
                  className="form_input"
                  value={templateInput.options || ''}
                  onChange={(event) =>
                    onChangeTemplateInputHandler(event, index)
                  }
                  onBlur={onBlurTemplateInputHandler}
                />
              </div>
            )}
            {(templateInput.type === 'text' ||
              templateInput.type === 'textarea') && (
              <div
                className={`input_wrapper checkBox_input ${classes.checkbox}`}
              >
                <CustomCheckBox
                  name={'validateInputs'}
                  id={`validateInputs-${index}`}
                  label={'Validate Inputs'}
                  onChange={(event: any) =>
                    onChangeTemplateInputHandler(event, index)
                  }
                  checked={Boolean(templateInput.validateInputs)}
                  onBlur={onBlurTemplateInputHandler}
                />
              </div>
            )}
            {/* Min/maxlength */}
            {templateInput.validateInputs && (
              <>
                <div className={`number_input input_wrapper`}>
                  <label className="form_label">Min Length</label>
                  <input
                    type="number"
                    name="minLength"
                    placeholder="min length"
                    className="form_input"
                    value={templateInput.minLength || ''}
                    onChange={(event) =>
                      onChangeTemplateInputHandler(event, index)
                    }
                    min={0}
                    onBlur={onBlurTemplateInputHandler}
                  />
                </div>
                <div className={`number_input input_wrapper`}>
                  <label className="form_label">Max Length</label>
                  <input
                    type="number"
                    name="maxLength"
                    placeholder="max length"
                    className="form_input"
                    value={templateInput.maxLength || ''}
                    onChange={(event) =>
                      onChangeTemplateInputHandler(event, index)
                    }
                    min={0}
                    onBlur={onBlurTemplateInputHandler}
                  />
                </div>
              </>
            )}

            <span className="filler"></span>
            <div className={classes.action_btn_wrapper}>
              {index >= 1 && (
                <button
                  className={`${classes.btn_text} blue_white_link`}
                  onClick={() => removeRowHandler(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
};

export default TemplatesInputsRow;
