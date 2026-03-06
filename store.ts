import { create } from 'zustand';
import { AppRoute, CameraState } from './types';

interface AppState {
  currentRoute: AppRoute;
  cameraState: CameraState;
  setRoute: (route: AppRoute) => void;
  setCameraPosition: (position: [number, number, number]) => void;
}

// Define camera presets for each route
const CAMERA_PRESETS: Record<AppRoute, CameraState> = {
  [AppRoute.HOME]: {
    position: [0, 0, 6],
    target: [0, 0, 0],
  },
  [AppRoute.JOURNEY]: {
    position: [0, 0, 14], // Optimal distance to frame card (left) and skills (right)
    target: [0, 0, 0],
  },
  [AppRoute.PORTFOLIO]: {
    position: [-4, 1, 4],
    target: [-1, 0, 0],
  },
  [AppRoute.STORE]: {
    position: [4, 2, 4],
    target: [1, 0, 0],
  },
  [AppRoute.BOOKING]: {
    position: [0, 4, 2],
    target: [0, 1, 0],
  },
  [AppRoute.CONTACT]: {
    position: [3, 0, 6], // Moved to right to look towards left-center
    target: [0, 0, 0],
  },
};

export const useAppStore = create<AppState>((set) => ({
  currentRoute: AppRoute.HOME,
  cameraState: CAMERA_PRESETS[AppRoute.HOME],
  setRoute: (route) =>
    set({
      currentRoute: route,
      cameraState: CAMERA_PRESETS[route],
    }),
  setCameraPosition: (pos) =>
    set((state) => ({
      cameraState: { ...state.cameraState, position: pos },
    })),
}));