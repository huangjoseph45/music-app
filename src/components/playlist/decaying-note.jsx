import { useEffect, useState } from "react";

const DecayingNote = ({ note }) => {
  return (
    <div className="decaying-note-wrapper">
      {<div className={`decaying-note`}>{note}</div>}
    </div>
  );
};

export default DecayingNote;
