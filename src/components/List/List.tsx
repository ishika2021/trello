import { AddInput, CardList, Card } from "../../components";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import useStore from "../../store";
import { useEffect } from "react";

type ListProps = {
  list: List;
  index: number;
};

const List = (props: ListProps) => {
  const {newInput, deleteList} = useStore();
  useEffect(()=>{
    
  },[newInput])
  const handleDelete = (id) => {
    console.log("handle-delete!");
    deleteList(id)
  };
  return (
    <Draggable draggableId={props.list.id} index={props.index}>
      {(provided) => (
        <div className="list-wrapper" {...provided.draggableProps} ref={provided.innerRef}>
          <div className="header" {...provided.dragHandleProps}>
            <h6>{props.list.title}</h6>
            <DeleteOutlineIcon className="icon" onClick={()=>{handleDelete(props.list.id)}} />
          </div>
          <Droppable droppableId={props.list.id} type="card">
            {(provided) => (
              <CardList ref={provided.innerRef} {...provided.droppableProps}>
                {props.list.cards?.map((card, idx) => (
                  <Card card={card} key={card.id} index={idx} />
                ))}
                {provided.placeholder}
              </CardList>
            )}
          </Droppable>
          <AddInput
            placeholder="Add a card"
            style="primary"
            type="card"
            listID={props.list.id}
          />
        </div>
      )}
    </Draggable>
  );
};

export default List;
