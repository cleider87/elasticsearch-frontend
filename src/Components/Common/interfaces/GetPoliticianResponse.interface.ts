import { Politician } from "./Politician.interface";

export interface GetPoliticianResponse {
  data: Politician[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
