import React from "react";

function DossierFooter() {
  const year = new Date().getFullYear();
  return (
    <div id="footer">
      <footer>
        <p>Copyright ⓒ KJ {year}</p>
      </footer>
    </div>
  );
}

export default DossierFooter;
