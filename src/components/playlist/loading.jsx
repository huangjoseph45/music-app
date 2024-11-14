import { useState, useEffect } from "react";

const Loading = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame < 3 ? prevFrame + 1 : 0));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wrapper">
      {frame === 0 && <p>Loading songs</p>}
      {frame === 1 && <p>Loading songs.</p>}
      {frame === 2 && <p>Loading songs..</p>}
      {frame === 3 && <p>Loading songs...</p>}
    </div>
  );
};
export default Loading;
