import Menuitem from "./Menuitem";
import './Menu.css';

export default function Menu() {
    return (
        <>
        <nav>
            <Menuitem route='/' display="Home" />
            <Menuitem route='/user/list' display="User" />
            <Menuitem route='/about' display="About" />
            <Menuitem route='/login' display="Login" />
        </nav>
        </>
    );
}