import { schoolDomainAliasMatcherRecord } from '@/utils/init-json-data/domain-aliasing/schoolDomainAliasMatcherRecord';
import { camelCase, snakeCase, startCase } from 'lodash';
import pluralize, { singular } from 'pluralize';
import { EntityClassMap } from '@/api/entity-class-map';

function getDomainAliasingFunction(domainAliasRecord: Record<string, string>) {
  return function getDomainAlias(genericName: string) {
    let normalizedName = genericName;
    let rePluralize = false;
    if (!pluralExceptions.has(genericName)) {
      normalizedName = singular(normalizedName);
      rePluralize = normalizedName !== genericName;
    }
    normalizedName = camelCase(normalizedName);
    if (!!domainAliasRecord[normalizedName]) {
      let aliasedName = domainAliasRecord[normalizedName];
      aliasedName = rePluralize ? pluralize(aliasedName) : aliasedName;
      return aliasedName;
    } else {
      return genericName;
    }
  };
}
const pluralExceptions = new Set(['workProjectSeries', 'workTaskSeries']);

function createPatternMatchedDomainAliasSet(
  genericNameSet: Set<string>,
  aliasSet: Record<string, string>
): Record<string, string> {
  let remainingGenericNames = new Set([...genericNameSet]);
  const createdAliasMap = {} as Record<string, string>;
  for (const [matcher, replacement] of Object.entries(aliasSet)) {
    let snakeMatcher = snakeCase(matcher);
    const matchedGenericNames = [...remainingGenericNames].filter(
      (nextString) => snakeCase(nextString).includes(snakeMatcher)
    );
    for (const matchedGenericName of matchedGenericNames) {
      remainingGenericNames.delete(matchedGenericName);
      let aliasName = snakeCase(matchedGenericName);
      const snakeMatcherStart = aliasName.indexOf(snakeMatcher);
      const beforeMatcher = aliasName.substring(0, snakeMatcherStart);
      const afterMatcher = aliasName.substring(
        snakeMatcherStart + snakeMatcher.length
      );
      aliasName = beforeMatcher + snakeCase(replacement) + afterMatcher;
      aliasName = camelCase(aliasName);
      createdAliasMap[matchedGenericName] = aliasName;
    }
    createdAliasMap[matcher] = replacement;
  }

  return createdAliasMap;
}
const schoolDomainAliasRecord = createPatternMatchedDomainAliasSet(
  new Set(Object.keys(EntityClassMap)),
  schoolDomainAliasMatcherRecord
);
export const getDomainAlias = getDomainAliasingFunction(
  schoolDomainAliasRecord
);

export const getStartCaseDomainAlias = (value: string) =>
  startCase(getDomainAlias(value));
