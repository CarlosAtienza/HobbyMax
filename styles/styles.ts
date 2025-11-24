import { COLORS } from "@/constants/theme";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 25,
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    color: COLORS.success
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
slider: {
  width: 200,
  height: 40,
},
searchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchAvatarContainer: {
    marginRight: 15,
  },

  searchAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  searchInfo: {
    flex: 1,
    justifyContent: "center",
  },
  headerCard: {
    width: '100%',
    borderRadius: 20,
    padding: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  calendarContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  weekHeader: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
    width: 45,
  },
  todayButton: {
    backgroundColor: '#007AFF',
  },
  dayLabel: {
    fontSize: 12,
    color: '#333',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
 
  modalContainer: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 12,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  logItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logText: {
    fontSize: 15,
  },
  noLogsText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  hobbyHeaderSection: {
  backgroundColor: COLORS.white,
  marginBottom: 16,
},

hobbyHeaderImage: {
  width: '100%',
  height: 200,
  backgroundColor: COLORS.grayLight,
},

hobbyInfoContainer: {
  padding: 16,
},

hobbyTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: COLORS.primaryDark,
  marginBottom: 8,
},

hobbyDescription: {
  fontSize: 14,
  color: COLORS.gray,
  lineHeight: 20,
},

  goalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  checkboxContainer: {
    paddingTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  goalTitleCompleted: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  goalDescription: {
    fontSize: 14,
    color: '#666',
  },
  goalDescriptionCompleted: {
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
  progressContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
   addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9f0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
   emptyContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 12,
  },
   bulletContainer: {
    paddingTop: 2,
    marginRight: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  goalText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  countText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  hobbyStats: {
  fontSize: 13,
  color: '#666',
  fontWeight: '500',
},
successMessage: {
  fontSize: 16,
  color: '#333',
  textAlign: 'center',
  marginBottom: 10,
},
xpText: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#7F7FD5',
  textAlign: 'center',
},
levelUpText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#FFD700',
  textAlign: 'center',
  marginTop: 10,
},

});