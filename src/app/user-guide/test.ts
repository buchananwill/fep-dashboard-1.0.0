import { DomTreeSketch } from './DomTreeSketch';
import * as fs from 'fs';
import { overViewData } from './OverViewDataNO_REACT';
import { startCase } from 'lodash';
import { singular } from 'pluralize';

function parseDataModelNames({ childComponents }: DomTreeSketch): string[] {
  const response: string[] = [];
  if (childComponents) {
    Object.entries(childComponents).map(([key, value]) => {
      response.push(key);
      response.push(...parseDataModelNames(value));
    });
  }
  return response;
}

fs.writeFileSync(
  './data-model-names.json',
  JSON.stringify(
    parseDataModelNames(overViewData).map((n) => startCase(singular(n)))
  )
);
