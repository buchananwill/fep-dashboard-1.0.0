import { RoleEntity } from '@/components/roles/types';

export default function RoleBaseDetails({
  roleEntityType
}: {
  roleEntityType: RoleEntity;
}) {
  switch (roleEntityType) {
    case 'provider': {
      return null;
    }
  }
}
