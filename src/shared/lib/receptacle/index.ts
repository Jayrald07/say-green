import { createReceptacleLocation, deleteReceptacleLocation } from "@app/graphql/mutations";
import { getReceptacleLocation } from "@app/graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

export const getReceptacles = async () => {
  const { data } = await client.graphql({
    query: getReceptacleLocation,
  });

  if (!data.getReceptacleLocation?.data) {
    return;
  }

  const receptacles: { longitude: number; latitude: number }[] = JSON.parse(data.getReceptacleLocation.data);

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

  const receptacle: { longitude: number; latitude: number } = JSON.parse(data.createReceptacleLocation.data);

  return receptacle;
};
