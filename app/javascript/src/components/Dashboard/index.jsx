import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import Container from "components/Container";
import ListPolls from "components/Polls/ListPolls";
import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";

const Dashboard = ({ isLoggedIn }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const destroyPoll = async id => {
    try {
      await pollsApi.destroy(id);
      await fetchPolls();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(polls)) {
    return (
      <Container>
        <h1 className="text-xl leading-5 text-center">No Polls Yet 😔</h1>
      </Container>
    );
  }

  return (
    <Container>
      <ListPolls
        isLoggedIn={isLoggedIn}
        data={polls}
        destroyPoll={destroyPoll}
      />
    </Container>
  );
};

export default Dashboard;
