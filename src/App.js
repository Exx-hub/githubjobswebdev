import React, { useState } from "react";

import { useFetchJobs } from "./useFetchJobs";

import { Container } from "react-bootstrap";
import Jobs from "./Jobs";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";

function App() {
  const [params, setParams] = useState({});
  console.log("params:", params);

  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const handleChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    const isChecked = e.target.checked;

    setPage(1);

    if (param === "full_time") {
      setParams((prevParams) => {
        return { ...prevParams, [param]: isChecked };
      });
    } else {
      setParams((prevParams) => {
        return { ...prevParams, [param]: value };
      });
    }
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      <SearchForm params={params} handleChange={handleChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error! Please refresh page.</h1>}
      {jobs.map((job) => {
        return <Jobs key={job.id} job={job} />;
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
