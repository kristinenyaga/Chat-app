import Link from "next/link";

const Navbar = () => {
  const toggleTheme = (e) => {
    document.body.classList.toggle("dark");
  };
  return (
    <div className="parent_container">
      <nav id="navbar" className="navbar navbar-expand-sm fixed-top">
        <div className="container-fluid">
          <i className="fa-solid fa-paw nav_icons_color mx-3"></i>
          <a className="navbar-brand fw-bold" href="/">
            TWICHER
          </a>
          <ul className="navbar_nav nav_icons_color">
            <i
              id="toggle-theme"
              onClick={toggleTheme}
              className="fa-solid fa-moon"></i>
            <Link href="/profile.html">
              <i
                style={{ "font-size": "1rem" }}
                className="fa-solid fa-user card_avatar"></i>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
