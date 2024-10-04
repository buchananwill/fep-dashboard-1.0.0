import { NavLinkTreeButton } from '@/app/core/navigation/links/NavLinkTreeButton';
import { WrappedLink } from '@/app/core/navigation/links/WrappedLink';
import { WrappedHeader } from '@/app/core/navigation/links/WrappedHeader';
import { linksFromNavTree } from '@/app/core/navigation/links/linksFromNavTree';

export default async function NavigationHome() {
  return (
    <div className={'grid grid-cols-1 gap-2 p-4 md:grid-cols-3 lg:grid-cols-5'}>
      <NavLinkTreeButton
        navLinkNode={linksFromNavTree}
        renderHeaderAs={WrappedHeader}
        renderLinkAs={WrappedLink}
      />
    </div>
  );
}
