import React from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const DocumentManagement = ({ data, onChange }) => {
  const uploadedDocs = data;

  // handle selecting files
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newDocs = files.map((file) => ({
      name: file.name,
      date: new Date().toLocaleDateString(),
      file, // keep file object for upload later
    }));
    onChange([...uploadedDocs, ...newDocs]);
  };

  // remove from list before sending
  const handleDelete = (indexToDelete) => {
    const updated = uploadedDocs.filter((_, index) => index !== indexToDelete);
    onChange(updated);
  };

  // view locally selected file
  const handleView = (file) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Upload Documents
      </Typography>

      {/* Upload box */}
      <Box
        sx={{
          border: "2px dashed #ccc",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          mb: 3,
        }}
      >
        <Typography>Drag and drop your files here or</Typography>
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 1, backgroundColor: "#073B4C", textTransform: "none" }}
        >
          Browse Files
          <input type="file" hidden multiple onChange={handleFileUpload} />
        </Button>
      </Box>

      {/* Show table if any docs selected */}
      {uploadedDocs.length > 0 && (
        <>
          <Typography variant="h6" mb={1}>
            Uploaded Documents
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0F3B4C" }}>
                <TableCell sx={{ color: "white" }}>File Name</TableCell>
                <TableCell sx={{ color: "white" }}>Upload Date</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedDocs.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleView(doc.file)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Box>
  );
};

export default DocumentManagement;
