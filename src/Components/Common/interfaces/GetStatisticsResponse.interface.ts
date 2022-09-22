import { Politician } from "./Politician.interface";

export interface GetStatisticsResponse {
  top10: Politician[];
  statistics: {
    avg: number;
    median: number;
  };
}
