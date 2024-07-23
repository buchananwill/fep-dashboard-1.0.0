import { LinkButton } from '@/app/service-categories/LinkButton';
import { LinkTreeElementProps } from '@/app/core/navigation/types';

export function LinkButtonThatJoinsList({
  link,
  displayLabel
}: {
  link: string[];
} & LinkTreeElementProps) {
  const joinedLink = link.join('/');
  return <LinkButton href={`/${joinedLink}`}>{displayLabel}</LinkButton>;
}
