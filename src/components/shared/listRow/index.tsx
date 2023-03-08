import Image from 'next/image';

// Styles
import classes from './ListRow.module.scss';

// redux
import { useAppSelector } from '../../../utils/useAppSelector';

// Utils
import useWindowSize from '../../../utils/useWindowSize';
import { getFullDate } from '../../../utils/time';

// Components
import Separator from '../separator';

interface ListRowProps {
  title: string;
  updatedAt: number;
  solanaAddress: string;
  arweaveAddress?: string;
  entriesNbr?: number;
  onClickEditHandler: () => void;
}

const ListRow = ({
  title,
  updatedAt,
  solanaAddress,
  arweaveAddress,
  entriesNbr,
  onClickEditHandler,
}: ListRowProps) => {
  const { width } = useWindowSize();
  const isDesktop = width! > 1024;
  const activeTab = useAppSelector((state: any) => state.subNav.activeTab);

  return (
    <div className={classes.list_row}>
      <div className={classes.list_row_content}>
        <div className={classes.mobile_flex}>
          <div className={classes.title}>
            <h3>{title}</h3>
            <p>Updated {getFullDate(updatedAt)}</p>
          </div>
          <div className={classes.tablet_flex}>
            {solanaAddress !== '' && (
              <div className={classes.solana}>
                <Image
                  src="/assets/solana-logo.svg"
                  width={isDesktop ? 20 : 10}
                  height={isDesktop ? 20 : 10}
                  alt="Solana logo - token address"
                />
                <p>{solanaAddress}</p>
              </div>
            )}
            {activeTab !== 'Taxonomies' && arweaveAddress !== ' ' && (
              <div className={classes.arweave}>
                <Image
                  src="/assets/arweave-logo.svg"
                  width={isDesktop ? 20 : 10}
                  height={isDesktop ? 20 : 10}
                  alt="Arweave logo - token adress"
                />
                <p>{arweaveAddress}</p>
              </div>
            )}
          </div>
        </div>
        {(isDesktop || activeTab === 'Entries') && (
          <span className="filler"></span>
        )}
        {activeTab === 'Templates' && (
          <div className={classes.entries_nbr}>
            <p>
              {entriesNbr} {entriesNbr && entriesNbr <= 1 ? 'Entry' : 'Entries'}
            </p>
          </div>
        )}

        <div className={classes.edit}>
          <button type="button" onClick={onClickEditHandler}>
            Edit
          </button>
        </div>
      </div>
      <Separator />
    </div>
  );
};
export default ListRow;
