import { useEffect, useState } from "react";

const useFetch = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    var responseClone; // 1
    fetch("services.json",{
      mode:"no-cors"
    })
      .then(function (response) {
        responseClone = response.clone(); // 2
        return response.json();
      })
      .then(
        function (data) {
          setServices(data)
        },
        function (rejectionReason) {
          // 3
          console.log(
            "Error parsing JSON from response:",
            rejectionReason,
            responseClone
          ); // 4
          responseClone
            .text() // 5
            .then(function (bodyText) {
              console.log(
                "Received the following instead of valid JSON:",
                bodyText
              ); // 6
            });
        }
      );
  }, []);
  return { services, setServices };
};

export default useFetch;
