import { COLORS } from "@/constants/theme";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: COLORS.white,
    fontSize: 16,
  },
  registerLink: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: { 
    width: 100,
    height: 100,
  },

  avatarContainer: {
    marginBottom: 20,
    alignItems: "center",
  },

  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    overflow: "hidden",
  },
  
  avatarText: {
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 10,
  },

  username: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "white" 
  },
  settingsButton: { 
    marginLeft: "auto" 
  },
  settingsText: { 
    fontSize: 22, 
    color: "white" 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
    color: "white",
  },

  hobbyCard: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  hobbyImage: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 15 
  },

  hobbyInfo: { flex: 1 },
  hobbyName: { fontSize: 16, fontWeight: "bold", color: "black" },
  hobbyDetails: { fontSize: 14, color: "gray" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "blue",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navIcon: { fontSize: 22, color: "white" },
  loadingText: { flex: 1, textAlign: "center", color: "white", marginTop: 50 },
  hobbyList: {
    justifyContent: 'center', 
    width: '100%',
    padding: 10,
  }
});