export const removePlayerBorder = (x: number, y: number) => {
  const oldDot = document.getElementById(`${x}${y}`);

  const bordersOnOldDot = oldDot?.style.boxShadow;

  if (bordersOnOldDot) {
    let oldBordersArray: string[] = bordersOnOldDot.split(", rgb");
    oldBordersArray.shift();
    const newBorders = oldBordersArray.reduce((output, element, index) => {
      if (index === 0) {
        return `rgb${element}`;
      }
      return `${output}, rgb${element}`;
    }, "");

    oldDot!.style.boxShadow = newBorders;
  }
};
