// Styles
import classes from './TemplatesTaxonomies.module.scss';

// Utils
import { useAppDispatch } from '../../../utils/useAppDispatch';
import { useAppSelector } from '../../../utils/useAppSelector';

// Components
import Separator from '../../shared/separator';
import { CustomSelectMulti } from '../../shared/customSelectMulti';
import { addNewTemplateTaxonomy } from '../../../redux/slices/templates';

const TemplatesTaxonomies = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const taxonomies = useAppSelector((state) => state.taxonomies.taxonomies);
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

  const onChangeTemplatesTaxonomyHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;

    dispatch(
      addNewTemplateTaxonomy({
        templateIndex: currentTemplateIndex,
        taxonomy: value,
      })
    );
  };
  return (
    <div className={classes.taxonomies_row_container}>
      <div className="single_row_form">
        <div className={`multi_select input_wrapper`}>
          <CustomSelectMulti
            id="template_taxonomies"
            name="template_taxonomies"
            label="Eligible taxonomies"
            displayValue="label"
            optionsList={taxonomies || []}
            onChange={(event: any) => onChangeTemplatesTaxonomyHandler(event)}
            value={currentTemplate?.taxonomies}
            placeholder={'Select one or more'}
            showCheckbox={true}
          />
        </div>
        <span className="filler"></span>
      </div>
      <Separator />
    </div>
  );
};

export default TemplatesTaxonomies;
