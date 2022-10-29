import React, { useState } from "react";
import {
  // dossier,
  canisterId,
  createActor,
} from "../../../declarations/dossier";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  const initialMessage = "Claim Tokens to " + props.userPrincipal;
  const [isDisabled, setDisabled] = useState(false);
  const [messageText, setMessageText] = useState(initialMessage);

  async function handleClick(event) {
    setDisabled(true);

    // Live Network
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const result = await authenticatedCanister.payOut();

    // // Local Network
    // const result = await dossier.payOut();
    setMessageText(result);
  }

  return (
    <div className="faucet blocks">
      <h1 className="dossierFinanceBlockHeading">Faucet</h1>

      <h6>Get your free Dossier tokens here !</h6>
      <h6>{messageText}</h6>

      <button
        disabled={isDisabled}
        className="btn btn-dark"
        id="btn-payout"
        onClick={handleClick}
      >
        Get {props.tokenSymbol}
      </button>
    </div>
  );
}

export default Faucet;
