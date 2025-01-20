import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
  Preload,
  Box,
} from '@react-three/drei';
// react-router의 미니멈 버전
import { useRoute, useLocation } from 'wouter';
import { easing, geometry } from 'maath';
import { suspend } from 'suspend-react';

extend(geometry);
declare module '@react-three/fiber' {
  interface ThreeElements {
    roundedPlaneGeometry: {
      args?: ConstructorParameters<typeof THREE.PlaneGeometry>;
    };
  }
}

const regular = import('@pmndrs/assets/fonts/inter_regular.woff');

const medium = import('@pmndrs/assets/fonts/inter_medium.woff');

type FrameProps = {
  id: string;
  name: string;
  author: string;
  bg: string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
};
import React from 'react';

export const Portal: React.FC = () => {
  return (
    <Canvas
      flat
      camera={{ fov: 75, position: [0, 0, 20] }}
      eventSource={document.getElementById('root') as HTMLElement}
      eventPrefix="client"
    >
      <color attach="background" args={['#f0f0f0']} />
      <Frame
        id="01"
        name={`pick\nles`}
        author="Omar Faruq Tawsif"
        bg="#e4cdac"
        position={[-1.15, 0, 0]}
        rotation={[0, 0.5, 0]}
      >
        <Gltf
          src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb"
          scale={8}
          position={[0, -0.7, -2]}
        />
        <Box scale={0.2} position={[0, -0.7, -2]}></Box>
      </Frame>
      <Frame id="02" name="tea" author="Omar Faruq Tawsif" bg="black">
        <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} />
      </Frame>
      <Frame
        id="03"
        name="still"
        author="Omar Faruq Tawsif"
        bg="#d1d1ca"
        position={[1.15, 0, 0]}
        rotation={[0, -0.5, 0]}
      >
        <Gltf
          src="still_life_based_on_heathers_artwork-transformed.glb"
          scale={2}
          position={[0, -0.8, -3]}
        />
      </Frame>
      <Rig />
      <Preload all />
    </Canvas>
  );
};

const Frame: React.FC<FrameProps> = ({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  ...props
}) => {
  const portal = useRef(null);
  const [, setLocation] = useLocation();
  const [, params] = useRoute<{ id: string }>('/item/:id');
  const [hovered, hover] = useState(false);

  useCursor(hovered);

  useFrame((state, dt) => {
    if (portal.current) {
      easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt);
    }
  });

  return (
    <group {...props}>
      <Text
        font={(suspend(medium) as { default: string }).default}
        fontSize={0.3}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <Text
        font={(suspend(regular) as { default: string }).default}
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <Text
        font={(suspend(regular) as { default: string }).default}
        fontSize={0.04}
        anchorX="right"
        position={[0.0, -0.677, 0.01]}
        material-toneMapped={false}
      >
        {author}
      </Text>
      <mesh
        name={id}
        onDoubleClick={(e) => {
          e.stopPropagation();
          setLocation('/item/' + e.object.name);
        }}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        {/* 포탈 기능을 가능하게 해주는 컴퍼넌트 drei 구현 */}
        <MeshPortalMaterial
          ref={portal}
          events={params?.id === id}
          side={THREE.DoubleSide}
        >
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
};

type RigProps = {
  position?: THREE.Vector3;
  focus?: THREE.Vector3;
};

const Rig: React.FC<RigProps> = ({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) => {
  const { controls, scene } = useThree();
  const [, params] = useRoute<{ id: string }>('/item/:id');

  useEffect(() => {
    const active = scene.getObjectByName(params?.id || '');
    if (active) {
      active.parent?.localToWorld(position.set(0, 0.5, 0.25));
      active.parent?.localToWorld(focus.set(0, 0, -2));
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  }, [controls, params, position, focus, scene]);

  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
};
