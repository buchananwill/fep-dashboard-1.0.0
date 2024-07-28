export function generateHamiltonianStringCycle(cycleSize: number) {
  if (cycleSize < 2)
    throw Error('At least two nodes needed to form a non-trivial cycle.');
  const strings: string[] = [];
  for (let i = 0; i < cycleSize; i++) {
    const firstChar = i;
    const lastChar = (i + 1) % cycleSize;
    const nextString = `${firstChar}${crypto.randomUUID()}${lastChar}`;
    strings.push(nextString);
  }
  return strings;
}

export function generateNonCyclicGraph(cycleSize: number) {
  return generateHamiltonianStringCycle(cycleSize).map(
    (nextString) => `a${nextString}b`
  );
}

export function generateCyclicOrAcyclicGraph(
  cycleSize: number,
  keepCycle: boolean
) {
  return keepCycle
    ? generateHamiltonianStringCycle(cycleSize)
    : generateNonCyclicGraph(cycleSize);
}
