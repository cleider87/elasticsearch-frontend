import { Politician } from "./Politician.interface";

export interface PoliticianRow extends Politician{
    n: number;
    key: string | undefined;
}