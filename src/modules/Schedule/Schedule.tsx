import { ISchedule } from "./types/ISchedule";
import React, { useEffect, useState } from "react";
import s from "./Schedule.module.scss";

interface TimelineProps {
  schedule: ISchedule[];
  selectedDate: string;
}

const Schedule: React.FC<TimelineProps> = ({ schedule, selectedDate }) => {
  const selectedSchedule = schedule.find((item) => item.date === selectedDate);

  if (!selectedSchedule) {
    return <div>No schedule available for the selected date.</div>;
  }

  return (
    <div className={s.Schedule}>
      <h3 className={s.Title}>Расписание сеансов</h3>
      <div>
        <h4>Дата: {selectedSchedule.date}</h4>
        {selectedSchedule.seances.map((seance) => (
          <div key={`${seance.time}-${seance.hall.name}`}>
            <p>Время: {seance.time}</p>
            <p>Зал: {seance.hall.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
