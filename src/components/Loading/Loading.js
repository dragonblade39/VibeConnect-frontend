import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

function Loading() {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const json = await response.json();
        console.log(json);
        setData(json);
        setDone(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDone(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="loadingBody">
      <ReactLoading type={"bars"} color={"#75006f"} height={100} width={100} />
    </div>
  );
}

export default Loading;
