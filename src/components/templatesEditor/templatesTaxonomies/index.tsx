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
  // console.log('taxonomies', taxonomies);

  const templates = useAppSelector((state) => state.templates.templates);
  // console.log('templates', templates);

  const currentTemplate = templates[templates.length - 1];
  // console.log('currentTemplate', currentTemplate);

  const onChangeTemplatesTaxonomyHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    dispatch(
      addNewTemplateTaxonomy({
        templateIndex: templates.length - 1,
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
            optionsList={taxonomies}
            onChange={(event: any) => onChangeTemplatesTaxonomyHandler(event)}
            value={currentTemplate.taxonomies}
            className={`${classes.genres_container}`}
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
