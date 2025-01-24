export const INITIAL_STATE = {
  status: "",
  title: "",
  description: "",
  dueDate: "",
  assignedTo: null,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_TASKS":
      return action.payload;
    case "CREATE_TASK":
      return [...state, action.payload];
    case "UPDATE_TASK":
      return state.map((task) =>
        task._id === action.payload._id ? { ...task, ...action.payload } : task
      );
    case "MOVE_TASK":
      return state.map((task) =>
        task._id === action.payload.taskId
          ? { ...task, status: action.payload.newStatus }
          : task
      );
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};
