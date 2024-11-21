import { ParseDomTreeSketch } from '@/app/user-guide/ParseDomTreeSketch';
import { overViewData } from '@/app/user-guide/OverViewData';

export default function Page() {
  return (
    <ParseDomTreeSketch
      node={overViewData}
      path={'root'}
      title={'FEP User Guide'}
    />
  );
}
