import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const DrawingApp = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = '#000';

    return () => {
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600}></canvas>;
};

export default DrawingApp;
