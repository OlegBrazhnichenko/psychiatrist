export function uploadSymptoms(symptoms) {
    return {
        type: "UPLOAD_SYMPTOMS",
        symptoms
    }
}

export function uploadFavorites(favorites) {
    return {
        type: "UPLOAD_FAVORITES",
        favorites
    }
}

export function addNewFavorite(card) {
    return {
        type: "ADD_NEW_FAVORITE",
        card
    }
}

export function uploadCards(cards) {
    return {
        type: "UPLOAD_CARDS",
        cards
    }
}

export function setFavoriteCardsIds(ids) {
    return {
        type: "SET_FAVORITE_CARDS_IDS",
        ids
    }
}

export function addFavoriteCardId(id) {
    return {
        type: "ADD_FAVORITE_CARD_ID",
        id,
    }
}

export function removeFavoriteCardId(id) {
    return {
        type: "REMOVE_FAVORITE_CARD_ID",
        id,
    }
}