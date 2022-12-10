import { Link, NavLink } from "react-router-dom";
import Logo from "../images/logo-dark.webp";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-6">
            <li className="nav-item">
              <NavLink className="nav-link " to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/movies">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/tv">
                Tv shows
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/people">
                People
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/about">
                About
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-6 d-flex justify-content-between">
            <form className="d-none d-md-block col-4">
              <input
                className="form-control"
                type="text"
                placeholder="Search"
              />
            </form>
            <div className="social-and-links d-flex justify-content-between col-8">
              <div className="social-links d-flex align-items-center mx-3 d-none d-md-flex col-4">
                <i className="fa-brands fa-facebook fa-xl ms-3"></i>
                <i className="fa-brands fa-spotify fa-xl ms-3"></i>
                <i className="fa-brands fa-instagram fa-xl ms-3"></i>
                <i className="fa-brands fa-youtube fa-xl ms-3"></i>
              </div>
              <ul className="navbar-nav col-sm-8 col-lg-6 d-flex justify-content-start">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Sign up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Sign in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
