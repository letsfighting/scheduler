function getAppointmentsForDay(state, day) {
  const stepOne = () => {
    for (const eachDay of state["days"]) {
      if (eachDay["name"] === day) {
        return eachDay.appointments;
      }
    }
  };

  const resStepOne = stepOne();
  let appArray = [];

  if (resStepOne !== undefined) {
    for (const app of resStepOne) {
      if (state["appointments"][app]) {
        appArray.push(state["appointments"][app]);
      }
    }
  }

  console.log("final array: ", appArray);
  return appArray;
}

function getInterview(state, interview) {
  console.log("int state: ", state);
  console.log("int int: ", interview);

  if (!interview) {
    return null;
  } else {
    const returnObj = {};
    const x = interview.interviewer;

    returnObj.student = interview.student;
    returnObj.interviewer = state["interviewers"][x];

    return returnObj;
  }
}

export { getAppointmentsForDay, getInterview };
