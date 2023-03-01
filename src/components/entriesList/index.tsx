import { useState } from 'react';

// Styles
import classes from './EntriesList.module.scss';

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

const EntriesList = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paginatedData = paginate(mockdata, currentPage, pageSize);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const entriessEditorHandler = () => {
    dispatch(setCurrentProcess('entriesEditor'));
    // Create new entry
  };

  return (
    <section className={classes.entries_list_section}>
      {/* action buttons */}
      <div className={classes.actions_buttons}>
        <OrangeButton
          btnText={'Create New'}
          type={'button'}
          callBack={entriessEditorHandler}
        />
      </div>
      {/* Entries List */}
      <div className={classes.templates_list}>
        {paginatedData.map((template: any) => {
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
      <Pagination
        items={mockdata.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
};
export default EntriesList;
