/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 model.glb --transform --types
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import model from "./assets/model-transformed.glb";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(model) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.base} />
    </group>
  );
}

useGLTF.preload(model);