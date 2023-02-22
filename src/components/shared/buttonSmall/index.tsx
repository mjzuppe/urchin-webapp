//styles
import classes from './ButtonSmall.module.scss';

interface ButtonSmallProps {
  className?: string;
  btnText: string;
  callBack?: () => any;
  invert?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  id?: string;
}

const ButtonSmall: React.FC<ButtonSmallProps> = ({
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

export default ButtonSmall;
