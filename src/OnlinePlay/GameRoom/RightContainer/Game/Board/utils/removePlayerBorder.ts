export const removePlayerBorder = (x: number, y: number) => {
  const oldDot = document.getElementById(`${x}${y}`);

  const bordersOnOldDot = oldDot?.style.boxShadow;

  if (bordersOnOldDot) {
    const re = /(?=(rgb))/;
    let oldBordersArray: string[] = bordersOnOldDot.split(re);
    oldBordersArray.shift();
    oldBordersArray.filter((element) => element !== "rgb");
    oldDot!.style.boxShadow = `${oldBordersArray.join(",")}`;
  }
};

/**
 * FIX THIS REGEX WHEN YOU GET A CHANGE... KIND OF A DIRTY WAY TO DO IT.
 */
