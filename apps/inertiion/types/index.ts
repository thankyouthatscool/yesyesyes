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
  NewCatalogItemScreen: {
    formData?: {
      code: string;
      color: string;
      description: string;
      location: string;
      size: string;
    };
  };
  StorageScreen: undefined;
  StorageLocationScreen: { locationName: string };
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

export type StorageScreenProps = NativeStackScreenProps<
  HomeScreenNavStackProps,
  "StorageScreen"
>;

export type StorageLocationScreenProps = NativeStackScreenProps<
  HomeScreenNavStackProps,
  "StorageLocationScreen"
>;

export type StorageCardComponentNavProps = NativeStackNavigationProp<
  HomeScreenNavStackProps,
  "StorageScreen"
>;

export type AppState = {
  databaseInstance: SQLite.WebSQLDatabase;
  itemQueue: string[];
  itemQueueChecked: string[];
  isFABCollapsed: boolean;
  searchResult: CatalogItem[];
  searchTerm: string;
  storageSearchTerm: string;
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

export interface StorageLocation {
  id: string;
  location: string;
  itemId: string;
  cartons: number;
  pieces: number;
  dateModified: string;
}

export interface StorageLocationData {
  cartons: number;
  code: string;
  color?: string;
  dateModified: string;
  description: string;
  itemId: string;
  location: string;
  pieces: number;
  size?: string;
  storageId: string;
  storageLocation: string;
}
