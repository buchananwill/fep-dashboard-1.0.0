import { Spinner } from '@nextui-org/spinner';
import { LoadingOverlay } from '@mantine/core';

export function PendingOverlay(props: { pending: boolean }) {
  return <LoadingOverlay visible={props.pending} />;
}
