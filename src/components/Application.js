import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index.js";
import getAppointmentsForDay from "helpers/selectors.js";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });
  //const setDays = (days) => setState((prev) => ({ ...prev, days }));
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appMapped = dailyAppointments.map((appointment) => {
    console.log("dailyapp: ", dailyAppointments);
    return <Appointment key={appointment.id} {...appointment} />;
  });

  useEffect(() => {
    const testURL = `/api/days`;
    Promise.all([axios.get("/api/days"), axios.get("/api/appointments")]).then(
      (all) => {
        console.log("first: ", all[0]); // first
        console.log("ssecond: ", all[1]); // second
        console.log(all); // second
        setState((prev) => ({
          ...prev,
          days: all[0]["data"],
          appointments: all[1]["data"],
        }));
      }
    );
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appMapped}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
