import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  Image,
  Pressable,
} from "react-native";
import {
  Subheading,
  Surface,
  Divider,
  List,
  Appbar,
  useTheme,
  Menu,
} from "react-native-paper";
import { Text, View } from "../components/Themed";
import HTMLView from "react-native-htmlview";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState, useRef, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import {
  useQuery,
  onlineManager,
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import NetInfo from "@react-native-community/netinfo";
import useAppState from "react-native-appstate-hook";
import { useForm, Controller } from "react-hook-form";
//import overlay from "./overlay";
import { FlashList } from "@shopify/flash-list";
import Constants from "expo-constants";
import { AppConfig } from "../app.config";
const { API_TOKEN, API_URL, BASE_URL_IMAGES } = Constants.manifest
  ?.extra as AppConfig;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 10000,
    },
  },
});

const convertDate = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};
const convertDate1 = (date: string) => {
  const d = dayjs(date).format("DD-MM-YY");
  return d;
};

type Props = {
  id: number;
  bitacora_id: number;
  tipo_event_id: number;
  events_id: number;
  event_date: string;
  event: string;
  tipoevent: string;
  description: string;
};

type FormData = {
  id: number;
  bitacora_id: number;
  tipo_event_id: number;
  events_id: number;
  event_date: string;
  event: string;
  tipoevent: string;
  description: string;
};

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected);
  });
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function ModalBitacoraId(Routes: Props) {
  const clonedObj = { ...Routes.route.params };
  const bitacoraID = { ...Routes.route.params };
  console.log("Bitacora", bitacoraID);
  console.log("BitacoraI", bitacoraID.id);
  const navigation = useNavigation();

  useAppState({
    onChange: onAppStateChange,
  });

  const ENDPOINT = API_URL + "bitacora/events/" + bitacoraID.id;
  console.log("ENDPOINT", ENDPOINT);

  const { status, data, error, isLoading, refetch } = useQuery(
    ["bitacorasttt"],
    async () => {
      const res = await axios.get(`${ENDPOINT}`);
      console.log("DATA1", res);
      return res.data;
    }
  );

  const enabledRef = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current) {
        refetch();
      } else {
        enabledRef.current = true;
      }
    }, [refetch])
  );
  const dates: any = new Date();
  const titulo =
    "Bitacora Id: " +
    bitacoraID.id +
    ", " +
    convertDate1(bitacoraID.bitacora_date);
  const titulo1 = "Eventos: " + bitacoraID.eventos + ",  Add+";
  //console.log("Bitacoras Data", data);

  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);

  const showDialog = () => setVisible(true);
  const showDialog1 = () => setVisible1(true);

  const hideDialog = () => setVisible(false);
  const hideDialog1 = () => setVisible1(false);
  const theme = useTheme();
  //const backgroundColor = overlay(1, theme.colors.surface) as string;

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#e91e63" />;
  }

  return (
    <Surface style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Subheading style={styles.title}>{titulo}</Subheading>
        <Subheading style={styles.subheading}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "red" : "#b14a00",
              },
              styles.button,
            ]}
            onPress={() =>
              navigation.navigate("ModalBitaEventsAdd", {
                bitacora_id: bitacoraID.id,
              })
            }
          >
            <Text style={styles.title13}>{titulo1}</Text>
          </Pressable>
        </Subheading>
        <Divider style={{ backgroundColor: "gray", marginTop: 10 }} />
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <List.Section
              style={{
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              <Appbar.Header style={styles.header}>
                <Appbar.Content
                  titleStyle={styles.header3}
                  title={`Id:${item.id}`}
                />
                <Appbar.Action
                  icon="pencil"
                  onPress={() =>
                    navigation.navigate("ModalBitaEventEdit", {
                      id: item.id,
                      bitacora_id: item.bitacora_id,
                      event_date: item.event_date,
                      tipo_event_id: item.tipo_event_id,
                      events_id: item.events_id,
                      event: item.event.description,
                      tipoevent: item.tipoEvent.description,
                      description: item.description,
                      image: item.image,
                      eventos: bitacoraID.eventos,
                    })
                  }
                />
                <Appbar.Action icon="delete" onPress={() => alert("Search")} />
              </Appbar.Header>

              <Text style={styles.title1}>{`Date: ${convertDate(
                item.event_date
              )}`}</Text>

              <Text
                style={styles.title1}
              >{`Tipo Evento: ${item.tipo_event_id} ${item.tipoEvent.description}`}</Text>
              <Text
                style={styles.title1}
              >{`Evento: ${item.events_id} ${item.event.description}`}</Text>

              <Text>Image?: {item.image ? "👍" : "👎"} </Text>

              <HTMLView
                value={`Description: ${item.description}`}
                stylesheet={styless}
              />
              <View>
                <Image
                  source={{ uri: BASE_URL_IMAGES + `${item.id}` + ".jpg" }}
                  style={[
                    styles.image,
                    {
                      borderColor: "gray",
                    },
                  ]}
                />
              </View>

              <Divider style={{ backgroundColor: "gray", marginTop: 30 }} />
            </List.Section>
          )}
          estimatedItemSize={200}
          keyExtractor={(item, index) => index.toString()}
        />
      </QueryClientProvider>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginRight: 3,
    marginLeft: 3,
    justifyContent: "center",
  },
  container1: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  subheading: {
    height: 30,
    marginBottom: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#D5DBDB",
    height: 30,
    fontSize: 18,
    marginTop: 0,
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 0,
  },
  header3: {
    backgroundColor: "#D5DBDB",
    height: 30,
    fontSize: 18,
    marginBottom: 30,
    marginTop: 10,
  },

  header1: {
    backgroundColor: "#0F7694",
    height: 30,
    fontSize: 18,
  },
  a: {
    fontWeight: "bold",
    color: "purple",
  },
  div: {
    fontFamily: "monospace",
    marginTop: 1,
    marginBottom: 1,
  },
  p: {
    fontSize: 38,
  },

  title: {
    marginTop: 5,
    marginBottom: 1,
    paddingVertical: 5,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#4d7ebe",
    borderRadius: 3,
  },
  title1: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 5,
    fontSize: 17,
  },
  title13: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 5,
    fontSize: 17,
    color: "#FFFFFF",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  label: {
    paddingVertical: 5,
    marginLeft: 3,
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f0f6fa",
    borderRadius: 4,
    fontSize: 16,
    height: 18,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 1,
    marginBottom: 1,
  },
  inputMulti: {
    backgroundColor: "#f0f6fa",
    borderRadius: 4,
    fontSize: 14,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  image: {
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 1,
    marginBotton: 1,
    borderRadius: 20,
    width: "100%",
    height: 340,
  },
  button: {
    borderRadius: 8,
    padding: 6,
    height: 40,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

const styless = StyleSheet.create({
  a: {
    fontWeight: "300",
    color: "#FF3366", // make links coloured pink
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  p: {
    fontWeight: "300",
    fontSize: 18,
  },
});
