import { LatLng } from "@app/types/declarations";
import { useState } from "react";
import { createReceptacle, deleteReceptacle, getReceptacles } from "..";

export const useReceptacles = () => {
  const [receptacles, setReceptacles] = useState<LatLng[]>([]);

  const getReceptacleBy = (hash: string) => {
    const receptacle = receptacles.find(({ hash: currentHash }) => {
      return hash == currentHash;
    });

    return receptacle;
  };

  const handleGetReceptacles = async () => {
    const foundReceptacles = await getReceptacles();

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

  return {
    receptacles,
    getReceptacles: handleGetReceptacles,
    createReceptacle: handleCreateReceptacle,
    deleteReceptacle: handleDeleteReceptacle,
    getReceptacleBy,
  };
};
