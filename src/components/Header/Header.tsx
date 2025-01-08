import { Button } from "../../components";
import useStore from "../../store";

const Header = () => {
  const { resetList } = useStore();
  const handleReset = () => {
    resetList();
  };
  return (
    <div className="header-wrapper">
      <h1 className="logo">Trello</h1>
      <Button label="Reset" action={handleReset} />
    </div>
  );
};

export default Header;
