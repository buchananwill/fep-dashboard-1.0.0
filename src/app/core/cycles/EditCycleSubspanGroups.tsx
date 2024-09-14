import {
  getWeekNumberInt,
  groupCycleSubspansByDay
} from '@/functions/cycles/groupCycleSubspansByDay';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { numberToWeekLetter } from '@/functions/cycles/numberToWeekLetter';
import { CycleSubspanGroupEditDto } from '@/components/cycles/CycleSubspanGroupEdit';
import { getWithoutBody } from '@/api/actions/template-actions';
import CycleSubspanGroupUiWrapper from '@/components/cycles/CycleSubspanGroupUiWrapper';
import { putGroupEditAction } from '@/functions/cycles/putGroupEditAction';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { getOne } from '@/api/generated-actions/Cycle';
import { parseTen } from '@/api/date-and-time';
import { API_V2_URL } from '@/api/literals';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { EntityClassMap } from '@/api/entity-class-map';

const entityName = 'CycleSubspanGroupEdit';
export default async function EditCycleSubspanGroups({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [cycleId] = getLastNVariables(pathVariables, 1);
  const cycle = await getOne(parseTen(cycleId));
  const groupEditListUrl = `${API_V2_URL}/time/cycleSubspanGroups/cycleSubspanGroupEditList/${cycleId}`;
  const cycleSubspanGroupEditDtos =
    await getWithoutBody<CycleSubspanGroupEditDto[]>(groupEditListUrl);

  const { groupedByCycleDay, cycleDays } =
    groupCycleSubspansByDay<CycleSubspanGroupEditDto>(
      cycleSubspanGroupEditDtos,
      cycle
    );

  return (
    <div
      className={
        'grid grid-cols-[repeat(7,minmax(min-content,1fr))] gap-1 overflow-auto'
      }
    >
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycle}
        dtoList={[cycle]}
      />
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
              base: `w-fit min-w-full ${index === 0 ? 'step_edit_cycleSubspanGroups' : ''}`
            }}
          >
            <CardHeader className={'justify-center text-center'}>
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
