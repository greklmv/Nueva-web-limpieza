import { Train, TrainStatus } from "./types";

export const MOCK_TRAINS: Train[] = [
  { id: "1", name: "112-05", taskType: "Fondo", status: TrainStatus.PENDING },
  { id: "2", name: "114-22", taskType: "Rodadura", status: TrainStatus.VALIDATED },
  { id: "3", name: "108-01", taskType: "Limpieza", status: TrainStatus.PENDING },
  { id: "4", name: "120-15", taskType: "Revisión", status: TrainStatus.PENDING },
  { id: "5", name: "119-33", taskType: "Fondo", status: TrainStatus.PENDING },
  { id: "6", name: "105-09", taskType: "Mecánica", status: TrainStatus.PENDING },
  { id: "7", name: "116-41", taskType: "Eléctrica", status: TrainStatus.PENDING },
  { id: "8", name: "132-02", taskType: "Fondo", status: TrainStatus.VALIDATED },
];

export const CURRENT_USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuDetnhyGIMgzWmVsSZ0P8G2qI6CtxiTbzYQHuo3PvW4JLJTgtVlOuvooHjR79vHdFz9hbOVU2akaEvw2qn9neK8aU0JRwGm1Mag9T2ysICaxCC1HWJKMiT3g1tqPY2et2PibP_sh8cvMVDRxrY7lvNPEMjrAm3iWJMiGWV1qmoO6Zmoy7bdBU_HI16camFf_Fam95UI-BBFur4me_zDwvMJXtK5Uj8HK7gCBwpbRGNI5RScqFl3tsBQdTcjWPVxe965KDLkNkiXaxo";
