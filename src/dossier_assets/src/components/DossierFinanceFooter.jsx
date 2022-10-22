import React from "react";

function DossierFinanceFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="dossierFinance-footer">
      <p>Copyright ⓒ KJ {year}</p>
    </footer>
  );
}

export default DossierFinanceFooter;
