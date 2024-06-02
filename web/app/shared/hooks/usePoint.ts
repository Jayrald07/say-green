import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "@app/amplifyconfiguration.json";
import { createPoint } from "@app/graphql/mutations";
import { useToast } from "@app/shared/components/ui/use-toast";
import { getPoints } from "@app/graphql/queries";

Amplify.configure(config);

const client = generateClient();

const usePoint = () => {
  const { toast } = useToast();

  const handleCreatePoint = async (latitude: number, longitude: number) => {
    try {
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
      });
      return result.data.createPoint;
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Create Point",
        description: e.message,
        duration: 2000,
      });
    }
  };

  const handleGetPoints = async (latitude: number, longitude: number) => {
    try {
      const result = await client.graphql({
        query: getPoints,
        variables: {
          radius: 100,
          latitude,
          longitude,
        },
      });

      return result.data.getPoints;
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Create Point",
        description: e.message,
        duration: 2000,
      });
    }
  };

  return {
    createPoint: handleCreatePoint,
    getPoints: handleGetPoints,
  };
};

export default usePoint;
