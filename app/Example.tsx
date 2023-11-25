"use client";
import {
  Container,
  MantineProvider,
  SegmentedControl,
  localStorageColorSchemeManager,
} from "@mantine/core";
import { useState } from "react";
import { useIsClient } from "./useIsClient";
import { ComponentType, MyComponent } from "./MyComponent";

export const Example = () => {
  const [componentType, setComponentType] = useState<ComponentType>("card");
  const isClient = useIsClient();

  const getRootElement = (id: string) =>
    isClient ? document.getElementById(id) || undefined : undefined;

  return (
    <>
      <Container
        pt={12}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <h1 suppressHydrationWarning>
          Nested Theme Example (running on {isClient ? "client" : "server"})
        </h1>
        <SegmentedControl
          value={componentType}
          onChange={(v) => setComponentType(v as ComponentType)}
          data={[
            { label: "Card", value: "card" },
            { label: "Paper", value: "paper" },
          ]}
        />

        {/* -------------------------------------------------------------------------- */}
        {/*                                 NON NESTED                                 */}
        {/* -------------------------------------------------------------------------- */}
        <MyComponent
          title="Top Level Theme (non-nested)"
          componentType={componentType}
        />

        {/* -------------------------------------------------------------------------- */}
        {/*                                  SECTION 1                                 */}
        {/* -------------------------------------------------------------------------- */}
        <MantineProvider
          getRootElement={() => getRootElement("section1")}
          theme={{ primaryColor: "orange" }}
          cssVariablesSelector="#section1"
          colorSchemeManager={localStorageColorSchemeManager({
            key: "section1-scheme",
          })}
        >
          <div id="section1">
            <MyComponent title="Section 1" componentType={componentType} />
          </div>
        </MantineProvider>

        {/* -------------------------------------------------------------------------- */}
        {/*                                  SECTION 2                                 */}
        {/* -------------------------------------------------------------------------- */}
        <MantineProvider
          theme={{ primaryColor: "green" }}
          getRootElement={() => getRootElement("section2")}
          cssVariablesSelector="#section2"
          colorSchemeManager={localStorageColorSchemeManager({
            key: "section2-scheme",
          })}
        >
          <div id="section2">
            <MyComponent title="Section 2" componentType={componentType} />
          </div>
        </MantineProvider>

        {/* -------------------------------------------------------------------------- */}
        {/*                                  SECTION 3                                 */}
        {/* -------------------------------------------------------------------------- */}
        <MantineProvider
          theme={{ primaryColor: "yellow" }}
          getRootElement={() => getRootElement("section3")}
          cssVariablesSelector="#section3"
          forceColorScheme="dark"
        >
          <div id="section3">
            <MyComponent
              title='Section 3 (forceColorScheme="dark")'
              componentType={componentType}
            />
          </div>
        </MantineProvider>

        {/* -------------------------------------------------------------------------- */}
        {/*                                  SECTION 4                                 */}
        {/* -------------------------------------------------------------------------- */}
        <MantineProvider
          theme={{ primaryColor: "red" }}
          getRootElement={() => getRootElement("section4")}
          cssVariablesSelector="#section4"
          forceColorScheme="light"
        >
          <div id="section4">
            <MyComponent
              title='Section 3 (forceColorScheme="light")'
              componentType={componentType}
            />
          </div>
        </MantineProvider>

        {/* -------------------------------------------------------------------------- */}
        {/*                                  SECTION 5                                 */}
        {/* -------------------------------------------------------------------------- */}
        <MantineProvider
          theme={{
            colors: {
              "ocean-blue": [
                "#7AD1DD",
                "#5FCCDB",
                "#44CADC",
                "#2AC9DE",
                "#1AC2D9",
                "#11B7CD",
                "#09ADC3",
                "#0E99AC",
                "#128797",
                "#147885",
              ],
              "bright-pink": [
                "#F0BBDD",
                "#ED9BCF",
                "#EC7CC3",
                "#ED5DB8",
                "#F13EAF",
                "#F71FA7",
                "#FF00A1",
                "#E00890",
                "#C50E82",
                "#AD1374",
              ],
            },
            primaryColor: "ocean-blue",
          }}
          getRootElement={() => getRootElement("section5")}
          cssVariablesSelector="#section5"
          colorSchemeManager={localStorageColorSchemeManager({
            key: "section5-scheme",
          })}
        >
          <div id="section5">
            <MyComponent
              title="Section 5 (custom primary color)"
              componentType={componentType}
            />
          </div>
        </MantineProvider>
      </Container>
    </>
  );
};
