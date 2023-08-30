interface Seance {
  date: string;
  time: string;
}

interface Ticket {
  filmId: string;
  row: number;
  column: number;
  seance: Seance;
  phone: string;
}

interface Order {
  filmId: string;
  orderNumber: number;
  tickets: Ticket[];
  phone: string;
  status: string;
}

interface ApiResponse {
  success: boolean;
  reason: string;
  orders: Order[];
}
