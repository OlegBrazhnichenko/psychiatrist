const initialState = {
    symptoms: [],
    favorites: [],
    favoriteCardsIds: [],
};

export default function Cards (state = initialState, action) {

    switch(action.type) {
        case "UPLOAD_SYMPTOMS": return {
            ...state,
            symptoms: action.symptoms,
        };
        case "UPLOAD_CARDS": return {
            ...state,
            symptoms: [...action.cards]
        };



        case "UPLOAD_FAVORITES": return {
            ...state,
            favorites: action.favorites,
        };

        case "ADD_NEW_FAVORITE": return {
            ...state,
            symptoms: [...state.symptoms, action.card],
        };



        case "SET_FAVORITE_CARDS_IDS": return {
            ...state,
            favoriteCardsIds: [...action.ids]
        };

        case "ADD_FAVORITE_CARD_ID": return {
            ...state,
            favoriteCardsIds: [...state.favoriteCardsIds, action.id]
        };

        default: return state;
    }
}