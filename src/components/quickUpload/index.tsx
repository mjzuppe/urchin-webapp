import { useState } from 'react';

// Styles
import classes from './QuickUpload.module.scss';

// Utils
import { useAppDispatch } from '../../utils/useAppDispatch';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';

// Components
import BackButton from '../shared/backButton';
import ButtonSmall from '../shared/buttonSmall';

const QuickUpload = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [uploadForm, setUploadForm] = useState('');

  const handleBackClick = () => {
    dispatch(setCurrentProcess('default'));
  };

  return (
    <div className={classes.quickUpload_section}>
      <BackButton onClickHandler={handleBackClick} />
      <div className={classes.quickUpload_content_top}>
        <h3>Quick Upload</h3>
        <ButtonSmall
          btnText="Save"
          type="submit"
          // TODO: change callback when available
          callBack={() => console.log('save')}
        />
      </div>
      <div className={classes.quickUpload_content}>
        <form action="POST" className="form">
          <div className="input_wrapper">
            <label className="form_label">Name</label>
            <input
              type="text"
              placeholder="Enter file name"
              className="form_input"
              value={uploadForm}
              onChange={(e) => setUploadForm(e.target.value)}
            />
          </div>
          <div className="input_wrapper">
            <label className="form_label">Description</label>
            <textarea
              placeholder="Enter file description"
              className="form_textarea"
              // value={uploadForm}
              // onChange={(e) => setUploadForm(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickUpload;
