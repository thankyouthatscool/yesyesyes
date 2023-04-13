import AsyncStorage from "@react-native-async-storage/async-storage";

import { AsyncStorageReturnStatus } from "@types";

// Item Queue
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

export const localStorageGetCheckedItems = () => {};

export const localStorageSetCheckedItems = () => {};

// Search Term
export const localStorageSetSearchTerm = async (newSearchTerm: string) => {
  console.log("newSearchTerm", newSearchTerm);

  if (!!newSearchTerm) {
    const resString = await AsyncStorage.getItem("searchTerm");

    if (!!resString) {
      const searchTerms = JSON.parse(resString) as string[];

      await AsyncStorage.setItem(
        "searchTerm",
        JSON.stringify(
          Array.from(new Set([newSearchTerm, ...searchTerms])).slice(0, 5)
        )
      );
    }
  }
};

export const localStorageGetSearchTerm = async () => {
  try {
    const resString = await AsyncStorage.getItem("searchTerm");

    if (!!resString) {
      const searchTerms = JSON.parse(resString) as string[];

      return { searchTerms, status: AsyncStorageReturnStatus.OK };
    } else {
      return { searchTerms: null, status: AsyncStorageReturnStatus.NOT_FOUND };
    }
  } catch {
    return { searchTerms: null, status: AsyncStorageReturnStatus.ERROR };
  }
};

export const localStorageRemoveSearchTerm = async (term: string) => {
  const resString = await AsyncStorage.getItem("searchTerm");

  if (!!resString) {
    const searchTerms = JSON.parse(resString) as string[];

    await AsyncStorage.setItem(
      "searchTerm",
      JSON.stringify(searchTerms.filter((oldTerm) => oldTerm !== term))
    );
  }
};
