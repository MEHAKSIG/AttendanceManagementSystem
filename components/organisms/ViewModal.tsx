import React from "react";
import { StyleProp, TextStyle, ViewComponent } from "react-native";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Button, Overlay } from "react-native-elements";
import GlobalStyles from "../../shared/GlobalStyles";

const { width } = Dimensions.get("window");
export interface ViewModalProps {
    isVisible: boolean,
    setIsVisible?: any,
    children?: React.ReactElement,
    title?: string,
    titleStyle?: StyleProp<TextStyle>,
    onDismiss?: () => void,
    onSubmit?: () => void,
    closeTextOverride?: string,
    submitTextOverride?: string,
    isLoading?: boolean,
    actionButtons?: React.ReactElement,
    hideActionButtons?: boolean,
    hideSubmitButtons?: boolean,
}

export default function ViewModal(props: ViewModalProps) {

    const { isVisible, setIsVisible, children, title, titleStyle, onDismiss, onSubmit, closeTextOverride, submitTextOverride, isLoading, actionButtons, hideActionButtons, hideSubmitButtons } = props;

    const toggleOverlay = () => {
        setIsVisible && setIsVisible(!isVisible);
        if (onDismiss) {
            onDismiss();
        }
    };
    return (
        <Overlay
            style={[styles.modalStyle]}
            isVisible={isVisible}
            onBackdropPress={toggleOverlay}
            //   fullScreen={true}
            overlayStyle={styles.modalStyle}
            onDismiss={() => {
                // alert("onDismiss");
            }}
        >
            <View style={styles.modalBody}>
                {title && <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>}

                <View>{children}</View>
            </View>
            {
                hideActionButtons !== true &&

                <View style={GlobalStyles.rowFlexEnd}>
                    <View style={{ paddingRight: 10 }}>
                        <Button
                            type="outline"
                            title={closeTextOverride ?? "Close"}
                            titleStyle={{ fontSize: 13, paddingLeft: 5, paddingRight: 5 }}
                            onPress={toggleOverlay}
                        />
                    </View>
                    {
                        hideSubmitButtons !== true && (

                            <View>
                                <Button
                                    type="solid"
                                    titleStyle={{ fontSize: 13, paddingLeft: 5, paddingRight: 5 }}

                                    title={submitTextOverride ?? "Submit"}
                                    onPress={() => {
                                        if (onSubmit) {
                                            onSubmit();
                                        }
                                    }}
                                    loading={isLoading}
                                />
                            </View>
                        )
                    }
                    {actionButtons}
                </View>}
        </Overlay>
    );
}

const styles = StyleSheet.create({
    modalStyle: {
        width: width - 80,
    },
    titleStyle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        // textAlign: "center",
    },
    modalBody: {
        // width: width - 80,
        minHeight: 100,
        marginBottom: 10,
    },
});
