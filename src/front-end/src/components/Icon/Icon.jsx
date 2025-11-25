import { useTheme } from "styled-components";
import { icons } from "./utils";

export function Icon({ name, size = 24, color }) {
  const theme = useTheme()
  const RenderedIcon = icons[name]

  if (!RenderedIcon) {
    console.error(`Ícone não encontrado: "${name}"`);
    return null;
  }

  return (
    <RenderedIcon
      width={size}
      height={size}
      color={color ?? theme.colors.buttonText}
    />
  )
}
