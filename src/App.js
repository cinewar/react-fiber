import logo from "./logo.svg";
import "./App.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/three";

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  return (
    <orbitControls
      autoRotate={true}
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      ref={orbitRef}
      args={[camera, gl.domElement]}
    />
  );
};

const Box = () => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray",
  });
  return (
    <animated.mesh
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={props.scale}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <animated.meshBasicMaterial attach="material" color={props.color} />
    </animated.mesh>
  );
};

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas>
        <Controls />
        <Box />
      </Canvas>
    </div>
  );
}

export default App;
