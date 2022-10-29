import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Log from "../components/Log";
import CreateArea from "../components/CreateArea";
import { dossier } from "../../../declarations/dossier";
import { Principal } from "@dfinity/principal";

function Dossier(props) {
  const [logs, setLogs] = useState([]);
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

  function addLog(newLog) {
    setLogs((prevLogs) => {
      dossier.createLog(newLog.title, newLog.content, newLog.time, newLog.date);
      return [newLog, ...prevLogs];
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const logArray = await dossier.readLogs();
    setLogs(logArray);
  }

  function deleteLog(id) {
    dossier.removeLog(id);
    setLogs((prevLogs) => {
      return prevLogs.filter((logItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header
        heading={"Dossier"}
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
        tokenSymbol={tokenSymbol}
        headingRedirectLink={"/DossierFinance"}
        accountRedirectLink={"/DossierAccount"}
      />
      <CreateArea
        onAdd={addLog}
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
        tokenSymbol={tokenSymbol}
      />
      {logs.map((logItem, index) => {
        if (index % 4 === 0) {
          return (
            <Log
              key={index}
              id={index}
              title={logItem.title}
              content={logItem.content}
              time={logItem.time}
              date={logItem.date}
              onDelete={deleteLog}
              userPrincipal={props.loggedInPrincipal}
              userFunds={balanceResult}
              backgroundColour={"#ff7c65"}
            />
          );
        } else if (index % 4 === 1) {
          return (
            <Log
              key={index}
              id={index}
              title={logItem.title}
              content={logItem.content}
              time={logItem.time}
              date={logItem.date}
              onDelete={deleteLog}
              userPrincipal={props.loggedInPrincipal}
              userFunds={balanceResult}
              backgroundColour={"#ffe065"}
            />
          );
        } else if (index % 4 === 2) {
          return (
            <Log
              key={index}
              id={index}
              title={logItem.title}
              content={logItem.content}
              time={logItem.time}
              date={logItem.date}
              onDelete={deleteLog}
              userPrincipal={props.loggedInPrincipal}
              userFunds={balanceResult}
              backgroundColour={"#72ee72"}
            />
          );
        } else {
          return (
            <Log
              key={index}
              id={index}
              title={logItem.title}
              content={logItem.content}
              time={logItem.time}
              date={logItem.date}
              onDelete={deleteLog}
              userPrincipal={props.loggedInPrincipal}
              userFunds={balanceResult}
              backgroundColour={"#94d1ff"}
            />
          );
        }
      })}
    </div>
  );
}

export default Dossier;
