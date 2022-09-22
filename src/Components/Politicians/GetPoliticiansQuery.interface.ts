export interface GetPoliticiansQuery{
    page?: number;
    take?: number;
    fullName?: string;
    gender?: string;
    party?: string;
    order?: string;
}