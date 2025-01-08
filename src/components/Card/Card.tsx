import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Draggable } from "@hello-pangea/dnd";
import useStore from "../../store";
import { useEffect, useState } from "react";

type CardProps = {
  card: Card;
  index: number;
  listTitle: string;
};

const Card = ({ card, index, listTitle }: CardProps) => {
  const { openModal } = useStore();
  const [isMobile, setIsMobile] = useState(false);
  const handleCardOpen = () => {
    if (!isMobile) {
      openModal(card, listTitle);
    }
  };

  const handleCardOpenForMobile = () => {
    openModal(card, listTitle);
  };
  const handleResize = () => {
    const isMobileWidth = window.innerWidth <= 500;
    setIsMobile(isMobileWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="card-wrapper"
          onClick={handleCardOpen}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <span>{card.title}</span>
          <ModeEditIcon onTouchStart={handleCardOpenForMobile} />
        </div>
      )}
    </Draggable>
  );
};

export default Card;
