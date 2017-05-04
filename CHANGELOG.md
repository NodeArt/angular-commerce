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