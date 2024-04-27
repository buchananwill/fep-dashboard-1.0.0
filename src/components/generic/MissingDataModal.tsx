import { Overlay } from '@/components/overlays/overlay';

export interface MissingDataModalProps {
  message: string;
}

export default function MissingDataModal({ message }: MissingDataModalProps) {
  return <Overlay>{message}</Overlay>;
}
