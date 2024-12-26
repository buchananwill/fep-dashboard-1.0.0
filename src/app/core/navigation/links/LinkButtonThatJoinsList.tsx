import { LinkButton } from '@/components/navigation/LinkButton';
import { LinkTreeElementProps } from '@/app/core/navigation/links/types';

export function LinkButtonThatJoinsList({
  link,
  displayLabel
}: {
  link: string[];
} & LinkTreeElementProps) {
  const joinedLink = link.map((item) => encodeURIComponent(item)).join('/');
  return <LinkButton href={`/${joinedLink}`}>{displayLabel}</LinkButton>;
}
