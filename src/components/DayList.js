import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const map = props.days.map((dayObj) => {
    return (
      <DayListItem
        key={dayObj.id}
        name={dayObj.name}
        spots={dayObj.spots}
        selected={dayObj.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{map}</ul>;
}
