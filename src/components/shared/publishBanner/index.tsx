import { useState } from 'react';

// Styles
import classes from './PublishBanner.module.scss';

// Lib
import * as AlertDialog from '@radix-ui/react-alert-dialog';

// Utils
import { useAppSelector } from '../../../utils/useAppSelector';
import { useAppDispatch } from '../../../utils/useAppDispatch';

// REDUX
import { setTaxonomiesIsPublishable } from '../../../redux/slices/taxonomies';
import { setTemplateIsPublishable } from '../../../redux/slices/templates';
import { setEntryIsPublishable } from '../../../redux/slices/entries';
import { setDisplayBanner } from '../../../redux/slices/banner';
import {
  setTemplates,
  purgeTemplatesNew,
} from '../../../redux/slices/templates';
import {
  setTaxonomies,
  purgeTaxonomiesNew,
} from '../../../redux/slices/taxonomies';
import { setEntries } from '../../../redux/slices/entries';

//  SDK
// import connection from '../../../utils/connection';
import {
  Keypair,
  PublicKey,
  Transaction,
  clusterApiUrl,
  Connection,
} from '@solana/web3.js';
import urchin from 'urchin-web3-cms';
import bs58 from 'bs58';
import { useWallet } from '@solana/wallet-adapter-react';

// Components
import Hourglass from '../hourglass';

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
  id: string;
  title: string;
  publicKey?: string;
  inputs: Array<TemplateInputs>;
  taxonomies?: Array<Taxonomy>;
}

