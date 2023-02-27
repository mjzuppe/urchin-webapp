import { useState } from 'react';

// Styles
import classes from './TaxonomiesList.module.scss';

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
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginatedData = paginate(mockdata, currentPage, pageSize);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const createEditTaxonomiesHandler = () => {
    dispatch(setCurrentProcess('createTaxonomies'));
  };

  return (
    <section className={classes.taxonomies_list_section}>
      {/* action buttons */}
      <div className={classes.actions_buttons}>
        <OrangeButton
          btnText={'Create New'}
          type={'button'}
          callBack={createEditTaxonomiesHandler}
        />
      </div>
      {/* Taxonomies List */}
      <div className={classes.taxonomies_list}>
        {paginatedData.map((template: any) => {
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
      <Pagination
        items={mockdata.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
};
export default TaxonomiesList;
