import React, { useEffect, useState } from "react";
import DossierHeader from "../components/DossierHeader";
import DossierFooter from "../components/DossierFooter";
import Log from "../components/Log";
import CreateArea from "../components/CreateArea";
import { dossier } from "../../../declarations/dossier";
import { Principal } from "@dfinity/principal";

//
// import { idlFactory } from "../../../declarations/dossierFinance";
// import { Actor, HttpAgent } from "@dfinity/agent";
// import { Principal } from "@dfinity/principal";
//

function Dossier(props) {
  const [logs, setLogs] = useState([]);
  const [balanceResult, setBalanceResult] = useState("0");

  async function getBalance() {
    const balance = await dossier.balanceOf(
      Principal.fromText(props.loggedInPrincipal)
    );

    setBalanceResult(balance.toLocaleString());
  }

  getBalance();

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

  // const localHost = "http://localhost:8080/";
  // const agent = new HttpAgent({ host: localHost });
  // async function getData() {
  //   const dossierFinanceActor = await Actor.createActor(idlFactory, {
  //     agent,
  //     canisterId: Principal.fromText("kvl3e-4yaaa-aaaap-aam5a-cai"),
  //   });

  //   const result = await dossierFinanceActor.payOut();
  //   console.log(result);
  // }

  return (
    <div>
      <DossierHeader
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
      />
      <CreateArea
        onAdd={addLog}
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
      />
      {logs.map((logItem, index) => {
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
          />
        );
      })}
      <DossierFooter />
    </div>
  );
}

export default Dossier;
