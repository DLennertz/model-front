import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ModelService from "../../../services/ModelService";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "nomeCompleto", headerName: "Nome", flex: 1 },
  { field: "position", headerName: "Posição", flex: 1 },
  { field: "country", headerName: "País", flex: 1 },
  { field: "dataNascimento", headerName: "Nascimento", flex: 1 },
];

export default function TableModelo() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await ModelService.getAll();
        setRows(result);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20, 50, 100]}
        disableSelectionOnClick
      />
    </div>
  );
}
