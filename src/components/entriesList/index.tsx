// Styles
import classes from './EntriesList.module.scss';

// Components
// import Button from '../shared/button';
import ListRow from '../shared/listRow';

const EntriesList = () => {
  const mockdata = [
    {
      title: 'My first Post',
      updatedAt: 'June 2nd 2023',
      solanaAddress: '3SJ...93A',
      arweaveAddress: '5SX...5AB',
    },
    {
      title: 'Another post title',
      updatedAt: 'May 27th 2022',
      solanaAddress: '3SJ...93A',
      arweaveAddress: '5SX...5AB',
    },
    {
      title: 'My third post',
      updatedAt: 'January 12th 2022',
      solanaAddress: '3SJ...93A',
      arweaveAddress: '5SX...5AB',
    },
  ];
  return (
    <section className={classes.entries_list_section}>
      {/* action buttons */}
      <div className={classes.actions_buttons}>
        {/* <Button
          btnText={'Create New'}
          type={'button'}
          callBack={() => console.log('Create New')}
        /> */}
      </div>
      {/* Entries List */}
      <div className={classes.templates_list}>
        {mockdata.map((template) => {
          const { title, updatedAt, solanaAddress, arweaveAddress } = template;
          return (
            <ListRow
              key={title}
              title={title}
              updatedAt={updatedAt}
              solanaAddress={solanaAddress}
              arweaveAddress={arweaveAddress}
            />
          );
        })}
      </div>
    </section>
  );
};
export default EntriesList;
