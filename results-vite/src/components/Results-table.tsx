import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { Row } from '../types/row';
import ResultsFilter from './Results-filter';

interface ResultsTableProps {
  file: File | null;
}

// Id function
const getRowId = (row: Row) => {
  return `${row['start']?.toString()}_${row['end']?.toString()}_${row['scientific']?.toString()}`;
};

// Declare the columns variable outside of the fetch function
const columns: GridColDef[] = [
  { field: 'start', headerName: 'Start (s)', type: 'number', width: 65 },
  { field: 'end', headerName: 'Ende (s)', type: 'number', width: 65 },
  { field: 'scientific', headerName: 'Art (wiss.)', width: 190 },
  { field: 'common', headerName: 'Art (ugs.)', width: 140 },
  { field: 'confidence', headerName: 'Wahrscheinlichkeit', type: 'number', width: 140},
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function ResultsTable({ file }: ResultsTableProps) {
  const [rows, setRows] = useState<any[]>([]);
  
  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      Papa.parse(e.target?.result as string, {
        header: true,
        complete: (results) => {
          const sanitizedData = results.data.map((row: any) => {
            return {
              start: row['Start (s)'],
              end: row['End (s)'],
              scientific: row['Scientific name'],
              common: row['Common name'],
              confidence: row['Confidence'],
            };
          });
          
          setRows(sanitizedData);
        }
      });
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <div className={'results'}>
      <div className={'results-table height-70 width-70'}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      </div>
      <div className={'results-filter height-70 width-30'}>
      <ResultsFilter
        column={'common'}
        allRows={rows}
        onFilterChange={function (column: string, allRows: string[]): void {
          throw new Error('Function not implemented.');
          }
        }
      />
      </div>
    </div>
  );
}

export default ResultsTable