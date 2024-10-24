"use client";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Sheet } from "@mui/joy";
import {
  Box,
  Container,
  FormControl,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";
import FormInput from "./shared/form/formData";
import FormInputSelect from "./shared/form/FormInputSelect";
import DateSelect from "./shared/form/DatePicker";
import SetBalance from "./SetBalance";
import TransactionTable from "./Table/TransactionTable";
import { successMsg } from "./Toastmsg/toaster";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import DeleteModal from "./modal/DeleteModal";
import UserContext from "@/context/UserContext";
import dayjs from "dayjs";
import { transactionValidation } from "./validation/transactionValidation";
import { yupResolver } from "@hookform/resolvers/yup";
const Transaction = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(transactionValidation) });
  const { totalbalance, setTotalBalance } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [editBalanceOpen, setEditBalanceOpen] = useState(false);
  const [data, setData] = useLocalStorage("expense", []);
  const [newBalance, setNewBalance] = useState(totalbalance);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [balanceInitialized, setBalanceInitialized] = useState(false);

  useEffect(() => {
    if (totalbalance !== undefined) {
      setBalanceInitialized(true);
    }
  }, [totalbalance]);
  useEffect(() => {
    if (totalbalance !== undefined) {
      setBalanceInitialized(true);
    }
  }, [totalbalance]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflowY: "auto",
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
  const onSubmit = (formData) => {
    try {
      const storedData =
        editIndex !== null
          ? data.map((item, index) => (index === editIndex ? formData : item))
          : [...data, formData];
      setData(storedData);
      localStorage.setItem("expense", JSON.stringify(storedData));
      reset();
      setOpen(false);
      successMsg(
        editIndex !== null
          ? "Transaction updated successfully"
          : "Transaction added successfully"
      );
      editIndex !== null ? setEditIndex(null) : "";
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    reset({
      title: "",
      discription: "",
      amount: "",
      type: "",
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onDelete = () => {
    if (deleteIndex !== null) {
      const updatedData = data.filter((_, i) => i !== deleteIndex);
      localStorage.setItem("expense", JSON.stringify(updatedData));
      setData(updatedData);
      successMsg("Transaction deleted successfully");
      setDeleteOpenModal(false);
      setDeleteIndex(null);
    } else {
      const remove = localStorage.removeItem("balance");
      setTotalBalance(remove);
      successMsg("Balance deleted successfully")
      setDeleteOpenModal(false);
    }
  };
  const handleDelete = (index) => {
    setDeleteIndex(index);
    setDeleteOpenModal(true);
  };
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false);
  };
  const handleEdit = (index) => {
    reset(data[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const calculateIncome = (type) => {
    return data
      .filter((item) => item.type === type)
      .reduce((total, item) => total + parseFloat(item.amount || 0), 0);
  };
  useEffect(() => {
    if (totalbalance === undefined && 0) {
      setOpen(true);
    }
  }, [totalbalance]);
  useEffect(() => {
    const income = calculateIncome("Income");
    const expense = calculateIncome("Expense");
    setTotalIncome(income);
    setTotalExpense(expense);
  }, [data]);

  const remainingBalance = totalbalance - totalExpense;
  const editBalance = (newBalance) => {
    setTotalBalance(newBalance);
    localStorage.setItem("balance", newBalance);
    successMsg("Balance updated successfully");
  };

  const handleEditBalanceOpen = () => {
    setNewBalance(totalbalance);
    if (totalbalance !== undefined) {
      setEditBalanceOpen(true);
    }
  };

  const handleEditBalanceClose = () => {
    setEditBalanceOpen(false);
  };
  const handleDeleteBalance = () => {
    setDeleteOpenModal(true);
  };
  const handleCloseBalance = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        {totalbalance !== undefined ? (
          <>
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Add Your Expense and Income{" "}
                  <span>
                    {" "}
                    <CloseIcon onClick={handleClose} />
                  </span>
                </div>
                <br />
                <Sheet
                  sx={{
                    width: 500,
                    mx: "auto",
                    my: 4,
                    py: 3,
                    px: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    borderRadius: "sm",
                    boxShadow: "md",
                  }}
                  variant="outlined"
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <>
                      <FormControl fullWidth margin="normal" className="mt-4  ">
                        <FormInput
                          control={control}
                          name="title"
                          label="Title"
                          placeholder="Title"
                          inputType="text"
                          id="title"
                          errors={errors}
                        />
                      </FormControl>

                      <FormControl fullWidth margin="normal" className="mt-4  ">
                        <FormInput
                          control={control}
                          name="amount"
                          label="Amount"
                          placeholder="Amount"
                          inputType="number"
                          id="amount"
                          min="0"
                          errors={errors}
                        />
                      </FormControl>

                      <FormControl fullWidth margin="normal" className="  ">
                        <FormInputSelect
                          control={control}
                          name="type"
                          label="Select Type"
                          options={["Income", "Expense"]}
                          errors={errors}
                        />
                      </FormControl>

                      <FormControl fullWidth margin="normal" className="mt-4  ">
                        <DateSelect
                          className="shadow-lg relative"
                          name="date"
                          control={control}
                          errors={errors}
                          required={true}
                          label="Date"
                          inputFormat="YYYY-MM-DD"
                        />
                      </FormControl>

                      <FormControl fullWidth margin="normal" className="mt-4  ">
                        <FormInput
                          control={control}
                          errors={errors}
                          name="description"
                          label="Description"
                          placeholder="Description"
                          inputType="text"
                          id="description"
                        />
                      </FormControl>

                      <Button
                        className="mt-4 ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        type="submit"
                      >
                        {editIndex !== null ? (
                          <> Update Transaction</>
                        ) : (
                          <> Submit Transaction</>
                        )}
                      </Button>
                    </>
                  </form>
                </Sheet>
              </Box>
            </Modal>
            <Modal open={editBalanceOpen} onClose={handleEditBalanceClose}>
              <Box sx={style}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Edit Balance{" "}
                  <span>
                    {" "}
                    <CloseIcon onClick={handleEditBalanceClose} />
                  </span>
                </div>
                <TextField
                  type="number"
                  value={newBalance}
                  variant="outlined"
                  className="w-80"
                  inputProps={{ min: 0 }} 
                  onChange={(e) => setNewBalance(parseFloat(e.target.value))}
                />
                <br />
                <Button
                  onClick={() => {
                    editBalance(newBalance);
                    handleEditBalanceClose();
                  }}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Update Balance
                </Button>
              </Box>
            </Modal>
          </>
        ) : (
          <Modal open={open} onClose={handleCloseBalance}>
            <Box sx={style}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                Set Balance{" "}
                <span>
                  {" "}
                  <CloseIcon onClick={handleClose} />
                </span>
              </div>
              <SetBalance totalExpense={totalExpense} setOpen={setOpen} />
            </Box>
          </Modal>
        )}
        <br />
        <Container>
          <Box>
            <Box className="bg-gray-500">
              <Button
                onClick={handleOpen}
                className="addbtn mt-4 mb-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                {balanceInitialized &&
                (totalbalance === 0 || totalbalance === undefined)
                  ? "Add Balance"
                  : "Add Transaction"}
              </Button>
            </Box>
            <br />
            <Box>
              <Grid>
                <Item
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Total Income: <span className="span">${totalIncome}</span>
                </Item>
                <Item
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Total Expenses: <span>${totalExpense}</span>
                </Item>
                <Item
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Balance:
                  <span className="span">
                    <EditIcon
                      className="editicon"
                      onClick={handleEditBalanceOpen}
                    />
                    <DeleteIcon
                      className="deleteicon"
                      onClick={handleDeleteBalance}
                    />
                    ${totalbalance?.toFixed(2)}
                  </span>
                </Item>
              </Grid>
              <br />
              <Item
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                Remaining Balance:{" "}
                <span>$ {isNaN(remainingBalance) ? 0 : remainingBalance}</span>
              </Item>
            </Box>
          </Box>
          <br />
          <TransactionTable
            data={data}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </Container>
        <DeleteModal
          onDelete={onDelete}
          deleteMessage="Are you certain you want to proceed with this deletion?"
          deleteOpenModal={deleteOpenModal}
          deleteHandleModalClose={deleteHandleModalClose}
        />
      </div>
    </>
  );
};

export default Transaction;