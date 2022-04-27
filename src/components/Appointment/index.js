import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    console.log("save function name: ", name);
    console.log("save function interviewer: ", interviewer);

    transition(SAVING);

    const interview = {
      student: name,
      interviewer,
    };

    let promise = new Promise((resolve) => {
      setTimeout(function () {
        resolve(props.bookInterview(props.id, interview));
      }, 1000);
    });

    promise.then(function (data) {
      transition(SHOW);
    });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        ></Empty>
      )}
      {mode === SHOW && (
        <Show
          student={props.interview ? props.interview.student : ""}
          interviewer={props.interview ? props.interview.interviewer.name : ""}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        ></Show>
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
}
