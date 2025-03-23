import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/home" style={styles.button}>Go Back Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "10%",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "5rem",
    color: "#ff4757",
  },
  message: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  button: {
    textDecoration: "none",
    backgroundColor: "#333",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "1.2rem",
  },
};

export default NotFound;
