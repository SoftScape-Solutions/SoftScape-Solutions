import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useMobileMenu } from "../../hooks/common";
import { cn } from "../../utils/helpers";

const Layout = ({
  children,
  showNavigation = true,
  showFooter = true,
  logoClassName = "logo-text",
  className = "",
}) => {
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();

  return (
    <div className={cn("relative", className)}>
      {showNavigation && (
        <Navigation
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          logoClassName={logoClassName}
        />
      )}

      <main className={showNavigation ? "pt-16" : ""}>{children}</main>

      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
