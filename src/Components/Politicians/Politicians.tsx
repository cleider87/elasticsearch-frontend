import { useEffect, useState } from "react";
import { GetPoliticianResponse } from "../Common/interfaces/GetPoliticianResponse.interface";
import { Politician } from "../Common/interfaces/Politician.interface";
import { PoliticianRow } from "../Common/interfaces/PoliticianRow.interface";
import PoliticiansSearchBar from "./Components/PoliticiansSearchBar";
import PoliticiansTable from "./Components/PoliticiansTable";
import { getPoliticians } from "../Common/services/Politicians.API";

function Politicians() {
  const [loaded, setLoaded] = useState(false);
  const [politicians, setPoliticians] = useState([] as PoliticianRow[]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState({
    gender: undefined,
    partyFilter: undefined,
    fullName: undefined,
  });

  useEffect(() => {
    if (!loaded) {
      const party = searchQuery.partyFilter;

      getPoliticians({
        page,
        take: pageSize,
        party: `${party}`.length < 3 ? undefined : party,
        gender: searchQuery.gender,
        fullName: searchQuery.fullName,
      }).then((response: GetPoliticianResponse) => {
        const politicians = response.data.map((item: Politician, i: number) => {
          return {
            key: item.id,
            n: i + 1 + response.meta.take * (response.meta.page - 1),
            ...item,
          };
        });
        setPoliticians(politicians);
        setTotal(response.meta.itemCount);
        setLoaded(true);
      }).catch(e=>{
        console.log(e.message)
        console.log("TODO: manage this")
      });
    }
  });

  return (
    <div>
      <PoliticiansSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchHandler={() => {
          setPage(1);
          setLoaded(false);
        }}
      />
      <PoliticiansTable
        page={page}
        pageSize={pageSize}
        politicians={politicians}
        total={total}
        setPage={setPage}
        setPageSize={setPageSize}
        setLoaded={setLoaded}
      />
    </div>
  );
}

export default Politicians;
