import { useEffect, useState } from 'react';
import Image from 'next/image';

// Styles
import classes from './QuickUpload.module.scss';

// Utils
import { useAppDispatch } from '../../utils/useAppDispatch';
import useForceUpdate from '../../utils/useForceUpdate';
import { useAppSelector } from '../../utils/useAppSelector';

// Redux
import { setCurrentProcess } from '../../redux/slices/process';
// import { addNewAsset, setIsPublishable } from '../../redux/slices/assets';

// lib
import { FileUploader } from 'react-drag-drop-files';

// types
import { File } from '../../types/Files';

// Components
import BackButton from '../shared/backButton';
import OrangeButton from '../shared/orangeButton';

// interface File {
//   name: string;
//   size: number;
//   type: string;
//   lastModified: number;
//   lastModifiedDate: Date;
//   // webkitRelativePath: string;
// }

const QuickUpload = (): JSX.Element => {
  const dispatch = useAppDispatch();
  // const [uploadForm, setUploadForm] = useState('');

  const assets = useAppSelector((state) => state.assets.assets);
  console.log('assets', assets);

  // if taxonomies array has no empty value setIsPublishable to true
  useEffect(() => {
    if (assets.length) {
      // dispatch(setIsPublishable(true));
    }
  }, [assets, dispatch]);

  // Files upload
  const [files, setFiles] = useState<File[]>([]);

  // Handlers
  const handleBackClick = () => {
    dispatch(setCurrentProcess('default'));
  };

  const forceUpdate = useForceUpdate();

  const handleFileOnChange = (file: any) => {
    let newFiles: File[] = files;
    newFiles.push(file);
    forceUpdate();
    // TODO:
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        // this will then display a text file
        console.log(reader.result);
        // dispatch(addNewAsset({ original: reader.result }));
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file[0]);
      // reader.readAsText(file[0]);
    }
  };

  const removeFileHandler = (file: any) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
  };

  return (
    <section className={classes.quickUpload_section}>
      <BackButton onClickHandler={handleBackClick} />
      <div className={classes.quickUpload_content_top}>
        <h3>Quick Upload</h3>
      </div>
      <div className={classes.quickUpload_content}>
        <form action="POST" className="form" name="quick_upload_form">
          {/* <div className="input_wrapper">
            <label className="form_label">Name</label>
            <input
              type="text"
              placeholder="Enter file name"
              className="form_input"
              value={uploadForm}
              onChange={(e) => setUploadForm(e.target.value)}
            />
          </div> */}
          <div className={classes.upload_section}>
            <div className={classes.upload_section_left}>
              <label className="form_label">Upload File(s)</label>
              <FileUploader
                handleChange={handleFileOnChange}
                name="quick_upload_form"
                multiple={true}
                // eslint-disable-next-line react/no-children-prop
                children={
                  <div className={classes.drop_area}>
                    <Image
                      src="/assets/paperclip.svg"
                      alt="paperclip icon - upload file drop area"
                      height={35}
                      width={18}
                    />
                    <span className="muted_text_small">
                      Drop your file(s) here
                    </span>
                  </div>
                }
              />
            </div>
            <div className={classes.upload_section_right}>
              {files.length > 0 &&
                files.map((file: any) => {
                  return (
                    <div
                      className={classes.uploaded_file}
                      key={file[0].lastModified}
                    >
                      <Image
                        src="/assets/file-icon.svg"
                        alt="file uploaded- file icon"
                        height={20}
                        width={15}
                      />
                      <p className={classes.file_name}>{file[0].name}</p>
                      {/* <span className="filler"></span> */}
                      <button
                        type="button"
                        onClick={() => removeFileHandler(file)}
                        className={`${classes.remove_file_link} blue_white_link`}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* <div className="input_wrapper">
            <label className="form_label">Description</label>
            <textarea
              placeholder="Enter file description"
              className="form_textarea"
              // value={uploadForm}
              // onChange={(e) => setUploadForm(e.target.value)}
            />
          </div> */}
        </form>
      </div>
    </section>
  );
};

export default QuickUpload;
