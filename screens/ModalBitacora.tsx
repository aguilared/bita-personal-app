import { StyleSheet, ScrollView, Keyboard } from "react-native";

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
import React, { useContext, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { AppConfig } from "../app.config";
const { API_TOKEN, API_URL } = Constants.manifest?.extra as AppConfig;

type Props = {
  author_id: number;
  bitacora_date: string;
};

type FormData = {
  author_id: number;
  bitacora_date: string;
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
export default function ModalBitacoraAdd(propss: Props) {
  const clonedObj = { ...propss.route.params };
  const bitaEvents = { ...clonedObj, ...propss };
  const navigation = useNavigation();
  //console.log("bitaEvents", bitaEvents);
  const theme = useTheme();
  const backgroundColor = overlay(1, theme.colors.surface) as string;
  console.log("ColorBackgron", backgroundColor);
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);

  const showDialog = () => setVisible(true);
  const showDialog1 = () => setVisible1(true);

  const hideDialog = () => setVisible(false);
  const hideDialog1 = () => setVisible1(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const date1 = new Date();
  const titulo = "Evento Id: " + bitaEvents.id;
  console.log("DATE", date1);
  const convertDate1 = (dateTo: any) => {
    const d = dayjs(dateTo).format("YYYY/MM/DD hh:mm");
    return d;
  };
  const date = convertDate1(date1);
  console.log("DATE", date);

  useEffect(() => {
    setVisible1(true);
  }, [setVisible1]);
  const ENDPOINT = API_URL + "bitacora/create";
  console.log("ENDPOINT", ENDPOINT);

  const onSubmit = async (dataE: any) => {
    console.log("DATAE", dataE);
    try {
      const dataEE = {
        author_id: Number(dataE.author_id),
        bitacora_date: new Date(dataE.bitacora_date),
      };
      // "https://bita-personal-api.vercel.app/api/bitacora/create",
      // "http://192.168.1.99:3000/api/bitacora/create",
      // "http://192.168.1.30:3000/api/bitacora/create",
      const result = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataEE),
      });
      console.log("RESULT", result);
      const data = await result.json();
      console.log("DATA", data);
      // refetch();
      setVisible1(false);
      setTimeout(() => {
        //navigation.navigation.push('ActivitiesList');
        navigation.navigate("ModalBitaEventsAdd", {
          bitacora_id: data.id,
        });
      }, 600);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Surface style={styles.container}>
      <ScrollView>
        <View style={styles.topRow}>
          <View>
            <Subheading style={styles.title}>{titulo}</Subheading>

            <Subheading style={styles.label}>
              <Button
                dark
                color="green"
                icon="file-document-edit-outline"
                mode="contained"
                onPress={() => {
                  Keyboard.dismiss();
                  showDialog1();
                }}
              >
                Add
              </Button>
              {"  "}
              <Button
                dark
                color="red"
                icon="delete-alert"
                background-color="gray"
                mode="contained"
                onPress={() => {
                  Keyboard.dismiss();
                  showDialog();
                }}
              >
                Delete
              </Button>
            </Subheading>
          </View>
        </View>
        <Divider style={{ backgroundColor: "gray" }} />
        <Subheading style={styles.label}>
          Fecha: {convertDate(bitaEvents.event_date)}
        </Subheading>
        <Subheading style={styles.label}>
          TipoEvent: {bitaEvents.tipoevent}
        </Subheading>
        <Subheading style={styles.label}>Event: {bitaEvents.event}</Subheading>
        <HTMLView value={bitaEvents.description} stylesheet={styless} />
        <Divider style={{ backgroundColor: "gray" }} />
      </ScrollView>
      <View>
        <Portal>
          <Dialog
            visible={visible1}
            onDismiss={hideDialog1}
            style={{ backgroundColor }}
          >
            <Dialog.Title style={styles.title}>Add Bitacora</Dialog.Title>
            <Dialog.ScrollArea style={{ maxHeight: 450, paddingHorizontal: 0 }}>
              <ScrollView>
                <View style={styles.inputContainerStyle}>
                  <Controller
                    name="author_id"
                    control={control}
                    defaultValue={1}
                    render={({ field: { value } }) => (
                      <TextInput
                        label="Author ID"
                        testID="input"
                        mode="outlined"
                        keyboardType="numeric"
                        value={String(1)}
                        disabled={true}
                      />
                    )}
                  />
                  {errors.author_id && <Text>This is required.</Text>}
                </View>

                <View style={styles.inputContainerStyle}>
                  <Controller
                    name="bitacora_date"
                    control={control}
                    defaultValue={String(date)}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextInput
                        label="Bitacora Date"
                        testID="input"
                        mode="outlined"
                        value={value}
                        onChangeText={(value) => onChange(value)}
                      />
                    )}
                  />
                  {errors.bitacora_date && <Text>This is required.</Text>}
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
                        Add
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
