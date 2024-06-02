import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@app/shared/store";
import { setCoordinate } from "@app/shared/store/features/map-slice";

const useMap = () => {
  const { latitude, longitude } = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();

  const handleSetCoordinate = (lat: number, lng: number) => {
    dispatch(
      setCoordinate({
        latitude: latitude > 0 ? 0 : lat,
        longitude: longitude > 0 ? 0 : lng,
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
