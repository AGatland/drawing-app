import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { ActionIcon, ColorInput, Container, Slider } from '@mantine/core';
import { IconCircleFilled, IconTrash } from '@tabler/icons-react';

const defaultCanvas = {
  brushSize: 5,
  brushColor: "#000",
  backgroundColor: "#fff"
}

const DrawingApp = () => {
  const [canvas, setCanvas] = useState(null)
  const canvasRef = useRef(canvas)

  const [canvasSettings, setCanvasSettings] = useState(defaultCanvas)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current)
    canvas.backgroundColor = defaultCanvas.backgroundColor
    canvas.isDrawingMode = true
    canvas.freeDrawingBrush.width = defaultCanvas.brushSize
    canvas.freeDrawingBrush.color = defaultCanvas.brushColor

    setCanvas(canvas)
    return () => {
      canvas.dispose()
    }
  }, [])

  const handleBrushSizeChange = (value) => {
    canvas.freeDrawingBrush.width = value
    setCanvasSettings({ ...canvasSettings, brushSize: value})
  }

  const handleBrushColorChange = (value) => {
    canvas.freeDrawingBrush.color = value
    setCanvasSettings({ ...canvasSettings, brushColor: value})
  }

  const handleBackgroundColorChange = (value) => {
    canvas.backgroundColor = value
    setCanvasSettings({ ...canvasSettings, backgroundColor: value})
  }


  return (
    <Container pt={100}>
      <div style={{backgroundColor: canvasSettings.backgroundColor}}>
        <canvas ref={canvasRef} height={600} width={928}></canvas>
      </div>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "2%", flexGrow: 1}}>
          <div>
            <label>Brush Size</label>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <IconCircleFilled size={15}/>
              <Slider
                w={100}
                value={canvasSettings.brushSize}
                min={1}
                max={30}
                onChange={handleBrushSizeChange}
              />
              <IconCircleFilled size={25}/>
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
        <ActionIcon size={"xl"} onClick={() => canvas.clear()}>
          <IconTrash size={30}/>
        </ActionIcon>
      </div>
    </Container>

);
};

export default DrawingApp;
