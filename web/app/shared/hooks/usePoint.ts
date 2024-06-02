import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "@app/amplifyconfiguration.json";
import { createPoint } from "@app/graphql/mutations";
import { useToast } from "@app/shared/components/ui/use-toast";

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
        className: "dark:bg-gray-800",
        duration: 2000,
      });
      return result.data.createPoint;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    createPoint: handleCreatePoint,
  };
};

export default usePoint;
