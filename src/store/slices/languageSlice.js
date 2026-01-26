import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentLanguage: 'en', // 'en', 'ur', 'both'
    isRTL: false,
    showBoth: false,
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.currentLanguage = action.payload;
            state.isRTL = action.payload === 'ur';
            state.showBoth = action.payload === 'both';

            // Update HTML dir attribute
            if (typeof document !== 'undefined') {
                document.documentElement.dir = state.isRTL ? 'rtl' : 'ltr';
            }
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
