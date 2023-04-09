import { DrawerScreenProps } from "@react-navigation/drawer";
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
  NewCatalogItemScreen: undefined;
};

export type CatalogItemScreenNavProps = NativeStackScreenProps<
  HomeScreenNavStackProps,
  "CatalogItemScreen"
>;

export type HomeScreenNavProps = NativeStackScreenProps<
  HomeScreenNavStackProps,
  "HomeScreen"
>;

export type HomeScreenNav = NativeStackNavigationProp<
  HomeScreenNavStackProps,
  "HomeScreen"
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

export type DatabaseItem = [
  // Code
  string,
  // Color
  string,
  // Size
  string | null,
  // Description
  string | null,
  // Location
  string,
  // Storage
  string | null
];

export type DatabaseItemWithId = [
  // ID
  string,
  ...DatabaseItem
];
