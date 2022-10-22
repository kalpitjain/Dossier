import React from "react";
import DossierFinanceHeader from "../components/DossierFinanceHeader";
import Faucet from "../components/Faucet";
import Balance from "../components/Balance";
import Transfer from "../components/Transfer";
import DossierFinanceFooter from "../components/DossierFinanceFooter";

function DossierFinance(props) {
  return (
    <div className="container-fluid dossierFinance-body" id="screen">
      <DossierFinanceHeader />
      <div className="row">
        <div className="col-lg-6 set-border">
          <Faucet userPrincipal={props.loggedInPrincipal} />
        </div>
        <div className="col-lg-6 set-border">
          <Balance />
        </div>
        <div className="col set-border">
          <Transfer />
        </div>
      </div>
      <DossierFinanceFooter />
    </div>
  );
}

export default DossierFinance;
