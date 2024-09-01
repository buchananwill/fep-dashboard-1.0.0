import { WorkNodeHierarchy } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import {
  joinPath,
  splitPath
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupFunctions';

function replaceColonWithSlash(workNode: WorkNodeHierarchy) {
  let correctPath = workNode.path.split(':').join('/');
  if (workNode.type === 'leafList') {
    const splitPathAgain = splitPath(correctPath);
    splitPathAgain[splitPathAgain.length - 1] = String(
      workNode.children[0].size
    );
    correctPath = joinPath(...splitPathAgain);
  }
  if (workNode.type !== 'leaf') {
    workNode.children.forEach(replaceColonWithSlash);
  } else {
    const splitPathAgain = splitPath(correctPath);
    splitPathAgain[splitPathAgain.length - 2] = String(workNode.size);
    correctPath = joinPath(...splitPathAgain);
  }
  workNode.path = correctPath;
}