import { ISchedule } from "./types/ISchedule";
import { useEffect, useState } from "react";
import s from "./Schedule.module.scss";
import axios from "axios";
import { url } from "../MovieList/constants/requestUrl";

const Schedule = (props: { filmId: string | undefined }) => {
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const selectedSchedule = schedule.find((item) => item.date === selectedDate);

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const response = await axios.get(
          url + `/cinema/film/${props.filmId}/schedule`
        );
        const schedules = response.data.schedules;

        if (schedules.length > 0) {
          setSchedule(schedules);
          setSelectedDate(schedules[0].date);
        }
      } catch (error) {
        console.error("Ошибка при получении расписания сеансов:", error);
      }
    };

    getSchedule();
  }, [props.filmId]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  if (schedule.length === 0) {
    return <div>Loading...</div>;
  }

  if (!selectedSchedule) {
    return <div>No schedule available for the selected date.</div>;
  }

  return (
    <div className={s.Schedule}>
      <div className={s.Dates}>
        {schedule.map((scheduleItem) => (
          <button
            key={scheduleItem.date}
            onClick={() => handleDateClick(scheduleItem.date)}
            className={
              selectedDate === scheduleItem.date
                ? s.ActiveDate
                : s.NonActiveDate
            }
          >
            {scheduleItem.date}
          </button>
        ))}
      </div>
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
