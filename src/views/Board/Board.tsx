import { useEffect, useState } from "react";
import { List, AddInput } from "../../components";
import useStore from "../../store";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import CircularProgress from '@mui/material/CircularProgress';


const Board = () => {
  const [allLists, setAllLists] = useState([]);
  const { lists, updateList } = useStore();

  useEffect(() => {
    setAllLists(lists);
  }, [lists]);
  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const draggableList = allLists.find(({ id }) => id === draggableId);
      if (draggableList) {
        allLists.splice(source.index, 1);
        allLists.splice(destination.index, 0, draggableList);
        updateList(allLists);
      }

      return;
    }

    if (source.droppableId === destination.droppableId) {
      const updatedList = allLists.map((list: List) => {
        if (list.id === source.droppableId) {
          const draggableCard = list.cards.find(
            ({ id }) => id === draggableId
          ) as Card;
          const newCardList = list.cards;
          newCardList.splice(source.index, 1);
          newCardList.splice(destination.index, 0, draggableCard);
          return {
            ...list,
            cards: newCardList,
          };
        }
        return list;
      });
      updateList(updatedList);
    } else {
      let draggableCard: Card;
      const updatedSourceList = allLists.map((list: List) => {
        if (list.id === source.droppableId) {
          draggableCard = list.cards.find(
            ({ id }) => id === draggableId
          ) as Card;
          const updatedCardList = list.cards;
          updatedCardList.splice(source.index, 1);
          return {
            ...list,
            cards: updatedCardList,
          };
        }

        return list;
      });

      const updatedList = updatedSourceList.map((list) => {
        if (list.id === destination.droppableId) {
          const updatedCardList = list.cards;
          updatedCardList.splice(destination.index, 0, draggableCard);
          return {
            ...list,
            cards: updatedCardList,
          };
        }
        return list;
      });
      updateList(updatedList);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="list">
        {(provided) => (
          <div
            className="board-wrapper"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {allLists && allLists.length > 0 ? (
              <>
                {allLists.map((list, idx) => (
                  <List list={list} key={list.id} index={idx} />
                ))}
                <AddInput
                  placeholder="Add New List"
                  style="secondary"
                  type="list"
                  listID="new-list"
                />
              </>
            ) : (
               <div className="loading">
               <CircularProgress/>
               </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
