import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Store {
  lists: List[];
  newInput: {
    id: string | null;
    type: string;
  };
  modal: {
    isOpen: boolean;
    card: Card;
    listTitle: string;
  };
  updateList: (list: List[]) => void;
  addNewInput: (id: string, type: string) => void;
  resetNewInput: () => void;
  addCard: (listID: string, title: string) => void;
  addList: (title: string) => void;
  openModal: (card: Card, listID: string) => void;
  closeModal: () => void;
  updateCard: (cardID: string, updatedCard: Card) => void;
  deleteCard: (cardID: string) => void;
  editList: (listID: string, title: string) => void;
  deleteList: (listID: string) => void;
  resetList: () => void;
}

const getLocalStorageData = () => {
  const data = localStorage.getItem("lists");
  if (!data) {
    return [
      {
        id: uuidv4(),
        title: "To Do",
        cards: [
          {
            id: uuidv4(),
            title: "Project Planning",
            desc: "",
            createdOn: Date.now().toString(),
            dueDate: "",
          },
        ],
      },
      {
        id: uuidv4(),
        title: "Done",
        cards: [],
      },
    ];
  }

  return JSON.parse(data);
};

const useStore = create<Store>((set) => ({
  lists: getLocalStorageData(),
  newInput: {
    id: "",
    type: "",
  },
  modal: {
    isOpen: false,
    card: {} as Card,
    listTitle: "",
  },

  updateList: (list: List[]) =>
    set(() => ({
      lists: list,
    })),

  editList: (listID: string, title: string) =>
    set(({ lists }) => {
      const updatedList = lists.map((list) => {
        if (list.id === listID) {
          return {
            ...list,
            title: title,
          };
        }
        return list;
      });
      return {
        lists: updatedList,
      };
    }),

  addNewInput: (id: string, type: string) =>
    set(() => ({
      newInput: {
        id,
        type,
      },
    })),

  resetNewInput: () =>
    set(() => ({
      newInput: {
        id: "",
        type: "",
      },
    })),

  addCard: (title: string, listID) =>
    set(({ lists }) => {
      if (title === "") {
        title = "Untitled List";
      }
      const obj = {
        id: uuidv4(),
        title,
        desc: "",
        createdOn: Date.now().toString(),
        dueDate: "",
      };

      const updatedList = lists.map((list) => {
        if (list.id === listID) {
          return {
            ...list,
            cards: [...list.cards, obj],
          };
        }
        return list;
      });

      return {
        lists: updatedList,
      };
    }),
  addList: (title: string) =>
    set(({ lists }) => {
      if (title === "") {
        title = "Untitled List";
      }
      const obj = {
        id: uuidv4(),
        title,
        cards: [],
      };
      const updatedList = [...lists, obj];
      return {
        lists: updatedList,
      };
    }),
  deleteList: (listID: string) =>
    set(({ lists }) => {
      const updatedList = lists.filter(({ id }) => id !== listID);
      return {
        lists: updatedList,
      };
    }),

  openModal: (card: Card, listTitle: string) =>
    set(() => {
      const obj = {
        isOpen: true,
        card,
        listTitle,
      };
      return {
        modal: obj,
      };
    }),
  closeModal: () =>
    set(() => {
      const obj = {
        isOpen: false,
        card: {},
        listTitle: "",
      };
      return {
        modal: obj,
      };
    }),
  updateCard: (cardID: string, updatedCard: Card) =>
    set(({ lists }) => {
      const parentList = lists.map((list) => {
        const card = list.cards.find(({ id }) => id === cardID);
        if (card) {
          const newCard = { ...card, ...updatedCard };
          const updatedCardList = list.cards.map((card) => {
            if (card.id === cardID) {
              return newCard;
            }
            return card;
          });
          return {
            ...list,
            cards: updatedCardList,
          };
        }

        return list;
      });

      return {
        lists: parentList,
      };
    }),
  deleteCard: (cardID: string) =>
    set(({ lists }) => {
      if (cardID) {
        const parentList = lists.map((list) => {
          const card = list.cards.find(({ id }) => id === cardID);
          const updatedCardList = list.cards.filter(({ id }) => id !== cardID);
          if (card) {
            return {
              ...list,
              cards: updatedCardList,
            };
          }

          return list;
        });
        return {
          lists: parentList,
        };
      }
    }),
  resetList: () =>
    set(() => ({
      lists: [],
    })),
}));

useStore.subscribe(({ lists }) => {
  localStorage.setItem("lists", JSON.stringify(lists));
});

export default useStore;
