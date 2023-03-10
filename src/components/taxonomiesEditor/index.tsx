import { useState } from 'react';
// Styles
import classes from './TaxonomiesEditor.module.scss';

// Utils
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useAppSelector } from '../../utils/useAppSelector';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';
import { addNewTaxonomy } from '../../redux/slices/taxonomies';

// Components
import BackButton from '../shared/backButton';
import OrangeButton from '../shared/orangeButton';
import TaxonomiesRow from './taxonomiesRow';
import Breadcrumbs from '../shared/breadcrumbs';

const TaxonomiesEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const taxonomies = useAppSelector((state) => state.taxonomies.taxonomies);

  const initialTaxonomiesCount = taxonomies.length;
  const [taxonomiesCount, setTaxonomiesCount] = useState<number>(
    initialTaxonomiesCount
  );

  // Handlers
  const handleBackClick = () => {
    dispatch(setCurrentProcess('default'));
  };

  const addRowHandler = () => {
    dispatch(
      addNewTaxonomy({
        label: '',
        parent: '',
        grandParent: '',
        updatedAt: Date.now(),
        solanaAddress: '',
        arweaveAddress: '',
        publicKey: '',
      })
    );
    setTaxonomiesCount(taxonomiesCount + 1);
  };

  return (
    <section className={classes.taxonomies_editor_section}>
      <BackButton onClickHandler={handleBackClick} />
      <Breadcrumbs section="Taxonomies" title={'Taxonomy List'} />

      {/* add Revision nbr + last updated date */}
      {/* <div className="editors_action_btn_wrapper">
      </div> */}
      {/* Taxonomies form */}
      <div className={classes.taxonomies_form}>
        <TaxonomiesRow />
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

export default TaxonomiesEditor;
