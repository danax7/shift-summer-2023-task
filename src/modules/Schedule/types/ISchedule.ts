export interface ISchedule {
  success: true;
  reason: "string";
  schedules: [
    {
      date: "string";
      seances: [
        {
          time: "string";
          hall: {
            name: "red";
            places: [null];
          };
          payedTickets: [
            {
              filmId: "string";
              row: 1;
              column: 1;
              seance: {
                date: "19.06.23";
                time: "21:57";
              };
              phone: "89990009999";
            }
          ];
        }
      ];
    }
  ];
}
