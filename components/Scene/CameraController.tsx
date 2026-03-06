import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useAppStore } from '../../store';

// Smooth interpolation factor
const LERP_FACTOR = 0.05;

export const CameraController: React.FC = () => {
  const { cameraState } = useAppStore();
  const { camera, mouse } = useThree();
  
  // Refs to hold target vectors to avoid re-creation on every frame
  const vecPosition = useRef(new Vector3());
  const vecTarget = useRef(new Vector3());

  useFrame((state) => {
    // 1. Interpolate Camera Position
    vecPosition.current.set(...cameraState.position);
    
    // Add slight mouse parallax for "immersive" feel
    const parallaxX = mouse.x * 0.5;
    const parallaxY = mouse.y * 0.5;
    
    state.camera.position.lerp(
      new Vector3(
        vecPosition.current.x + parallaxX, 
        vecPosition.current.y + parallaxY, 
        vecPosition.current.z
      ),
      LERP_FACTOR
    );

    // 2. Interpolate Camera LookAt
    vecTarget.current.set(...cameraState.target);
    // We can't directly lerp the lookAt vector easily without a controls library, 
    // but OrbitControls usually takes over. 
    // Since we are doing a custom rig, we update the camera quaternion to look at the target.
    
    // Create a dummy vector for the current lookAt target interpolation
    // A simpler approach for cinematic moves: just move the camera and let it look at a fixed point 
    // or interpolate the point it looks at.
    
    state.camera.lookAt(vecTarget.current);
    state.camera.updateProjectionMatrix();
  });

  return null;
};