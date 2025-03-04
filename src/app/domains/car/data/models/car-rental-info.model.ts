export interface CarRentalInfo {
  id: number; // carId
  make?: string;
  model?: string;
  totalSeats?: number;
  automaticTransmission?: boolean;
  rented?: boolean;
  totalKilometersDriven?: number;
  customerId?: number;
  customerName?: string;
}
