// Styles
import classes from './TaxonomiesList.module.scss';

// Components
import Button from '@/components/shared/button';

const TaxonomiesList = () => {
  return (
    <section className={classes.taxonomies_list_section}>
      {/* action buttons */}
      <div className={classes.actions_buttons}>
        <Button
          btnText={'Create New'}
          type={'button'}
          callBack={() => console.log('Create New')}
        />
      </div>
      {/* Taxonomies List */}
    </section>
  );
};
export default TaxonomiesList;
