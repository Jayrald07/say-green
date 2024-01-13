import { createReceptacleLocation, deleteReceptacleLocation } from "@/graphql/mutations";
import { getReceptacleLocation } from "@/graphql/queries";
import { LatLng } from "@/types/declarations";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

export const getReceptacles = async () => {
  const { data } = await client.graphql({
    query: getReceptacleLocation,
  });

  if (!data.getReceptacleLocation?.data) {
    return;
  }

  const receptacles: LatLng[] = JSON.parse(data.getReceptacleLocation.data);

  return receptacles;
};

export const deleteReceptacle = async (hash: string) => {
  const { data } = await client.graphql({
    query: deleteReceptacleLocation,
    variables: {
      hash,
    },
  });

  return data.deleteReceptacleLocation;
};

export const createReceptacle = async (longitude: number, latitude: number) => {
  const { data } = await client.graphql({
    query: createReceptacleLocation,
    variables: {
      longitude,
      latitude,
    },
  });

  if (!data.createReceptacleLocation.data) {
    return;
  }

  const receptacle: LatLng = JSON.parse(data.createReceptacleLocation.data);

  return receptacle;
};
