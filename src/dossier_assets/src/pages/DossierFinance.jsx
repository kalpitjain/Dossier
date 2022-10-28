import React, { useState } from "react";
import Header from "../components/Header";
import Faucet from "../components/Faucet";
import Balance from "../components/Balance";
import Transfer from "../components/Transfer";
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
    <div className="container-fluid" id="screen">
      <Header
        heading={"Dossier Finance"}
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
        tokenSymbol={tokenSymbol}
        headingRedirectLink={"/"}
      />
      <div className="row">
        <div className="col-lg-12 set-border">
          <Faucet
            userPrincipal={props.loggedInPrincipal}
            tokenSymbol={tokenSymbol}
          />
        </div>
        <div className="col-lg-12 set-border">
          <Balance tokenSymbol={tokenSymbol} />
        </div>
        <div className="col-lg-12 set-border">
          <Transfer />
        </div>
      </div>
    </div>
  );
}

export default DossierFinance;
