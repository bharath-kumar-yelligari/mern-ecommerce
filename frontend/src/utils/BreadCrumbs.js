import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav style={styles.breadcrumbs}>
      <Link to="/" style={styles.link}>Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={routeTo}>
            {/* <FaChevronRight style={styles.icon} /> */}
            <span style={styles.icon}>/</span>
            {isLast ? (
              <span style={styles.active}>{decodeURIComponent(name)}</span>
            ) : (
              <Link to={routeTo} style={styles.link}>{decodeURIComponent(name)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

const styles = {
  // breadcrumbs: { padding: "10px 0 0 10px", fontSize: "16px", display: "flex", alignItems: "center" },
  breadcrumbs: {
    border: "1px solid #ddd",
    padding: "2px",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    margin: "10px 0px 0px 10px",
    width: "fit-content"
  },
  link: { textDecoration: "none", color: "#007bff", marginRight: "5px" },
  active: { fontWeight: "bold", color: "#000", marginRight: "10px" },
  icon: { marginRight: "5px", color: "#aaa" },
};

export default Breadcrumbs;
