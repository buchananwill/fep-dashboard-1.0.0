import { NavLinkTreeButton } from '@/app/core/navigation/links/NavLinkTreeButton';
import { WrappedLink } from '@/app/core/navigation/links/WrappedLink';
import { WrappedHeader } from '@/app/core/navigation/links/WrappedHeader';
import { createLinksFromNavTree } from '@/app/core/navigation/links/createLinksFromNavTree';
import { navTreeData } from '@/app/core/navigation/data/navTreeData';

export default async function NavigationHome() {
  const linksFromNavTree = createLinksFromNavTree(navTreeData, ['core'], []);
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
