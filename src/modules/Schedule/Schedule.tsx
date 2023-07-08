import { ISchedule } from "./types/ISchedule";
import React, { useEffect, useState } from "react";
import s from "./Schedule.module.scss";

const Schedule: React.FC<{ schedule: ISchedule[] }> = ({ schedule }) => {
  return (
    <div className={s.Schedule}>
      <h3>Расписание сеансов</h3>
      {schedule.map((scheduleItem) => (
        <div key={scheduleItem.date}>
          <h4>Дата: {scheduleItem.date}</h4>
          {scheduleItem.seances.map((seance) => (
            <div key={seance.time}>
              <p>Время: {seance.time}</p>
              <p>Зал: {seance.hall.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
