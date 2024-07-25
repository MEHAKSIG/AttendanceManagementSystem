import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ContextMenuType } from '../../constants/Config';
import GlobalStyles from '../../shared/GlobalStyles';
import { PasswordIcon, PlusIcon, RefreshIcon } from '../../shared/Icons';
import CommonContextMenu from './CommonContextMenu';

export interface ContextMenu {
    type: ContextMenuType,
    size?: number,
    color?: string
}
export interface ContextMenuIcons {
    menus: ContextMenu[],
    onPress: (menuType: string) => void
}
export default function ContextMenuIcons(props: ContextMenuIcons) {
    const { menus, onPress } = props;
    return (
        <View style={GlobalStyles.rowFlexEnd}>
            {menus.map((menu, index) => {
                return (
                    <>
                        {menu.type === "REFRESH" && (
                            <View
                                key={`${menu.type}_view`}
                            >
                                <TouchableOpacity
                                    key={`${menu.type}_TO`}
                                    style={{ marginRight: 8 }}
                                    onPress={() => {
                                        onPress(menu.type);
                                    }}
                                >
                                    <RefreshIcon
                                        key={`${menu.type}_Icon`}
                                        size={menu.size}
                                        color={menu.color}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                        {menu.type === "ADD" && (
                            <View
                                key={`${menu.type}_view`}
                            >
                                <TouchableOpacity
                                    key={`${menu.type}_TO`}
                                    style={{ marginRight: 8 }}
                                    onPress={() => {
                                        onPress(menu.type);
                                    }}
                                >
                                    <PlusIcon
                                        key={`${menu.type}_Icon`}
                                        size={menu.size}
                                        color={menu.color}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                        {menu.type === "CHANGE_PASSWORD" && (
                            <View
                                key={`${menu.type}_view`}
                            >
                                <TouchableOpacity
                                    key={`${menu.type}_TO`}
                                    style={{ marginRight: 8 }}
                                    onPress={() => {
                                        onPress(menu.type);
                                    }}
                                >
                                    <PasswordIcon
                                        key={`${menu.type}_Icon`}
                                        size={menu.size}
                                        color={menu.color}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}

                        {menu.type === "LOGOUT" && (
                            <View
                                key={`${menu.type}_view`}
                            >
                                <CommonContextMenu size={menu.size} />
                            </View>
                        )}
                    </>
                );
            })}
        </View>
    );
}
