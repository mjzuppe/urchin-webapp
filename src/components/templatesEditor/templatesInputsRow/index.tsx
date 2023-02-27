// Styles
import classes from './TemplatesInputsRow.module.scss';
import { useState } from 'react';

// Types
import { TemplatesInputs } from '../../../types/TemplatesInputs';

// Utils
import { useAppDispatch } from '../../../utils/useAppDispatch';
import { useAppSelector } from '../../../utils/useAppSelector';

// redux
import { deleteTemplate } from '../../../redux/slices/templates';

// Components
import Separator from '../../shared/separator';
import { CustomSelectSingle } from '../../shared/customSelectSingle';
import { CustomCheckBox } from '../../shared/customCheckBox';

const TemplatesInputsRow = (): JSX.Element => {
  const dispatch = useAppDispatch();
  // const templates = useAppSelector((state) => state.templates.templates);
  // console.log('templates', templates);
  const [templateInputs, setTemplateInputs] = useState<TemplatesInputs>([
    {
      label: '',
      type: 'text',
      validateInputs: false,
    },
  ]);
  console.log('templateInputs', templateInputs);

  const removeRowHandler = (index: number) => {
    if (templateInputs.length <= 1) return;
    dispatch(deleteTemplate({ templateIndex: index }));
  };

  const onChangeTemplateInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value, checked } = event.target;
    const newTemplateInput = {
      [name]: value,
      index,
    };
    console.log('newTemplateInput', newTemplateInput);

    if (name === 'validateInputs') {
      setTemplateInputs((prevState) => {
        const newState = [...prevState];
        newState[index] = { ...newState[index], [name]: checked };
        return newState;
      });
      return;
    }

    setTemplateInputs((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], ...newTemplateInput };
      return newState;
    });
  };

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
                // onBlur={(event) => onBlurTaxonomyHandler(event, index)}
              />
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
                  { value: 'file', label: 'File uploader' },
                ]}
                onChange={(event: any) =>
                  onChangeTemplateInputHandler(event, index)
                }
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
                  placeholder="Enter the select options"
                  className="form_input"
                  value={templateInput.options || ''}
                  maxLength={24}
                  onChange={(event) =>
                    onChangeTemplateInputHandler(event, index)
                  }
                  // onBlur={(event) => onBlurTaxonomyHandler(event, index)}
                />
              </div>
            )}
            {/* validate Inputs */}
            <div className={`input_wrapper checkBox_input`}>
              <CustomCheckBox
                name={'validateInputs'}
                id={'validateInputs'}
                label={'Validate Inputs'}
                onChange={(event: any) =>
                  onChangeTemplateInputHandler(event, index)
                }
                checked={Boolean(templateInput.validateInputs)}
              />
            </div>
            {/* Min/maxlength */}
            {templateInput.validateInputs && templateInput.type === 'text' && (
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
                    // onBlur={(event) => onBlurTaxonomyHandler(event, index)}
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
                    // onBlur={(event) => onBlurTaxonomyHandler(event, index)}
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
