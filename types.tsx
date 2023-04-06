/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  ModalBitacora: [author_id: number, bitacora_date: string];
  ModalBitacoraId: [id: number, author_id: number, bitacora_date: string];
  ModalBitaEventsAdd: [
    bitacora_id: number,
    tipo_event_id: number,
    events_id: number,
    event_date: string,
    event: string,
    tipoevent: string,
    description: string, 
    image: boolean, 
  ];
  ModalEvents: [
    bitacora_id: number,
    tipo_event_id: number,
    events_id: number,
    event_date: string,
    event: string,
    tipoevent: string,
    description: string
  ];
  ModalBitaEventEdit: [
    bitacora_id: number,
    tipo_event_id: number,
    events_id: number,
    event_date: string,
    event: string,
    tipoevent: string,
    description: string,
    image: boolean
  ];
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Bitacoras: undefined;
  BitacorasList: undefined;
  ModalBitacora: [author_id: number, bitacora_date: string];
  ModalBitacoraId: [author_id: number, bitacora_date: string];
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
