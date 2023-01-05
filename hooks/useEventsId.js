import { useEffect, useState } from "react";
import getEventsId from "../services/getEventsId";

export function useEventsId(id) {
  const [eventsId, setEventsId] = useState([]);
  useEffect(() => {
    let options = [];
    //console.log("ID", id);
    const getEvents = async () => {
      getEventsId(id).then((typeEvent) => {
        typeEvent.forEach((option) => {
          let row = {};
          if (option.id == 3) row.selected = true;
          row.value = option.id;
          row.label = option.id + " " + option.description;
          options.push(row);
        });
        //rconsole.log("OptionsEventsSelect2", options);
        setEventsId(options);
      });
    };
    getEvents();
  }, [id, setEventsId]);
  return { eventsId };
}
