import AsyncStorage from "@react-native-async-storage/async-storage";

import { AsyncStorageReturnStatus } from "@types";

export const localStorageGetItemQueue = async () => {
  const resString = await AsyncStorage.getItem("itemQueue");

  try {
    if (!!resString) {
      const res = (await JSON.parse(resString)) as string[];

      return { itemQueue: res, status: AsyncStorageReturnStatus.OK };
    } else {
      return { itemQueue: [], status: AsyncStorageReturnStatus.NOT_FOUND };
    }
  } catch {
    return { itemQueue: [], status: AsyncStorageReturnStatus.ERROR };
  }
};

export const localStorageSetItemQueue = async (itemQueue: string[]) => {
  try {
    await AsyncStorage.setItem(
      "itemQueue",
      JSON.stringify(Array.from(new Set(itemQueue)))
    );

    return { status: AsyncStorageReturnStatus.OK };
  } catch {
    return { status: AsyncStorageReturnStatus.ERROR };
  }
};

// Search Term
export const localStorageSetSearchTerm = async (searchTerm: string) => {
  await AsyncStorage.setItem("searchTerm", JSON.stringify(searchTerm));
};

export const localStorageGetSearchTerm = async () => {
  try {
    const resString = await AsyncStorage.getItem("searchTerm");

    if (!!resString) {
      const searchTerm = JSON.parse(resString) as string;

      return { searchTerm, status: AsyncStorageReturnStatus.OK };
    } else {
      return { searchTerm: null, status: AsyncStorageReturnStatus.NOT_FOUND };
    }
  } catch {
    return { searchTerm: null, status: AsyncStorageReturnStatus.ERROR };
  }
};
