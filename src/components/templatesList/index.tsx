// Styles
import classes from './TemplatesList.module.scss';

// Components
import Button from 'src/components/shared/Button';

const TemplatesList = () => {
  return (
    <section className={classes.templates_list_section}>
      {/* action buttons */}
      <div className={classes.actions_buttons}>
        <Button
          btnText={'Create New'}
          type={'button'}
          callBack={() => console.log('Create New')}
        />
        <Button
          btnText={'Import'}
          callBack={() => console.log('Import')}
          type={'button'}
          invert
        />
      </div>
      {/* Templates List */}
    </section>
  );
};
export default TemplatesList;
