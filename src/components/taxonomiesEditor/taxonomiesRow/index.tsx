import { Key, useEffect, useState } from 'react';
// Styles
import classes from './TaxonomiesRow.module.scss';
import { Keypair } from '@solana/web3.js';

// Utils
import { useAppDispatch } from '../../../utils/useAppDispatch';
import { useAppSelector } from '../../../utils/useAppSelector';

// redux
import {
  addNewTaxonomy,
  deleteTaxonomy,
  updateTaxonomyGrandParent,
  updateTaxonomyLabel,
  updateTaxonomyParent,
  setTaxonomyErrors,
  removeTaxonomyErrors,
} from '../../../redux/slices/taxonomies';

// Components
import Separator from '../../shared/separator';
import { CustomSelectSingle } from '../../shared/customSelectSingle';
import { Taxonomy } from '../../../types/Taxonomies';

const DUPLICATE_LABEL_ERROR = "label name must be unique"

const TaxonomiesRow = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [taxonomyLabelError, setTaxonomyLabelError] = useState<boolean>(false);
  const [errorIndex, setErrorIndex] = useState<number>(-1);

  const taxonomies =  useAppSelector((state) => state.taxonomies.original)
  const errors = useAppSelector((state) => state.taxonomies.errors)

  useEffect(() => {
    taxonomies.length === 0 &&
      dispatch(
        addNewTaxonomy({
          label: '',
          parent: '',
          grandParent: '',
          updatedAt: Date.now(),
          solanaAddress: '',
          arweaveAddress: '',
          publicKey: Keypair.generate().publicKey,
        })
      );
  });

  
  const checkErrors = (taxonomy: Taxonomy, index: number) => {
    const labelNames = taxonomies.map((taxonomy: { label: string; }) => taxonomy.label.toLowerCase().trim())
    
    const toFindDuplicates = () => labelNames.filter((item, index) => labelNames.indexOf(item) !== index)
    const duplicateLabels = toFindDuplicates();

    if(duplicateLabels.includes(taxonomy.label.toLowerCase().trim())) {
      dispatch(
        setTaxonomyErrors({
          publicKey: taxonomy.publicKey, 
          index, 
          message: DUPLICATE_LABEL_ERROR
        }),
      )
    } else {
      console.log(errors)
      dispatch(
        removeTaxonomyErrors({
          publicKey: taxonomy.publicKey
        })
      )
    }
  }
    
  useEffect(() => {
    taxonomies.map((taxonomy, index )=> {
      checkErrors(taxonomy, index)
    })
  }, [taxonomies.map(taxo => taxo.label)])
  
  const findParent = (parent: any) => {
    const parentIndex = taxonomies.findIndex(
      (taxonomy: any) => taxonomy.label.toLowerCase() === parent
    );
    if (parentIndex !== -1) {
      return taxonomies[parentIndex].parent;
    }
    return '';
  };

  const onChangeTaxonomyHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number, 
    publicKey: string
  ) => {
    const { name, value } = event.target;
    if (name === 'label' && value !== '') {
      setTaxonomyLabelError(false);
    }

    const newTaxonomy = {
      [name]: value.trimStart(),
      grandparent: '',
      index,
      publicKey
    };
    if (newTaxonomy.hasOwnProperty('label')) {
      dispatch(updateTaxonomyLabel(newTaxonomy));
    }
    if (newTaxonomy.hasOwnProperty('parent')) {
      dispatch(updateTaxonomyParent(newTaxonomy));
      const grandParent = findParent(newTaxonomy.parent);
      dispatch(updateTaxonomyGrandParent({ grandParent, index }));
    }
  };

  const onBlurTaxonomyHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number, 
    publicKey: string
  ) => {
    const { name, value } = event.target;
    if (name === 'label' && value === '') {
      setErrorIndex(index);
    }
    
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

  const renderTaxonomyErrorMesage = (taxonomy: Taxonomy, index: number) => {
    let inputErrors = errors.filter((err: { publicKey: string, index: number }) => err.publicKey === taxonomy.publicKey)
    if(inputErrors.length > 0) {
      return(
        <span className="error_message">{inputErrors[0].message}</span>
      ) 
    }
  }
  
  return (
    <>
      {taxonomies?.map((taxonomy: Taxonomy, index: number) => (
        <div className={classes.taxonomies_row_container} key={index}>
          <div className="single_row_form">
            <div className={`single_input input_wrapper`}>
              <label className="form_label" data-required={'required'}>
                Label
              </label>
              <input
                required
                type="text"
                name="label"
                placeholder="Enter a label"
                className="form_input"
                value={taxonomy.label || ''}
                maxLength={24}
                onChange={(event) => onChangeTaxonomyHandler(event, index, taxonomy.publicKey)}
                onBlur={(event) => onBlurTaxonomyHandler(event, index, taxonomy.publicKey)}
              />
              {
                renderTaxonomyErrorMesage(taxonomy, index) 
              }
            </div>
            <div className={`single_input input_wrapper`}>
              <CustomSelectSingle
                id="parent"
                name="parent"
                label="Parent"
                isRequired
                displayValue="label"
                optionsList={[
                  { value: 'music', label: 'Music' },
                  { value: 'rock', label: 'rock' },
                ]}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  onChangeTaxonomyHandler(event, index, taxonomy.publicKey)
                }
                value={taxonomy.parent}
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
