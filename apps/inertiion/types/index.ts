import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import * as SQLite from "expo-sqlite";

export type RootDrawerNavigationProps = {
  Home: undefined;
  Settings: undefined;
};

export type HomeScreenNavStackProps = {
  CatalogItemScreen: { itemId: string };
  HomeScreen: undefined;
  ItemQueueScreen: undefined;
  NewCatalogItemScreen: { term: string | null };
};

export type CatalogItemScreenNavProps = NativeStackScreenProps<
  HomeScreenNavStackProps,
  "CatalogItemScreen"
>;

export type HomeScreenNavProps = CompositeScreenProps<
  NativeStackScreenProps<HomeScreenNavStackProps, "HomeScreen">,
  DrawerScreenProps<RootDrawerNavigationProps>
>;

export type HomeScreenNav = NativeStackNavigationProp<
  HomeScreenNavStackProps,
  "HomeScreen"
>;

export type StorageComponentNav = NativeStackNavigationProp<
  HomeScreenNavStackProps,
  "CatalogItemScreen"
>;

export type ItemQueueScreenNavProps = NativeStackScreenProps<
  HomeScreenNavStackProps,
  "ItemQueueScreen"
>;

export type NewCatalogItemScreenNavProps = NativeStackScreenProps<
  HomeScreenNavStackProps,
  "NewCatalogItemScreen"
>;

export type AppState = {
  databaseInstance: SQLite.WebSQLDatabase;
  itemQueue: string[];
  searchResult: CatalogItem[];
  searchTerm: string;
};

export type CatalogItem = {
  id: string;
  code: string;
  color?: string[];
  description?: string;
  location: string;
  size?: string[];
};

export type NewCatalogItemInput = {
  code: string;
  color?: string;
  size?: string;
  description?: string;
  location: string;
};

export type CatalogState = {
  items: CatalogItem[];
};

export enum AsyncStorageReturnStatus {
  OK = 200,
  NOT_FOUND = 400,
  ERROR = 500,
}

export type DatabaseItemInput = [
  // Code
  string,
  // Color
  string,
  // Size
  string | null,
  // Description
  string | null,
  // Location
  string
];

export type DatabaseItemInputWithId = [
  // ID
  string,
  ...DatabaseItemInput
];
