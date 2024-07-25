import React from "react";
import { View, Text } from "react-native";
import ModalSelector from "react-native-modal-selector";
import Colors from "../../constants/Colors";
// import Constants from "../../shared/Constants";
export interface DropDownModel {
    key: string,
    label: string
}
export interface DropDownModalSelectorProps {
    placeholder: string,
    listKeyLable: DropDownModel[],
    onChange: (selectedKey: string, selectedLabel: string) => void,
    overrideProps?: any
}

export default function DropDownModalSelector(props: DropDownModalSelectorProps) {

    const { placeholder, listKeyLable, onChange, overrideProps } = props;

    return (
        <ModalSelector
            data={listKeyLable}
            initValueTextStyle={
                {
                    color: "#000",
                    textAlign: "left",
                }
            }
            selectStyle={{
                // textAlign: "left",
                // padding: 2,
                borderColor: Colors.appSecondaryColor,
            }}
            cancelText={"Cancel"}
            selectedItemTextStyle={{ fontWeight: "bold" }}
            optionContainerStyle={{ opacity: 1 }}
            // selectTextStyle={{ textAlign: "left" }}
            initValue={placeholder ?? "Select"}
            onChange={(option) => {
                if (option.key && option.label) {
                    onChange(option.key.toString(), option.label.toString());
                } else {
                    onChange(option.key.toString(), '');
                }
                //   alert(`${option.label} (${option.key}) nom nom nom`);
            }}
            {...overrideProps}
        />
    );
}
