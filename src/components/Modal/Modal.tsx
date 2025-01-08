import React, { useEffect, useState } from "react";
import useStore from "../../store";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "../../components";

const Modal = () => {
  const [open, setOpen] = useState(false);
  const { modal, closeModal, updateCard, deleteCard } = useStore();
  const [formData, setFormData] = useState<Card>({
    title: "",
    desc: "",
    dueDate: "",
  });

  useEffect(() => {
    if (modal.isOpen) {
      setOpen(true);
      setFormData({
        title: modal.card.title,
        desc: modal.card.desc || "",
        dueDate: modal.card.dueDate,
      });
    } else {
      setOpen(false);
    }
  }, [modal]);

  const handleClose = () => {
    closeModal();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (modal.card.id) {
      updateCard(modal.card.id, formData);
      closeModal();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (modal.card.id) {
      deleteCard(modal.card.id);
      closeModal();
    }
  };
  return (
    <>
      {open && (
        <div className="modal-wrapper">
          <form>
            <div className="header">
              <div className="title">
                <input
                  value={formData.title}
                  name="title"
                  type="text"
                  onChange={handleChange}
                />
                <p>
                  In List: <span>{modal.listTitle}</span>{" "}
                </p>
              </div>
              <CloseIcon onClick={handleClose} />
            </div>
            <div className="content">
              <div className="desc">
                <h6>Description</h6>
                <textarea
                  placeholder="Add a more detailed description..."
                  value={formData.desc}
                  name="desc"
                  onChange={handleChange}
                />
              </div>
              <div className="due-date">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  name="dueDate"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="footer">
              <Button label="Delete" action={handleDelete} style="danger" />
              <Button label="Save" action={handleSave} style="secondary" />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
