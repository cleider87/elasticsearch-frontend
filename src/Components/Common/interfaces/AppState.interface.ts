import { PoliticianRow } from "./PoliticianRow.interface";

export interface AppState {
  politicians: PoliticianRow[];
  load: boolean;
  status: string;
  currentPolitician: null;
  tableParams: {
    sortOrder: string;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };
}
