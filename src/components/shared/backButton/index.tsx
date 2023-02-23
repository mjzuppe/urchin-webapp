// Styles
import classes from './BackButton.module.scss';

const BackButton = ({
  onClickHandler,
}: {
  onClickHandler: () => void;
}): JSX.Element => {
  return (
    <button
      type="button"
      className={`${classes.backButton} blue_white_link`}
      onClick={onClickHandler}
    >
      Back
    </button>
  );
};

export default BackButton;
