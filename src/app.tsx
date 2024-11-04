import { CSSProperties } from "react";
import { Link, Outlet } from "react-router-dom";
import routers from "./routers";

// Styles for the layout
const navbarStyle: CSSProperties = {
  height: "100vh",
  width: "200px",
  position: "fixed",
  paddingTop: "20px",
  backgroundColor: "#777",
};

const headerStyle: CSSProperties = {
  color: "#fff",
  textAlign: "center",
  fontSize: "2rem",
};

const listStyle: CSSProperties = {
  listStyleType: "none",
  padding: 0,
  marginTop: "1rem",
};

const listItemStyle: CSSProperties = {
  padding: "10px",
  textAlign: "center",
  color: "#fff",
};

const contentStyle: CSSProperties = {
  marginLeft: "200px",
  padding: "20px",
  width: "100%",
};

const linkStyle: CSSProperties = {
  textDecoration: "none",
  color: "white",
  fontSize: "1.5rem",
};

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <nav style={navbarStyle}>
        <h2 style={headerStyle}>Exemplos</h2>
        <ul style={listStyle}>
          {routers.map(({ path }) => (
            <li key={path} style={listItemStyle}>
              <Link style={linkStyle} to={path!}>
                {path?.replace("/", "")}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main style={contentStyle}>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
