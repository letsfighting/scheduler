export default function getAppointmentsForDay(state, day) {
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
