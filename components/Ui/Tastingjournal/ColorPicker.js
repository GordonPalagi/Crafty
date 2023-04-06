import { SwatchesPicker } from "react-color";

export default function ColorPicker() {
  const color = [
    ["#fee799", "#feda78", "#fccb59", "#fcc142", "#f7b324"],
    ["#f5a900", "#ef9e00", "#e69100", "#e38900", "#db7c01"],
    ["#d37401", "#cb6c00", "#c76206", "#bf5c00", "#b55200"],
    ["#b05000", "#ab4700", "#a24002", "#9c3900", "#922f00"],
    ["#8c2c01", "#842502", "#7f1f00", "#781b00", "#731b00"],
    ["#6c1700", "#670f01", "#630f01", "#5a0e00", "#5e0a02"],
  ];

  return <SwatchesPicker colors={color} />;
}
