import AsyncStorage from "@react-native-async-storage/async-storage";

import { AsyncStorageReturnStatus } from "@types";

enum LocalStorageKeys {
  CHECKED_ITEM_QUEUE = "checkedItemQueue",
  ITEM_QUEUE = "itemQueue",
  SEARCH_TERM = "searchTerm",
}

// Item Queue
export const localStorageGetItemQueue = async () => {
  const resString = await AsyncStorage.getItem(LocalStorageKeys.ITEM_QUEUE);

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
      LocalStorageKeys.ITEM_QUEUE,
      JSON.stringify(Array.from(new Set(itemQueue)))
    );

    return { status: AsyncStorageReturnStatus.OK };
  } catch {
    return { status: AsyncStorageReturnStatus.ERROR };
  }
};

export const localStorageGetCheckedItemQueue = async () => {
  const resString = await AsyncStorage.getItem(
    LocalStorageKeys.CHECKED_ITEM_QUEUE
  );

  try {
    if (!!resString) {
      const checkedItemQueue = JSON.parse(resString) as string[];

      return {
        checkedItemQueue: checkedItemQueue,
        status: AsyncStorageReturnStatus.OK,
      };
    } else {
      return {
        checkedItemQueue: [],
        status: AsyncStorageReturnStatus.NOT_FOUND,
      };
    }
  } catch {
    return { checkedItemQueue: [], status: AsyncStorageReturnStatus.ERROR };
  }
};

export const localStorageSetCheckedItemQueue = async (
  checkedItemQueue: string[]
) => {
  try {
    await AsyncStorage.setItem(
      LocalStorageKeys.CHECKED_ITEM_QUEUE,
      JSON.stringify([...checkedItemQueue])
    );

    return { status: AsyncStorageReturnStatus.OK };
  } catch {
    return { status: AsyncStorageReturnStatus.ERROR };
  }
};

// Search Term
export const localStorageSetSearchTerm = async (newSearchTerm: string) => {
  if (!!newSearchTerm) {
    const resString = await AsyncStorage.getItem("searchTerm");

    if (!!resString) {
      const searchTerms = JSON.parse(resString) as string[];

      await AsyncStorage.setItem(
        LocalStorageKeys.SEARCH_TERM,
        JSON.stringify(
          Array.from(new Set([newSearchTerm, ...searchTerms])).slice(0, 4)
        )
      );
    } else {
      await AsyncStorage.setItem(
        LocalStorageKeys.SEARCH_TERM,
        JSON.stringify([newSearchTerm])
      );
    }
  }
};

export const localStorageGetSearchTerm = async () => {
  try {
    const resString = await AsyncStorage.getItem(LocalStorageKeys.SEARCH_TERM);

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
  const resString = await AsyncStorage.getItem(LocalStorageKeys.SEARCH_TERM);

  if (!!resString) {
    const searchTerms = JSON.parse(resString) as string[];

    await AsyncStorage.setItem(
      "searchTerm",
      JSON.stringify(searchTerms.filter((oldTerm) => oldTerm !== term))
    );
  }
};
