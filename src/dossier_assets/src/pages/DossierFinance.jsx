import React, { useState } from "react";
import DossierFinanceHeader from "../components/DossierFinanceHeader";
import Faucet from "../components/Faucet";
import Balance from "../components/Balance";
import Transfer from "../components/Transfer";
import DossierFinanceFooter from "../components/DossierFinanceFooter";
import { dossier } from "../../../declarations/dossier";
import { Principal } from "@dfinity/principal";

function DossierFinance(props) {
  const [balanceResult, setBalanceResult] = useState("0");
  const [tokenSymbol, setTokenSymbol] = useState("");

  async function getData() {
    const balance = await dossier.balanceOf(
      Principal.fromText(props.loggedInPrincipal)
    );
    setTokenSymbol(await dossier.getSymbol());
    setBalanceResult(balance.toLocaleString());
  }

  getData();

  return (
    <div className="container-fluid dossierFinance-body" id="screen">
      <DossierFinanceHeader
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
        tokenSymbol={tokenSymbol}
      />
      <div className="row">
        <div className="col-lg-6 set-border">
          <Faucet
            userPrincipal={props.loggedInPrincipal}
            tokenSymbol={tokenSymbol}
          />
        </div>
        <div className="col-lg-6 set-border">
          <Balance tokenSymbol={tokenSymbol} />
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