const PublishBanner = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [openChangeLog, setOpenChangeLog] = useState(false);
  const [displayHourglass, setDisplayHourglass] = useState(false);
  const [cost, setCost] = useState(0);
  // const [loading, setLoading] = useState(false);

  // const payer = Keypair.fromSecretKey(
  //   // TODO: change when available
  //   bs58.decode(
  //     '3YNWe72jopyTiJWtRBWTGVkyYb3VtxBfqJ1yaonKfJNwLaTWWL89fMDaswTXX1CJQoFypHkdW4AmfuwhpUc1RwP6'
  //   )
  // );

  // const payer = useWallet().publicKey;
  // if (!payer) throw new Error('No payer found, connection failed');

  // const connection = urchin({
  //   payer,
  //   cluster: 'devnet',
  //   walletContextState: useWallet(),
  // });

  const { connected, publicKey } = useWallet();

  let connection: any = null;

  if (connected && publicKey) {
    connection = urchin({
      payer: new PublicKey(publicKey),
      cluster: 'devnet',
    });
  }

  const changelogHandler = () => {
    setOpenChangeLog(!openChangeLog);
  };

  const cancelHandler = () => {
    dispatch(setTaxonomiesIsPublishable(false));
    dispatch(setTemplateIsPublishable(false));
  };

  //* Taxonomies
  const taxonomies = useAppSelector((state: any) => state.taxonomies);

  const taxonomyErrorPublicKeys = taxonomies.errors.map(
    (error: { publicKey: any }) => error.publicKey
  );

  const newTaxonomiesWithNoErrors = taxonomies.new.filter(
    (taxonomy: Taxonomy) => {
      if (!taxonomyErrorPublicKeys.includes(taxonomy.publicKey)) {
        return taxonomy;
      }
    }
  );

  const taxonomiesToCreate = newTaxonomiesWithNoErrors.map(
    (taxonomy: Taxonomy) => {
      const { label, parent }: Taxonomy = taxonomy;
      return {
        label,
      };
    }
  );

  const editedTaxonomiesWithNoErrors = taxonomies.edited.filter(
    (taxonomy: Taxonomy) => {
      if (!taxonomyErrorPublicKeys.includes(taxonomy.publicKey)) {
        return taxonomy;
      }
    }
  );
  const taxonomiesToUpdate = editedTaxonomiesWithNoErrors || [];

  //* Templates
  const templates = useAppSelector((state: any) => state.templates);

  const templateErrorIds = templates.errors.map(
    (error: { id: any }) => error.id
  );
  const templateErrorInputIds = templates.inputsErrors.map(
    (error: { templateId: any }) => error.templateId
  );

  const newTemplatesWithNoErrors = templates.new.filter(
    (template: Template) => {
      if (
        !templateErrorIds.includes(template.id) &&
        !templateErrorInputIds.includes(template.id)
      ) {
        return template;
      }
    }
  );

  const templatesToPublish = newTemplatesWithNoErrors.map(
    (template: Template) => {
      const { title } = template;
      const taxonomies = template?.taxonomies?.map((taxonomy: Taxonomy) => {
        const { publicKey }: Taxonomy = taxonomy;
        return publicKey;
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
    }
  );

  //* ENTRIES
  const entries = useAppSelector((state: any) => state.entries.entries);

  // filter taxonomies with empty pubKey
  const filteredEntries = entries.filter(
    (entry: Template) => entry.publicKey === ''
  );

  const entriesToPublish = filteredEntries.map((entry: any) => {
    const { template, inputs } = entry;

    const taxonomiesArray = entry?.taxonomies?.map((taxonomy: Taxonomy) => {
      return new PublicKey(taxonomy.publicKey!);
    });

    return {
      inputs: inputs,
      taxonomies: taxonomiesArray,
      template: new PublicKey(template),
    };
  });

  //* ASSETS
  // const assets = useAppSelector((state: any) => state.assets.assets);
  // console.log('assets', assets);

  const preflightHandler = async () => {
    //* Create taxonomy
    const createTaxonomy =
      taxonomiesToCreate.length > 0 &&
      connection.taxonomy.create(taxonomiesToCreate);

    const updateTaxonomy =
      taxonomiesToUpdate.length > 0 &&
      connection.taxonomy.update(taxonomiesToUpdate);
    // console.log('createTaxonomy', createTaxonomy);

    //* Create template
    const createTemplate =
      templatesToPublish.length > 0 &&
      connection.template.create(templatesToPublish);

    //* Create Entries
    const createEntries = []; //TODO FIX
    // entriesToPublish.length > 0 && connection.entry.create(entriesToPublish);

    //* Preflight
    const preflight = await connection.preflight().then((res: any) => {
      console.log('PREFLIGHT::', res);
      return res;
    });
    setCost(preflight.cost.sol);
  };

  // Publish
  const wallet = useWallet();

  const publishHandler = async () => {
    setDisplayHourglass(true);

    await connection.process().then((res: any) => {
      console.log('PROCESS::', res);
      const TaxosTransactions = res.taxonomy.map((r: any) => {
        const transactionDecoded = bs58.decode(r);
        const t = Transaction.from(transactionDecoded);
        return t;
      });

      const TemplatesTransactions = res.template.map((r: any) => {
        const transactionDecoded = bs58.decode(r);
        const t = Transaction.from(transactionDecoded);
        return t;
      });
      console.log('TemplatesTransactions', TemplatesTransactions);

      const cluster = 'devnet';
      const rpc = clusterApiUrl(cluster);
      let connection = new Connection(rpc, 'confirmed');

      const transactions: Transaction[] = []; //TODO: add entry
      TaxosTransactions.forEach((t: any) => transactions.push(t));
      TemplatesTransactions.forEach((t: any) => transactions.push(t));

      if (!wallet.signAllTransactions)
        throw new Error('No wallet found, connection failed');

      const signedTransactions = wallet
        .signAllTransactions(transactions)
        .then((res) => {
          for (const ta of res) {
            const txid = connection
              .sendRawTransaction(ta.serialize(), {
                skipPreflight: false,
              })
              .then((v) => {
                console.log('V: ', v);
                dispatch(setTaxonomiesIsPublishable(false));
                dispatch(purgeTaxonomiesNew());
                dispatch(setTemplateIsPublishable(false));
                dispatch(purgeTemplatesNew());
                dispatch(setEntryIsPublishable(false));
              });

            // const instrCnt = ta.instructions.length;
          }
        });

      dispatch(setDisplayBanner(false));

      // // TODO: Implement a loading state
      // setLoading(true);

      // Get taxonomies from chain
      // if (connected && publicKey) {
      //   const connection = urchin({
      //     payer: new PublicKey(publicKey),
      //     cluster: 'devnet',
      //   });

      //   // Get taxonomies from chain
      //   connection.taxonomy.getAll().then((res) => {
      //     const pubKeyArray = res.map((taxonomy: any) => {
      //       return new PublicKey(taxonomy.publicKey);
      //     });
      //     connection.taxonomy.get(pubKeyArray).then((res) => {
      //       return dispatch(setTaxonomies(res));
      //     });
      //   });
      // }

      // // Get templates from chain
      // connection.template.getAll().then((res) => {
      //   const templatePubKeyArray = res.map((template: any) => {
      //     return template.publicKey;
      //   });
      //   connection.template.get(templatePubKeyArray).then((res) => {
      //     return dispatch(setTemplates(res));
      //   });
      // });

      // // Get entries from chain
      // connection.entry.getAll().then((res) => {
      //   const entryPubKeyArray = res.map((entry: any) => {
      //     return entry.publicKey;
      //   });
      //   entryPubKeyArray.length > 0 &&
      //     connection.entry.get(entryPubKeyArray).then((res) => {
      //       return dispatch(setEntries(res));
      //     });
      // });

      setDisplayHourglass(false);

      // end loading state
      // setTimeout(() => {
      //   setLoading(false);
      // }, 1000);
    });
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  const taxonomiesChanges = {
    changeCategory: 'Taxonomies',
    //
    changeName: taxonomiesToCreate
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
  if (taxonomiesToCreate.length > 0) {
    changes.push(taxonomiesChanges);
  }

  if (templatesToPublish.length > 0) {
    changes.push(templatesChanges);
  }
  if (entriesToPublish.length > 0) {
    changes.push(entriesChanges);
  }

  return (
    <>
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
                  required and estimated fee is {cost} SOL.
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
      {displayHourglass && <Hourglass />}
    </>
  );
};

export default PublishBanner;
