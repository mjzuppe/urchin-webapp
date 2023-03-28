import { useEffect, useState } from 'react';
import { Keypair } from '@solana/web3.js';
// Styles
import classes from './TemplatesList.module.scss';

// Libs
import { v4 as uuidv4 } from 'uuid';

// utils
import paginate from '../../utils/paginate';
import { PAGE_SIZE as pageSize } from '../../utils/constants';
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useAppSelector } from '../../utils/useAppSelector';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';
import {
  addNewTemplate,
  setCurrentTemplateId,
  setTemplateIsPublishable,
} from '../../redux/slices/templates';

// Components
import OrangeButton from '../shared/orangeButton';
import ListRow from '../shared/listRow';
import Pagination from '../shared/pagination';

const TemplatesList = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const templates = useAppSelector((state) => state.templates.templates);
  // const templatesStates = useAppSelector((state) => state.templates);

  const paginatedData = paginate(templates, currentPage, pageSize);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const templatesEditorHandler = () => {
    dispatch(setCurrentProcess('templatesEditor'));
    // Create new template
    const id = uuidv4();
    dispatch(
      addNewTemplate({
        title: '',
        updatedAt: Date.now(),
        publicKey: '',
        arweaveAddress: '',
        entriesNbr: 0,
        id: id,
        inputs: [],
        taxonomies: [],
      })
    );
    dispatch(setCurrentTemplateId(id));
  };

  const templatesEditorEditHandler = (id: string) => {
    dispatch(setCurrentProcess('templatesEditor'));
    dispatch(setCurrentTemplateId(id));
  };

  // if taxonomies array has no empty value setTemplateIsPublishable to true
  useEffect(() => {
    if (templates.length > 0) {
      const templateIsPublishable = templates.some((templates) => {
        return templates.title !== '' && templates.publicKey === '';
      });
      templateIsPublishable
        ? dispatch(setTemplateIsPublishable(true))
        : dispatch(setTemplateIsPublishable(false));
    }
  }, [templates, dispatch]);

  return (
    <section className={classes.templates_list_section}>
      {/* action buttons */}
      <div className={classes.actions_buttons}>
        <OrangeButton
          btnText={'Create New'}
          type={'button'}
          callBack={templatesEditorHandler}
        />
        {/* Modal */}
        {/* <AlertDialog.Root>
          <AlertDialog.Trigger asChild>

            <button className={classes.import_button} type="button">
              Import
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="DialogOverlay" />
            <AlertDialog.Content className="DialogContent">
              <AlertDialog.Title className="AlertDialogTitle">
                Import a Template
              </AlertDialog.Title>

              <div className={`input_wrapper`}>
                <label className="form_label">String Address</label>
                <input
                  type="text"
                  name="token_address"
                  placeholder="Enter token address"
                  className="form_input "
                  id={classes.token_address_input}
                  value={''}
                  onChange={() => {
                    console.log('onChange');
                  }}
                  // onBlur={onBlurTemplateInputHandler}
                />
              </div>

              <div className="AlertDialogActions">
                <AlertDialog.Action asChild>
                  <div className="submit_btn_container">
                    <OrangeButton
                      btnText={'Import'}
                      className={classes.submit_btn}
                      type={'button'}
                      callBack={() => console.log('Import')}
                    />
                  </div>
                </AlertDialog.Action>
                <AlertDialog.Cancel asChild>
                  <button type="button" className="cancel_btn">
                    Cancel
                  </button>
                </AlertDialog.Cancel>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root> */}
      </div>
      {/* Templates List */}
      <div className={classes.templates_list}>
        {paginatedData &&
          paginatedData.map((template: any) => {
            const { title, updatedAt, publicKey, arweaveAddress, entriesNbr } =
              template;
            return (
              <ListRow
                key={template.publicKey}
                title={title || 'Untitled'}
                updatedAt={updatedAt}
                publicKey={publicKey}
                arweaveAddress={template.arweaveId}
                entriesNbr={entriesNbr || 0}
                onClickEditHandler={() =>
                  templatesEditorEditHandler(template.id)
                }
              />
            );
          })}
        {!paginatedData.length && (
          <p className="empty_list">No templates yet</p>
        )}
      </div>
      <Pagination
        items={templates.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
};
export default TemplatesList;
