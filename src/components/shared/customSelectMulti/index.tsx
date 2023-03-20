import Image from 'next/image';

//styles
import classes from './CustomSelectMulti.module.scss';

//hooks
import { useRef, useState } from 'react';

// Types
import { Taxonomies } from '../../../types/Taxonomies';

//components
import Multiselect from 'multiselect-react-dropdown';
import MultiOption from './MultiOption';

interface CustomSelectMultiProps {
  onChange?: any;
  className?: string;
  name: string;
  label?: string;
  id: string;
  isRequired: boolean;
  optionsList: Taxonomies;
  value?: any[];
  error?: string;
  placeholder?: string;
  singleSelect?: boolean;
  showCheckbox?: boolean;
  selectionLimit?: number;
  displayValue: string;
  firstItemSeparator?: boolean;
}

export const CustomSelectMulti = ({
  onChange,
  className,
  name,
  label,
  id,
  isRequired,
  optionsList,
  value,
  error,
  placeholder,
  singleSelect,
  showCheckbox,
  selectionLimit,
  displayValue,
  firstItemSeparator,
}: CustomSelectMultiProps) => {
  const [selectedState, setSelectedState] = useState([]);
  const selectRef = useRef(null);

  const handleSelect = (selectedList: any) => {
    const event = {
      target: {
        name,
        value: selectedList,
      },
    };
    setSelectedState(selectedList);
    onChange(event);
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

      <Multiselect
        id={id}
        className={`${classes.multiSelect} ${
          firstItemSeparator ? classes.firstItemSeparator : ''
        } ${error ? classes.hasError : ''}`}
        options={optionsList.original}
        displayValue={displayValue} // tells which item from options object will be shown as label
        placeholder={placeholder}
        singleSelect={singleSelect}
        showCheckbox={showCheckbox}
        ref={selectRef}
        hidePlaceholder
        selectionLimit={selectionLimit}
        onRemove={handleSelect}
        onSelect={handleSelect}
        selectedValueDecorator={(v) =>
          v.length > 15 ? `${v.substring(0, 15)}...` : v
        }
        optionValueDecorator={(v, o) => (
          <MultiOption selectedList={selectedState} option={o} />
        )}
        avoidHighlightFirstOption
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
            src={'/assets/close-icon.svg'}
            alt="close dropdown"
            width={16}
            height={8}
          />
        }
        selectedValues={value}
      />
    </div>
  );
};

CustomSelectMulti.defaultProps = {
  isRequired: false,
};
