export interface ISchedule {
  success: boolean;
  reason: string;
  schedules: ScheduleItem[];
}

export interface ScheduleItem {
  date: string;
  seances: Seance[];
}

export interface Seance {
  time: string;
  hall: Hall;
  payedTickets: PayedTicket[];
}

export interface Hall {
  name: string;
  places: null[][];
}

export interface PayedTicket {
  filmId: string;
  row: number;
  column: number;
  seance: SeanceDetails;
  phone: string;
}

export interface SeanceDetails {
  date: string;
  time: string;
}
