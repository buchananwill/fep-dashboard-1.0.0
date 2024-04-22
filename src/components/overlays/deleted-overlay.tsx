import { XMarkIcon } from '@heroicons/react/24/outline';
import { Overlay } from './overlay';
import { Button } from '@nextui-org/button';

export function DeletedOverlay({
  show,
  handleUnDelete
}: {
  show: boolean;
  handleUnDelete?: () => void;
}) {
  return (
    <>
      {show && (
        <Overlay>
          <Button
            className={
              'w-full h-full transition-colors duration-500 rounded-none border-0 place-content-center p-2'
            }
            onPress={handleUnDelete}
            variant={'ghost'}
            isIconOnly
          >
            <XMarkIcon className={'h-full  opacity-50'}></XMarkIcon>
          </Button>
        </Overlay>
      )}
    </>
  );
}
