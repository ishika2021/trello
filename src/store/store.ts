import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Store {
  lists: List[];
  newInput: {
    id: string | null;
    type: string;
  };
  updateList: (list:List[]) => void;
  addNewInput: (id: string, type: string) => void;
  resetNewInput: () => void;
  addCard: (listID: string, title: string) => void;
  addList: (title: string) => void;
}

const getLocalStorageData = () => {
  const data = localStorage.getItem("lists");
  if(!data){
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
    ]
  }
  
  return JSON.parse(data)
}

const useStore = create<Store>((set)=>({
    lists: getLocalStorageData(),
    newInput: {
      id: "",
      type: "",
    },
    
    updateList : (list:List[]) => set(()=> ({
      lists:list
    })),
  
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
          id: '',
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
        
        const updatedList = lists.map((list)=>{
          if(list.id === listID){
            return{
              ...list,
              cards:[...list.cards,obj]
            }
          }
          return list
        })

        return {
          lists: updatedList
        }
      }),
      addList: (title:string) => set(({lists})=>{
        if (title === "") {
          title = "Untitled List";
        }
        const obj = {
          id: uuidv4(),
          title,
          cards:[]
        };
        const updatedList = [...lists,obj]
        return {
          lists:updatedList
        }
      }),
      deleteList: (listID:string) => set(({lists})=>{
        const updatedList = lists.filter(({id})=>id !== listID);
        return {
          lists: updatedList
        }
      })
  }));
  
  useStore.subscribe(
    ({lists}) => {
      console.log("LIST IS UPDATED!!!!!!!")
      localStorage.setItem("lists",JSON.stringify(lists));
    }
  )

export default useStore;
