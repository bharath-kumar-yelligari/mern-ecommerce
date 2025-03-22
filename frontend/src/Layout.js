import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const Layout = () => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user is at the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setIsBottom(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet /> {/* This renders the current route */}
      </main>

      {/* Footer is always there but sticks to bottom if content is short */}
      <div className={isBottom ? "" : "mt-auto"}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
