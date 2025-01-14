export const initialState = {
  basket: [],
  user: null,
};
const reducer = (state, action) => {
  console.log(state);
 
  switch (action.type) {
    case "ADD_TO_BASKET":
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return {
          ...state,
          basket: updatedBasket,
        };
      }
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }
      return {
        ...state,
        basket: newBasket,
      };
      case "SET_USER":
        return{
          ...state,
          user:action.user
        }
        case "EMPTY_BASKET":
          return{
            ...state,
            basket:[]
          }

    default:
      return state;
  }
};
export default reducer;
