import { useState } from 'react';

// Styles
import classes from './TemplatesInputsList.module.scss';

// Utils
import { useAppSelector } from '../../../utils/useAppSelector';

// Types
import { TemplatesInputs } from '../../../types/Templates';

// Components
import OrangeButton from '../../shared/orangeButton';
import TemplatesInputsRow from '../templatesInputsRow';

const TemplatesInputsList = (): JSX.Element => {
  const templates = useAppSelector((state) => state.templates.templates);
  const currentTemplate = templates[templates.length - 1];
  const [templateInputs, setTemplateInputs] = useState<TemplatesInputs>(
    currentTemplate.inputs.length > 0
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
