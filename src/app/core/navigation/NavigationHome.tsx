import { navTreeData } from '@/app/core/navigation/navTreeData';
import { createLinksFromNavTree } from '@/app/core/navigation/createLinksFromNavTree';
import { NavLinkTreeButton } from '@/app/core/navigation/NavLinkTreeButton';
import { WrappedLink } from '@/app/core/navigation/WrappedLink';
import { WrappedHeader } from '@/app/core/navigation/WrappedHeader';

export default function NavigationHome() {
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
