import { Header, Footer, Modal } from "../components";
import { Board } from "../views";
import useStore from "../store";

const RootLayout = () => {
  const { modal, closeModal } = useStore();
  const handleBoardClick = () => {
    if (modal.isOpen) {
      closeModal();
    }
  };
  return (
    <>
      <div className="root-layout-wrapper" onClick={handleBoardClick}>
        <Header />
        <Board />
        <Footer />
      </div>
      <Modal />
    </>
  );
};

export default RootLayout;
