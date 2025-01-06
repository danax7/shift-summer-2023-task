import { ScheduleItem, Seance } from "./types/ISchedule";
import { useEffect, useState } from "react";
import s from "./Schedule.module.scss";
import axios from "axios";
import { url } from "../MovieList/constants/requestUrl";
import SeatMatrix from "./components/SeatMatrix/Seatmatrix";
import { IMovie } from "../MovieList/components/MovieCard/types/IMovie";

const Schedule = (props: { filmId: string | undefined; film: IMovie }) => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSeance, setSelectedSeance] = useState<Seance | null>(null);

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const response = await axios.get(
          url + `/cinema/film/${props.filmId}/schedule`
        );
        const schedules = response.data.schedules;
        //console.log(schedules);
        if (schedules.length > 0) {
          const sortedSchedules = schedules.map(
            (scheduleItem: { seances: Seance[] }) => ({
              ...scheduleItem,
              seances: sortSeancesByTime(scheduleItem.seances),
            })
          );
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

    const selectedSchedule = schedule.find((item) => item.date === date);

    if (selectedSchedule && selectedSchedule.seances.length > 0) {
      const sortedSeances = sortSeancesByTime(selectedSchedule.seances);
      setSelectedSeance(sortedSeances[0]);
    } else {
      setSelectedSeance(null);
    }
  };

  const handleSeanceClick = (seance: Seance) => {
    setSelectedSeance(seance);
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

  if (!selectedDate) {
    return <div>No schedule available for the selected date.</div>;
  }

  const selectedSchedule = schedule.find((item) => item.date === selectedDate);

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
          <div
            key={`${seance.time}-${seance.hall.name}`}
            onClick={() => handleSeanceClick(seance)}
            className={s.SeanceItem}
          >
            <p
              className={`${s.SeanceTime} ${s[`Hall_${seance.hall.name}`]} ${
                selectedSeance === seance ? s.ActiveSeance : ""
              }`}
            >
              {seance.time}
            </p>
            {/* <p>Зал: {seance.hall.name}</p> */}
          </div>
        ))}
      </div>

      {selectedSeance && (
        <SeatMatrix
          seance={selectedSeance}
          film={props.film}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default Schedule;
