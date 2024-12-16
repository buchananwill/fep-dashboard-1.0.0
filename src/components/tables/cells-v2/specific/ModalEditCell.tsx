import { useDisclosure } from '@mantine/hooks';
import { Button, ButtonProps, Modal, ModalProps } from '@mantine/core';
import { ReactNode } from 'react';

export function ModalEditCell({
  children: Children,
  buttonLabel,
  rightSection,
  leftSection,
  ...props
}: {
  buttonLabel?: ReactNode;
  children: (props: { onClose: () => void }) => ReactNode;
} & Pick<ButtonProps, 'rightSection' | 'leftSection'> &
  Omit<ModalProps, 'children' | 'opened' | 'size' | 'onClose'>) {
  const [opened, { open, close, toggle }] = useDisclosure();
  return (
    <>
      <Button
        leftSection={leftSection}
        rightSection={rightSection}
        fullWidth
        variant={'subtle'}
        onClick={open}
      >
        {buttonLabel ?? 'Details'}
      </Button>
      <Modal opened={opened} onClose={close} size={'auto'} {...props}>
        {<Children onClose={close} />}
      </Modal>
    </>
  );
}
