import React from "react";
import { Link } from "react-router-dom";

function DossierFinanceHeader() {
  return (
    <nav className="navbar header">
      <div className="container-fluid">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 className="dossierFinance-heading">Dossier Finance</h1>
        </Link>
      </div>
    </nav>
  );
}
export default DossierFinanceHeader;
