import Image from 'next/image';

// Styles
import classes from './Pagination.module.scss';

// Utils
import { useAppSelector } from '../../../utils/useAppSelector';
import useWindowSize from '../../../utils/useWindowSize';

interface PaginationProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  items,
  pageSize,
  currentPage,
  onPageChange,
}): JSX.Element => {
  const pagesCount = Math.ceil(items / pageSize);
  const { width } = useWindowSize();
  const isMobile = width! < 1024;
  const displayBanner = useAppSelector(
    (state: any) => state.banner.displayBanner
  );

  return (
    <div
      className={classes.pagination_section}
      style={{
        bottom: !displayBanner ? '0' : isMobile ? '130px' : '100px',
      }}
    >
      <div className={classes.pages_wrapper}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          type="button"
          aria-disabled={currentPage <= 1}
          className={classes.pagination_links}
        >
          <Image
            src="/assets/chevron-left.svg"
            width={10}
            height={15}
            alt="chevron up icon - Wallet is connected"
          />
        </button>
        <p className={classes.pages}>
          {currentPage}/{pagesCount}
        </p>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          type="button"
          aria-disabled={currentPage >= pagesCount}
          className={classes.pagination_links}
        >
          <Image
            src="/assets/chevron-right.svg"
            width={10}
            height={15}
            alt="chevron up icon - Wallet is connected"
          />
        </button>
      </div>
      <p className={classes.pagination_text}>displaying 10 rows</p>
    </div>
  );
};

export default Pagination;
