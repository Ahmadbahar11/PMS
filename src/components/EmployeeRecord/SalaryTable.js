import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Box,
  TableContainer,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SalaryTable = () => {
  const rows = [
    {
      date: "23 June 2025",
      amount: "Rs. 50,000",
      reason: "Annual Raise",
      updatedBy: "HR Manager",
    },
    {
      date: "06 Jan 2024",
      amount: "Rs. 45,000",
      reason: "Promotion",
      updatedBy: "HR Manager",
    },
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        maxWidth: "100%",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#0F3B4C", // dark teal
              "& th": {
                color: "white",
                fontWeight: "bold",
                fontSize: "0.95rem",
              },
            }}
          >
            <TableCell>Date</TableCell>
            <TableCell>Salary Amount</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Updated By</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:hover": { backgroundColor: "#f9f9f9" },
                "& td": { fontSize: "0.9rem", paddingY: 1 },
              }}
            >
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.reason}</TableCell>
              <TableCell>{row.updatedBy}</TableCell>
              <TableCell>
                <IconButton size="small" sx={{ color: "#1976d2" }}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: "#d32f2f" }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalaryTable;
