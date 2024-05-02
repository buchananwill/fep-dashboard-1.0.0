import React from 'react';
import { Step } from 'react-joyride';

export const steps: Step[] = [
  {
    target: '.step_table_header',
    content: (
      <div className={'text-md leading-normal text-black text-left'}>
        This table will combine:
        <ul className={'list-disc p-2 gap-2 '}>
          <li>
            The <strong>lesson types</strong> listed for each row
          </li>
          <li>
            With each <strong>count</strong> in the year group columns
          </li>
          <li>
            To make the corresponding <strong>number</strong> of lesson types.
          </li>
        </ul>
        For example, to create <em>Maths</em>, <em>Further Maths 1</em> and{' '}
        <em>Further Maths 2</em> for Year 12, enter {"'"}3{"'"} in that columns.
        (You can name them later.)
      </div>
    )
  },
  {
    target: '.step_submit_lesson_types',
    content: "Click to submit when you're done editing the values."
  },
  {
    target: '.step_edit_cycleSubspanGroups',
    content:
      'Select the periods which can begin a lesson of the corresponding length.'
  }
];
