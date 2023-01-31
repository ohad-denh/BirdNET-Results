import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';

interface ResultsTableProps {
  file: File | null;
}

// Id function
const getRowId = (row: any) => {
  return `${row["Start (s)"]?.toString()}_${row["End (s)"]?.toString()}_${row["Scientific name"]}`;
};

// Declare the columns variable outside of the fetch function
const columns: GridColDef[] = [
  { field: 'Id', width: 110},
  { field: 'Start (s)', type: 'number', width: 70 },
  { field: 'End (s)', type: 'number', width: 70 },
  { field: 'Scientific name', width: 200 },
  { field: 'Common name', width: 130 },
  { field: 'Confidence', type: 'number', width: 140},
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
          const data = results.data.map((row: any) => {
            const id = `${row["Start (s)"]}_${row["End (s)"]}_${row["Scientific name"]}`;
            return { ...row, Id: id };
          });
          setRows(data);
        }
      });
    };
    reader.readAsText(file);
  }, [file]);

  return (
      <div style={{ height: 600, width: '65%', margin: 'auto' }}>
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
  );
}

export default ResultsTable