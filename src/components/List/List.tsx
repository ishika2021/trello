import { AddInput, CardList, Card } from "../../components";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import useStore from "../../store";
import { useEffect, useState } from "react";

type ListProps = {
  list: List;
  index: number;
};

const List = (props: ListProps) => {
  const { deleteList, editList } = useStore();
  const [listTitle, setListTitle] = useState("");
  useEffect(() => {
    setListTitle(props.list.title);
  }, [props.list]);

  const handleDelete = (id: string) => {
    deleteList(id);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setListTitle(value);
    editList(props.list.id, value);
  };

  return (
    <Draggable draggableId={props.list.id} index={props.index}>
      {(provided) => (
        <div
          className="list-wrapper"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="header" {...provided.dragHandleProps}>
            <input value={listTitle} type="text" onChange={handleTitleChange} />
            <DeleteOutlineIcon
              className="icon"
              onClick={() => {
                handleDelete(props.list.id);
              }}
            />
          </div>
          <Droppable droppableId={props.list.id} type="card">
            {(provided) => (
              <CardList ref={provided.innerRef} {...provided.droppableProps}>
                {props.list.cards?.map((card, idx) => (
                  <Card
                    card={card}
                    key={card.id}
                    index={idx}
                    listTitle={props.list.title}
                  />
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
