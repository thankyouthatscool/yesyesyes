import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SQLite from "expo-sqlite";

export type RootDrawerNavigationProps = {
  Home: undefined;
  Settings: undefined;
};

export type HomeScreenNavStackProps = {
  HomeScreen: undefined;
  ItemQueueScreen: undefined;
  NewCatalogItemScreen: undefined;
};

export type HomeScreenNavProps = NativeStackScreenProps<
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
  description?: string;
  location: string;
  size?: string;
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
  string,
  string,
  string | null,
  string,
  string | null
];

export type DatabaseItemWithId = [string, ...DatabaseItem];
