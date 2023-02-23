//styles
import classes from './OrangeButton.module.scss';

interface OrangeButtonProps {
  className?: string;
  btnText: string;
  callBack?: () => any;
  invert?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  id?: string;
}

const OrangeButton: React.FC<OrangeButtonProps> = ({
  className,
  btnText,
  callBack,
  invert,
  disabled,
  type,
  id,
}): JSX.Element => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (type !== 'submit') {
      event.preventDefault();
      event.stopPropagation();
    }

    if (callBack) callBack();
  };
  return (
    <button
      className={`${classes.btn} ${className} ${invert ? classes.invert : ''}`}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      id={id}
    >
      {btnText}
    </button>
  );
};

export default OrangeButton;
