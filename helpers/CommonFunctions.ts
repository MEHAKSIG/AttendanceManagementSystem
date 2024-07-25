import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as Device from "expo-device";

export const getDeviceUniqueId = async () => {
  let uniqueId = await SecureStore.getItemAsync(
    "secure_deviceid_alice_attendance_app"
  );
  if (!uniqueId) {
    let uuid = uuidv4();
    await SecureStore.setItemAsync(
      "secure_deviceid_alice_attendance_app",
      JSON.stringify(uuid)
    );
    const id = await SecureStore.getItemAsync(
      "secure_deviceid_alice_attendance_app"
    );
    return id?.replace('"', "")?.replace('"', "")?.toString();
  }
  //   return uniqueId;
  return uniqueId.replace('"', "").replace('"', "").toString();
};

export const getDeviceInfo = async () => {
  return {
    brand: Device.brand,
    deviceTypes: Device.DeviceType,
    deviceTypeId: await Device.getDeviceTypeAsync(),
    designName: Device.designName,
    deviceYearClass: Device.deviceYearClass,
    manufacturer: Device.manufacturer,
    modelId: Device.modelId,
    modelName: Device.modelName,
    osBuildId: Device.osBuildId,
    osInternalBuildId: Device.osInternalBuildId,
    osVersion: Device.osVersion,
    platformApiLevel: Device.platformApiLevel,
    productName: Device.productName,
    totalMemory: Device.totalMemory,
  };
};

export function stringToTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
