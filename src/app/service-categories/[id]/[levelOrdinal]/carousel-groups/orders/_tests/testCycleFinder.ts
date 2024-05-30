import {
  generateCyclicOrAcyclicGraph,
  generateHamiltonianStringCycle,
  generateNonCyclicGraph
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_tests/generateTestCycles';
import { shuffle } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/shuffle';

interface CycleTestInput {
  testData: string[];
  expectedOutcome: string[] | undefined;
}

interface TestResult {
  input: CycleTestInput;
  result: boolean;
  outcome: string[] | undefined;
}

const howManyEach = 10;

const cycleTestList: CycleTestInput[] = [];
const testResults = [];

for (let i = 2; i < howManyEach; i++) {
  const cycleOrder = generateHamiltonianStringCycle(i);
  const shuffledOrder = shuffle([...cycleOrder]);
  cycleTestList.push({
    testData: shuffledOrder,
    expectedOutcome: cycleOrder
  });
  const nonCycleData = generateNonCyclicGraph(i);

  cycleTestList.push({
    testData: nonCycleData,
    expectedOutcome: undefined
  });
  const keepCycle = Math.random() < 0.5;
  const testCycleOrder = generateCyclicOrAcyclicGraph(i, keepCycle);
  const testShuffledOrder = shuffle([...testCycleOrder]);
  cycleTestList.push({
    testData: testShuffledOrder,
    expectedOutcome: keepCycle ? testCycleOrder : undefined
  });
}

for (let cycleTestInput of cycleTestList) {
  const outcome = buildCompleteCycle(
    cycleTestInput.testData,
    stringsCanConnect,
    new Set()
  );
  outcome?.sort((stringA, stringB) => stringA.localeCompare(stringB));
  const result: TestResult = {
    input: cycleTestInput,
    result: outcome === cycleTestInput.expectedOutcome,
    outcome
  };
  testResults.push(result);
}

console.log(testResults);
