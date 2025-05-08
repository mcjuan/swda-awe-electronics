import { User } from "lucide-react";
import "./App.css";

function Header() {
    return (
        <header className="header">
            <span className="header-title">AWE Electronics</span>
            <button className="header-user-btn" aria-label="User">
                <User size={24} />
            </button>
        </header>
    );
}

export default Header;
