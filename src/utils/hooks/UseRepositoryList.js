import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import query from "../graphql/query";

const useRepositories = () => {
  const [fetchRepositories, { loading, data: repositories, error }] =
    useLazyQuery(query.getAllRepository, {
      fetchPolicy: "cache-and-network",
    });
  useEffect(() => {
    fetchRepositories();
  }, []);
  return { repositories, loading, refetch: fetchRepositories, error };
};

export default useRepositories;
