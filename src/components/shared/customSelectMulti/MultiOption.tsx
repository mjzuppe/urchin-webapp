import Spacer from '../spacer/Spacer';
import classes from './CustomSelectMulti.module.scss';

interface MultiOptionProps {
  option: any;
  selectedList?: Array<any>;
}

const MultiOption = ({ option, selectedList }: MultiOptionProps) => {
  const isSelected = selectedList?.some((item) => item.label === option.label);
  return (
    <>
      {option.grandParent && <Spacer axis="horizontal" size={25} />}
      {option.parent && <Spacer axis="horizontal" size={25} />}
      <div>
        <div className={classes.MultiOption}>
          <input
            type="checkbox"
            checked={isSelected}
            className={classes.checkbox_input}
            readOnly
          />
          <span className={classes.checkmark}></span>
          <div className={classes.text_wrapper}>
            <p className={classes.text}>{option.label}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiOption;
