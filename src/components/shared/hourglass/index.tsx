// Styles
import classes from './Hourglass.module.scss';

// Libs

const Hourglass = () => {
  return (
    <div className={classes.modal_overlay}>
      <div className={classes.modal}>
        <div className={classes.container}>
          <div className={classes.hourglass_wrapper}>
            <div className={classes.triangle_up}></div>
            <div className={classes.triangle_down}></div>
          </div>

          <p className={classes.text}>Publishing your data to the blockchain</p>
        </div>
      </div>
    </div>
  );
};

export default Hourglass;
