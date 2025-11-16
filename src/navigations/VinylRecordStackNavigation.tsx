import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ScreenListVinylRecords, ScreenVinylRecordDetails, ScreenRegisterVinylRecord, ScreenEditVinylRecord, ScreenBorrowMap } from "../screens"
import { VinylRecord } from "../core/domain/entities/VinylRecord"

type VinylRecordStackParamList = {
    ListVinylRecords: undefined
    VinylRecordDetails: { record: VinylRecord }
    RegisterVinylRecord: undefined
    EditVinylRecord: { record: VinylRecord }
    BorrowMapScreen: { record: VinylRecord }
}

type VinylRecordScreenProp = NativeStackNavigationProp<VinylRecordStackParamList, 'ListVinylRecords'>
export type VinylRecordTypes = {
    navigation: VinylRecordScreenProp
}
const VinylRecordStack = createNativeStackNavigator<VinylRecordStackParamList>()
export function VinylRecordStackNavigation() {
    return (
        <VinylRecordStack.Navigator screenOptions={{ headerShown: false }}>
            <VinylRecordStack.Screen name="ListVinylRecords" component={ScreenListVinylRecords} />
            <VinylRecordStack.Screen name="VinylRecordDetails" component={ScreenVinylRecordDetails} />
            <VinylRecordStack.Screen name="RegisterVinylRecord" component={ScreenRegisterVinylRecord} />
            <VinylRecordStack.Screen name="EditVinylRecord" component={ScreenEditVinylRecord} />
            <VinylRecordStack.Screen name="BorrowMapScreen" component={ScreenBorrowMap} />
        </VinylRecordStack.Navigator>
    )
}