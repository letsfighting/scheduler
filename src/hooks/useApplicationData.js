import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    //console.log("bookInterview appointment: ", appointment);

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //console.log("bookInterview appointments: ", appointments);

    return axios
      .put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then((resp) => {
        console.log("resp: ", resp);
        if (resp.status === 204) {
          setState({
            ...state,
            appointments,
          });
        }
      });
  };

  const deleteAppointment = (id) => {
    return axios.delete(`/api/appointments/${id}`);
  };

  useEffect(() => {
    const testURL = `/api/days`;
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log("first: ", all[0]); // first
      console.log("ssecond: ", all[1]); // second
      console.log("third ", all[2]); // second
      setState((prev) => ({
        ...prev,
        days: all[0]["data"],
        appointments: all[1]["data"],
        interviewers: all[2]["data"],
      }));
    });
  }, []);

  return { state, setDay, bookInterview, deleteAppointment };
}

// export default function useApplicationData(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   function transition(newMode, replace = false) {
//     if (replace) {
//       history.pop();
//       setHistory(history);
//       setHistory((history) => [...history, newMode]);
//       setMode(newMode);
//     } else {
//       setHistory((history) => [...history, newMode]);
//       console.log("trans history: ", history);
//       setMode(newMode);
//     }
//   }

//   function back() {
//     if (history.length > 1) {
//       history.pop();
//       setMode(history.slice(-1)[0]);
//       setHistory(history);
//     }
//   }

//   return { mode, transition, back };
// }
