import { WorkTaskTypeResourceRequirementPutRequest } from "./rolesDefinitions";

const studio = "studio";
const assetRoleTypes = [studio];

const teacher = "teacher";
const providerRoleTypes = [teacher];

const teaching = "teaching";
const oneToOneRequirementsNormal: WorkTaskTypeResourceRequirementPutRequest = {
  workTaskTypes: {
    knowledgeDomains: [],
    knowledgeLevelSeries: [],
    workTaskTypeNames: [teaching],
  },
  resourceRequirementItems: [
    {
      providerRoleType: { name: teacher },
      assetRoleType: { name: studio },
      numberRequired: 1,
    },
  ],
};

const oneToOneRequirementsDrum: WorkTaskTypeResourceRequirementPutRequest = {
  workTaskTypes: {
    knowledgeDomains: [{ name: "Drum Kit", id: -1 }],
    knowledgeLevelSeries: [],
    workTaskTypeNames: [teaching],
  },
  resourceRequirementItems: [
    {
      providerRoleType: { name: teacher },
      numberRequired: 1,
    },
    {
      assetRoleType: { name: studio },
      numberRequired: 2,
    },
  ],
};
