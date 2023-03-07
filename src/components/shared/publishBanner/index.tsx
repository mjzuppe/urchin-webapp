import { useState } from 'react';

// Styles
import classes from './PublishBanner.module.scss';

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
        <button
          type="button"
          className={classes.publish_button}
          onClick={publishHandler}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default PublishBanner;
