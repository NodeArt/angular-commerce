# 2.1.55

### Features

* **add-product-component:** Get category from parentCategory=1, in text updates support for inner categories
* **add-props-component:** Sets parent category=1, in text updates support for inner categories

# 2.1.54

### Features

* **firebase-connector:** Perfomance improvements: change firebase .on to once
* **all components:** Refactor to new firebase-connector

# 2.1.53

### Changes

* **all components:** Change private fields to protected in constructor

# 2.1.52

### Changes

* **productservice:** Change getProducts method - set size argument optional
* **product-component:** Put constructor code to ngOnInit, change private methods to public

# 2.1.51

### Bug fixes

* **firebase-connector:** Add catch to loginEmail method

# 2.1.50

### Bug fixes

* **firebase-connector:** Fix bug with catch in registerUser method

# 2.1.49

### Bug fixes

* **basket-component, payments-component:** Removed types

# 2.1.48

### Features

* **firebase-connector:** Update firebase auth methods to angularfire2 4.0.0-rc.0

# 2.1.47

### Bug fixes

* **seo-text-component:** Change OnInit interface to OnChanges 

# 2.1.45

### Features

* **dal, firebase-connector:** Add getSeoText method
 
# 2.1.44

### Features

* **seo-text-component:** Create seo-text-component
 
# 2.1.43

### Changes

* **dal:** Update method for getting orders
 
# 2.1.42

### Changes

* **product-list-component, attributes-search-component:** adopt for query parameters in URL
 
# 2.1.41

### Bug fixes

* **dal:** update getOrdersByUserId method to Firebase Flashlight 3.0
 
# 2.1.40

### Features

* **product-component:** add items number field for product

# 2.1.39

### Bug fixes

* **product-list-component, products-service:** fix when after filtering there no matches

# 2.1.38

### Features

* **payments-component:** add deliveryCompany input

# 2.1.37

### Refactor

* **product-component:** change private instances to protected, some refactorings with methods

# 2.1.36

### Bug fixes

* **product-list-component:** getProducts after initialize route param

# 2.1.35

### Refactor

* **categories-component:** add inputs for generalCategoryId and routeName

### Bug fixes

* **product-list-component:** add export to ProductListComponent in index.ts

# 2.1.34

### Refactor

* **product-list-component:** temporary magic number to max price because of ElasticSearch

# 2.1.33

### Refactor

* **auth-service:** change firebaseUid to uid in register form.

# 2.1.32

### Bug fixes

* **auth-service:** fix bugs with saving user data with custom auth

# 2.1.31

### Features 

* **search-bar-component:** fix bugs, some refactoring
* **productservice:** change getProducts method

# 2.1.30

### Features 

* **attributes-search-component:** emit true of false if categor has attributes
* **product-list-component:** add RouterModule, add boolean value isProductsHasAttributes if category has attributes

# 2.1.29

### Bug fixes 

* **product-service:** update to Firebase Flashlight 3.0

# 2.1.28

### Bug fixes 

* **product-list-component:** fix filtering of products by attributes

# 2.1.23-2.1.27

### Features 

* **firebase-connector:** small fixes in VK.com auth method
* **products-general-component:** add Output that emit categoryId when category updated

### Bug fixes 

* **productservice:** change filterProduct() method

# 2.1.22

### Features 

* **firebase-connector:** add VK.com auth method
* **product-service:** rewrite queries to Firebase Flashlight v3.0.0
* **product-list-component:** rewrite to new product-service
* **product-general-component:** add category update output



# 2.1.21

### Features 

* **firebase-connector, dal:** add getOrderSubject()
* **payments-component:** update Stripe component to new api, add validators

# 2.1.20

### Features

* **firebase-connector:** registerUser(registerForm) - add registerTimestapm
* **firebase-connector:** change names token-requests, token-response to payment-request, payment-response

### Bug fixes 

* **payments-container:** fix catch on subscribe

# 2.1.19

### Features

* **firebase-connector:** update communication with db to Flashlight 3.0

### Changes 

* **product-service:** change getOneProduct() method
* **DAL, firebase-connector:** remove getOneProduct() method
 
# 2.1.18

### Features

* **payments-components:** create PaymentsService (for now containing orderSubject with new orders)

### Bug fixes 

* **DAL:** edit query object in getOrdersByUserId method

# 2.1.17

### Features 

* **DAL, FirebaseConnector:** add listenOrders method