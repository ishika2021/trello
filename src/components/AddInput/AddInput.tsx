import { Input } from "../../components";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import useStore from "../../store";

type AddInputProps = {
  placeholder: string;
  style: string;
  type: string;
  listID: string;
};

const AddInputProps = ({
  placeholder,
  style = "primary",
  type,
  listID,
}: AddInputProps) => {
  const { newInput, addNewInput } = useStore();

  const handleAddInput = () => {
    addNewInput(listID, type);
  };
  const getPlaceholder = () => {
    if (type === "card") {
      return "Enter a title or paste a link";
    }
    return "Enter list name...";
  };
  return (
    <>
      {newInput.id === listID ? (
        <Input placeholder={getPlaceholder()} type={type} listID={listID} />
      ) : (
        <div className={`add-input-wrapper ${style}`} onClick={handleAddInput}>
          <AddIcon fontSize="small" />
          <span>{placeholder}</span>
        </div>
      )}
    </>
  );
};

export default AddInputProps;
