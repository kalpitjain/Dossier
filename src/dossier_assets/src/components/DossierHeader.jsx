import React from "react";
import { Link } from "react-router-dom";

function DossierHeader(props) {
  return (
    <nav className="navbar header dossier-header">
      <div className="container-fluid">
        <Link
          to="/DossierFinance"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h1>Dossier</h1>
        </Link>

        <h6>Connected Account: {props.userPrincipal}</h6>
        <h6>
          Funds: {props.userFunds} {props.tokenSymbol}
        </h6>
      </div>
    </nav>
  );
}
export default DossierHeader;
