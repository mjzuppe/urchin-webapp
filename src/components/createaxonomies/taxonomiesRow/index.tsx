// Styles
import classes from './TaxonomiesRow.module.scss';

// Utils
import { useAppDispatch } from '../../../utils/useAppDispatch';
import { useAppSelector } from '../../../utils/useAppSelector';

// redux
import {
  deleteTaxonomy,
  updateTaxonomyLabel,
  updateTaxonomyParent,
} from '../../../redux/slices/taxonomies';

// Components
import Separator from '../../shared/separator';
import { CustomSelectSingle } from '../../shared/customSelectSingle';

const TaxonomiesRow = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const taxonomies = useAppSelector((state) => state.taxonomies.taxonomies);

  const onChangeTaxonomyHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;

    const newTaxonomy = {
      [name]: value.trimStart(),
      index,
    };

    if (newTaxonomy.hasOwnProperty('label')) {
      dispatch(updateTaxonomyLabel(newTaxonomy));
    }
    if (newTaxonomy.hasOwnProperty('parent')) {
      dispatch(updateTaxonomyParent(newTaxonomy));
    }
  };

  const onBlurTaxonomyHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    const newTaxonomy = {
      [name]: value.trimEnd(),
      index,
    };

    if (newTaxonomy.hasOwnProperty('label')) {
      dispatch(updateTaxonomyLabel(newTaxonomy));
    }
    if (newTaxonomy.hasOwnProperty('parent')) {
      dispatch(updateTaxonomyParent(newTaxonomy));
    }
  };

  const removeRowHandler = (index: number) => {
    if (taxonomies.length <= 1) return;
    dispatch(deleteTaxonomy({ taxonomieIndex: index }));
  };

  return (
    <>
      {taxonomies?.map((taxonomie, index) => (
        <div className={classes.row_container} key={index}>
          <div className={classes.row_form}>
            <div className={`${classes.single_input} input_wrapper`}>
              <label className="form_label" data-required={'required'}>
                Label
              </label>
              <input
                required
                type="text"
                name="label"
                placeholder="Enter a label"
                className="form_input"
                value={taxonomie.label || ''}
                maxLength={24}
                onChange={(event) => onChangeTaxonomyHandler(event, index)}
                onBlur={(event) => onBlurTaxonomyHandler(event, index)}
              />
            </div>
            <div className={`${classes.single_input} input_wrapper`}>
              <CustomSelectSingle
                id="parent"
                name="parent"
                label="Parent"
                isRequired
                displayValue="label"
                optionsList={[
                  {
                    value: '',
                    label: 'No Parent',
                  },
                  { value: 'parent1', label: 'Parent 1' },
                  { value: 'Parent2', label: 'Parent 2' },
                  { value: 'parent3', label: 'Parent 3' },
                  { value: 'Parent4', label: 'Parent 4' },
                ]}
                onChange={(event: any) => onChangeTaxonomyHandler(event, index)}
                value={taxonomie.parent}
                className={`${classes.genres_container}`}
                placeholder={'No parent Selected'}
              />
            </div>
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
    </>
  );
};

export default TaxonomiesRow;
