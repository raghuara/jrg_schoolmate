import { createSlice } from '@reduxjs/toolkit';
import LogoImage from '../../Images/Login/MSMSLogo.png';

const initialState = {
  logo: LogoImage,
  title: "Edu Connect",
  darkColor: "#65075B",
  mainColor: "#A90B98",
  lightColor: "#E5B6E0",
  textColor: "#ffffff",
  backgroundColor: "#F6E7F5",
};

const websiteSettingsSlice = createSlice({
  name: 'websiteSettings',
  initialState,
  reducers: {
    setWebsiteSettings: (state, action) => {
      state.logo = action.payload.logo;
      state.title = action.payload.title;
      state.darkColor = action.payload.darkColor;
      state.mainColor = action.payload.mainColor;
      state.lightColor = action.payload.lightColor;
      state.textColor = action.payload.textColor;
      state.backgroundColor = action.payload.backgroundColor;
    },
  },
});

export const { setWebsiteSettings } = websiteSettingsSlice.actions;
export const selectWebsiteSettings = (state) => state.websiteSettings;

export default websiteSettingsSlice.reducer;
