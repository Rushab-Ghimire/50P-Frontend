export const getColorObject = (color) => {
  if (typeof color === "string") {
    return {
      type: "color",
      value: color,
    };
  }

  if (color.length === 1) {
    return {
      type: "color",
      value: color,
    };
  }

  return {
    type: "gradient",
    value: color,
  };
};

export const getBgColorStyle = ({ colors, gradientDir }) => {
  const colorObject = getColorObject(colors);
  if (!colorObject) return null;

  if (colorObject.type === "color") {
    return { backgroundColor: colorObject.value };
  } else if (colorObject.type === "gradient") {
    if (gradientDir)
      return {
        backgroundImage: `linear-gradient(${gradientDir}, ${
          Array.isArray(colorObject.value)
            ? colorObject.value.join()
            : colorObject.value
        })`,
      };
    return {
      backgroundImage: `linear-gradient(${
        Array.isArray(colorObject.value)
          ? colorObject.value.join()
          : colorObject.value
      })`,
    };
  }
};

export const getBgImageStyle = (imgSrc) => {
  return {
    background: `url(${imgSrc}) no-repeat center`,
    backgroundSize: "cover",
  };
};
