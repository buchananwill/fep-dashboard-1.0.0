'use client';
import { cloneOrganizationNode } from './cloneOrganizationNode';
import { getGraphUpdaterWithNameDeDuplication } from './getGraphUpdaterWithNameDeDuplication';
import { putGraph } from '@/api/generated-actions/Organization';

export const cloneFunctionWrapper = { memoizedFunction: cloneOrganizationNode };

export const organizationGraphUpdater =
  getGraphUpdaterWithNameDeDuplication(putGraph);
