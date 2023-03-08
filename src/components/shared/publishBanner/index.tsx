import { useState } from 'react';

// Styles
import classes from './PublishBanner.module.scss';

// Lib
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const PublishBanner = (): JSX.Element => {
  const [openChangeLog, setOpenChangeLog] = useState(false);

  const changelogHandler = () => {
    console.log('changelogHandler');
    setOpenChangeLog(!openChangeLog);
  };
  const publishHandler = () => {
    console.log('publishHandler');
  };

  const cancelHandler = () => {
    console.log('cancelHandler');
  };

  // TODO: Dynamise when available
  const changes = [
    {
      changeCategory: 'Template',
      changeName: 'Ipsam voluptatem',
    },
    {
      changeCategory: 'Taxonomy',
      changeName: 'Lorem',
    },
  ];

  return (
    <div className={classes.banner_container}>
      <div className={classes.flex_left}>
        <p className={classes.banner_text}>
          You have {''}
          <span className={classes.changes} onClick={changelogHandler}>
            changes
          </span>{' '}
          {''}
          not committed on the blockchain
        </p>

        {openChangeLog && (
          // TODO: Dynamise when available
          <div className={classes.changelog}>
            {changes.map((change, index) => (
              <div key={`change-${change.changeName}-${index}`}>
                <span className={classes.category}>
                  Create {change.changeCategory}: {''}
                </span>
                <span className={classes.name}>{change.changeName}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classes.flex_right}>
        <button
          type="button"
          className={classes.cancel_button}
          onClick={cancelHandler}
        >
          Cancel All
        </button>

        {/* Publish Modal */}
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <button type="button" className={classes.publish_button}>
              Publish
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="DialogOverlay" />
            <AlertDialog.Content className={classes.DialogContent}>
              <AlertDialog.Title className={classes.AlertDialogTitle}>
                Publish All Changes
              </AlertDialog.Title>
              <AlertDialog.Description
                className={classes.AlertDialogDescription}
              >
                Confirm that you want to save this entry on-chain. Signature
                required and estimated fee is 0.001 SOL.
              </AlertDialog.Description>
              <div className="AlertDialogActions">
                <AlertDialog.Cancel asChild>
                  <button type="button" className={classes.cancel_btn}>
                    Cancel
                  </button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <button
                    type="button"
                    className={classes.confirm_btn}
                    onClick={publishHandler}
                  >
                    Confirm
                  </button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>
    </div>
  );
};

export default PublishBanner;
