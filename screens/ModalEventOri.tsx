import { ScrollView, Keyboard } from "react-native";
import { StyleSheet, scale } from "react-native-size-scaling";

import {
  Divider,
  Surface,
  Subheading,
  Button,
  Portal,
  Dialog,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Text, View } from "../components/Themed";
import overlay from "./overlay";

import { useForm, Controller } from "react-hook-form";

import HTMLView from "react-native-htmlview";

import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTypeEvents1 } from "../hooks/useTypeEvents1";
import { useEventsId } from "../hooks/useEventsId";

import Constants from "expo-constants";
import { AppConfig } from "../app.config";
const { API_TOKEN, API_URL } = Constants.manifest?.extra as AppConfig;

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

interface IFormInputs {
  singleErrorInput: string;
  multipleErrorInput: string;
  numberInput: string;
}

const convertDate = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};
const convertDate1 = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};

export default function ModalEvent(Routes: Props) {
  //const clonedObj = route.params;
  console.log("Routes", Routes);

  const clonedObj = { ...Routes.route.params };
  const bitaEvents = { ...Routes.route.params };
  const navigation = useNavigation();
  console.log("bitaEvents", bitaEvents);
  const theme = useTheme();
  //const backgroundColor = overlay(1, theme.colors.surface) as string;

  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);

  const showDialog = () => setVisible(true);
  const showDialog1 = () => setVisible1(true);

  const hideDialog = () => setVisible(false);
  const hideDialog1 = () => setVisible1(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { typeEvents1 } = useTypeEvents1(); //
  //console.log("TYPEVENTS", typeEvents1);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [eventId, setEventId] = useState("");
  const { eventsId } = useEventsId(eventId);
  //const { eventsId } = useEventsId(33); //
  //console.log("EVENTSOFTYPPE", eventsId);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Tipo Evento
        </Text>
      );
    }
    return null;
  };
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const date = new Date();
  const titulo = "Evento Id: " + bitaEvents.id;
  useEffect(() => {
    setVisible1(true);
  }, [setVisible1]);

  const onSubmit = async (dataE: any) => {
    console.log("DATAE", dataE);
    try {
      const dataEE = {
        id: Number(dataE.id),
        bitacora_id: Number(dataE.bitacora_id),
        tipo_event_id: Number(dataE.tipo_event_id),
        events_id: Number(dataE.events_id),
        description: dataE.description,
        event_date: new Date(dataE.event_date),
      };
      // https://bita-personal-api.vercel.app/api/
      //await editBitacora(data);  http://192.168.1.99:3000/api/  "http://localhost:3000/
      const ENDPOINT = API_URL + "bitacora/events/admin/edit";
      const result = await fetch(ENDPOINT, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataEE),
      });
      console.log("result", result);
      // refetch();
      setVisible1(false);
      setTimeout(() => {
        //navigation.navigation.push('ActivitiesList');
        navigation.navigate("Bitacoras");
      }, 600);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Surface style={styles.container}>
      <View>
        <Portal>
          <Dialog
            visible={visible1}
            onDismiss={hideDialog1}
            style={{ backgroundColor: theme.colors.background }}
          >
            <Dialog.Title style={styles.title}>
              Edit Actividadd: {bitaEvents.bitacora_id}
            </Dialog.Title>
            <Dialog.ScrollArea style={{ maxHeight: 450, paddingHorizontal: 0 }}>
              <ScrollView>
                <View style={styles.inputContainerStyle}>
                  <Controller
                    name="id"
                    control={control}
                    defaultValue={bitaEvents.id}
                    render={({ field: { value } }) => (
                      <TextInput
                        label="ID"
                        testID="input"
                        mode="outlined"
                        keyboardType="numeric"
                        value={String(bitaEvents.id)}
                        disabled={true}
                      />
                    )}
                  />
                  {errors.id && <Text>This is required.</Text>}
                </View>

                <View style={styles.inputContainerStyle}>
                  <Controller
                    name="bitacora_id"
                    control={control}
                    defaultValue={bitaEvents.bitacora_id}
                    render={({ field: { value } }) => (
                      <TextInput
                        label="BitacoraID"
                        testID="input"
                        mode="outlined"
                        keyboardType="numeric"
                        value={String(bitaEvents.bitacora_id)}
                      />
                    )}
                  />
                  {errors.bitacora_id && <Text>This is required.</Text>}
                </View>

                <View style={styles.inputContainerStyle}>
                  {renderLabel()}
                  <Controller
                    name="tipo_event_id"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={bitaEvents.tipo_event_id}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Dropdown
                        style={[
                          stylesss.dropdown,
                          isFocus && { borderColor: "blue" },
                        ]}
                        placeholderStyle={stylesss.placeholderStyle}
                        selectedTextStyle={stylesss.selectedTextStyle}
                        inputSearchStyle={stylesss.inputSearchStyle}
                        iconStyle={stylesss.iconStyle}
                        data={typeEvents1}
                        search
                        maxHeight={scale(200)}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? "Select Type Event" : "..."}
                        searchPlaceholder="Seleccione..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                          setValue(item.value);
                          setIsFocus(false);
                          setEventId(item.value);
                        }}
                        ref={ref}
                        renderLeftIcon={() => (
                          <FontAwesome
                            style={stylesss.icon}
                            color={isFocus ? "blue" : "black"}
                            name="link"
                            size={scale(20)}
                          />
                        )}
                      />
                    )}
                  />
                  {errors.tipo_event_id && <Text>This is required.</Text>}
                </View>

                <View style={stylesss.container}>
                  <Controller
                    name="events_id"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={bitaEvents.events_id}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Dropdown
                        style={[
                          stylesss.dropdown,
                          isFocus && { borderColor: "blue" },
                        ]}
                        placeholderStyle={stylesss.placeholderStyle}
                        selectedTextStyle={stylesss.selectedTextStyle}
                        inputSearchStyle={stylesss.inputSearchStyle}
                        iconStyle={stylesss.iconStyle}
                        data={eventsId}
                        search
                        maxHeight={scale(200)}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? "Select Events" : "..."}
                        searchPlaceholder="Seleccione..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(value) => {
                          bitaEvents.events_id(value);
                        }}
                        ref={ref}
                        renderLeftIcon={() => (
                          <FontAwesome
                            style={stylesss.icon}
                            color={isFocus ? "blue" : "black"}
                            name="link"
                            size={scale(20)}
                          />
                        )}
                      />
                    )}
                  />
                  {errors.events_id && <Text>This is required.</Text>}
                </View>

                <View style={stylesss.inputContainerStyle}>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={bitaEvents.description}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextInput
                        label="Description"
                        testID="input"
                        mode="outlined"
                        multiline
                        numberOfLines={4}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={(value) => onChange(value)}
                        ref={ref}
                      />
                    )}
                  />
                </View>

                <View style={styles.inputContainerStyle}>
                  <Controller
                    name="event_date"
                    control={control}
                    defaultValue={String(bitaEvents.event_date)}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextInput
                        label="Event Date"
                        testID="input"
                        mode="outlined"
                        value={value}
                        onChangeText={(value) => onChange(value)}
                      />
                    )}
                  />
                  {errors.id && <Text>This is required.</Text>}
                </View>

                <View style={styles.topRow}>
                  <View>
                    <Subheading style={styles.label}>
                      <Button
                        dark
                        color="gray"
                        icon="file-cancel-outline"
                        mode="contained"
                        onPress={hideDialog1}
                      >
                        Cancelar
                      </Button>
                      {"  "}
                      <Button
                        dark
                        color="green"
                        icon="content-save-edit-outline"
                        background-color="gray"
                        mode="contained"
                        onPress={handleSubmit(onSubmit)}
                      >
                        Modificar
                      </Button>
                    </Subheading>
                  </View>
                </View>
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 1,
    marginBottom: 1,
    marginRight: 10,
    marginLeft: 10,
  },

  title: {
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
    marginLeft: 10,
    marginRight: 5,
    paddingVertical: 5,
    fontSize: 17,
  },
  title3: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 10,
    marginRight: 5,
    paddingVertical: 5,
    fontSize: 17,
    color: "orange",
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
    borderRadius: 4,
    fontSize: 16,
    height: 18,
    padding: 6,
    marginTop: 10,
    marginBottom: 10,
    color: "rgba(0, 0, 0,0)",
  },
  inputMulti: {
    backgroundColor: "#f0f6fa",
    borderRadius: 4,
    fontSize: 14,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  inputContainerStyle: {
    margin: 8,
  },
});

const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 1,
    marginBottom: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  p: {
    fontSize: 18,
  },
  a: {
    fontWeight: "300",
    color: "#0c55ae", // make links coloured pink
  },
});

const stylesss = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 16,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
