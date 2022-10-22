import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dossier from "./pages/Dossier";
import DossierFinance from "./pages/DossierFinance";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Dossier />} />
      <Route path="/DossierFinance" element={<DossierFinance />} />
    </Routes>
  </Router>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./components/App";
// import { AuthClient } from "@dfinity/auth-client";

// const init = async () => {
//   const authClient = await AuthClient.create();

//   if (await authClient.isAuthenticated()) {
//     handleAuthenticated(authClient);
//   } else {
//     await authClient.login({
//       identityProvider: "https://identity.ic0.app/#authorize",
//       onSuccess: () => {
//         handleAuthenticated(authClient);
//       },
//     });
//   }
// };

// async function handleAuthenticated(authClient) {
//   const identity = await authClient.getIdentity();
//   const userPrincipal = identity._principal.toString();

//   const root = ReactDOM.createRoot(document.getElementById("root"));
//   root.render(<App loggedInPrincipal={userPrincipal} />);
// }

// init();
