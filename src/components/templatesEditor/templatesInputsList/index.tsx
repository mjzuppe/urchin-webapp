import { useState } from 'react';

// Styles
import classes from './TemplatesInputsList.module.scss';

// Utils
import { useAppDispatch } from '../../../utils/useAppDispatch';
import { useAppSelector } from '../../../utils/useAppSelector';

// redux
import {
  addNewTemplate,
  deleteTemplate,
} from '../../../redux/slices/templates';

// Components
import Separator from '../../shared/separator';
import OrangeButton from '../../shared/orangeButton';
import TemplatesInputsRow from '../templatesInputsRow';

const TemplatesInputsList = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const template = useAppSelector((state) => state.templates.templates);

  const initialTemplateInputsCount = template.length;
  const [templateInputsCount, setTemplateInputsCount] = useState<number>(
    initialTemplateInputsCount
  );

  const addRowHandler = () => {
    dispatch(addNewTemplate({ label: null, parent: null }));
    setTemplateInputsCount(templateInputsCount + 1);
  };

  return (
    <section className={classes.templates_inputs_list}>
      <div className={classes.templates_inputs_form}>
        <TemplatesInputsRow />
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
