import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCoordinate } from "../store/features/map-slice";

const useMap = () => {
  const { latitude, longitude } = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();

  const handleSetCoordinate = (latitude: number, longitude: number) => {
    dispatch(
      setCoordinate({
        latitude,
        longitude,
      }),
    );
  };

  return {
    latitude,
    longitude,
    setCoordinate: handleSetCoordinate,
  };
};

export default useMap;
