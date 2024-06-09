import { generateClient } from "aws-amplify/api";
import { createPoint } from "@app/graphql/mutations";
import { useToast } from "@app/shared/components/ui/use-toast";
import { getPoints } from "@app/graphql/queries";
import { useState } from "react";
import { LatLng, LatLngLiteral } from "leaflet";

const client = generateClient();

const usePoint = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCreatePoint = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);

      const result = await client.graphql({
        query: createPoint,
        variables: {
          latitude,
          longitude,
        },
      });

      toast({
        title: "Create Point",
        description: "Receptacle plotted successfully",
        duration: 2000,
        variant: "default",
      });
      return result.data.createPoint;
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: "Create Point",
          description: e.message,
          duration: 2000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetPoints = async (latitude: number, longitude: number, radius: number = 10000) => {
    try {
      const result = await client.graphql({
        query: getPoints,
        variables: {
          radius,
          latitude,
          longitude,
        },
      });

      const points = result.data.getPoints;

      if (!points?.data) {
        return;
      }

      const parsedPoints = JSON.parse(points.data);

      const coordinates: LatLngLiteral[] = [];

      for (const point of parsedPoints) {
        const coordinate = JSON.parse(point.geoJson);
        const lat = coordinate.Coordinates[1];
        const lng = coordinate.Coordinates[0];

        coordinates.push({
          lat,
          lng,
        });
      }

      return coordinates;
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: "Create Point",
          description: e.message,
          duration: 2000,
        });
      }
    }
  };

  return {
    createPoint: handleCreatePoint,
    getPoints: handleGetPoints,
    loading,
  };
};

export default usePoint;
