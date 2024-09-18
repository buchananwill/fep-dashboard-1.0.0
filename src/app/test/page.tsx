'use client';
import AccordionTree, {
  AccordionTreeItemProps
} from '@/app/test/accordionTree';

export default function page() {
  return <AccordionTree items={items} />;
}
const items: AccordionTreeItemProps[] = [
  {
    title: 'Click me',
    contentMain: <div className={'text-sm'}>Hello</div>,
    contentChildren: [
      {
        title: 'Click inner!',
        contentChildren: [
          {
            title: 'Inner click inner!!',
            contentMain: 'ReHello!'
          }
        ]
      },
      {
        title: 'Another Click inner!',
        contentChildren: [
          {
            title: '2: Inner click inner!!',
            contentMain: '2: ReHello!'
          }
        ]
      }
    ]
  }
];
