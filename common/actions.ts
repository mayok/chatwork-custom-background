export const SET_OPACITY = "SET_OPACITY";
export const SET_PROPERTY = "SET_PROPERTY";
export const SET_FILE = "SET_FILE";

export const setOpacity = (payload: string) => ({
    type: SET_OPACITY,
    payload
});

export const setProperty = (payload: string) => ({
    type: SET_PROPERTY,
    payload
});

export const setFile = (payload: string) => ({
    type: SET_FILE,
    payload
});
