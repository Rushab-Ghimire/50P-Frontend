import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { gqlQuery, queryClient } from "@app/_utilities/http";
import {
  Box,
  Button,
  TextField,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { GET_TEACHERS, deleteTeacher } from "./TeacherQueries";

export default function TeacherList() {
  const navigate = useNavigate();

  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["teacher", search, page],
    queryFn: ({ signal }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: { gql: GET_TEACHERS(search, page) },
      }),
  });
  const rows = data?.rows || [];
  const totalRows = data?.totalRows || 0;

  const totalPages = Math.ceil(totalRows / 10);

  const handleDelete = (id) => {
    gqlQuery({
      path: "/graphql",
      inData: { gql: deleteTeacher(id) },
    }).then(() => {
      queryClient.invalidateQueries(["teacher"]);
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchRef.current.value);
    setPage(1);
  };

  return (
    <Box p={5}>
      {/* Search */}
      
        <form onSubmit={handleSearchSubmit}>
          <TextField
            inputRef={searchRef}
            placeholder="Search teacher..."
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton type="submit">
                  <SearchOutlinedIcon />
                </IconButton>
              ),
            }}
          />
        </form>
      

      <Button
        variant="contained"
        onClick={() => navigate("/askdaysi/TeacherModule/new")}
        sx={{ mt: 2 ,mb: 2}}
      >
        + Add Teacher
      </Button>

      
        {isLoading ? (
          <CircularProgress />
        ) : (
          <table className="w-full ">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Id</th>
                <th className="p-3 border">First Name</th>
                <th className="p-3 border">Last Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Qualification</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id}>
                  <td className="p-3 border">{t.id}</td>
                  <td className="p-3 border">{t.firstName}</td>
                  <td className="p-3 border">{t.lastName}</td>
                  <td className="p-3 border">{t.email}</td>
                  <td className="p-3 border">{t.qualification}</td>
                  <td className="p-3 border flex gap-5">
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() =>
                        navigate(`/askdaysi/TeacherModule/${t.id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    

      {/* Pagination */}
      <Box mt={3} display="flex" gap={2}>
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <Button
          variant="outlined"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
