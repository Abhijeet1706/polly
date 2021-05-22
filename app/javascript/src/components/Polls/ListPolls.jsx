import React from "react";
import Table from "./Table";

const ListPolls = ({ data, destroyPoll, isLoggedIn }) => {
  return (
    <Table data={data} destroyPoll={destroyPoll} isLoggedIn={isLoggedIn} />
  );
};

export default ListPolls;
