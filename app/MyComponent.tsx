"use client";
import {
  useMantineColorScheme,
  useMantineTheme,
  Button,
  Card,
  Paper,
} from "@mantine/core";

export type ComponentType = "paper" | "card";
type MyComponentProps = {
  title: string;
  componentType: ComponentType;
};

export const MyComponent = ({ title, componentType }: MyComponentProps) => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const content = (
    <>
      <h2>{title}</h2>
      <h3 suppressHydrationWarning>color scheme = {colorScheme}</h3>

      <Button
        color={theme.primaryColor}
        onClick={toggleColorScheme}
        variant="outline"
      >
        toggle color scheme
      </Button>
    </>
  );

  return componentType === "card" ? (
    <Card withBorder>{content}</Card>
  ) : (
    <Paper withBorder p={12}>
      {content}
    </Paper>
  );
};
