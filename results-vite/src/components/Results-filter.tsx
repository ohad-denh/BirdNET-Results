import React, { useState } from 'react';
import { Row } from '../types/row';

interface FilterProps {
    column: string;
    allRows: Row[];
    onFilterChange: (column: string, allRows: string[]) => void;
}

function Filter({ allRows }: FilterProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  };

  const uniqueNames = Array.from(new Set(allRows.map((row: Row) => row['Common name'])));

  return (
    <div>
      {uniqueNames.map((name) => (
        <div key={name}>
          <input type="checkbox" value={name} onChange={handleCheckboxChange} />
          {name}
        </div>
      ))}
    </div>
  );
}