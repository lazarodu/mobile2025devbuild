import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  base: {
    borderRadius: 5,
    margin: 10,
    padding: 10
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  third: {
    backgroundColor: colors.third,
  },
  danger: {
    backgroundColor: colors.danger
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  },
  contentRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
  },
  iconContainer: { 
    marginHorizontal: 4,
    padding: 2,
    color: colors.white
  }
})
