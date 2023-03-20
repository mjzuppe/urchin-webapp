import { useEffect, useState } from 'react';

// Styles
import classes from './TaxonomiesList.module.scss';

// utils
import paginate from '../../utils/paginate';
import { PAGE_SIZE as pageSize } from '../../utils/constants';
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useAppSelector } from '../../utils/useAppSelector';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';
import { setTaxonomiesIsPublishable } from '../../redux/slices/taxonomies';

// Components
import OrangeButton from '../shared/orangeButton';
import ListRow from '../shared/listRow';
import Pagination from '../shared/pagination';

const TaxonomiesList = () => {

  const taxonomiesList = (taxonomies: any) => {
    let taxonomyList = taxonomies.original
    const editedTaxonomies = taxonomies.edited
    const newTaxonomies = taxonomies.new

    return taxonomyList
  }

  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const taxonomies = useAppSelector((state) => taxonomiesList(state.taxonomies));

  console.log(taxonomies)

  const paginatedData = paginate(taxonomies, currentPage, pageSize);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const taxonomiesEditorHandler = () => {
    dispatch(setCurrentProcess('taxonomiesEditor'));
  };

  // if taxonomies array has no empty value setTaxonomiesIsPublishable to true
  useEffect(() => {
    if (taxonomies.length > 0) {
      const taxoIsPublishable = taxonomies.some(
        (taxo: { label: string; publicKey: string; }) => taxo.label !== '' && taxo.publicKey === ''
      );
      // console.log('taxoIsPublishable', taxoIsPublishable);

      taxoIsPublishable
        ? dispatch(setTaxonomiesIsPublishable(true))
        : dispatch(setTaxonomiesIsPublishable(false));
    }
  }, [taxonomies, dispatch]);

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
            const { updatedAt } = taxonomy;
            return (
              <ListRow
                key={taxonomy?.publicKey}
                title={taxonomy?.label || 'Untitled'}
                updatedAt={updatedAt}
                publicKey={taxonomy?.publicKey}
                entriesNbr={0}
                onClickEditHandler={() => {
                  dispatch(setCurrentProcess('taxonomiesEditor'));
                }}
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
