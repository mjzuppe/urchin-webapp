// Styles
import classes from './Hourglass.module.scss';

// Libs
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const Hourglass = () => {
  const onEscapeKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Dialog.Root modal={true}>
        <Dialog.Trigger asChild>
          <button>Launch Dialog</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Uploading data</Dialog.Title>
          </VisuallyHidden.Root>
          <Dialog.Content
            className={classes.DialogContent}
            onEscapeKeyDown={(event) => {
              event.preventDefault();
            }}
            // to prevent closing the dialog when clicking outside
            onPointerDownOutside={(event) => {
              event.preventDefault();
            }}
            onInteractOutside={(event) => {
              event.preventDefault();
            }}
          >
            <div className={classes.container}>
              <div className={classes.hourglass_wrapper}>
                <div className={classes.triangle_up}></div>
                <div className={classes.triangle_down}></div>
              </div>

              <p className={classes.text}>
                Publishing your data to the blockchain
              </p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default Hourglass;
