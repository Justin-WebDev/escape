export const drawLine = (
  newX: number,
  newY: number,
  oldX: number,
  oldY: number,
  color: string
) => {
  let element = document.getElementById("mycanvas") as HTMLCanvasElement;
  let line = element.getContext("2d");
  line!.beginPath();
  line!.moveTo((oldX - 1) * 110 + 5, (oldY - 1) * 110 + 5);
  line!.lineTo((newX - 1) * 110 + 5, (newY - 1) * 110 + 5);
  line!.lineWidth = 5;
  line!.strokeStyle = color;
  line!.stroke();
};
