import { NamespacedHooks, useWriteAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { KnowledgeLevelDto } from '@/api/generated-types/generated-types_';
import { StepperContext } from '@/components/generic/stepper/stepperContextCreator';
import { useMemo } from 'react';
import LandscapeStepper from '@/components/generic/stepper/LandscapeStepper';

const maxStartingLevel = 20;
export default function ChangeStartingOrdinal() {
  const listenerKey = useUuidListenerKey();
  const { currentState, dispatchWithoutControl } =
    NamespacedHooks.useDispatchAndListen(
      EntityClassMap.knowledgeLevel,
      KEY_TYPES.MASTER_LIST,
      listenerKey,
      EmptyArray as KnowledgeLevelDto[]
    );
  const writeAnyDto = useWriteAnyDto<KnowledgeLevelDto>(
    EntityClassMap.knowledgeLevel
  );

  const stepperContext = useMemo(() => {
    const current = currentState.reduce(
      (prevVal, nextLevel) => Math.min(prevVal, nextLevel.levelOrdinal),
      maxStartingLevel
    );
    const mod = (diff: number) => {
      const incLevels = currentState.map((level) => ({
        ...level,
        levelOrdinal: level.levelOrdinal + diff
      }));
      dispatchWithoutControl(incLevels);
      incLevels.forEach((level) =>
        writeAnyDto(level.id, (dto) => ({
          ...dto,
          levelOrdinal: level.levelOrdinal
        }))
      );
    };
    const increment = () => mod(1);
    const decrement = () => mod(-1);

    return { increment, decrement, min: 0, max: maxStartingLevel, current };
  }, [currentState, dispatchWithoutControl, writeAnyDto]);

  return (
    <StepperContext.Provider value={stepperContext}>
      <div className={'flex items-center gap-2'}>
        Change starting ordinal:
        <LandscapeStepper />
      </div>
    </StepperContext.Provider>
  );
}
