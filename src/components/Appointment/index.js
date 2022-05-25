import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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

    // let promise = new Promise((resolve) => {
    //   setTimeout(function () {
    //     resolve(props.bookInterview(props.id, interview));
    //   }, 1000);
    // });

    // promise.then(function (data) {
    //   //console.log("data: ", data);
    //   transition(SHOW);
    // });

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const editSave = (name, interviewer) => {
    console.log("editsave function name: ", name);
    console.log("editsave function interviewer: ", interviewer);

    transition(SAVING);

    const interview = {
      student: name,
      interviewer,
    };

    // let promise = new Promise((resolve) => {
    //   setTimeout(function () {
    //     resolve(props.bookInterview(props.id, interview));
    //   }, 1000);
    // });

    // promise.then(function (data) {
    //   //console.log("data: ", data);
    //   transition(SHOW);
    // });

    props
      .editInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const deleteAppointment = (id) => {
    transition(DELETING, true);

    props
      .deleteAppointment(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const transitionToShow = () => {
    transition(SHOW);
  };

  const transitionToEdit = () => {
    transition(EDIT);
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
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        ></Show>
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={() => deleteAppointment(props.id)}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={editSave}
          student={props.interview ? props.interview.student : ""}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          onClose={() => transitionToEdit()}
          message="Error encountered while saving"
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          onClose={() => transitionToShow()}
          message="Error encountered while deleting"
        />
      )}
    </article>
  );
}
