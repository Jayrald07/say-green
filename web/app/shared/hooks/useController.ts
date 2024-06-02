import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Controller } from "../types";
import { setController } from "../store/features/map-controller-slice";

const useController = () => {
  const { controller } = useSelector((state: RootState) => state.controller);
  const dispatch = useDispatch();

  return {
    controller,
    setController: (controller: Controller) => {
      dispatch(setController(controller));
    },
  };
};

export default useController;
