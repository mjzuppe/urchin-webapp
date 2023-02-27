import { useState } from 'react';

// Styles
import classes from './TemplatesList.module.scss';

// utils
import paginate from '../../utils/paginate';
import { PAGE_SIZE as pageSize } from '../../utils/constants';
import { useAppDispatch } from '../../utils/useAppDispatch';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';

// Components
import OrangeButton from '../shared/orangeButton';
import ListRow from '../shared/listRow';
import Pagination from '../shared/pagination';

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
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paginatedData = paginate(mockdata, currentPage, pageSize);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const templatesEditorHandler = () => {
    dispatch(setCurrentProcess('templatesEditor'));
  };

  return (
    <section className={classes.templates_list_section}>
      {/* action buttons */}
      <div className={classes.actions_buttons}>
        <OrangeButton
          btnText={'Create New'}
          type={'button'}
          callBack={templatesEditorHandler}
        />
        <OrangeButton
          btnText={'Import'}
          callBack={() => console.log('Import')}
          type={'button'}
          invert
        />
      </div>
      {/* Templates List */}
      <div className={classes.templates_list}>
        {paginatedData.map((template: any) => {
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
      <Pagination
        items={mockdata.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
};
export default TemplatesList;
