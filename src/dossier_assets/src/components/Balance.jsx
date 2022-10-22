import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { dossier } from "../../../declarations/dossier";

function Balance() {
  const [inputValue, setInputValue] = useState("");
  const [balanceResult, setBalanceResult] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await dossier.balanceOf(principal);
    setBalanceResult(balance.toLocaleString());
    setTokenSymbol(await dossier.getSymbol());
    setHidden(false);
    setInputValue("");
  }

  return (
    <div className="balance">
      <h1 className="dossierFinance-heading">Check Token Balance</h1>
      <input
        id="balance-principal-id"
        type="text"
        placeholder="  Enter Principal ID"
        spellCheck="false"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button className="btn" id="btn-request-balance" onClick={handleClick}>
        Check Balance
      </button>
      <h6 hidden={isHidden}>
        This account has a balance of {balanceResult} {tokenSymbol}.
      </h6>
    </div>
  );
}

export default Balance;
