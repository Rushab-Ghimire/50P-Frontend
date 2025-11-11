// TransactionsForm.jsx
import React, { useEffect, useState ,useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";
import {
  Box,
  Button,
  Stack,
  Typography,
  Alert,
  CircularProgress,
  TextField,
  Paper,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { gqlQuery, gqlMutate, queryClient } from "@app/_utilities/http.js";
import { GET_TRANSACTION, createTransaction, updateTransaction } from "./TransactionQueries";

// validation schema
const validationSchema = Yup.object({
  moduleCode: Yup.string().required("Module code is required"),
  status: Yup.string().required("Status is required"),
  tokens: Yup.number().typeError("Must be a number").required("Tokens are required"),
});

// TransactionsForm: handles both add (no id) and edit (with id)
export default function TransactionsForm() {
  const navigate = useNavigate();
  const params = useParams(); // params.id when editing
  const [values, setValues] = useState({ moduleCode: "",  status: "", tokens: "" });
  const [formError, setFormError] = useState({ isError: false, message: "" });

  // NEW: Pagination & Search
  // const [searchTerm, setSearchTerm] = useState("");
  // const [first] = useState(10);
  // const [skip, setSkip] = useState(0);
  // const searchRef = useRef();

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   setSearchTerm(searchRef.current.value);
  //   setSkip(0);
  // };

  // fetch all and pick the item by id (backend returns all_tokens_transactions)
  const { isLoading } = useQuery({
    queryKey: ["transaction", params.id],
    queryFn: ({ signal }) =>
      gqlQuery({ signal, path: "/graphql", inData: { gql: GET_TRANSACTION(params.id) } }),
    enabled: !!params.id,
    onSuccess: (res) => {
      const rows = res?.allTokensTransactions?.rows || [];
      // const rows = data?.rows || [];
      const item = rows.find((r) => String(r.id) === String(params.id));
      if (item) {
        setValues({
          moduleCode: item.moduleCode || "",
          uniqueId: item.uniqueId || "",
          status: item.status || "",
          tokens: item.tokens ?? "",
        });
      }
    },
  });

  // create / update mutation
  const { mutate, isPending } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      navigate("/askdaysi/transactions");
    },
    onError: (err) => setFormError({ isError: true, message: err?.info?.message || err?.message || "Something went wrong." }),
  });

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError({ isError: false, message: "" });
    try {
      await validationSchema.validate(values, { abortEarly: false });

      const gql = params.id
        ? updateTransaction({ ...values, id: params.id })
        : createTransaction(values);

      mutate({ path: "/graphql", inData: { gql } });
    } catch (err) {
      setFormError({ isError: true, message: (err.errors || []).join(", ") || err.message });
    }
  };

  // controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
  };

  // Keep UI tidy: if user visits /askdaysi/transactions/new then clear any loaded values
  useEffect(() => {
    if (!params.id) setValues({ moduleCode: "", status: "", tokens: "" });
  }, [params.id]);

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          {params.id ? "Edit Transaction" : "update Transaction"}
        </Typography>
        
            {/* Search field (NEW) 
        <form onSubmit={handleSearchSubmit}>
          <TextField
            size="small"
            inputRef={searchRef}
            placeholder="Search Transactions"
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton type="submit">
                  <SearchOutlinedIcon />
                </IconButton>
              ),
            }}
            sx={{ mb: 3 }}
          />
        </form>*/}

        {formError.isError && <Alert severity="error" sx={{ mb: 2 }}>{formError.message}</Alert>}

        {isLoading ? (
          <Stack alignItems="center" sx={{ py: 4 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Module Code"
                name="moduleCode"
                value={values.moduleCode}
                onChange={handleChange}
                fullWidth
              />

              {/* <TextField
                label="Unique ID (optional)"
                name="uniqueId"
                value={values.uniqueId}
                onChange={handleChange}
                fullWidth
              /> */}

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={values.status} onChange={handleChange} label="Status">
                  <MenuItem value="new">New</MenuItem>
                  
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Tokens"
                name="tokens"
                type="number"
                value={values.tokens}
                onChange={handleChange}
                fullWidth
              />

              <Box display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 1 }}>
                <Button type="submit" variant="contained" disabled={isPending}>
                  {params.id ? "Update" : "Save"}
                </Button>
                <Button variant="outlined" color="error" onClick={() => navigate("/askdaysi/transactions")}>
                  Cancel
                </Button>
              </Box>
            </Stack>
          </form>
        )}
      </Paper>
    </Container>
  );
}
