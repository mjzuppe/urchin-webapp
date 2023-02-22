//styles
import classes from './Button.module.scss';

interface ButtonProps {
  className?: string;
  btnText: string;
  callBack?: () => any;
  invert?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  id?: string;
}

const Button: React.FC<ButtonProps> = ({
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

export default Button;
