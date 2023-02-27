import { useState } from 'react';
// Styles
import classes from './CreateTaxonomies.module.scss';

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

const CreateTaxonomies = (): JSX.Element => {
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
    dispatch(addNewTaxonomy({ label: null, parent: null }));
    setTaxonomiesCount(taxonomiesCount + 1);
  };

  return (
    <section className={classes.create_taxonomie_section}>
      <BackButton onClickHandler={handleBackClick} />
      {/* Breadcrumbs section */}
      <div className={classes.breadcrumbs_section}>
        <p>Taxonomies &gt; Categories</p>
      </div>
      <div className={classes.taxonomies_action_btn_wrapper}>
        {/* if Edit add Revision nbr + last updated date */}
        <OrangeButton
          // change text if Edit
          btnText={'Save'}
          type="submit"
          // TODO: change callback when available
          callBack={() => console.log('save')}
          className={classes.save_btn}
        />
      </div>
      {/* Taxonomies form */}
      <div className={classes.taxonomies_form}>
        <TaxonomiesRow />
      </div>
      <div className={classes.create_btn_wrapper}>
        <OrangeButton
          btnText="Create New"
          invert
          type="button"
          callBack={addRowHandler}
          className={classes.create_btn}
        />
      </div>
    </section>
  );
};

export default CreateTaxonomies;
