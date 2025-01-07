import { Header, Footer } from "../components";
import { Board } from "../views";

const RootLayout = () => {
    return(
        <div className="root-layout-wrapper">
        <Header/>
        <Board/>
        <Footer/>
        </div>
    )
}

export default RootLayout;