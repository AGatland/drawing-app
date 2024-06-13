import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { ActionIcon, ColorInput, Container, Slider } from '@mantine/core';
import { IconCircleFilled, IconDownload, IconTrash, IconUpload } from '@tabler/icons-react';

const defaultCanvas = {
  brushSize: 5,
  brushColor: "#000",
  backgroundColor: "#fff"
}

const DrawingApp = () => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);


  const [canvasSettings, setCanvasSettings] = useState(defaultCanvas);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current);
    fabricCanvas.backgroundColor = defaultCanvas.backgroundColor;
    fabricCanvas.isDrawingMode = true;
    fabricCanvas.freeDrawingBrush.width = defaultCanvas.brushSize;
    fabricCanvas.freeDrawingBrush.color = defaultCanvas.brushColor;

    setCanvas(fabricCanvas);
    return () => {
      fabricCanvas.dispose();
    }
  }, []);

  const handleBrushSizeChange = (value) => {
    canvas.freeDrawingBrush.width = value;
    setCanvasSettings({ ...canvasSettings, brushSize: value });
  }

  const handleBrushColorChange = (value) => {
    canvas.freeDrawingBrush.color = value;
    setCanvasSettings({ ...canvasSettings, brushColor: value });
  }

  const handleBackgroundColorChange = (value) => {
    canvas.backgroundColor = value;
    setCanvasSettings({ ...canvasSettings, backgroundColor: value });
  }

  const handleDownload = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0
      });

      const link = document.createElement('a')
      link.href = dataURL;
      link.download = 'canvas-image.png';
      link.click();
    }
  };

  const handleUpload = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0
      });
      console.log("HEYO")
    }
  };

  return (
    <Container pt={100}>
      <div style={{ backgroundColor: canvasSettings.backgroundColor }}>
        <canvas ref={canvasRef} height={600} width={928}></canvas>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "1%", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2%", flexGrow: 1 }}>
          <div>
            <label>Brush Size</label>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <IconCircleFilled size={15} />
              <Slider
                w={100}
                value={canvasSettings.brushSize}
                min={1}
                max={30}
                onChange={handleBrushSizeChange}
              />
              <IconCircleFilled size={25} />
            </div>
          </div>
          <div>
            <ColorInput
              label="Brush Color"
              value={canvasSettings.brushColor}
              onChange={handleBrushColorChange}
            />
          </div>
          <div>
            <ColorInput
              label="Background Color"
              value={canvasSettings.backgroundColor}
              onChange={handleBackgroundColorChange}
            />
          </div>
        </div>
        <ActionIcon size={"xl"} onClick={handleUpload}>
          <IconUpload size={30} />
        </ActionIcon>
        <ActionIcon size={"xl"} onClick={handleDownload}>
          <IconDownload size={30} />
        </ActionIcon>
        <ActionIcon size={"xl"} onClick={() => canvas.clear()}>
          <IconTrash size={30} />
        </ActionIcon>
      </div>
    </Container>
  );
};

export default DrawingApp;
