import { Api } from '@/api/clientApi';
import { InitJsonDataTypes } from '@/components/init-json-template/dataTypes';

export default async function Page({
  params
}: {
  params: Promise<{ initJsonTemplateId: string }>;
}) {
  const initJsonTemplateId = (await params).initJsonTemplateId;
  const dto = await Api.InitJsonTemplate.getOne(parseInt(initJsonTemplateId));
  const { dataType, name } = dto;

  const Component = InitJsonDataTypes[dataType.name];

  return <>{Component && <Component initJsonTemplate={dto} />}</>;
}
