declare global {
  interface Card {
    id?: string;
    title: string;
    desc: string;
    createdOn?: string;
    dueDate: string;
  }

  interface List {
    id: string;
    title: string;
    cards: Card[];
  }
}

export {};
