import { useWindowDimensions } from 'react-native';

export const useLayout = () => {
  const { width, height } = useWindowDimensions();

  const horizontal = {
    xxSmall: width * 0.0125,
    xSmall: width * 0.025,
    small: width * 0.0375,
    medium: width * 0.05,
    large: width * 0.075,
  };

  const vertical = {
    xxSmall: height * 0.0125,
    xSmall: height * 0.025,
    small: height * 0.0375,
    medium: height * 0.05,
    normal: height * 0.065,
    large: height * 0.075,
  };

  return { horizontal, vertical };
};
