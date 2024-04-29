import { Spinner } from '@nextui-org/spinner';

export function PendingOverlay(props: { pending: boolean }) {
  return (
    <>
      {props.pending && (
        <div
          className={
            'w-full h-full absolute bg-slate-100 opacity-75 top-0 left-0 z-20 flex place-content-center '
          }
        >
          <Spinner size={'sm'} />
        </div>
      )}
    </>
  );
}
