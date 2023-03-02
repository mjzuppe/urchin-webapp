import { useState } from 'react';

// Styles
import classes from './EntriesList.module.scss';

// Libs
import { v4 as uuidv4 } from 'uuid';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

// utils
import paginate from '../../utils/paginate';
import { PAGE_SIZE as pageSize } from '../../utils/constants';
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useAppSelector } from '../../utils/useAppSelector';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';
import { addNewEntry } from '../../redux/slices/entries';

// Components
import OrangeButton from '../shared/orangeButton';
import ListRow from '../shared/listRow';
import Pagination from '../shared/pagination';
import { CustomSelectSingle } from '../shared/customSelectSingle';

// TODO: REPLACE WITH REAL DATA
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
  const entries = useAppSelector((state) => state.entries.entries);
  const templates = useAppSelector((state) => state.templates.templates);
  console.log('templates', templates);

  const [templateSelected, setTemplateSelected] = useState({
    template: '',
    templateTitle: '',
  });

  const paginatedData = paginate(entries, currentPage, pageSize);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const selectOptionList = templates.map((template) => {
    return {
      value: template.id,
      label: template.title,
    };
  });

  const onChangeSelectTemplatesHandler = (event: any) => {
    setTemplateSelected({
      template: event.target.value,
      templateTitle: event.target.label,
    });
  };
  const templateSelectorSubmitHandler = () => {
    dispatch(setCurrentProcess('entriesEditor'));
    // Create new entry
    const id = uuidv4();
    dispatch(
      addNewEntry({
        id,
        // template title
        title: templateSelected.templateTitle,
        // template id
        template: templateSelected.template,
        updatedAt: Date.now(),
        solanaAddress: '',
        arweaveAddress: '',
        inputs: [],
        taxonomies: [],
      })
    );
  };

  return (
    <>
      <section className={classes.entries_list_section}>
        {/* Modal */}
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            {templates && templates.length > 0 && (
              <div className={classes.actions_buttons}>
                {/* For some reason OrangeButton Component is not working here. To investigate later */}
                <button className={classes.trigger_button}>
                  Create New Entry
                </button>
              </div>
            )}
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className={classes.DialogOverlay} />
            <AlertDialog.Content className={classes.DialogContent}>
              <AlertDialog.Title className={classes.AlertDialogTitle}>
                Choose a template
              </AlertDialog.Title>

              <div className={classes.select_wrapper}>
                <CustomSelectSingle
                  id="template_select"
                  name="template_select"
                  label="Eligible Templates"
                  displayValue="label"
                  optionsList={selectOptionList}
                  onChange={(event: any) =>
                    onChangeSelectTemplatesHandler(event)
                  }
                  value={templateSelected.template}
                  placeholder={'Select one template'}
                  className={classes.select}
                />
              </div>

              <div className={classes.AlertDialogActions}>
                <AlertDialog.Action asChild>
                  <div className={classes.submit_btn_container}>
                    <OrangeButton
                      btnText={'Submit'}
                      className={classes.submit_btn}
                      type={'button'}
                      callBack={templateSelectorSubmitHandler}
                    />
                  </div>
                </AlertDialog.Action>
                <AlertDialog.Cancel asChild>
                  <button type="button" className={classes.cancel_btn}>
                    Cancel
                  </button>
                </AlertDialog.Cancel>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>

        {/* Entries List */}
        <div className={classes.templates_list}>
          {paginatedData.map((entry: any) => {
            const { title, updatedAt, solanaAddress, arweaveAddress } = entry;
            return (
              <ListRow
                key={updatedAt}
                // TODO change that
                title={title}
                updatedAt={updatedAt}
                solanaAddress={solanaAddress}
                arweaveAddress={arweaveAddress}
                id={entry.id}
              />
            );
          })}
          {!paginatedData.length && (
            <p className="empty_list">
              No Entries yet
              <br />
              Please create a Template first
            </p>
          )}
        </div>
        <Pagination
          items={mockdata.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </section>
    </>
  );
};
export default EntriesList;
