import { faker } from "@faker-js/faker";
import { createReceptacle, deleteReceptacle, getReceptacles } from "..";
import { generateClient } from "aws-amplify/api";
import { renderHook, waitFor } from "@testing-library/react";
import { useReceptacles } from "../hooks/useReceptacle";

jest.mock("aws-amplify/api", () => ({
  generateClient: jest.fn().mockReturnValue({
    graphql: jest.fn(),
  }),
}));

describe("Tests receptacle service", () => {
  it("should create receptacle", async () => {
    const mockHash = faker.string.uuid();

    (generateClient().graphql as jest.Mock).mockResolvedValue({
      data: {
        createReceptacleLocation: {
          data: JSON.stringify({
            hash: mockHash,
          }),
        },
      },
    });

    const longitude = faker.location.longitude();
    const latitude = faker.location.latitude();

    const receptacle = await createReceptacle(longitude, latitude);

    expect(receptacle).toHaveProperty("hash");
    expect(receptacle?.hash).toMatch(
      RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$")
    );
  });

  it("should get receptacles that has items greater than 0", async () => {
    (generateClient().graphql as jest.Mock).mockResolvedValue({
      data: {
        getReceptacleLocation: {
          data: JSON.stringify(
            Array.from({
              length: faker.number.int({
                min: 1,
                max: 5,
              }),
            }).map(() => ({
              hash: faker.string.uuid(),
              longitude: faker.location.longitude(),
              latitude: faker.location.latitude(),
            }))
          ),
        },
      },
    });

    const receptacles = await getReceptacles();

    expect(receptacles?.length).toBeGreaterThan(0);
  });

  it("should delete specific receptacle", async () => {
    (generateClient().graphql as jest.Mock).mockResolvedValue({
      data: {
        deleteReceptacleLocation: {
          __typename: "ReceptacleLocationOutput",
          message: "Receptacle deleted",
          data: null,
        },
      },
    });

    const receptacle = await deleteReceptacle(faker.string.uuid());

    expect(receptacle.message).toEqual("Receptacle deleted");
  });
});

describe("Tests useReceptacle hook", () => {
  it("should populate receptacles when getReceptacles has been called", async () => {
    (generateClient().graphql as jest.Mock).mockResolvedValue({
      data: {
        getReceptacleLocation: {
          data: JSON.stringify(
            Array.from({
              length: faker.number.int({
                min: 1,
                max: 5,
              }),
            }).map(() => ({
              hash: faker.string.uuid(),
              longitude: faker.location.longitude(),
              latitude: faker.location.latitude(),
            }))
          ),
        },
      },
    });

    const { result } = renderHook(() => useReceptacles());

    await waitFor(async () => await result.current.getReceptacles());

    expect(result.current.receptacles.length).toBeGreaterThan(0);
  });

  it("should remove one receptacle from 5 receptacles", async () => {
    (generateClient().graphql as jest.Mock).mockResolvedValue({
      data: {
        getReceptacleLocation: {
          data: JSON.stringify(
            Array.from({
              length: 5,
            }).map(() => ({
              hash: faker.string.uuid(),
              longitude: faker.location.longitude(),
              latitude: faker.location.latitude(),
            }))
          ),
        },
      },
    });

    const { result } = renderHook(() => useReceptacles());

    await waitFor(async () => await result.current.getReceptacles());

    await waitFor(async () => await result.current.deleteReceptacle(result.current.receptacles[0].hash));

    expect(result.current.receptacles.length).toBe(4);
  });
});
