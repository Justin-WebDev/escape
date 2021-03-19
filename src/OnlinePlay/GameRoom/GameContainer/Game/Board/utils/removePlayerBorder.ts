export const removePlayerBorder = (x: number, y: number) => {
  const oldDot = document.getElementById(`${x}${y}`);

  const bordersOnOldDot = oldDot?.style.boxShadow;

  if (bordersOnOldDot) {
    let oldBordersArray: string[] = bordersOnOldDot.split(", rgb");
    oldBordersArray.shift();
    // oldBordersArray.filter((element) => element !== "rgb");
    const newBorders = oldBordersArray.reduce((output, element, index) => {
      if (index === 0) {
        return `rgb${element}`;
      }
      return `${output}, rgb${element}`;
    }, "");
    // oldDot!.style.boxShadow = `${oldBordersArray.join(",")}`;
    oldDot!.style.boxShadow = newBorders;
  }
};

/**
 * FIX THIS REGEX WHEN YOU GET A CHANGE... KIND OF A DIRTY WAY TO DO IT.
 */
