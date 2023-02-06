import React, { useState } from 'react';
import { Row } from '../types/row';

interface FilterProps {
    column: string;
    allRows: Row[];
    onFilterChange: (column: string, allRows: string[]) => void;
}

function ResultsFilter(filter: FilterProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  };

  console.log(filter.allRows);

  const uniqueNames = Array.from(new Set(filter.allRows.map((row: any) => row[filter.column])));

  return (
    <div>
      {uniqueNames.map((name) => (
        <div className={'padding'} key={name}>
          <input type="checkbox" value={name} onChange={handleCheckboxChange} />
          {name}
        </div>
      ))}
    </div>
  );
}

export default ResultsFilter