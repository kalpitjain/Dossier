import React, { useState } from "react";
import Header from "../components/Header";
import AccountDetails from "../components/AccountDetails";
import ActivityLogHeading from "../components/ActivityLogHeading";
import ActivityDescription from "../components/ActivityDescription";
import ActivityLog from "../components/ActivityLog";
import { dossier } from "../../../declarations/dossier";
import { Principal } from "@dfinity/principal";

function Dossier(props) {
  const [activityLogs, setActivityLogs] = useState([]);
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

  function addActivityLog(newActivityLog) {
    setActivityLogs((prevActivityLogs) => {
      return [activityLogs, ...prevActivityLogs];
    });
  }

  return (
    <div>
      <Header
        heading={"Dossier Account"}
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
        tokenSymbol={tokenSymbol}
        headingRedirectLink={"/"}
        accountRedirectLink={"/DossierAccount"}
      />
      <AccountDetails
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
        tokenSymbol={tokenSymbol}
      />
      <ActivityLogHeading />
      <ActivityDescription
        activity={"Activity"}
        amount={tokenSymbol}
        date={"Date"}
        time={"Time"}
      />
      <div className="scrollable">
        <ActivityLog
          activity={"Faucet"}
          amount={"+5000"}
          date={"2022-10-28"}
          time={"10:38:10"}
          backgroundColour={"#72ee72"}
        />
        <ActivityLog
          activity={"Balance Checked"}
          amount={"0"}
          date={"2022-10-28"}
          time={"10:38:10"}
          backgroundColour={"#ffe065"}
        />
        <ActivityLog
          activity={"Transferred Funds"}
          amount={"-50"}
          date={"2022-10-28"}
          time={"10:38:10"}
          backgroundColour={"#ff7c65"}
        />
        <ActivityLog
          activity={"Created Log"}
          amount={"-5"}
          date={"2022-10-28"}
          time={"10:38:10"}
          backgroundColour={"#94d1ff"}
        />
        <ActivityLog
          activity={"Deleted Log"}
          amount={"-1"}
          date={"2022-10-28"}
          time={"10:38:10"}
          backgroundColour={"#ffb1c4"}
        />
        <ActivityLog
          activity={"Faucet"}
          amount={"+5000"}
          date={"2022-10-28"}
          time={"10:38:10"}
          backgroundColour={"#72ee72;"}
        />
        <ActivityLog
          activity={"Balance Checked"}
          amount={"0"}
          date={"2022-10-28"}
          time={"10:38:10"}
          backgroundColour={"#ffe065"}
        />
        <ActivityLog
          activity={"Transferred Funds"}
          amount={"-50"}
          date={"2022-10-28"}
          time={"10:38:10"}
          backgroundColour={"#ff7c65"}
        />
        <ActivityLog
          activity={"Created Log"}
          amount={"-5"}
          date={"2022-10-28"}
          time={"10:38:10"}
          backgroundColour={"#94d1ff"}
        />
        <ActivityLog
          activity={"Deleted Log"}
          amount={"-1"}
          date={"2022-10-28"}
          time={"10:38:10"}
          backgroundColour={"#ffb1c4"}
        />
      </div>
    </div>
  );
}

export default Dossier;
