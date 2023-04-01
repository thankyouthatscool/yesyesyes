import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootDrawerNavigationProps = {
  Home: undefined;
};

export type HomeScreenNavStackProps = {
  HomeScreen: undefined;
  NewCatalogItemScreen: undefined;
};

export type HomeScreenNavProps = NativeStackScreenProps<
  HomeScreenNavStackProps,
  "HomeScreen"
>;

export type NewCatalogItemScreenNavProps = NativeStackScreenProps<
  HomeScreenNavStackProps,
  "NewCatalogItemScreen"
>;

export type AppState = {
  searchTerm: string;
};

export type CatalogItem = {
  id: string;
  code: string;
  color?: string[];
  size?: string[];
  location: string;
};

export type NewCatalogItemInput = {
  code: string;
  color?: string;
  location: string;
  size?: string;
};

export type CatalogState = {
  items: CatalogItem[];
};
