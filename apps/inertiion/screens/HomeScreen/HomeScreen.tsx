import { FC, useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, ToastAndroid, View } from "react-native";
import { FAB, IconButton, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { SearchResult } from "@components/SearchResult";
import { useAppDispatch, useAppSelector } from "@hooks";
import { clearItemQueue, setSearchTerm } from "@store";
import { defaultAppPadding } from "@theme";
import { HomeScreenNavProps } from "@types";
import { localStorageSetItemQueue } from "@utils";

export const HomeScreen: FC<HomeScreenNavProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { itemQueue, searchTerm } = useAppSelector(({ app }) => ({
    ...app,
  }));

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const searchBarRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!!searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [searchBarRef]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView contentContainerStyle={{ padding: defaultAppPadding }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Searchbar
            elevation={isFocus ? 3 : 0}
            onBlur={() => setIsFocus(() => false)}
            onChangeText={(e) => dispatch(setSearchTerm(e))}
            onFocus={() => setIsFocus(() => true)}
            placeholder="Search item or location"
            ref={searchBarRef}
            style={{ flex: 1 }}
            value={searchTerm || ""}
          />
          <IconButton
            icon="plus"
            mode="contained"
            onPress={() => {
              navigation.navigate("NewCatalogItemScreen");
            }}
            size={30}
          />
        </View>
        {!!searchTerm && <SearchResult />}
      </ScrollView>
      {!!itemQueue.length && (
        <FAB
          icon="pickaxe"
          onPress={() => {
            console.log(itemQueue.length);
          }}
          onLongPress={async () => {
            ToastAndroid.show("Item queue cleared!", ToastAndroid.LONG);

            await localStorageSetItemQueue([]);

            dispatch(clearItemQueue());
          }}
          style={{
            position: "absolute",
            bottom: defaultAppPadding * 2,
            right: defaultAppPadding * 2,
          }}
        />
      )}
    </SafeAreaView>
  );
};
