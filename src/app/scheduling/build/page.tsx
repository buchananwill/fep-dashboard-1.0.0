import BuildSchedule from '@/app/scheduling/build/BuildSchedule';

export default async function page() {
  return <BuildSchedule cycleId={1} />;
}
