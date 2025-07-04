import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function ThemeProvider(props: { children: React.ReactNode }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const colorScheme = process.env.EXPO_OS === "web" ? "dark" : useColorScheme();
  return (
    <RNTheme
      // This isn't needed on iOS or web, but it's required on Android since the dynamic colors are broken
      // https://github.com/facebook/react-native/issues/32823
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      // value={colorScheme === "dark" ? BaconDarkTheme : BaconDefaultTheme}
    >
      {props.children}
    </RNTheme>
  );
}
