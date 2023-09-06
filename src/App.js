import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./TableContainer";
import { SelectColumnFilter } from "./Filter";

import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // axios("http://api.tvmaze.com/search/shows?q=animals")
    //   .then((res) => {
    //     setData(res.data);
    //   })
    //   .catch((err) => console.log(err));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://api.tvmaze.com/search/shows?q=animals');
      setData(response.data);
    } catch (err) {
      const errorMessage = "Error: " + err.message;
      console.log(errorMessage);
    } finally {
      // handle your code if you want as it execute always
      console.log("finally")
    }
  }

  const columns = [
    {
      Header: "Animal Name",
      accessor: "show.name",
    },
    {
      Header: "Type",
      accessor: "show.type",
    },
    {
      Header: "Language",
      accessor: "show.language",
    },
    {
      Header: "Official Site",
      accessor: "show.officialSite",
      Cell: ({ cell: { value } }) =>
        value ? <a href={value}>{value}</a> : "-",
    },
    {
      Header: "Rating",
      accessor: "show.rating.average",
      Cell: ({ cell: { value } }) => value || "-",
    },
    {
      Header: "Status",
      accessor: "show.status",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
  ];

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
