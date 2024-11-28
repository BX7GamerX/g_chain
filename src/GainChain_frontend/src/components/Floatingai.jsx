import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import neuralImage from "../images/neuro.png"; // Replace with your neural network image

// Spinning 3D Sphere Component
const RotatingSphere = () => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4f46e5" metalness={0.7} roughness={0.2} />
    </mesh>
  );
};

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chatbot"); // Redirect to chatbot page
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Styled Attention Grabber Message */}
      <motion.div
  className="absolute bottom-20 right-0 bg-white text-gray-800 text-base font-semibold py-2 px-8 rounded-lg shadow-lg flex items-center gap-3"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: [0, 1, 0], y: [10, 0, 10] }}
  transition={{ repeat: Infinity, duration: 3 }}
>
  {/* Sparkles Container */}
  <div className="relative">
    {/* Purple Sparkles */}
    <div className="absolute -top-2 -left-2 w-2 h-2 bg-purple-500 rounded-full shadow-lg animate-ping" />
    <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-lg animate-pulse" />
    <div className="absolute bottom-0 left-0 w-2 h-2 bg-purple-300 rounded-full shadow-md animate-bounce" />
    {/* Chat Icon */}
    <span className="text-purple-600 text-lg">💬</span>
  </div>

  {/* Chat Message */}
  <span>
    Need Help? <span className="text-purple-600">Chat with our AI g-bot!</span>
  </span>
</motion.div>


      {/* Floating Button */}
      <motion.div
        className="group w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center cursor-pointer relative overflow-hidden"
        whileHover={{
          scale: 1.2,
          rotate: 10,
          boxShadow: "0px 0px 15px rgba(79,70,229,0.6)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={handleClick}
        title="Chat with AI"
      >
        {/* Neural Network Image */}
        <img
          src={neuralImage}
          alt="Neuro Icon"
          className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
        />

        {/* 3D Rotating Sphere */}
        <div className="absolute inset-0 -z-10">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <RotatingSphere />
          </Canvas>
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingButton;
