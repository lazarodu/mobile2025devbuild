import { NavigationContainer } from "@react-navigation/native";
import { MainDrawerNavigation } from "./MainDrawerNavigation";
import { LoginStackNavigation } from "./LoginStackNavigation";
import { useState } from "react";
import { useAuth } from "../context/auth";


export function Navigation() {
    const {login} = useAuth()
    return (
        <NavigationContainer>
            {login ? <MainDrawerNavigation /> : <LoginStackNavigation />}
        </NavigationContainer>
    )
}