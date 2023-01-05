import { useEffect, useState } from "react";
import getTypeEvents from "../services/getTypeEvents";

export function useTypeEvents1() {
  const [typeEvents1, setTypeEvents1] = useState([]);
  //console.log("USEtypeEventss");
  //console.log("GETtypeEventss", getTypeEvents());

  useEffect(
    function () {
      let options = [];
      getTypeEvents().then((typeEvent) => {
        //console.log("typeEventss", typeEvent);
        typeEvent.forEach((option) => {
          let row = {};
          row.value = option.id;
          row.label = " " + option.id + " " + option.description;
          options.push(row);
        });
        //console.log("Options", options);
        setTypeEvents1(options);
      });
    },
    [setTypeEvents1]
  );
  return { typeEvents1 };
}
