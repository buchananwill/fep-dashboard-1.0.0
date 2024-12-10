import { BASE_URL } from '@/api/BASE_URL';
import { DownloadXlsx } from '@/app/test/xlsx/DownloadXlsx';
import { NextRequest } from 'next/server';
import { fetchXlsx } from '@/app/test/xlsx/fetchXlsx';

export default async function page() {
  const nextRequest = new NextRequest(`${BASE_URL}/xlsx/download`);
  const data = await fetchXlsx(nextRequest);
  const arrayBuffer = await data.blob();
  return <DownloadXlsx xlsx={arrayBuffer} />;
}
