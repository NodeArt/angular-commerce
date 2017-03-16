# Nodeart-Components-Loader

Angular 2 webpack loader that convert templates and styles paths in components if there are custom templates.

## Tutorial

1. In your webpack config file add path to custom templates and style folders. For getting path to project's root use *app-root-path*
Example: 
```javascript
let appRoot = require('app-root-path');
let path = require('path');
let templatesPath = path.join(appRoot + '/src/@nodeart/templates');
let stylesPath =  path.join(appRoot + '/src/@nodeart/styles');
```

2. Install nodeart-components-loader from npm:
```
npm install --save nodeart-components-loader
```

3. Add loader to webpack config file
```javascript
test: /\.ts$/,
loaders: [
    'nodeart-loader?templatesPath=' + templatesPath + '&stylesPath=' + stylesPath
    ]
```

4. Create custom html template in your templates folder with the same origin template. Loader will change path.
5. Finish