import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@app/shared/store";
import { setCoordinate } from "@app/shared/store/features/map-slice";
import mapboxgl from "mapbox-gl";
import { useContext } from "react";
import { MapContext } from "@app/features/main-panel/contexts/map-context";

const useMap = () => {
  const { latitude, longitude } = useSelector((state: RootState) => state.map);
  const { map } = useContext(MapContext);
  const dispatch = useDispatch();

  const handleSetCoordinate = (lat: number, lng: number) => {
    dispatch(
      setCoordinate({
        latitude: latitude > 0 ? 0 : lat,
        longitude: longitude > 0 ? 0 : lng,
      }),
    );
  };

  const handleAddMarker = (lat: number, lng: number) => {
    if (!map) {
      return null;
    }

    const marker = new mapboxgl.Marker()
      .setLngLat({
        lat,
        lng,
      })
      .addTo(map);

    marker.getElement().classList.add("cursor-pointer");

    return marker;
  };

  return {
    latitude,
    longitude,
    setCoordinate: handleSetCoordinate,
    addMarker: handleAddMarker,

    // value to check if the map is currently focusing on certain point
    isFocused: latitude > 0 && longitude > 0,
  };
};

export default useMap;
