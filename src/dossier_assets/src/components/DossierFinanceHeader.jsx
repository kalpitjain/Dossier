import React from "react";
import { Link } from "react-router-dom";

function DossierFinanceHeader(props) {
  return (
    <nav className="navbar header dossierFinance-header">
      <div className="container-fluid">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 className="dossierFinance-heading">Dossier Finance</h1>
        </Link>
        <h6>Connected Account: {props.userPrincipal}</h6>
        <h6>
          Funds: {props.userFunds} {props.tokenSymbol}
        </h6>
      </div>
    </nav>
  );
}
export default DossierFinanceHeader;
