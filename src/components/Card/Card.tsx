import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Draggable } from '@hello-pangea/dnd';

type CardProps = {
    card: Card;
    index: number;
}

const Card = ({card,index}:CardProps) => {
    const handleCardOpen = () => {
        
    }
    return(
        <Draggable draggableId={card.id} index={index}>
        {
            (provided)=>(
                <div className="card-wrapper" onClick={handleCardOpen} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <span>{card.title}</span>
                <ModeEditIcon />
            </div>
            )
        }
        </Draggable>
    )
}

export default Card;