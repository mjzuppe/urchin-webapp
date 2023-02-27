import classes from './CustomSelectSingle.module.scss';

const getIconSrc = (icon) => {
  return `/assets/includes-${icon}.svg`;
}

const SingleOption = ({
  info,
}) => {
  return (
    <div className={classes.SingleOption}>
      <div className={classes.text_wrapper}>
        <p className={classes.text}>{info.label}</p>
      </div>
      { info.icon && (
        <img src={getIconSrc(info.icon)} />
      )}
    </div>
  )
}

export default SingleOption;