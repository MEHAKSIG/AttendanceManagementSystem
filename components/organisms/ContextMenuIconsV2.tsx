import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ContextMenuType } from '../../constants/Config'
import GlobalStyles from '../../shared/GlobalStyles'
import { PasswordIcon, PlusIcon, RefreshIcon } from '../../shared/Icons'
import CommonContextMenu from './CommonContextMenu'

export interface IconProps {
    key?: number,
    type: ContextMenuType,
    size?: number,
    color?: string
}
export interface ContextMenu {
    show: boolean,
    iconProp: IconProps
}

export interface ContextMenuIconsPropsV2 {
    refresh?: ContextMenu,
    add?: ContextMenu,
    changePassword?: ContextMenu,
    logout?: ContextMenu,
    // menus: ContextMenu[],
    onPress: (menuType: string) => void
}

export default function ContextMenuIconsV2(props: ContextMenuIconsPropsV2) {
    const { refresh, add, changePassword, logout, onPress } = props;
    return (
        <View key={'contextmenu'} style={GlobalStyles.rowFlexEnd}>

            {refresh?.show && (
                <View
                    key={`${refresh.iconProp.key}_view`}
                >
                    <TouchableOpacity
                        // key={`${menu.key}_TO`}
                        style={{ marginRight: 8 }}
                        onPress={() => {
                            onPress(refresh.iconProp.type);
                        }}
                    >
                        <RefreshIcon
                            // key={`${menu.key}_Icon`}
                            size={refresh.iconProp.size}
                            color={refresh.iconProp.color}
                        />
                    </TouchableOpacity>
                </View>
            )}

            {add?.show && (
                <View
                    key={`${add.iconProp.key}_view`}
                >
                    <TouchableOpacity
                        // key={`${menu.key}_TO`}
                        style={{ marginRight: 8 }}
                        onPress={() => {
                            onPress(add.iconProp.type);
                        }}
                    >
                        <PlusIcon
                            // key={`${menu.type}_Icon`}
                            size={add.iconProp.size}
                            color={add.iconProp.color}
                        />
                    </TouchableOpacity>
                </View>
            )}
            {changePassword?.show && (
                <View
                    key={`${changePassword.iconProp.key}_view`}
                >
                    <TouchableOpacity
                        // key={`${menu.key}_TO`}
                        style={{ marginRight: 8 }}
                        onPress={() => {
                            onPress(changePassword.iconProp.type);
                        }}
                    >
                        <PasswordIcon
                            // key={`${menu.key}_Icon`}
                            size={changePassword.iconProp.size}
                            color={changePassword.iconProp.color}
                        />
                    </TouchableOpacity>
                </View>
            )}

            {logout?.show && (
                <View
                    key={`${logout.iconProp.key}_view`}
                >
                    <CommonContextMenu size={logout.iconProp.size}  />
                </View>
            )}
        </View>
    );
}
