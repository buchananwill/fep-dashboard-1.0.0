import { Overlay } from '@/components/overlays/overlay';
import { Spinner } from '@nextui-org/spinner';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Overlay>
      Loading...
      <Spinner />
    </Overlay>
  );
}
