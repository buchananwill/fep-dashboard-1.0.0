'use server';
import { getWithoutBody } from '@/api/actions/template-actions';
import { BASE_URL } from '@/api/BASE_URL';
import { TemplateProgress } from '@/components/migration/MigrationProgressTracker';

export async function getInitializationStatus(): Promise<TemplateProgress> {
  return getWithoutBody(`${BASE_URL}/api/v2/tenancy/initialization-status`);
}
