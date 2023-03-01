import { useState } from 'react';

// Styles
import classes from './TaxonomiesList.module.scss';

// utils
import paginate from '../../utils/paginate';
import { PAGE_SIZE as pageSize } from '../../utils/constants';
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useAppSelector } from '../../utils/useAppSelector';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';

// Components
import OrangeButton from '../shared/orangeButton';
import ListRow from '../shared/listRow';
import Pagination from '../shared/pagination';

// const mockdata = [
//   {
//     title: 'Music',
//     updatedAt: 'June 2nd 2023',
//     solanaAddress: '3SJ...93A',
//   },
//   {
//     title: 'Lifestyle',
//     updatedAt: 'May 27th 2022',
//     solanaAddress: '3SJ...93A',
//   },
//   {
//     title: 'Fashion',
//     updatedAt: 'January 12th 2022',
//     solanaAddress: '3SJ...93A',
//   },
// ];

const TaxonomiesList = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const taxonomies = useAppSelector((state) => state.taxonomies.taxonomies);

  const paginatedData = paginate(taxonomies, currentPage, pageSize);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const taxonomiesEditorHandler = () => {
    dispatch(setCurrentProcess('taxonomiesEditor'));
  };

  return (
    <section className={classes.taxonomies_list_section}>
      {/* action buttons */}
      <div className={classes.actions_buttons}>
        <OrangeButton
          btnText={'Create New'}
          type={'button'}
          callBack={taxonomiesEditorHandler}
        />
      </div>
      {/* Taxonomies List */}
      <div className={classes.taxonomies_list}>
        {paginatedData &&
          paginatedData.map((taxonomy: any) => {
            const { updatedAt, solanaAddress } = taxonomy;
            return (
              <ListRow
                key={taxonomy?.label}
                title={taxonomy?.label}
                updatedAt={updatedAt}
                solanaAddress={solanaAddress}
              />
            );
          })}
        {!paginatedData.length && (
          <p className="empty_list">No Taxonomies yet</p>
        )}
      </div>
      <Pagination
        items={taxonomies.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
};
export default TaxonomiesList;
