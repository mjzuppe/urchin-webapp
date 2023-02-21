// Styles
import classes from './EntriesList.module.scss';

// Components
import Button from '../shared/Button';

const EntriesList = () => {
  return (
    <section className={classes.entries_list_section}>
      {/* action buttons */}
      <div className={classes.actions_buttons}>
        <Button
          btnText={'Create New'}
          type={'button'}
          callBack={() => console.log('Create New')}
        />
      </div>
      {/* Entries List */}
    </section>
  );
};
export default EntriesList;
