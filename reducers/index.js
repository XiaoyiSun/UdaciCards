import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.payload.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.payload.deck,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.payload.deckName]: [...state[action.payload.deckName], {
          question: action.payload.question,
          answer: action.payload.answer,
        }],
      };
    default:
      return state;
  }
}

