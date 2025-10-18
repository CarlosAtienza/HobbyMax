import { COLORS } from "@/constants/theme";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   
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
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 10,
    alignSelf: "stretch",
  },
  hobbyImageCard: {
    marginRight: 15,
    borderRadius: 25,
    overflow: "hidden",
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  hobbyImage: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 15 
  },

  hobbyInfo: { flex: 1 },

  hobbyName: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "black" 
  },
  hobbyDetails: { 
    fontSize: 14, 
    color: "gray" 
  },

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
    width: '100%',
    padding: 10,
  },
  hobbyImagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover',
  },
  hobbyLogContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  createLogCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 100,
  },
  sectionTitleBlack: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginTop: 10,
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionInput: {
  width: '100%',
  minHeight: 100,
  backgroundColor: COLORS.white,
  borderRadius: 12,
  padding: 10,
  marginBottom: 20,
  fontSize: 16,
  textAlignVertical: 'top', 
  borderWidth: 1,
  borderColor: '#ccc', 
},

});