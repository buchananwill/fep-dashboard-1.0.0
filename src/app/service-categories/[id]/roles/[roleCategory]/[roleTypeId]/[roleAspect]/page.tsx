import { RolePageProps } from '@/app/service-categories/[id]/roles/_components/types';
import { notFound } from 'next/navigation';
import SuitabilityPage from '../../../_components/SuitabilityPage';
import AvailabilityPage from '@/app/service-categories/[id]/roles/_components/availabilityPage';

export default function page(props: RolePageProps) {
  const {
    params: { roleAspect, roleCategory }
  } = props;

  switch (roleAspect) {
    case 'suitability': {
      if (roleCategory === 'user') return notFound();
      else return <SuitabilityPage params={props.params} />;
    }
    case 'availability': {
      if (roleCategory === 'provider') return <AvailabilityPage {...props} />;
      else return notFound();
    }
  }
}
