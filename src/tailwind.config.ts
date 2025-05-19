import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};

export default config;
