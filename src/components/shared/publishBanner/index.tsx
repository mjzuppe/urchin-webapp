import { useEffect, useState } from 'react';

// Styles
import classes from './PublishBanner.module.scss';

// Lib
import * as AlertDialog from '@radix-ui/react-alert-dialog';

// Utils
import { useAppSelector } from '../../../utils/useAppSelector';
import { useAppDispatch } from '../../../utils/useAppDispatch';

// REDUX
import { setIsPublishable } from '../../../redux/slices/taxonomies';

//  SDK
import connection from '../../../utils/connection';
import { setDisplayBanner } from '../../../redux/slices/banner';

interface Taxonomy {
  label: string;
  parent?: string;
  publicKey?: string;
}

interface TemplateInputs {
  label: string;
  type: 'text' | 'textarea' | 'select' | 'numeric' | 'file';
  options?: Array<string>;
  validateInputs: boolean;
  minLength?: number;
  maxLength?: number;
}

interface Template {
  title: string;
  inputs: Array<TemplateInputs>;
  taxonomies?: Array<Taxonomy>;
}

const PublishBanner = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [openChangeLog, setOpenChangeLog] = useState(false);

  const changelogHandler = () => {
    setOpenChangeLog(!openChangeLog);
  };

  const cancelHandler = () => {
    // TODO: Purge Preflight + reset redux????
    console.log('cancelHandler');
  };

  useEffect(() => {}, []);

  // !! Taxonomies
  const taxonomies = useAppSelector(
    (state: any) => state.taxonomies.taxonomies
  );
  console.log('taxonomies', taxonomies);
  // filter taxonomies with empty pubKey
  const filteredTaxo = taxonomies.filter(
    (taxonomy: Taxonomy) => taxonomy.publicKey === ''
  );

  const taxonomiesToPublish = filteredTaxo.map((taxonomy: Taxonomy) => {
    const { label, parent, publicKey }: Taxonomy = taxonomy;
    return {
      label,
      // parent, => should be a publicKey new PublicKey(string)
    };
  });
  // console.log('taxonomiesToPublish', taxonomiesToPublish);

  // !! Templates
  const templates = useAppSelector((state: any) => state.templates.templates);
  // console.log('templates', templates);

  const templatesToPublish = templates.map((template: Template) => {
    const { title } = template;
    const taxonomies = template?.taxonomies?.map((taxonomy: Taxonomy) => {
      const { label }: Taxonomy = taxonomy;
      return label;
    });

    const inputs = template.inputs.map((input: TemplateInputs) => {
      const { label, type, options, validateInputs, minLength, maxLength } =
        input;

      return {
        label,
        type,
        ...(type === 'select' && { options }),
        ...(validateInputs && {
          validation: {
            type,
            min: minLength,
            max: maxLength,
          },
        }),
      };
    });

    return {
      title,
      taxonomies,
      inputs,
    };
  });
  // console.log('templatesToPublish', templatesToPublish);

  // !! ENTRIES
  const entries = useAppSelector((state: any) => state.entries.entries);
  // console.log('entries', entries);

  const entriesToPublish = entries.map((entry: any) => {
    const { template, inputs } = entry;
    const taxonomiesArray = entry.taxonomies.map((taxonomy: Taxonomy) => {
      const { label }: Taxonomy = taxonomy;
      return label;
    });

    return {
      inputs: inputs,
      taxonomies: taxonomiesArray,
      //TODO: change id for pubKey
      template,
    };
  });
  // console.log('entriesToPublish', entriesToPublish);

  // !! ASSETS
  // const assets = useAppSelector((state: any) => state.assets.assets);
  // console.log('assets', assets);

  const preflightHandler = async () => {
    // Create taxonomy
    const createTaxonomy = connection.taxonomy.create(taxonomiesToPublish);
    console.log('createTaxonomy', createTaxonomy);

    // Create template
    // const createTemplate = connection.template.create(templatesToPublish);
    // console.log('createTemplate', createTemplate);

    // Create asset
    // const createAsset = connection.asset.create(assets);
    // console.log('createAsset', createAsset);

    // Preflight
    const preflight = await connection.preflight().then((res) => {
      console.log('PREFLIGHT::', res);
    });
  };

  const publishHandler = async () => {
    const sendToChain = await connection.process();

    // Taxonomies
    dispatch(setIsPublishable(false));
    // display banner to false
    dispatch(setDisplayBanner(false));
  };

  // TODO:  the same for entries + assets
  const taxonomiesChanges = {
    changeCategory: 'Taxonomies',
    //
    changeName: taxonomiesToPublish
      .map((taxonomy: any) => taxonomy.label)
      .join(', '),
  };
  const templatesChanges = {
    changeCategory: 'Templates',
    changeName: templatesToPublish
      .map((template: any) => template.title)
      .join(', '),
  };

  const entriesChanges = {
    changeCategory: 'Entries',
    changeName: `${entriesToPublish.length} entries`,
  };

  const changes = [];
  if (taxonomiesToPublish.length > 0) {
    changes.push(taxonomiesChanges);
  }
  if (templatesToPublish.length > 0) {
    changes.push(templatesChanges);
  }
  if (entriesToPublish.length > 0) {
    changes.push(entriesChanges);
  }

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
            <button
              type="button"
              className={classes.publish_button}
              onClick={preflightHandler}
            >
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
