import cycle from '../../../../../utils/init-json-data/time/Cycle.json';
import { EntityClassMap } from '@/app/api/entity-class-map';
import {
  getWeekNumberInt,
  groupCycleSubspansByDay
} from '@/app/cycles/_functions/groupCycleSubspansByDay';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { numberToWeekLetter } from '@/app/cycles/_functions/numberToWeekLetter';
import { CycleSubspanGroupEditDto } from '@/app/cycles/edit/[id]/cycleSubspanGroups/_components/CycleSubspanGroupEdit';
import { getWithoutBody } from '@/app/api/actions/template-actions';
import { API_V2_URL } from '@/app/api/main';
import UiWrapper from '@/app/cycles/edit/[id]/cycleSubspanGroups/_components/UiWrapper';
import { DtoControllerArrayChangesTracker } from '@/components/generic/DtoChangesTracker';
import { putGroupEditAction } from '@/app/cycles/edit/[id]/cycleSubspanGroups/putGroupEditAction';

const cycleSubspan = EntityClassMap.cycleSubspan;
const cycleSubspanGroup = EntityClassMap.cycleSubspanGroup;

const entityName = 'CycleSubspanGroupEdit';
export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  const groupEditListUrl = `${API_V2_URL}/time/cycleSubspanGroups/cycleSubspanGroupEditList/${id}`;
  const cycleSubspanGroupEditDtos =
    await getWithoutBody<CycleSubspanGroupEditDto[]>(groupEditListUrl);

  const { groupedByCycleDay, cycleDays } =
    groupCycleSubspansByDay<CycleSubspanGroupEditDto>(
      cycleSubspanGroupEditDtos,
      cycle
    );

  return (
    <div className={'grid grid-cols-5 w-fit gap-1'}>
      <DtoControllerArrayChangesTracker
        dtoList={cycleSubspanGroupEditDtos}
        entityName={entityName}
        updateServerAction={putGroupEditAction}
      />
      {cycleDays.map((cycleDay) => {
        const cycleSubspanDtoList =
          groupedByCycleDay[cycleDay.zeroIndexedCycleDay];
        if (cycleSubspanDtoList === undefined) return null;
        return (
          <Card
            key={cycleDay.zeroIndexedCycleDay}
            classNames={{ base: 'w-full' }}
          >
            <CardHeader className={'text-center justify-center'}>
              {cycleDay.day}: {numberToWeekLetter(getWeekNumberInt(cycleDay))}
            </CardHeader>
            <CardBody className={''}>
              <table>
                <tbody>
                  <UiWrapper
                    entityList={cycleSubspanDtoList}
                    entityClass={entityName}
                  />
                </tbody>
              </table>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
