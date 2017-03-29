# Store components

Online store component written in Angular.  

Full API and documentation check [here](https://nodeart.github.io/).

Check change log [here](https://github.com/NodeArt/angular-commerce/blob/master/CHANGELOG.md)

## Store architecture

### Components dependencies
Most of components are separated from each other. The most common dependency is `Data Abstraction Layer (DAL)`.
DAL is a bridge for some connector ( for now Firebase Connector ). DAL contains methods for manipulating with database 
(get products, add products to shopping cart, remove products from shopping cart etc.), auth api (register user, login, logout etc.).

### Querying to database
As we started to use firebase for database, auth, storage, it was a question how to process heavy queries with aggregations, multiple conditions etc. [Firebase Realtime Databese api](https://firebase.google.com/docs/database/) was very simple for our requirentments.  
After some time of research we stayed at `ElasticSearch`.
It's fast, allow to make heavy hard queries and Firebase team wrote an adapted to firebase called [Firebase Flashlight](https://github.com/firebase/flashlight).  
For example, queries in `Product Service` are written like `ElasticSearch queries`. 

### Organization of products
About products organization you can read in docs for services, for example, `Product service` or `Basket service`.

### Creating other connectors 
If you want to create you own connector you must adopt it to `ElasticSearch flashlight` output.

## Docs

To create documentation: 
```
npm i
npm run build-docs
```

To serve documentation: 
```
npm run serve-docs
```


