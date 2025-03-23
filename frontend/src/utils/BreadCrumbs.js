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
            <FaChevronRight style={styles.icon} />
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
  breadcrumbs: { padding: "10px 0", fontSize: "16px", display: "flex", alignItems: "center" },
  link: { textDecoration: "none", color: "#007bff", marginRight: "10px" },
  active: { fontWeight: "bold", color: "#000", marginRight: "10px" },
  icon: { marginRight: "10px", color: "#aaa" },
};

export default Breadcrumbs;
