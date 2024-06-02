import { useState } from "react";
import { createReceptacle, deleteReceptacle, getReceptacles } from "../index";

export const useReceptacles = () => {
  const [receptacles, setReceptacles] = useState<{ hash: string; longitude: number; latitude: number }[]>([]);

  const getReceptacleBy = (hash: string) => {
    const receptacle = receptacles.find(({ hash: currentHash }) => {
      return hash == currentHash;
    });

    return receptacle;
  };

  const handleGetReceptacles = async () => {
    const foundReceptacles = await getReceptacles();

    console.log(foundReceptacles);

    if (!foundReceptacles) {
      return;
    }

    setReceptacles(foundReceptacles);
  };

  const handleCreateReceptacle = async (longitude: number, latitude: number) => {
    const receptacle = await createReceptacle(longitude, latitude);

    if (!receptacle) {
      return;
    }

    setReceptacles((prevState) => {
      if (prevState) {
        return [...prevState, { longitude, latitude, hash: receptacle.hash }];
      }

      return prevState;
    });

    return receptacle;
  };

  const handleDeleteReceptacle = async (hash: string) => {
    const deletedReceptacle = await deleteReceptacle(hash);

    setReceptacles((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return prevState?.filter(({ hash: prevHash }) => {
        return hash != prevHash;
      });
    });

    return deletedReceptacle;
  };

  const handleAppendReceptacle = (hash: string, longitude: number, latitude: number) => {
    const receptacle = {
      hash,
      longitude,
      latitude,
    };

    setReceptacles((prevReceptacles) => [...prevReceptacles, receptacle]);
  };

  return {
    receptacles,
    getReceptacleBy,
    getReceptacles: handleGetReceptacles,
    createReceptacle: handleCreateReceptacle,
    deleteReceptacle: handleDeleteReceptacle,
    appendReceptacle: handleAppendReceptacle,
  };
};
