import { ReactNode, forwardRef } from "react";

type CardListProps = {
  children: ReactNode;
};

const CardList = forwardRef<HTMLDivElement, CardListProps>(
  ({ children }, ref) => {
    return (
      <div className="all-card-wrapper" ref={ref}>
        {children}
      </div>
    );
  }
);

export default CardList;
