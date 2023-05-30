import { DialogType } from "../store/chat/types";

export const objectMap = (
  obj: Object,
  fn: (value: any, key: any, index: any) => JSX.Element
) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value], index) => [
      key,
      fn(value, key, index),
    ])
  );
