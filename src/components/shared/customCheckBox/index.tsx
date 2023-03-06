//types
import { ChangeEventHandler, FocusEventHandler } from 'react';

//styles
import CustomCheckBoxStyles from './CustomCheckBox.module.scss';

interface CustomCheckBoxProps {
  className?: string;
  name: string;
  label?: string;
  id?: string;
  isRequired: boolean;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  checked: boolean;
}

export const CustomCheckBox = (props: CustomCheckBoxProps) => {
  return (
    <div className={`${props.className} ${CustomCheckBoxStyles.wrapper}`}>
      <label
        htmlFor={props.id}
        className={CustomCheckBoxStyles.label}
        data-required={props.isRequired && 'required'}
      >
        {props.label}

        <input
          className={CustomCheckBoxStyles.input}
          type="checkbox"
          name={props.name}
          id={props.id}
          required={props.isRequired && true}
          onChange={props.onChange}
          onBlur={props.onBlur}
          checked={props?.checked}
        />

        <span className={CustomCheckBoxStyles.checkmark}></span>
      </label>
    </div>
  );
};

CustomCheckBox.defaultProps = {
  isRequired: false,
};
