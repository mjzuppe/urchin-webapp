//styles
import classes from './CustomSelectSingle.module.scss';

//hooks
import { useRef, useState } from 'react';

//components

import Multiselect from 'multiselect-react-dropdown';
import SingleOption from './SingleOption';
import Image from 'next/image';

interface CustomSelectSingleProps {
  onChange?: any;
  onBlur?: any;
  className?: string;
  name: string;
  label?: string;
  id: string;
  isRequired: boolean;
  optionsList: {
    value: string | number;
    label: string;
    icon?: string;
  }[];
  value?: string | number;
  error?: string;
  placeholder?: string;
  displayValue: string;
}

export const CustomSelectSingle = ({
  onChange,
  onBlur,
  className,
  name,
  label,
  id,
  isRequired,
  optionsList,
  value,
  error,
  placeholder,
  displayValue,
}: CustomSelectSingleProps) => {
  const [selectedState, setSelectedState] = useState([]);
  const selectRef = useRef(null);

  const handleSelect = (selectedList: any, selectedItem: any) => {
    const event = {
      target: {
        name,
        value: selectedItem.value,
      },
    };
    setSelectedState(selectedItem.value);
    onChange(event);
  };

  const handleBlur = () => {
    const event = {
      target: {
        name,
        value: selectedState,
      },
    };
  };

  return (
    <div className={`${className} ${classes.wrapper}`}>
      <label
        htmlFor={name}
        className="form_label"
        data-required={isRequired && 'required'}
      >
        {label}
      </label>

      <div tabIndex={0} onBlur={handleBlur}>
        <Multiselect
          singleSelect
          id={id}
          className={`${classes.multiSelect} ${error ? classes.hasError : ''}`}
          ref={selectRef}
          options={optionsList}
          displayValue={displayValue}
          selectedValues={
            value && optionsList.filter((option) => option.value === value)
          }
          selectedValueDecorator={(v: any) =>
            v.length > 15 ? `${v.substring(0, 15)}...` : v
          }
          optionValueDecorator={(v: any, o: any) => <SingleOption info={o} />}
          onRemove={handleSelect}
          onSelect={handleSelect}
          avoidHighlightFirstOption
          placeholder={placeholder}
          showArrow
          customArrow={
            <Image
              src={'/assets/chevron-down.svg'}
              alt="open dropdown"
              width={16}
              height={8}
            />
          }
          customCloseIcon={
            <Image
              src={'/assets/delete-icon.svg'}
              alt="close dropdown"
              width={16}
              height={8}
            />
          }
        />
      </div>
    </div>
  );
};

CustomSelectSingle.defaultProps = {
  isRequired: false,
};
