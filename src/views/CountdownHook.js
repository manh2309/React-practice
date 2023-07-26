import { useState, useEffect } from "react";
const CDHook = () => {
  const [timeCD, setTimeCD] = useState(10);

  useEffect(() => {
    if (timeCD === 0) {
      return;
    }
    let timer = setInterval(() => {
      setTimeCD(timeCD - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeCD]);
  return <>{timeCD === 0 ? <div>TimeUp!! Hook</div> : <div>{timeCD}</div>}</>;
};
export default CDHook;
