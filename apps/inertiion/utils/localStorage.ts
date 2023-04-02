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
