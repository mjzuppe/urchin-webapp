// Styles
import classes from './TemplatesTaxonomies.module.scss';

// Utils
import { useAppDispatch } from '../../../utils/useAppDispatch';
import { useAppSelector } from '../../../utils/useAppSelector';

// Components
import Separator from '../../shared/separator';
import { CustomSelectMulti } from '../../shared/customSelectMulti';
import { addNewTemplateTaxonomy } from '../../../redux/slices/templates';

import { templatesList } from '../../../helpers/templateList'
import { updatedTaxonomies } from '../../../helpers/taxonomyList'

const TemplatesTaxonomies = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const taxonomies = updatedTaxonomies(useAppSelector((state) => state.taxonomies));
  const templates = templatesList(useAppSelector((state) => state.templates));

  const currentTemplateId = useAppSelector(
    (state) => state.templates.currentTemplateId
  );

  const currentTemplate = templates.find(
    (template) => template.id === currentTemplateId
  );

  const currentTemplateIndex = templates.findIndex(
    (template) => template.id === currentTemplate?.id
  );

  // get label and value for taxonomies
  const taxonomiesTransformed = taxonomies.map((taxonomy) => {
    return {
      label: taxonomy.label,
      publicKey: taxonomy.publicKey,
    };
  });

  // find entryTemplate.taxonomies in taxonomiesX
  const templatesTaxoWithValue = taxonomiesTransformed?.filter(
    (taxonomytoDisplay: any) => {
      return currentTemplate?.taxonomies?.includes(taxonomytoDisplay.publicKey);
    }
  );

  const onChangeTemplatesTaxonomyHandler = (
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
      addNewTemplateTaxonomy({
        templateIndex: currentTemplateIndex,
        taxonomies: publickKeyValues,
        id: currentTemplateId
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
            value={currentTemplate?.taxonomies || []}
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
