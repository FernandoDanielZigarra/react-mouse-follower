import { useEffect, useState, useRef } from "react";

function App() {
  const [enable, setEnable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef();
  useEffect(() => {
    console.log("efecto", enable);
    const handleMove = (e) => {
      const { clientX, clientY } = e;
      console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };
    if (enable) {
      window.addEventListener("pointermove", handleMove);
    }
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enable]);
  useEffect(() => {
    const valueRef = ref.current
    if (enable) {
      document.body.style.cursor = "none";
      if(valueRef) valueRef.style.cursor = "none";
    }

    return () => {
      document.body.style.cursor = "default";
      if(valueRef) valueRef.style.cursor = "default";
    };
  }, [enable]);
  return (
    <main>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid white",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <h3>Proyecto 3</h3>
      <button ref={ref} onClick={() => setEnable(!enable)}>
        {enable ? "Desactivar" : "Activar"}
      </button>
    </main>
  );
}

export default App;
