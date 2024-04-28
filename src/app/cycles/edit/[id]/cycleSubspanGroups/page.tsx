import cycle from '../../../../../utils/init-json-data/time/Cycle.json';
import { EntityClassMap } from '@/app/api/entity-class-map';
import {
  getWeekNumberInt,
  groupCycleSubspansByDay
} from '@/app/cycles/_functions/groupCycleSubspansByDay';

import { DtoControllerArray } from 'dto-stores';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { numberToWeekLetter } from '@/app/cycles/_functions/numberToWeekLetter';
import { CycleSubspanGroupEditDto } from '@/app/cycles/edit/[id]/cycleSubspanGroups/_components/CycleSubspanGroupEdit';
import { getWithoutBody } from '@/app/api/actions/template-actions';
import { API_V2_URL } from '@/app/api/main';
import data from '@/utils/init-json-data/time/CycleSubspan.json';
import UiWrapper from '@/app/cycles/edit/[id]/cycleSubspanGroups/_components/UiWrapper';

const cycleSubspan = EntityClassMap.cycleSubspan;
const cycleSubspanGroup = EntityClassMap.cycleSubspanGroup;

const entityName = 'CycleSubspanGroupEdit';
export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  const cycleSubspanGroupEditDtos = await getWithoutBody<
    CycleSubspanGroupEditDto[]
  >(`${API_V2_URL}/time/cycleSubspanGroups/cycleSubspanGroupEditList/${id}`);

  const { groupedByCycleDay, cycleDays } =
    groupCycleSubspansByDay<CycleSubspanGroupEditDto>(
      cycleSubspanGroupEditDtos,
      cycle
    );

  console.log(cycleSubspanGroupEditDtos);

  return (
    <div className={'grid grid-cols-5 w-fit gap-1'}>
      <DtoControllerArray
        dtoList={cycleSubspanGroupEditDtos}
        entityName={entityName}
      />
      {cycleDays.map((cycleDay) => {
        const cycleSubspanDtoList =
          groupedByCycleDay[cycleDay.zeroIndexCycleDay];
        if (cycleSubspanDtoList === undefined) return null;
        return (
          <Card
            key={cycleDay.zeroIndexCycleDay}
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
