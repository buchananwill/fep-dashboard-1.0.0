import { Modal, ModalContent, ModalProps } from '@nextui-org/react';

const modalProps: WithPropsForModal = {
  children: (
    <ModalContent>
      <div></div>
    </ModalContent>
  )
};
export default function Page() {
  return <Modal>{modalProps.children}</Modal>;
}

type WithPropsForModal = ModalProps;
