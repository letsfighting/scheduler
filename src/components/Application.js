import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index.js";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  //const setDays = (days) => setState((prev) => ({ ...prev, days }));

  const bookInterview = (id, interview) => {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interivew: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState((prev) => ({ ...prev, appointments }));
  };

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appMapped = dailyAppointments.map((appointment) => {
    console.log("dailyapp: ", dailyAppointments);
    console.log("state: ", state);
    //return <Appointment key={appointment.id} {...appointment} />;

    const interview = getInterview(state, appointment.interview);
    console.log("interview: ", interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
      />
    );
  });

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
