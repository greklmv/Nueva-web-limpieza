export enum TrainStatus {
  PENDING = 'Pending',
  VALIDATED = 'Validated'
}

export interface Train {
  id: string;
  name: string; // e.g. "112-05"
  taskType: string; // e.g. "Fondo", "Rodadura"
  status: TrainStatus;
}

export interface ValidationFormState {
  actualTask: string;
  staff: string[];
  startTime: string;
  endTime: string;
  hasIncident: boolean;
  incidentDescription: string;
}

export const TASK_OPTIONS = [
  "Fondo",
  "Rodadura",
  "Limpieza",
  "Revisión",
  "Mecánica",
  "Eléctrica"
];
