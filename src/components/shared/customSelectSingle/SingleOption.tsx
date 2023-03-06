import classes from './CustomSelectSingle.module.scss';

interface SingleOptionProps {
  info: any;
}

const SingleOption = ({ info }: SingleOptionProps) => {
  return (
    <div className={classes.SingleOption}>
      <div className={classes.text_wrapper}>
        <p className={classes.text}>{info.label}</p>
      </div>
    </div>
  );
};

export default SingleOption;
