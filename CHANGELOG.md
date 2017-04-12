# 2.1.23-2.1.25

### Features 

* **firebase-connector:** small fixes in VK.com auth method
* **products-general-component:** add Output that emit categoryId when category updated

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