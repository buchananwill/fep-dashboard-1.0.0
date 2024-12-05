import { useDisclosure } from '@mantine/hooks';
import { Button, ButtonProps, Modal } from '@mantine/core';
import { ReactNode } from 'react';

export function ModalEditCell({
  children: Children,
  buttonLabel,
  rightSection,
  leftSection
}: {
  buttonLabel?: ReactNode;
  children: (props: { onClose: () => void }) => ReactNode;
} & Pick<ButtonProps, 'rightSection' | 'leftSection'>) {
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
      <Modal opened={opened} onClose={close} size={'auto'}>
        {<Children onClose={close} />}
      </Modal>
    </>
  );
}
