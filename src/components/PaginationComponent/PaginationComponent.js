import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({ page, pages, onPageChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        sx={{
          "& .MuiPaginationItem-root": {
            fontSize: "1.5rem",

            // Увеличиваем размер шрифта
          },
        }}
        count={pages}
        page={page}
        fullWidth
        onChange={(event, value) => onPageChange(value)}
        color="primary"
      />
    </Stack>
  );
};

export default PaginationComponent;
