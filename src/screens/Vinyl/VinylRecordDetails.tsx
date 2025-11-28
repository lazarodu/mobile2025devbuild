import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ComponentButtonInterface } from "../../components";
import { VinylRecord } from "../../core/domain/entities/VinylRecord";
import { VinylRecordTypes } from "../../navigations/VinylRecordStackNavigation";
import { makeVinylRecordUseCases } from "../../core/factories/makeVinylRecordUseCases";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { makeLoanUseCases } from "../../core/factories/makeLoanUseCases";
import { useEffect, useState } from "react";
import { Loan } from "../../core/domain/entities/Loan";
import { useAuth } from "../../context/auth";


export function VinylRecordDetailsScreen({ navigation }: VinylRecordTypes) {
    const route = useRoute()
    const { record } = route.params as { record: VinylRecord };
    const vinylRecordUseCases = makeVinylRecordUseCases();
    const loanUseCases = makeLoanUseCases();
    const { user } = useAuth(); // Get the authenticated user
    const [currentLoan, setCurrentLoan] = useState<Loan | null>(null);

    useEffect(() => {
        async function fetchLoanStatus() {
            const loan = await loanUseCases.findCurrentLoanOfRecord.execute(record.id);
            setCurrentLoan(loan);
        }
        fetchLoanStatus();
    }, [record.id]);

    async function handleDelete() {
        Alert.alert("Delete", "Você tem certeza que deseja apagar esse registro?", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: async () => {
                    try {
                        await vinylRecordUseCases.deleteVinylRecord.execute({ id: record.id });
                        const segments = record.photo.url.split('/');
                        await vinylRecordUseCases.deleteFile.execute({ bucket: 'photos', path: segments.pop() || '' })
                        Alert.alert("Success", "Registro apagado com sucesso");
                        navigation.navigate("ListVinylRecords");
                    } catch (error) {
                        Alert.alert("Error", "Falha ao apagar o registro");
                    }
                }
            }
        ])
    }

    const isOwner = user && user.id === record.ownerId; // Check if the logged-in user is the owner

    return (
        <View style={styles.container}>
            <Image source={{ uri: record.photo.url }} style={styles.imagePreview} />
            <Text>Vinyl Record Details</Text>
            <Text>Band: {record.band.value}</Text>
            <Text>Album: {record.album.value}</Text>
            <Text>Year: {record.year}</Text>
            <Text>Number of Tracks: {record.numberOfTracks}</Text>
            <Text>Status: {currentLoan ? "Emprestado" : "Disponível"}</Text>
            <View style={styles.contentRow}>
                {isOwner && ( // Conditionally render if the user is the owner
                    <>
                        <ComponentButtonInterface type="secondary" title="Edit"
                            onPress={() => navigation.navigate("EditVinylRecord", { record })}
                        >
                            <ComponentButtonInterface.Icon>
                                <Entypo name="pencil" size={24} color={colors.white} />
                            </ComponentButtonInterface.Icon>
                        </ComponentButtonInterface>
                        <ComponentButtonInterface type="danger" title="Delete"
                            onPress={handleDelete}
                        >
                            <ComponentButtonInterface.Icon>
                                <Entypo name="trash" size={24} color={colors.white} />
                            </ComponentButtonInterface.Icon>
                        </ComponentButtonInterface>
                    </>
                )}
                {!currentLoan && !isOwner && (
                    <ComponentButtonInterface type="third" title="Emprestar"
                        onPress={() => navigation.navigate("BorrowMapScreen", { record })}
                    >
                        <ComponentButtonInterface.Icon>
                            <Entypo name="map" size={24} color={colors.white} />
                        </ComponentButtonInterface.Icon>
                    </ComponentButtonInterface>
                )}
            </View>
            <ComponentButtonInterface type="primary" title="Voltar"
                onPress={() => navigation.navigate("ListVinylRecords")}
            />
        </View>
    )
}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    contentRow: {
        flexDirection: "row"
    },
    imagePreview: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
})