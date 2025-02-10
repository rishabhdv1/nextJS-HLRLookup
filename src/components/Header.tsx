import React from "react";

interface HeaderProps {
    scrollToPricing?: () => void;
    buttons?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({scrollToPricing, buttons}) => {
  return (
    <header className="bg-white border-bottom">
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <a href="https://oceanpbx.club/" target="_blank" className="navbar-brand">
                    <img className="img-fluid custom-logo" src="https://oceanpbx.club/assets/img/logo.png" alt="Logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="me-auto mb-2 mb-lg-0">
                    </div>
                    <form className="d-flex float-end">
                        {scrollToPricing && (
                            <button type="button" className="btn btn-outline-primary me-2" onClick={scrollToPricing}>
                                Pricing
                            </button>
                        )}
                        {buttons}
                    </form>
                </div>
            </div>
        </nav>
    </header>
  );
};

export default Header;
