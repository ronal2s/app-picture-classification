module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
          'module-resolver',
          {
              root: ['./src'],
              extensions: ['.ios.js', '.android.js', '.js', '.ts', '.d.ts','.tsx', '.json'],
              alias: {
                  '@root': './',
                  '@src': './src',
                  '@assets': './assets',     
                  '@components': './src/components',  
                  '@contexts': './src/contexts',  
                  '@controllers': './src/controllers',  
                  '@models': './src/models',  
                  '@services': './src/services',  
                  '@types': './src/types',  
                  '@utils': './src/utils',  
                  '@views': './src/views',  

              },
          },
      ],
    ],
  };
};
