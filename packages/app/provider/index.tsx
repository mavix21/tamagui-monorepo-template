import { useColorScheme } from "react-native";

import type { TamaguiProviderProps } from "@myapp/ui";
import {
  config,
  CustomToast,
  isWeb,
  TamaguiProvider,
  ToastProvider,
} from "@myapp/ui";

import { ToastViewport } from "./ToastViewport";

export function Provider({
  children,
  defaultTheme = "light",
  ...rest
}: Omit<TamaguiProviderProps, "config"> & { defaultTheme?: string }) {
  const colorScheme = useColorScheme();
  const theme = defaultTheme || (colorScheme === "dark" ? "dark" : "light");

  return (
    <TamaguiProvider config={config} defaultTheme={theme} {...rest}>
      <ToastProvider
        swipeDirection="horizontal"
        duration={6000}
        native={isWeb ? [] : ["mobile"]}
      >
        {children}
        <CustomToast />
        <ToastViewport />
      </ToastProvider>
    </TamaguiProvider>
  );
}
