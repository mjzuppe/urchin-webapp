// Styles
import classes from './TemplatesList.module.scss';

// Components
import Button from '@/components/shared/button';
import ListRow from '@/components/shared/listRow';

const mockdata = [
  {
    title: 'Template 1',
    updatedAt: 'June 2nd 2023',
    solanaAddress: '3SJ...93A',
    arweaveAddress: '5SX...5AB',
    entriesNbr: 4,
  },
  {
    title: 'Template 2',
    updatedAt: 'May 27th 2022',
    solanaAddress: '3SJ...93A',
    arweaveAddress: '5SX...5AB',
    entriesNbr: 1,
  },
  {
    title: 'Template 3',
    updatedAt: 'January 12th 2022',
    solanaAddress: '3SJ...93A',
    arweaveAddress: '5SX...5AB',
    entriesNbr: 3,
  },
];

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
      <div className={classes.templates_list}>
        {mockdata.map((template) => {
          const {
            title,
            updatedAt,
            solanaAddress,
            arweaveAddress,
            entriesNbr,
          } = template;
          return (
            <ListRow
              key={title}
              title={title}
              updatedAt={updatedAt}
              solanaAddress={solanaAddress}
              arweaveAddress={arweaveAddress}
              entriesNbr={entriesNbr}
            />
          );
        })}
      </div>
    </section>
  );
};
export default TemplatesList;
