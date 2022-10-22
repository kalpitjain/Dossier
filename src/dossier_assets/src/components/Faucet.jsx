import React, { useState } from "react";
import {
  // dossier,
  canisterId,
  createActor,
} from "../../../declarations/dossier";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  const initialMessage = "Claim 500 DOSS Token to " + props.userPrincipal;
  const [isDisabled, setDisabled] = useState(false);
  const [messageText, setMessageText] = useState(initialMessage);

  async function handleClick(event) {
    setDisabled(true);

    //Live Network
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
    <div className="faucet">
      <h1 className="dossierFinance-heading">Faucet</h1>

      <h6>Get your free Dossier tokens here!</h6>
      <h6>{messageText}!</h6>

      <button
        disabled={isDisabled}
        className="trade-buttons btn"
        id="btn-payout"
        onClick={handleClick}
      >
        Get DOSS
      </button>
    </div>
  );
}

export default Faucet;
