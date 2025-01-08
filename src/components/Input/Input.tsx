import { useState } from "react";
import { Button } from "../../components";
import ClearIcon from "@mui/icons-material/Clear";
import useStore from "../../store";

type InputProps = {
  placeholder: string;
  type: string;
  listID: string;
};
const Input = ({ placeholder, type, listID }: InputProps) => {
  const [value, setValue] = useState("");
  const { resetNewInput, addCard, addList } = useStore();
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setValue(val);
  };

  const handleAdd = () => {
    if (type === "card") {
      addCard(value, listID);
      resetNewInput();
    } else if (type === "list") {
      addList(value);
      resetNewInput();
    }
  };
  const handleClear = () => {
    resetNewInput();
  };
  return (
    <div
      className={
        type === "list" ? "input-wrapper new-list-input" : "input-wrapper"
      }
    >
      <textarea
        rows={2}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
      />
      <Button
        label={type === "card" ? "Add Card" : "Add List"}
        action={handleAdd}
        style="secondary"
      />
      <ClearIcon onClick={handleClear} />
    </div>
  );
};

export default Input;
