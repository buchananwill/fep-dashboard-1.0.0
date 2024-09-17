import { Api } from '@/api/clientApi_';
import { LeafComponentProps } from '@/app/core/navigation/types';
import EnrollmentTable, {
  ClosureMap
} from '@/components/work-schema-node-assignments/enrollment-table/EnrollmentTable';
import { addClosure } from '@/components/work-schema-node-assignments/enrollment-table/addClosure';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';

export default async function EnrollmentTablePage({}: LeafComponentProps) {
  const orgList = await Api.Organization.getDtoListByExampleList([
    { type: { name: 'Work Group' } },
    { type: { name: 'Class' } }
  ]);

  const idList = orgList.map((org) => org.id);

  const classesAndWorkGroups =
    await Api.Organization.getGraphByNodeList(idList);

  const classes = classesAndWorkGroups.nodes.filter(
    (node) => node.data.type.name === 'Class'
  );
  const workGroups = classesAndWorkGroups.nodes.filter(
    (node) => node.data.type.name === 'Work Group'
  );

  const nestedMap = classesAndWorkGroups.closureDtos.reduce((prev, curr) => {
    addClosure(prev, curr);
    return prev;
  }, {} as ClosureMap);

  return (
    <div className={'h-[80vh] w-[80vw]'}>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.organization}
        dtoList={orgList}
      />
      <EnrollmentTable
        classes={classes}
        enrollments={workGroups}
        closures={nestedMap}
      />
    </div>
  );
}
