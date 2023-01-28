import { StyleSheet, ActivityIndicator, Platform, Image } from "react-native";
import {
  Subheading,
  Surface,
  Divider,
  List,
  Appbar,
  useTheme,
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
    ["bitacoras"],
    async () => {
      const res = await axios.get(`${ENDPOINT}`);
      //console.log("DATA1", res);
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
    convertDate1(bitacoraID.bitacora_date) +
    ", Eventos: " +
    bitacoraID.eventos;
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
                  titleStyle={styles.header}
                  title={`Id:${item.id}`}
                />
                <Appbar.Action
                  icon="pencil"
                  onPress={() =>
                    navigation.navigate("ModalEvent", {
                      id: item.id,
                      bitacora_id: item.bitacora_id,
                      event_date: item.event_date,
                      tipo_event_id: item.tipo_event_id,
                      events_id: item.events_id,
                      event: item.event.description,
                      tipoevent: item.tipoEvent.description,
                      description: item.description,
                    })
                  }
                />
                <Appbar.Action icon="delete" onPress={() => alert("Search")} />
                <Appbar.Action
                  icon="plus"
                  onPress={() =>
                    navigation.navigate("ModalBitaEventsAdd", {
                      id: item.id,
                      bitacora_id: item.bitacora_id,
                      event_date: item.event_date,
                      tipo_event_id: item.tipo_event_id,
                      events_id: item.events_id,
                      event: item.event.description,
                      tipoevent: item.tipoEvent.description,
                      description: item.description,
                    })
                  }
                />
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
              <HTMLView
                value={`Description: ${item.description}`}
                stylesheet={styles.p}
              />

              <Image
                source={{ uri: BASE_URL_IMAGES + `${item.id}` + ".jpg" }}
                style={[
                  styles.image,
                  {
                    borderColor: "gray",
                  },
                ]}
              />

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
  header: {
    backgroundColor: "#D5DBDB",
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginRight: 3,
    marginLeft: 3,
  },
  title: {
    marginTop: 5,
    marginBottom: 1,
    paddingVertical: 5,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#0F7694",
    borderRadius: 3,
  },
  title11: {
    marginTop: 1,
    marginBottom: 1,
    paddingVertical: 5,
    marginLeft: 5,
    fontSize: 19,
    fontWeight: "bold",
  },
  title1: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 5,
    fontSize: 17,
  },
  title3: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 10,
    marginRight: 5,
    paddingVertical: 5,
    fontSize: 17,
    color: "blue",
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
    marginTop: 10,
    borderRadius: 20,
    width: "100%",
    height: 240,
  },
});
