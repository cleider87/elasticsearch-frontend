import axios from "axios";
import { GetPoliticianResponse } from "../interfaces/GetPoliticianResponse.interface";
import { GetPoliticiansQuery } from "../../Politicians/GetPoliticiansQuery.interface";
import { Politician } from "../interfaces/Politician.interface";

const baseURL = process.env.API || "http://localhost:3001";

export function getPoliticians(
  query: GetPoliticiansQuery
): Promise<GetPoliticianResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `/api/politicians?` +
          Object.entries(query)
            .map(([key, value]) => (value ? key + "=" + value : null))
            .filter(Boolean)
            .join("&"),
        {
          baseURL,
        }
      )
      .then((result) => resolve(result.data as GetPoliticianResponse))
      .catch((e) => {
        reject(new Error(`API error:${e}`));
      });
  });
}

export function getPoliticianById(id: string): Promise<Politician> {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/politicians/${id}`, {
        baseURL: "http://localhost:3001",
      })
      .then((result) => resolve(result.data as Politician))
      .catch((e) => {
        reject(new Error(`API error:${e}`));
      });
  });
}

export function deletePoliticianById(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/politicians/${id}`, {
        baseURL,
      })
      .then((result) => resolve(result.data))
      .catch((e) => {
        reject(new Error(`API error:${e}`));
      });
  });
}

export function uploadPoliticiansData(formData: FormData): Promise<any> {
  return new Promise((resolve) => {
    console.log(formData)
    axios
      .post(
        `/api/bulk`,
        formData,
        {
          baseURL,
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((result) => resolve(result.data))
      .catch(e=>{
        console.log(e.message)
        console.log("TODO: manage this")
      });
  });
}

export function updatePoliticianById(
  id: string,
  politician: Partial<Politician>
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/api/politicians/${id}`, politician, {
        baseURL,
      })
      .then((result) => resolve(result.data))
      .catch((e) => {
        reject(new Error(`API error:${e}`));
      });
  });
}

export function getStatistics(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/statistics`, {
        baseURL,
      })
      .then((result) => resolve(result.data));
  });
}

export function getParties(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/statistics/parties`, {
        baseURL,
      })
      .then((result) =>
        resolve(result.data.map((party: { key: string }) => party.key))
      )
      .catch((e) => {
        reject(new Error(`API error:${e}`));
      });
  });
}
