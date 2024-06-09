import { EntityClassMap } from '@/api/entity-class-map';
import {
  getWeekNumberInt,
  groupCycleSubspansByDay
} from '@/app/cycles/_functions/groupCycleSubspansByDay';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { numberToWeekLetter } from '@/app/cycles/_functions/numberToWeekLetter';
import { CycleSubspanGroupEditDto } from '@/app/cycles/edit/[id]/cycleSubspanGroups/_components/CycleSubspanGroupEdit';
import { getWithoutBody } from '@/api/actions/template-actions';
import CycleSubspanGroupUiWrapper from '@/app/cycles/edit/[id]/cycleSubspanGroups/_components/CycleSubspanGroupUiWrapper';
import { putGroupEditAction } from '@/app/cycles/edit/[id]/cycleSubspanGroups/putGroupEditAction';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { getOne } from '@/api/generated-actions/Cycle';
import { parseTen } from '@/api/date-and-time';
import { API_V2_URL } from '@/api/literals';

const entityName = 'CycleSubspanGroupEdit';
export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  const cycle = await getOne(parseTen(id));
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
      <EditAddDeleteDtoControllerArray
        dtoList={cycleSubspanGroupEditDtos}
        entityClass={entityName}
        updateServerAction={putGroupEditAction}
      />
      {cycleDays.map((cycleDay, index) => {
        const cycleSubspanDtoList =
          groupedByCycleDay[cycleDay.zeroIndexedCycleDay];
        if (cycleSubspanDtoList === undefined) return null;
        return (
          <Card
            key={cycleDay.zeroIndexedCycleDay}
            classNames={{
              base: `w-full ${index === 0 ? 'step_edit_cycleSubspanGroups' : ''}`
            }}
          >
            <CardHeader className={'text-center justify-center'}>
              {cycleDay.day}: {numberToWeekLetter(getWeekNumberInt(cycleDay))}
            </CardHeader>
            <CardBody className={''}>
              <table>
                <tbody>
                  <CycleSubspanGroupUiWrapper
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
