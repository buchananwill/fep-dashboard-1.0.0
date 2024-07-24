import { Card } from '@nextui-org/card';
import { navTreeData } from '@/app/core/navigation/navTreeData';
import { createLinksFromNavTree } from '@/app/core/navigation/createLinksFromNavTree';
import { NavLinkTreeButton } from '@/app/core/navigation/NavLinkTreeButton';
import { WrappedLink } from '@/app/core/navigation/WrappedLink';
import { WrappedHeader } from '@/app/core/navigation/WrappedHeader';

export default function NavigationHome() {
  const linksFromNavTree = createLinksFromNavTree(navTreeData, ['core'], []);

  return (
    <div className={' p-4'}>
      <Card>
        <NavLinkTreeButton
          navLinkNode={linksFromNavTree}
          renderHeaderAs={WrappedHeader}
          renderLinkAs={WrappedLink}
        />
      </Card>
    </div>
  );
}
