export const addPlayerBorder = (x: number, y: number, playerColor: string) => {
  const clickedDot = document.getElementById(`${x}${y}`);
  const oldBorders = clickedDot?.style.boxShadow;
  let oldBordersArray: string[] = [];

  if (oldBorders) {
    const re = /(?=(rgb))/;
    oldBordersArray = oldBorders.split(re);
    oldBordersArray.filter((element) => element !== "rgb");
  }
  const newBorder = `${playerColor} 0px 0px 0px ${
    3 * ((oldBordersArray?.length || 0) + 1)
  }px`;
  const borders: string[] = [...(oldBordersArray || []), newBorder];
  return clickedDot
    ? (clickedDot.style.boxShadow = `${borders.join(",")}`)
    : null;
};
