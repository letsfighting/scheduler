import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index.js";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  // }
  const { state, setDay, bookInterview, deleteAppointment } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appMapped = dailyAppointments.map((appointment) => {
    //console.log("dailyapp: ", dailyAppointments);
    //console.log("state: ", state);
    //return <Appointment key={appointment.id} {...appointment} />;

    const interview = getInterview(state, appointment.interview);
    //console.log("interview: ", interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        deleteAppointment={deleteAppointment}
      />
    );
  });

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
