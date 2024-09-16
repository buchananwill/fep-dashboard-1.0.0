import { ChangeEvent, useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { NodeDataType } from '@/components/react-flow/generic/utils/adaptors';
import { NodeProps } from '@/types/xyflow-overrides';
import { NodeBase } from '@/components/react-flow/generic/types';

const handleStyle = { left: 10 };
export interface TextList extends NodeDataType {
  valueList: string[];
}

export type TextValueListNode = NodeBase<TextList, 'text'>;

export default function InputValueListNode({
  data
}: NodeProps<TextValueListNode>) {
  const [valueList, setValueList] = useState(data.valueList);

  const updateValueList = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      setValueList((list) => {
        const newList = [...list];
        newList[index] = event.target.value;
        return newList;
      });
    },
    []
  );

  return (
    <>
      <Handle type="target" position={Position.Top} />
      {valueList.map((value, index) => (
        <div key={index}>
          <label htmlFor="text">Text:</label>
          <input
            id="text"
            name="text"
            onChange={(e) => updateValueList(e, index)}
            className="nodrag"
          />
        </div>
      ))}
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}
