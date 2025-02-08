import React from "react";

interface HeaderProps {
    scrollToPricing?: () => void;
    buttons?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({scrollToPricing, buttons}) => {
  return (
    <header className="bg-white border-bottom">
        <nav className="navbar">
            <div className="container">
                <a href="https://oceanpbx.club/" target="_blank" className="navbar-brand">
                    <img className="img-fluid custom-logo" src="https://oceanpbx.club/assets/img/logo.png" alt="Logo" />
                </a>
                <form className="d-flex">
                    {scrollToPricing && (
                        <button type="button" className="btn btn-outline-primary me-2" onClick={scrollToPricing}>
                            Pricing
                        </button>
                    )}
                    {buttons}
                </form>
            </div>
        </nav>
    </header>
  );
};

export default Header;
