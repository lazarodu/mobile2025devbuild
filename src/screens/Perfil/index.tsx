import { View, Text, FlatList, Alert, RefreshControl } from "react-native";
import { styles } from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { ComponentButtonInterface, ComponentLoading } from "../../components";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import { makeLoanUseCases } from "../../core/factories/makeLoanUseCases";
import { makeVinylRecordUseCases } from "../../core/factories/makeVinylRecordUseCases";
import { Loan } from "../../core/domain/entities/Loan";
import { VinylRecord } from "../../core/domain/entities/VinylRecord";

type ActiveLoan = {
    loan: Loan;
    vinyl: VinylRecord;
}

export function PerfilScreen() {
    const { setLogin, user } = useAuth();
    const [activeLoans, setActiveLoans] = useState<ActiveLoan[]>([]);
    const [loading, setLoading] = useState(false);
    const loanUseCases = makeLoanUseCases();
    const vinylRecordUseCases = makeVinylRecordUseCases();

    async function fetchActiveLoans() {
        if (!user) return;
        setLoading(true);
        try {
            const loans = await loanUseCases.findLoansByUser.execute(user.id);
            const active = loans.filter(l => !l.returnDate);
            
            const loansWithVinyls: ActiveLoan[] = [];
            for (const loan of active) {
                const vinyl = await vinylRecordUseCases.findVinylRecord.execute({ id: loan.vinylRecordId });
                if (vinyl) {
                    loansWithVinyls.push({ loan, vinyl });
                }
            }
            setActiveLoans(loansWithVinyls);
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível buscar seus empréstimos.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchActiveLoans();
    }, [user]);

    async function handleReturn(loanId: string) {
        try {
            await loanUseCases.returnVinylRecord.execute({ loanId });
            Alert.alert("Sucesso", "Vinil devolvido com sucesso!");
            fetchActiveLoans();
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Falha ao devolver o vinil.");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>{user?.name.value || "Usuário"}</Text>
            </View>
            
             <View style={styles.section}>
                <Text style={styles.sectionTitle}>Empréstimos Ativos</Text>
                {loading ? <ComponentLoading /> : (
                    <FlatList
                        data={activeLoans}
                        keyExtractor={item => item.loan.id}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchActiveLoans} />}
                        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum empréstimo ativo.</Text>}
                        renderItem={({ item }) => (
                            <View style={styles.loanItem}>
                                <Text style={styles.loanText}>{item.vinyl.band.value} - {item.vinyl.album.value}</Text>
                                <ComponentButtonInterface 
                                    title="Devolver" 
                                    type="primary" 
                                    onPress={() => handleReturn(item.loan.id)}
                                />
                            </View>
                        )}
                    />
                )}
            </View>
            
            <ComponentButtonInterface title="Sair" type="danger" onPress={() => setLogin(false)} />
        </View>
    )
}