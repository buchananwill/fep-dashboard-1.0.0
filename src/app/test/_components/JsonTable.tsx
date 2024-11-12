'use client';
import { Table } from '@mantine/core';
import { startCase } from 'lodash';

export default function JsonTable<T extends Object>({
  jsonList
}: {
  jsonList: T[];
}) {
  const headers = new Set<string>();

  for (let i = 0; i < jsonList.length; i++) {
    const keysList = Object.keys(jsonList[i]);
    for (let j = 0; j < keysList.length; j++) {
      headers.add(keysList[j]);
    }
  }

  const headersList = [...headers.values()];

  if (jsonList.length === 0) return 'Empty List!';
  return (
    <Table stickyHeader>
      <Table.Thead>
        <Table.Tr>
          {headersList.map((tKey) => (
            <Table.Th key={tKey}>{startCase(tKey)}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {jsonList.map((jsonItem, index) => (
          <Table.Tr key={index}>
            {headersList.map((header) => (
              <Table.Td key={`${index}.${header}`}>
                {jsonItem.hasOwnProperty(header)
                  ? String(jsonItem[header as keyof typeof jsonItem])
                  : ''}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
