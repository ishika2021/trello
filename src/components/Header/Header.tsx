import {Button} from "../../components";

const Header = () => {
  
    const handleReset = () => {
      console.log("handle-reset!")
    }
    return(
        <div className="header-wrapper">
           <h1 className="logo">
              Trello
           </h1>
           <Button label="Reset" action={handleReset} />
        </div>
    )
}

export default Header;