/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import ModalBitacora from "../screens/ModalBitacora";
import ModalEvent from "../screens/ModalEvent";
import ModalBitaEventEdit from "../screens/ModalBitaEventEdit";
import ModalBitaEventsAdd from "../screens/ModalBitaEventsAdd";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import Bitacoras from "../screens/Bitacoras";
import BitacorasList from "../screens/BitacorasList";
import ModalBitacoraId from "../screens/ModalBitacoraId";
import Animals from "../screens/Animals";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          tabBarStyle: {
            backgroundColor: theme.colors.onTertiaryContainer,
            paddingBottom: 5,
          },
          tabBarLabelStyle: { color: theme.colors.tertiaryContainer },
          headerStyle: {
            borderRadius: 3,
            backgroundColor: "#0067b1",
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          tabBarStyle: {
            backgroundColor: theme.colors.onTertiaryContainer,
            paddingBottom: 5,
          },
          tabBarLabelStyle: { color: theme.colors.tertiaryContainer },
          headerStyle: {
            borderRadius: 3,
            backgroundColor: "#0067b1",
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name="ModalEvent" component={ModalEvent} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          tabBarStyle: {
            backgroundColor: theme.colors.onTertiaryContainer,
            paddingBottom: 5,
          },
          tabBarLabelStyle: { color: theme.colors.tertiaryContainer },
          headerStyle: {
            borderRadius: 3,
            backgroundColor: "#0067b1",
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name="ModalBitaEventEdit"
          component={ModalBitaEventEdit}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          tabBarStyle: {
            backgroundColor: theme.colors.onTertiaryContainer,
            paddingBottom: 5,
          },
          tabBarLabelStyle: { color: theme.colors.tertiaryContainer },
          headerStyle: {
            borderRadius: 3,
            backgroundColor: "#0067b1",
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name="ModalBitacora" component={ModalBitacora} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          tabBarStyle: {
            backgroundColor: theme.colors.onTertiaryContainer,
            paddingBottom: 5,
          },
          tabBarLabelStyle: { color: theme.colors.tertiaryContainer },
          headerStyle: {
            borderRadius: 3,
            backgroundColor: "#0067b1",
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name="ModalBitaEventsAdd"
          component={ModalBitaEventsAdd}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          tabBarStyle: {
            backgroundColor: theme.colors.onTertiaryContainer,
            paddingBottom: 5,
          },
          tabBarLabelStyle: { color: theme.colors.tertiaryContainer },
          headerStyle: {
            borderRadius: 3,
            backgroundColor: "#0067b1",
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name="ModalBitacoraId" component={ModalBitacoraId} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="BitacorasList"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.onTertiaryContainer,
          paddingBottom: 5,
        },
        tabBarLabelStyle: { color: theme.colors.tertiaryContainer },
        headerStyle: {
          borderRadius: 3,
          backgroundColor: "#0067b1",
        },
        headerTintColor: "#fff",

        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <BottomTab.Screen
        name="BitacorasList"
        component={BitacorasList}
        options={({ navigation }: RootTabScreenProps<"BitacorasList">) => ({
          title: "BitacorasList",
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("ModalBitacora")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="plus"
                size={25}
                color={"white"}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Bitacoras"
        component={Bitacoras}
        options={({ navigation }: RootTabScreenProps<"Bitacoras">) => ({
          title: "Bitacoras",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="history" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("ModalBitacora")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="plus"
                size={25}
                color={"white"}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Animals"
        component={Animals}
        options={{
          title: "Animals",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
