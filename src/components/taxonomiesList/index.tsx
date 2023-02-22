// Styles
import classes from './TaxonomiesList.module.scss';

// Components
import Button from '../shared/button';
import ListRow from '../shared/listRow';

const mockdata = [
  {
    title: 'Music',
    updatedAt: 'June 2nd 2023',
    solanaAddress: '3SJ...93A',
  },
  {
    title: 'Lifestyle',
    updatedAt: 'May 27th 2022',
    solanaAddress: '3SJ...93A',
  },
  {
    title: 'Fashion',
    updatedAt: 'January 12th 2022',
    solanaAddress: '3SJ...93A',
  },
];

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
      <div className={classes.taxonomies_list}>
        {mockdata.map((template) => {
          const { title, updatedAt, solanaAddress } = template;
          return (
            <ListRow
              key={title}
              title={title}
              updatedAt={updatedAt}
              solanaAddress={solanaAddress}
            />
          );
        })}
      </div>
    </section>
  );
};
export default TaxonomiesList;
