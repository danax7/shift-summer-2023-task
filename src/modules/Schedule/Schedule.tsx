import { ScheduleItem, Seance } from "./types/ISchedule";
import { useEffect, useState } from "react";
import s from "./Schedule.module.scss";
import axios from "axios";
import { url } from "../MovieList/constants/requestUrl";

const Schedule = (props: { filmId: string | undefined }) => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
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
          const sortedSchedules = schedules.map((scheduleItem) => ({
            ...scheduleItem,
            seances: sortSeancesByTime(scheduleItem.seances),
          }));

          setSchedule(sortedSchedules);
          setSelectedDate(sortedSchedules[0].date);
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

  const sortSeancesByTime = (seances: Seance[]) => {
    return seances.sort((a, b) => {
      const timeA = a.time.split(":");
      const timeB = b.time.split(":");
      const hourA = parseInt(timeA[0]);
      const hourB = parseInt(timeB[0]);
      const minuteA = parseInt(timeA[1]);
      const minuteB = parseInt(timeB[1]);

      if (hourA === hourB) {
        return minuteA - minuteB;
      } else {
        return hourA - hourB;
      }
    });
  };

  if (schedule.length === 0) {
    return <div>Loading...</div>;
  }

  if (!selectedSchedule) {
    return <div>No schedule available for the selected date.</div>;
  }

  return (
    <div className={s.Schedule}>
      <h3 className={s.Title}>Расписание</h3>
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
      <div className={s.ScheduleTime}>
        {selectedSchedule?.seances.map((seance) => (
          <div key={`${seance.time}-${seance.hall.name}`}>
            <p className={s.SeanceTime__Hall}>{seance.time}</p>
            <p>Зал: {seance.hall.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
