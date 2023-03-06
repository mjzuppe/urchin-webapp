import { useState } from 'react';

// Styles
import classes from './TemplatesInputsList.module.scss';

// Utils
import { useAppSelector } from '../../../utils/useAppSelector';
import { useAppDispatch } from '../../../utils/useAppDispatch';

// redux
import { addOrUpdateTemplateInput } from '../../../redux/slices/templates';

// Types
import { TemplatesInputs } from '../../../types/Templates';

// Components
import OrangeButton from '../../shared/orangeButton';
import TemplatesInputsRow from '../templatesInputsRow';

const TemplatesInputsList = (): JSX.Element => {
  const dispatch = useAppDispatch();
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

  return (
    <section className={classes.templates_inputs_list}>
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
