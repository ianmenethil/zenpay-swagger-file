# Postman vs TravelPay API - Comprehensive Comparison Report

**Generated:** 2025-11-19T00:49:09.993Z

**Purpose:** 100% field-by-field comparison to identify ALL differences between Postman collection and TravelPay API specification.

## 📊 Executive Summary

| Metric | Postman | TravelPay | Status |
|--------|---------|-----------|--------|
| **API Name** | Zenith Payments Developer Guide - Merchant APIs | Payments API v2.0 | - |
| **File** | zenith-openapi-31.json | openapi.json | - |
| **Operations** | 35 | 39 | ⚠️ |
| **Schemas** | 0 | 59 | ⚠️ |

## 🔍 Differences Summary

- **Total Differences Found:** 644
- 🔴 **Critical:** 59 (structure/compatibility issues)
- 🟡 **Important:** 224 (documentation/usability)
- ⚪ **Informational:** 361 (minor differences)

## 🔴 Critical Differences (59)

These differences affect API structure, compatibility, and functionality.

| # | Location | Field | Type | Postman | TravelPay |
|---|----------|-------|------|---------|----------|
| 1 | `paths./v2/batchpayments.post.requestBody.content.application/json.schema.type` | type | missing | object | *(not set)* |
| 2 | `paths./v2/batchpayments.post.requestBody.required` | required | added | *(not set)* | true |
| 3 | `paths./v2/cardproxies.post.requestBody.required` | required | added | *(not set)* | true |
| 4 | `paths./v2/customers.get.parameters[0].in` | in | modified | header | query |
| 5 | `paths./v2/customers.get.parameters[0].required` | required | added | *(not set)* | false |
| 6 | `paths./v2/customers.get.parameters[1].in` | in | modified | header | query |
| 7 | `paths./v2/customers.get.parameters[1].schema.type` | type | modified | string | array |
| 8 | `paths./v2/customers.get.parameters[1].required` | required | added | *(not set)* | false |
| 9 | `paths./v2/customers.get.parameters[2].schema.format` | format | added | *(not set)* | date-time |
| 10 | `paths./v2/customers.get.parameters[2].required` | required | added | *(not set)* | false |
| 11 | `paths./v2/customers.get.parameters[3].schema.type` | type | modified | integer | string |
| 12 | `paths./v2/customers.get.parameters[3].schema.format` | format | added | *(not set)* | date-time |
| 13 | `paths./v2/customers.get.parameters[3].required` | required | added | *(not set)* | false |
| 14 | `paths./v2/customers.get.parameters[4].schema.format` | format | added | *(not set)* | date-time |
| 15 | `paths./v2/customers.get.parameters[4].required` | required | added | *(not set)* | false |
| 16 | `paths./v2/customers.get.parameters[5].schema.format` | format | added | *(not set)* | date-time |
| 17 | `paths./v2/customers.get.parameters[5].required` | required | added | *(not set)* | false |
| 18 | `paths./v2/customers.get.parameters[6].schema.type` | type | modified | string | array |
| 19 | `paths./v2/customers.get.parameters[6].required` | required | added | *(not set)* | false |
| 20 | `paths./v2/customers.get.parameters[7].schema.type` | type | modified | string | integer |
| 21 | `paths./v2/customers.get.parameters[7].schema.format` | format | added | *(not set)* | int32 |
| 22 | `paths./v2/customers.get.parameters[7].required` | required | added | *(not set)* | false |
| 23 | `paths./v2/customers.get.parameters[8].schema.format` | format | added | *(not set)* | int32 |
| 24 | `paths./v2/customers.get.parameters[8].required` | required | added | *(not set)* | false |
| 25 | `paths./v2/customers.get.responses.200.description` | description | modified | Successful response | Return all the customers satisfies the filters. |
| 26 | `paths./v2/customers.post.requestBody.required` | required | added | *(not set)* | true |
| 27 | `paths./v2/payments.get.parameters[0].in` | in | modified | header | query |
| 28 | `paths./v2/payments.get.parameters[0].required` | required | added | *(not set)* | false |
| 29 | `paths./v2/payments.get.parameters[1].schema.format` | format | added | *(not set)* | date-time |
| 30 | `paths./v2/payments.get.parameters[1].required` | required | added | *(not set)* | false |
| 31 | `paths./v2/payments.get.parameters[2].schema.format` | format | added | *(not set)* | date-time |
| 32 | `paths./v2/payments.get.parameters[2].required` | required | added | *(not set)* | false |
| 33 | `paths./v2/payments.get.parameters[3].schema.format` | format | added | *(not set)* | date-time |
| 34 | `paths./v2/payments.get.parameters[3].required` | required | added | *(not set)* | false |
| 35 | `paths./v2/payments.get.parameters[4].schema.type` | type | modified | string | integer |
| 36 | `paths./v2/payments.get.parameters[4].schema.format` | format | added | *(not set)* | int32 |
| 37 | `paths./v2/payments.get.parameters[4].schema.enum` | enum | added | *(not set)* | [0,1,2] |
| 38 | `paths./v2/payments.get.parameters[4].required` | required | added | *(not set)* | false |
| 39 | `paths./v2/payments.get.parameters[5].schema.type` | type | modified | integer | array |
| 40 | `paths./v2/payments.get.parameters[5].required` | required | added | *(not set)* | false |
| 41 | `paths./v2/payments.get.parameters[6].schema.type` | type | modified | string | boolean |
| 42 | `paths./v2/payments.get.parameters[6].required` | required | added | *(not set)* | false |
| 43 | `paths./v2/payments.get.parameters[7].schema.type` | type | modified | string | boolean |
| 44 | `paths./v2/payments.get.parameters[7].required` | required | added | *(not set)* | false |
| 45 | `paths./v2/payments.get.parameters[8].schema.type` | type | modified | boolean | integer |
| 46 | `paths./v2/payments.get.parameters[8].schema.format` | format | added | *(not set)* | int32 |
| 47 | `paths./v2/payments.get.parameters[8].required` | required | added | *(not set)* | false |
| 48 | `paths./v2/payments.get.parameters[9].schema.type` | type | modified | boolean | integer |
| 49 | `paths./v2/payments.get.parameters[9].schema.format` | format | added | *(not set)* | int32 |
| 50 | `paths./v2/payments.get.parameters[9].required` | required | added | *(not set)* | false |
| 51 | `paths./v2/payments.get.responses.200.description` | description | modified | Successful response | Return all the payments satisfies the filters. |
| 52 | `paths./v2/payments.post.requestBody.required` | required | added | *(not set)* | true |
| 53 | `paths./v2/requestpays.post.requestBody.content.application/json.schema.type` | type | missing | object | *(not set)* |
| 54 | `paths./v2/requestpays.post.requestBody.required` | required | added | *(not set)* | true |
| 55 | `paths./v2/preauths.get.parameters[0].in` | in | modified | header | query |
| 56 | `paths./v2/preauths.get.parameters[0].required` | required | added | *(not set)* | false |
| 57 | `paths./v2/preauths.get.responses.200.description` | description | modified | Successful response | Found preauths. |
| 58 | `paths./v2/preauths.post.requestBody.required` | required | added | *(not set)* | true |
| 59 | `paths./v2/diagnostics/ping.get.responses.200.description` | description | modified | Successful response | Batch Payment summary |

## 🟡 Important Differences (224)

These differences affect documentation quality and API usability.

### 📝 Description Differences (44)

| Location | Postman | TravelPay |
|----------|---------|----------|
| `info.description` | OpenAPI specification generated from Postman collection: Zenith Payments Develop... | Payments Web Api. |
| `servers[0].description` | Sandbox Environment | *(not set)* |
| `tags[0].description` | ## Basic Authentication

[Basic authentication](https://en.wikipedia.org/wiki/Ba... | Manage Batch Payments. You can create or fetch batch payments. |
| `tags[1].description` | #### POST: Process Batch Payment

This endpoint allows merchants to upload and p... | Manage card proxies. |
| `tags[2].description` | #### POST: Create Card Proxy

This endpoint generates a card proxy (a tokenized ... | Manage customers |
| `tags[3].description` | This API allows you to manage customers.

You can create customers, fetch custom... | System Diagnostics |
| `tags[4].description` | # **POST: Create Payment**

- This endpoint allows merchants to initiate a new p... | Manage Payments. You can create or fetch one-off payments. |
| `tags[5].description` | *(not set)* | Preauth -- Create, Fetch, Void and Capture |
| `tags[6].description` | This API allows you to manage request pays.

Using this API you can create new r... | Manage card and bank proxies. |
| `tags[7].description` | Pre-Authorization allows merchants to authorize a customers card and reserve fun... | Manage request to pays.You can create or fetch request pays. |
| `tags[8].description` | This API allows you to ping ZenPay internal servers.

Using this API you are abl... | Sessions |
| `paths./v2/batchpayments.post.description` | This method is used to upload batch payments as a collection of JSON and process... | *(not set)* |
| `paths./v2/batchpayments.post.requestBody.description` | *(not set)* | collection of batchpayment entries inside a container |
| `paths./v2/batchpayments/:batchPaymentId.get.description` | This method returns a summary of a batch payment using the batchPaymentID. | *(not set)* |
| `paths./v2/batchpayments/:batchPaymentId/entries.get.description` | This method returns a list of entries in a batch payment. | *(not set)* |
| `paths./v2/cardproxies.post.description` | Generate a card proxy.

Not recommended for software / sites that are not PCI DS... | *(not set)* |
| `paths./v2/cardproxies.post.requestBody.description` | *(not set)* | Card details required to generate a card proxy |
| `paths./v2/cardproxies/:cardProxy.delete.description` | Delete card proxy permanently from the system. This will not affect any customer... | *(not set)* |
| `paths./v2/customers.get.parameters[0].description` | *(not set)* | Customer reference |
| `paths./v2/customers.get.parameters[1].description` | *(not set)* | Customer statuses. Default is all. 0 - Open, 1 - AwaitingEmailVerfication, 2 - A... |

*... and 24 more description differences*

### 📌 Summary Differences (61)

| Location | Postman | TravelPay |
|----------|---------|----------|
| `paths./v2/batchpayments.post.summary` | Process Batch Payment | This Method will be return to upload payments batch as a col... |
| `paths./v2/batchpayments/:batchPaymentId.get.summary` | Fetch Batch Payment Summary by batchPaymentID | *(not set)* |
| `paths./v2/batchpayments/:batchPaymentId/entries.get.summary` | Fetch Batch Payment Transactions by batchPaymentId | *(not set)* |
| `paths./v2/cardproxies.post.summary` | Create Card Proxy | Generate card proxy. Not recommended for software / sites th... |
| `paths./v2/cardproxies/:cardProxy.get.summary` | Fetch Card Proxy Details | *(not set)* |
| `paths./v2/cardproxies/:cardProxy.delete.summary` | Delete Card Proxy | *(not set)* |
| `paths./v2/cardproxies/:cardProxy/pricing.get.summary` | Fetch Card Proxy Pricing | *(not set)* |
| `paths./v2/customers.get.summary` | Fetch all Customers based on the filters | Return customers based on the filter provided. |
| `paths./v2/customers.post.summary` | Create customer | Create customer using the provided details |
| `paths./v2/customers/.get.summary` | Fetch all Customers | *(not set)* |
| `paths./v2/customers/:customerReference.get.summary` | Fetch Customer by customerReference | *(not set)* |
| `paths./v2/customers/:customerReference/status.get.summary` | Fetch Customer status by customerReference | *(not set)* |
| `paths./v2/customers/:customerReference/status.put.summary` | Update the customer status | *(not set)* |
| `paths./v2/customers/:customerReference/profile.get.summary` | Fetch Customer profile by customerReference | *(not set)* |
| `paths./v2/customers/:customerReference/profile.put.summary` | Update the customer profile | *(not set)* |
| `paths./v2/customers/:customerReference/account.get.summary` | Fetch Customer payment method by customerReference | *(not set)* |
| `paths./v2/customers/:customerReference/account.put.summary` | Update the customer account | *(not set)* |
| `paths./v2/customers/:customerReference/paymentOption.get.summary` | Fetch Customer payment options by customerReference | *(not set)* |
| `paths./v2/customers/:customerReference/paymentOption.put.summary` | Update the customer payment option | *(not set)* |
| `paths./v2/customers/:customerReference/customerReference.put.summary` | Update the customer reference | *(not set)* |
| `paths./v2/payments.get.summary` | Fetch all Payments | *(not set)* |
| `paths./v2/payments.post.summary` | Perform OneOff Payment | Perform OneOff payment for a registered customer with custom... |
| `paths./v2/payments/:paymentReference.get.summary` | Fetch Payment details by paymentReference | *(not set)* |
| `paths./v2/payments/uniqueId/:merchantUniqueId.get.summary` | Fetch Payment details based on merchant unique reference | *(not set)* |
| `paths./v2/payments/:paymentReference/refundrequests.get.summary` | Returns all the refund requests details based on payment ref... | *(not set)* |
| `paths./v2/payments/:paymentReference/refundrequests.post.summary` | Allow the merchant to request a refund for provided payment ... | *(not set)* |
| `paths./v2/requestpays/:requestPayId.get.summary` | Api to get the request pay details | *(not set)* |
| `paths./v2/requestpays/:requestPayId/entries.get.summary` | Api to get the request pay entries | *(not set)* |
| `paths./v2/requestpays.post.summary` | Upload request to pay payments as a collection of json and p... | This Method will be return to upload request payments as a c... |
| `paths./v2/preauths/:preauthReference.get.summary` | Check PreAuth via preauthReference | *(not set)* |
| `paths./v2/preauths.get.summary` | Check PreAuth via customerReference | *(not set)* |
| `paths./v2/preauths.post.summary` | Create PreAuth | *(not set)* |
| `paths./v2/preauths/:preauthReference/captures.post.summary` | Capture PreAuth Card | *(not set)* |
| `paths./v2/preauths/:preauthReference/voids.put.summary` | Void PreAuth Request | *(not set)* |
| `paths./v2/diagnostics/ping.get.summary` | Ping | Ping method to get the server date time and version informat... |
| `paths./v2/batchpayments/{batchPaymentId}.get.summary` | *(not set)* | Get the batch payment summary. |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.summary` | *(not set)* | Method return all the Batch payment transactions based on ba... |
| `paths./v2/cardproxies/{cardProxy}.get.summary` | *(not set)* | Get card proxy detail |
| `paths./v2/cardproxies/{cardProxy}.delete.summary` | *(not set)* | Delete card proxy permanently from the system. This will not... |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.summary` | *(not set)* | Get pricing for card proxy and payment amount |
| `paths./v2/customers/{customerReference}.get.summary` | *(not set)* | Return the customer using the provided customer reference. |
| `paths./v2/customers/{customerReference}/status.get.summary` | *(not set)* | Get Customer status |
| `paths./v2/customers/{customerReference}/status.put.summary` | *(not set)* | Update the customer status |
| `paths./v2/customers/{customerReference}/account.get.summary` | *(not set)* | Get Customer credit / debit card or bank account |
| `paths./v2/customers/{customerReference}/account.put.summary` | *(not set)* | Update the customer account |
| `paths./v2/customers/{customerReference}/profile.get.summary` | *(not set)* | Get Customer profile |
| `paths./v2/customers/{customerReference}/profile.put.summary` | *(not set)* | Update the customer profile. |
| `paths./v2/customers/{customerReference}/paymentOption.get.summary` | *(not set)* | Get Customer payment option |
| `paths./v2/customers/{customerReference}/paymentOption.put.summary` | *(not set)* | Update the customer payment option |
| `paths./v2/customers/{customerReference}/customerReference.put.summary` | *(not set)* | Update the customer reference |
| `paths./v2/payments/{paymentReference}.get.summary` | *(not set)* | Returns Payment details based on Payment reference |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.summary` | *(not set)* | Returns Payment details based on merchant unique reference |
| `paths./v2/payments/{paymentReference}/refundrequests.get.summary` | *(not set)* | Returns all the refund requests details based on payment ref... |
| `paths./v2/payments/{paymentReference}/refundrequests.post.summary` | *(not set)* | Allow the merchant to request for refund for provided paymen... |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.summary` | *(not set)* |  |
| `paths./v2/proxies/{proxy}.get.summary` | *(not set)* | Get the payment information based on the proxy information p... |
| `paths./v2/proxies/{proxy}/pricing.get.summary` | *(not set)* | Get pricing for card/bank proxy and payment amount |
| `paths./v2/requestpays/{requestPayId}.get.summary` | *(not set)* | Api to get the request pay details |
| `paths./v2/requestpays/{requestPayId}/entries.get.summary` | *(not set)* | Api to get the request pay entries |
| `paths./v2/sessions/{sessionId}.get.summary` | *(not set)* | Not supported |
| `paths./v2/sessions.post.summary` | *(not set)* | Used to create session for Payment Plugin. The session creat... |

### 💡 Example Differences (22)

| Location | Postman | TravelPay |
|----------|---------|----------|
| `paths./v2/batchpayments.post.requestBody.content.application/json.schema.examples` | [{"batchPaymentEntries":[{"customerReference":"<st... | *(not set)* |
| `paths./v2/customers.get.parameters[0].examples` | {"default":{"value":"application/json"}} | *(not set)* |
| `paths./v2/customers.get.parameters[1].examples` | {"default":{"value":"{{ApiKey}}"}} | *(not set)* |
| `paths./v2/customers.get.parameters[2].examples` | {"default":{"value":"Ref1"}} | *(not set)* |
| `paths./v2/customers.get.parameters[3].examples` | {"default":{"value":"0"}} | *(not set)* |
| `paths./v2/customers.get.parameters[4].examples` | {"default":{"value":"2022-05-12"}} | *(not set)* |
| `paths./v2/customers.get.parameters[5].examples` | {"default":{"value":"2022-05-01"}} | *(not set)* |
| `paths./v2/customers.get.parameters[6].examples` | {"default":{"value":"2020-01-01"}} | *(not set)* |
| `paths./v2/customers.get.parameters[7].examples` | {"default":{"value":"2020-01-01"}} | *(not set)* |
| `paths./v2/customers.get.parameters[8].examples` | {"default":{"value":"22"}} | *(not set)* |

*... and 12 more example differences*

### 🔧 Other Important Differences (97)

| Location | Field | Type | Postman | TravelPay |
|----------|-------|------|---------|----------|
| `info.title` | title | modified | Zenith Payments Developer Guide - Merchant APIs | Payments API v2.0 |
| `info.version` | version | modified | 2.0.0 | V2 |
| `paths./v2/batchpayments.post.operationId` | operationId | added | *(not set)* | BatchPayments_CreateBatchPayment |
| `paths./v2/batchpayments/:batchPaymentId.get.tags` | tags | missing | ["BatchPayments"] | *(not set)* |
| `paths./v2/batchpayments/:batchPaymentId/entries.get.tags` | tags | missing | ["BatchPayments"] | *(not set)* |
| `paths./v2/cardproxies.post.operationId` | operationId | added | *(not set)* | CardProxies_Tokenise |
| `paths./v2/cardproxies/:cardProxy.get.tags` | tags | missing | ["CardProxies"] | *(not set)* |
| `paths./v2/cardproxies/:cardProxy.delete.tags` | tags | missing | ["CardProxies"] | *(not set)* |
| `paths./v2/cardproxies/:cardProxy/pricing.get.tags` | tags | missing | ["CardProxies"] | *(not set)* |
| `paths./v2/customers.get.operationId` | operationId | added | *(not set)* | Customers_Get |
| `paths./v2/customers.post.operationId` | operationId | added | *(not set)* | Customers_CreateCustomer |
| `paths./v2/customers/.get.tags` | tags | missing | ["Customers"] | *(not set)* |
| `paths./v2/customers/:customerReference.get.tags` | tags | missing | ["Customers"] | *(not set)* |
| `paths./v2/customers/:customerReference/status.get.tags` | tags | missing | ["Customers"] | *(not set)* |
| `paths./v2/customers/:customerReference/status.put.tags` | tags | missing | ["Customers"] | *(not set)* |
| `paths./v2/customers/:customerReference/profile.get.tags` | tags | missing | ["Customers"] | *(not set)* |
| `paths./v2/customers/:customerReference/profile.put.tags` | tags | missing | ["Customers"] | *(not set)* |
| `paths./v2/customers/:customerReference/account.get.tags` | tags | missing | ["Customers"] | *(not set)* |
| `paths./v2/customers/:customerReference/account.put.tags` | tags | missing | ["Customers"] | *(not set)* |
| `paths./v2/customers/:customerReference/paymentOption.get.tags` | tags | missing | ["Customers"] | *(not set)* |
| `paths./v2/customers/:customerReference/paymentOption.put.tags` | tags | missing | ["Customers"] | *(not set)* |
| `paths./v2/customers/:customerReference/customerReference.put.tags` | tags | missing | ["Customers"] | *(not set)* |
| `paths./v2/payments.get.operationId` | operationId | added | *(not set)* | Payments_Get |
| `paths./v2/payments.post.operationId` | operationId | added | *(not set)* | Payments_Post |
| `paths./v2/payments/:paymentReference.get.tags` | tags | missing | ["Payments"] | *(not set)* |
| `paths./v2/payments/uniqueId/:merchantUniqueId.get.tags` | tags | missing | ["Payments"] | *(not set)* |
| `paths./v2/payments/:paymentReference/refundrequests.get.tags` | tags | missing | ["RefundRequests"] | *(not set)* |
| `paths./v2/payments/:paymentReference/refundrequests.post.tags` | tags | missing | ["RefundRequests"] | *(not set)* |
| `paths./v2/requestpays/:requestPayId.get.tags` | tags | missing | ["RequestPays"] | *(not set)* |
| `paths./v2/requestpays/:requestPayId/entries.get.tags` | tags | missing | ["RequestPays"] | *(not set)* |
| `paths./v2/requestpays.post.operationId` | operationId | added | *(not set)* | RequestPays_CreateRequestPayment |
| `paths./v2/preauths/:preauthReference.get.tags` | tags | missing | ["Pre-Auth"] | *(not set)* |
| `paths./v2/preauths.get.tags[0]` | tags | modified | Pre-Auth | Preauths |
| `paths./v2/preauths.get.operationId` | operationId | added | *(not set)* | Preauths_GetV2Preauths |
| `paths./v2/preauths.post.tags[0]` | tags | modified | Pre-Auth | Preauths |
| `paths./v2/preauths.post.operationId` | operationId | added | *(not set)* | Preauths_Post |
| `paths./v2/preauths/:preauthReference/captures.post.tags` | tags | missing | ["Pre-Auth"] | *(not set)* |
| `paths./v2/preauths/:preauthReference/voids.put.tags` | tags | missing | ["Pre-Auth"] | *(not set)* |
| `paths./v2/diagnostics/ping.get.operationId` | operationId | added | *(not set)* | Diagnostics_Ping |
| `paths./v2/batchpayments/{batchPaymentId}.get.tags` | tags | added | *(not set)* | ["BatchPayments"] |
| `paths./v2/batchpayments/{batchPaymentId}.get.operationId` | operationId | added | *(not set)* | BatchPayments_GetBatchPayment |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.tags` | tags | added | *(not set)* | ["BatchPayments"] |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.operationId` | operationId | added | *(not set)* | BatchPayments_GetBatchPaymentEntries |
| `paths./v2/cardproxies/{cardProxy}.get.tags` | tags | added | *(not set)* | ["CardProxies"] |
| `paths./v2/cardproxies/{cardProxy}.get.operationId` | operationId | added | *(not set)* | CardProxies_GetTokenDetail |
| `paths./v2/cardproxies/{cardProxy}.delete.tags` | tags | added | *(not set)* | ["CardProxies"] |
| `paths./v2/cardproxies/{cardProxy}.delete.operationId` | operationId | added | *(not set)* | CardProxies_Delete |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.tags` | tags | added | *(not set)* | ["CardProxies"] |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.operationId` | operationId | added | *(not set)* | CardProxies_GetTransactionFee |
| `paths./v2/customers/{customerReference}.get.tags` | tags | added | *(not set)* | ["Customers"] |
| `paths./v2/customers/{customerReference}.get.operationId` | operationId | added | *(not set)* | Customers_GetCustomer |
| `paths./v2/customers/{customerReference}/status.get.tags` | tags | added | *(not set)* | ["Customers"] |
| `paths./v2/customers/{customerReference}/status.get.operationId` | operationId | added | *(not set)* | Customers_GetCustomerStatus |
| `paths./v2/customers/{customerReference}/status.put.tags` | tags | added | *(not set)* | ["Customers"] |
| `paths./v2/customers/{customerReference}/status.put.operationId` | operationId | added | *(not set)* | Customers_UpdateCustomerStatus |
| `paths./v2/customers/{customerReference}/account.get.tags` | tags | added | *(not set)* | ["Customers"] |
| `paths./v2/customers/{customerReference}/account.get.operationId` | operationId | added | *(not set)* | Customers_GetCustomerAccount |
| `paths./v2/customers/{customerReference}/account.put.tags` | tags | added | *(not set)* | ["Customers"] |
| `paths./v2/customers/{customerReference}/account.put.operationId` | operationId | added | *(not set)* | Customers_UpdateCustomerAccount |
| `paths./v2/customers/{customerReference}/profile.get.tags` | tags | added | *(not set)* | ["Customers"] |
| `paths./v2/customers/{customerReference}/profile.get.operationId` | operationId | added | *(not set)* | Customers_GetCustomerProfile |
| `paths./v2/customers/{customerReference}/profile.put.tags` | tags | added | *(not set)* | ["Customers"] |
| `paths./v2/customers/{customerReference}/profile.put.operationId` | operationId | added | *(not set)* | Customers_UpdateCustomerProfile |
| `paths./v2/customers/{customerReference}/paymentOption.get.tags` | tags | added | *(not set)* | ["Customers"] |
| `paths./v2/customers/{customerReference}/paymentOption.get.operationId` | operationId | added | *(not set)* | Customers_GetCustomerPaymentOption |
| `paths./v2/customers/{customerReference}/paymentOption.put.tags` | tags | added | *(not set)* | ["Customers"] |
| `paths./v2/customers/{customerReference}/paymentOption.put.operationId` | operationId | added | *(not set)* | Customers_UpdateCustomerPaymentOption |
| `paths./v2/customers/{customerReference}/customerReference.put.tags` | tags | added | *(not set)* | ["Customers"] |
| `paths./v2/customers/{customerReference}/customerReference.put.operationId` | operationId | added | *(not set)* | Customers_UpdateCustomerReference |
| `paths./v2/payments/{paymentReference}.get.tags` | tags | added | *(not set)* | ["Payments"] |
| `paths./v2/payments/{paymentReference}.get.operationId` | operationId | added | *(not set)* | Payments_GetPayment |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.tags` | tags | added | *(not set)* | ["Payments"] |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.operationId` | operationId | added | *(not set)* | Payments_GetPaymentByUniqueId |
| `paths./v2/payments/{paymentReference}/refundrequests.get.tags` | tags | added | *(not set)* | ["Payments"] |
| `paths./v2/payments/{paymentReference}/refundrequests.get.operationId` | operationId | added | *(not set)* | Payments_GetRefundRequest |
| `paths./v2/payments/{paymentReference}/refundrequests.post.tags` | tags | added | *(not set)* | ["Payments"] |
| `paths./v2/payments/{paymentReference}/refundrequests.post.operationId` | operationId | added | *(not set)* | Payments_CreateRefundRequests |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.tags` | tags | added | *(not set)* | ["Payments"] |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.operationId` | operationId | added | *(not set)* | Payments_GetV2PaymentsUniqueIdByPaymentReferenceRefundrequestsByRefundRequestUniqueId |
| `paths./v2/preauths/{preauthReference}.get.tags` | tags | added | *(not set)* | ["Preauths"] |
| `paths./v2/preauths/{preauthReference}.get.operationId` | operationId | added | *(not set)* | Preauths_Get |
| `paths./v2/preauths/{preauthReference}/voids.put.tags` | tags | added | *(not set)* | ["Preauths"] |
| `paths./v2/preauths/{preauthReference}/voids.put.operationId` | operationId | added | *(not set)* | Preauths_VoidPreauth |
| `paths./v2/preauths/{preauthReference}/captures.post.tags` | tags | added | *(not set)* | ["Preauths"] |
| `paths./v2/preauths/{preauthReference}/captures.post.operationId` | operationId | added | *(not set)* | Preauths_CapturePreauth |
| `paths./v2/proxies/{proxy}.get.tags` | tags | added | *(not set)* | ["Proxies"] |
| `paths./v2/proxies/{proxy}.get.operationId` | operationId | added | *(not set)* | Proxies_GetPaymentAccountProxy |
| `paths./v2/proxies/{proxy}/pricing.get.tags` | tags | added | *(not set)* | ["Proxies"] |
| `paths./v2/proxies/{proxy}/pricing.get.operationId` | operationId | added | *(not set)* | Proxies_GetTransactionFee |
| `paths./v2/requestpays/{requestPayId}.get.tags` | tags | added | *(not set)* | ["RequestPays"] |
| `paths./v2/requestpays/{requestPayId}.get.operationId` | operationId | added | *(not set)* | RequestPays_GetRequestPay |
| `paths./v2/requestpays/{requestPayId}/entries.get.tags` | tags | added | *(not set)* | ["RequestPays"] |
| `paths./v2/requestpays/{requestPayId}/entries.get.operationId` | operationId | added | *(not set)* | RequestPays_GetRequestPayEntries |
| `paths./v2/sessions/{sessionId}.get.tags` | tags | added | *(not set)* | ["Sessions"] |
| `paths./v2/sessions/{sessionId}.get.operationId` | operationId | added | *(not set)* | Sessions_Get |
| `paths./v2/sessions.post.tags` | tags | added | *(not set)* | ["Sessions"] |
| `paths./v2/sessions.post.operationId` | operationId | added | *(not set)* | Sessions_Post |

## ⚪ Informational Differences (361)

Minor differences that typically don't affect functionality:

<details>
<summary>Click to expand</summary>

| Location | Field | Type |
|----------|-------|------|
| `info.x-swagger-net-version` | x-swagger-net-version | added |
| `tags[0].name` | name | modified |
| `tags[1].name` | name | modified |
| `tags[2].name` | name | modified |
| `tags[3].name` | name | modified |
| `tags[5].name` | name | modified |
| `tags[6].name` | name | modified |
| `tags[7].name` | name | modified |
| `tags[8].name` | name | modified |
| `paths./v2/batchpayments.post.requestBody.content.application/json.schema.$ref` | $ref | added |
| `paths./v2/batchpayments.post.requestBody.content.text/json` | text/json | added |
| `paths./v2/batchpayments.post.requestBody.content.application/xml` | application/xml | added |
| `paths./v2/batchpayments.post.requestBody.content.text/xml` | text/xml | added |
| `paths./v2/batchpayments.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | added |
| `paths./v2/batchpayments.post.parameters` | parameters | missing |
| `paths./v2/batchpayments.post.responses.200` | 200 | missing |
| `paths./v2/batchpayments.post.responses.201` | 201 | added |
| `paths./v2/batchpayments.post.responses.300` | 300 | added |
| `paths./v2/batchpayments.post.responses.400` | 400 | added |
| `paths./v2/batchpayments.post.responses.500` | 500 | added |
| `paths./v2/batchpayments.post.security` | security | added |
| `paths./v2/batchpayments/:batchPaymentId.get.parameters` | parameters | missing |
| `paths./v2/batchpayments/:batchPaymentId.get.responses` | responses | missing |
| `paths./v2/batchpayments/:batchPaymentId/entries.get.parameters` | parameters | missing |
| `paths./v2/batchpayments/:batchPaymentId/entries.get.responses` | responses | missing |
| `paths./v2/cardproxies.post.requestBody.content.application/json` | application/json | added |
| `paths./v2/cardproxies.post.requestBody.content.text/json` | text/json | added |
| `paths./v2/cardproxies.post.requestBody.content.application/xml` | application/xml | added |
| `paths./v2/cardproxies.post.requestBody.content.text/xml` | text/xml | added |
| `paths./v2/cardproxies.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | added |
| `paths./v2/cardproxies.post.parameters` | parameters | missing |
| `paths./v2/cardproxies.post.responses.200` | 200 | missing |
| `paths./v2/cardproxies.post.responses.201` | 201 | added |
| `paths./v2/cardproxies.post.responses.400` | 400 | added |
| `paths./v2/cardproxies.post.responses.403` | 403 | added |
| `paths./v2/cardproxies.post.responses.409` | 409 | added |
| `paths./v2/cardproxies.post.responses.412` | 412 | added |
| `paths./v2/cardproxies.post.security` | security | added |
| `paths./v2/cardproxies/:cardProxy.get.parameters` | parameters | missing |
| `paths./v2/cardproxies/:cardProxy.get.responses` | responses | missing |
| `paths./v2/cardproxies/:cardProxy.delete.parameters` | parameters | missing |
| `paths./v2/cardproxies/:cardProxy.delete.responses` | responses | missing |
| `paths./v2/cardproxies/:cardProxy/pricing.get.parameters` | parameters | missing |
| `paths./v2/cardproxies/:cardProxy/pricing.get.responses` | responses | missing |
| `paths./v2/customers.get.parameters` | parameters.length | modified |
| `paths./v2/customers.get.parameters[0].name` | name | modified |
| `paths./v2/customers.get.parameters[1].name` | name | modified |
| `paths./v2/customers.get.parameters[1].schema.items` | items | added |
| `paths./v2/customers.get.parameters[1].style` | style | added |
| `paths./v2/customers.get.parameters[1].explode` | explode | added |
| `paths./v2/customers.get.parameters[2].name` | name | modified |
| `paths./v2/customers.get.parameters[3].name` | name | modified |
| `paths./v2/customers.get.parameters[4].name` | name | modified |
| `paths./v2/customers.get.parameters[5].name` | name | modified |
| `paths./v2/customers.get.parameters[6].name` | name | modified |
| `paths./v2/customers.get.parameters[6].schema.items` | items | added |
| `paths./v2/customers.get.parameters[6].style` | style | added |
| `paths./v2/customers.get.parameters[6].explode` | explode | added |
| `paths./v2/customers.get.parameters[7].name` | name | modified |
| `paths./v2/customers.get.parameters[8].name` | name | modified |
| `paths./v2/customers.get.parameters[9]` | parameters | added |
| `paths./v2/customers.get.parameters[10]` | parameters | added |
| `paths./v2/customers.get.responses.200.content.application/json.schema` | schema | added |
| `paths./v2/customers.get.responses.200.content.text/json` | text/json | added |
| `paths./v2/customers.get.responses.200.content.application/xml` | application/xml | added |
| `paths./v2/customers.get.responses.200.content.text/xml` | text/xml | added |
| `paths./v2/customers.get.responses.400` | 400 | added |
| `paths./v2/customers.get.responses.404` | 404 | added |
| `paths./v2/customers.get.responses.500` | 500 | added |
| `paths./v2/customers.get.security` | security | added |
| `paths./v2/customers.post.requestBody.content.application/json` | application/json | added |
| `paths./v2/customers.post.requestBody.content.text/json` | text/json | added |
| `paths./v2/customers.post.requestBody.content.application/xml` | application/xml | added |
| `paths./v2/customers.post.requestBody.content.text/xml` | text/xml | added |
| `paths./v2/customers.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | added |
| `paths./v2/customers.post.parameters` | parameters | missing |
| `paths./v2/customers.post.responses.200` | 200 | missing |
| `paths./v2/customers.post.responses.201` | 201 | added |
| `paths./v2/customers.post.responses.300` | 300 | added |
| `paths./v2/customers.post.responses.400` | 400 | added |
| `paths./v2/customers.post.responses.403` | 403 | added |
| `paths./v2/customers.post.responses.500` | 500 | added |
| `paths./v2/customers.post.security` | security | added |
| `paths./v2/customers/.get.parameters` | parameters | missing |
| `paths./v2/customers/.get.responses` | responses | missing |
| `paths./v2/customers/:customerReference.get.parameters` | parameters | missing |
| `paths./v2/customers/:customerReference.get.responses` | responses | missing |
| `paths./v2/customers/:customerReference/status.get.parameters` | parameters | missing |
| `paths./v2/customers/:customerReference/status.get.responses` | responses | missing |
| `paths./v2/customers/:customerReference/status.put.requestBody` | requestBody | missing |
| `paths./v2/customers/:customerReference/status.put.parameters` | parameters | missing |
| `paths./v2/customers/:customerReference/status.put.responses` | responses | missing |
| `paths./v2/customers/:customerReference/profile.get.parameters` | parameters | missing |
| `paths./v2/customers/:customerReference/profile.get.responses` | responses | missing |
| `paths./v2/customers/:customerReference/profile.put.requestBody` | requestBody | missing |
| `paths./v2/customers/:customerReference/profile.put.parameters` | parameters | missing |
| `paths./v2/customers/:customerReference/profile.put.responses` | responses | missing |
| `paths./v2/customers/:customerReference/account.get.parameters` | parameters | missing |
| `paths./v2/customers/:customerReference/account.get.responses` | responses | missing |
| `paths./v2/customers/:customerReference/account.put.requestBody` | requestBody | missing |
| `paths./v2/customers/:customerReference/account.put.parameters` | parameters | missing |
| `paths./v2/customers/:customerReference/account.put.responses` | responses | missing |
| `paths./v2/customers/:customerReference/paymentOption.get.parameters` | parameters | missing |
| `paths./v2/customers/:customerReference/paymentOption.get.responses` | responses | missing |
| `paths./v2/customers/:customerReference/paymentOption.put.requestBody` | requestBody | missing |
| `paths./v2/customers/:customerReference/paymentOption.put.parameters` | parameters | missing |
| `paths./v2/customers/:customerReference/paymentOption.put.responses` | responses | missing |
| `paths./v2/customers/:customerReference/customerReference.put.requestBody` | requestBody | missing |
| `paths./v2/customers/:customerReference/customerReference.put.parameters` | parameters | missing |
| `paths./v2/customers/:customerReference/customerReference.put.responses` | responses | missing |
| `paths./v2/payments.get.parameters` | parameters.length | modified |
| `paths./v2/payments.get.parameters[0].name` | name | modified |
| `paths./v2/payments.get.parameters[1].name` | name | modified |
| `paths./v2/payments.get.parameters[2].name` | name | modified |
| `paths./v2/payments.get.parameters[3].name` | name | modified |
| `paths./v2/payments.get.parameters[4].name` | name | modified |
| `paths./v2/payments.get.parameters[5].name` | name | modified |
| `paths./v2/payments.get.parameters[5].schema.items` | items | added |
| `paths./v2/payments.get.parameters[5].style` | style | added |
| `paths./v2/payments.get.parameters[5].explode` | explode | added |
| `paths./v2/payments.get.parameters[6].name` | name | modified |
| `paths./v2/payments.get.parameters[7].name` | name | modified |
| `paths./v2/payments.get.parameters[8].name` | name | modified |
| `paths./v2/payments.get.parameters[9].name` | name | modified |
| `paths./v2/payments.get.parameters[10]` | parameters | added |
| `paths./v2/payments.get.parameters[11]` | parameters | added |
| `paths./v2/payments.get.responses.200.content.application/json.schema` | schema | added |
| `paths./v2/payments.get.responses.200.content.text/json` | text/json | added |
| `paths./v2/payments.get.responses.200.content.application/xml` | application/xml | added |
| `paths./v2/payments.get.responses.200.content.text/xml` | text/xml | added |
| `paths./v2/payments.get.responses.400` | 400 | added |
| `paths./v2/payments.get.responses.500` | 500 | added |
| `paths./v2/payments.get.security` | security | added |
| `paths./v2/payments.post.requestBody.content.application/json` | application/json | added |
| `paths./v2/payments.post.requestBody.content.text/json` | text/json | added |
| `paths./v2/payments.post.requestBody.content.application/xml` | application/xml | added |
| `paths./v2/payments.post.requestBody.content.text/xml` | text/xml | added |
| `paths./v2/payments.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | added |
| `paths./v2/payments.post.parameters` | parameters | missing |
| `paths./v2/payments.post.responses.200` | 200 | missing |
| `paths./v2/payments.post.responses.201` | 201 | added |
| `paths./v2/payments.post.responses.300` | 300 | added |
| `paths./v2/payments.post.responses.400` | 400 | added |
| `paths./v2/payments.post.responses.500` | 500 | added |
| `paths./v2/payments.post.security` | security | added |
| `paths./v2/payments/:paymentReference.get.parameters` | parameters | missing |
| `paths./v2/payments/:paymentReference.get.responses` | responses | missing |
| `paths./v2/payments/uniqueId/:merchantUniqueId.get.parameters` | parameters | missing |
| `paths./v2/payments/uniqueId/:merchantUniqueId.get.responses` | responses | missing |
| `paths./v2/payments/:paymentReference/refundrequests.get.parameters` | parameters | missing |
| `paths./v2/payments/:paymentReference/refundrequests.get.responses` | responses | missing |
| `paths./v2/payments/:paymentReference/refundrequests.post.requestBody` | requestBody | missing |
| `paths./v2/payments/:paymentReference/refundrequests.post.parameters` | parameters | missing |
| `paths./v2/payments/:paymentReference/refundrequests.post.responses` | responses | missing |
| `paths./v2/requestpays/:requestPayId.get.parameters` | parameters | missing |
| `paths./v2/requestpays/:requestPayId.get.responses` | responses | missing |
| `paths./v2/requestpays/:requestPayId/entries.get.parameters` | parameters | missing |
| `paths./v2/requestpays/:requestPayId/entries.get.responses` | responses | missing |
| `paths./v2/requestpays.post.requestBody.content.application/json.schema.$ref` | $ref | added |
| `paths./v2/requestpays.post.requestBody.content.text/json` | text/json | added |
| `paths./v2/requestpays.post.requestBody.content.application/xml` | application/xml | added |
| `paths./v2/requestpays.post.requestBody.content.text/xml` | text/xml | added |
| `paths./v2/requestpays.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | added |
| `paths./v2/requestpays.post.parameters` | parameters | missing |
| `paths./v2/requestpays.post.responses.200` | 200 | missing |
| `paths./v2/requestpays.post.responses.201` | 201 | added |
| `paths./v2/requestpays.post.responses.300` | 300 | added |
| `paths./v2/requestpays.post.responses.400` | 400 | added |
| `paths./v2/requestpays.post.responses.500` | 500 | added |
| `paths./v2/requestpays.post.security` | security | added |
| `paths./v2/preauths/:preauthReference.get.parameters` | parameters | missing |
| `paths./v2/preauths/:preauthReference.get.responses` | responses | missing |
| `paths./v2/preauths.get.parameters` | parameters.length | modified |
| `paths./v2/preauths.get.parameters[0].name` | name | modified |
| `paths./v2/preauths.get.parameters[1]` | parameters | missing |
| `paths./v2/preauths.get.parameters[2]` | parameters | missing |
| `paths./v2/preauths.get.parameters[3]` | parameters | missing |
| `paths./v2/preauths.get.parameters[4]` | parameters | missing |
| `paths./v2/preauths.get.responses.200.content.application/json.schema` | schema | added |
| `paths./v2/preauths.get.responses.200.content.text/json` | text/json | added |
| `paths./v2/preauths.get.responses.200.content.application/xml` | application/xml | added |
| `paths./v2/preauths.get.responses.200.content.text/xml` | text/xml | added |
| `paths./v2/preauths.get.security` | security | added |
| `paths./v2/preauths.post.requestBody.content.application/json` | application/json | added |
| `paths./v2/preauths.post.requestBody.content.text/json` | text/json | added |
| `paths./v2/preauths.post.requestBody.content.application/xml` | application/xml | added |
| `paths./v2/preauths.post.requestBody.content.text/xml` | text/xml | added |
| `paths./v2/preauths.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | added |
| `paths./v2/preauths.post.parameters` | parameters | missing |
| `paths./v2/preauths.post.responses.200` | 200 | missing |
| `paths./v2/preauths.post.responses.201` | 201 | added |
| `paths./v2/preauths.post.responses.300` | 300 | added |
| `paths./v2/preauths.post.responses.400` | 400 | added |
| `paths./v2/preauths.post.responses.403` | 403 | added |
| `paths./v2/preauths.post.responses.500` | 500 | added |
| `paths./v2/preauths.post.security` | security | added |
| `paths./v2/preauths/:preauthReference/captures.post.requestBody` | requestBody | missing |
| `paths./v2/preauths/:preauthReference/captures.post.responses` | responses | missing |
| `paths./v2/preauths/:preauthReference/voids.put.requestBody` | requestBody | missing |
| `paths./v2/preauths/:preauthReference/voids.put.parameters` | parameters | missing |
| `paths./v2/preauths/:preauthReference/voids.put.responses` | responses | missing |
| `paths./v2/diagnostics/ping.get.parameters` | parameters | missing |
| `paths./v2/diagnostics/ping.get.responses.200.content.application/json.schema` | schema | added |
| `paths./v2/diagnostics/ping.get.responses.200.content.text/json` | text/json | added |
| `paths./v2/diagnostics/ping.get.responses.200.content.application/xml` | application/xml | added |
| `paths./v2/diagnostics/ping.get.responses.200.content.text/xml` | text/xml | added |
| `paths./v2/diagnostics/ping.get.security` | security | added |
| `paths./v2/batchpayments/{batchPaymentId}.get.parameters` | parameters | added |
| `paths./v2/batchpayments/{batchPaymentId}.get.responses` | responses | added |
| `paths./v2/batchpayments/{batchPaymentId}.get.security` | security | added |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.parameters` | parameters | added |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.responses` | responses | added |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.security` | security | added |
| `paths./v2/cardproxies/{cardProxy}.get.parameters` | parameters | added |
| `paths./v2/cardproxies/{cardProxy}.get.responses` | responses | added |
| `paths./v2/cardproxies/{cardProxy}.get.security` | security | added |
| `paths./v2/cardproxies/{cardProxy}.delete.parameters` | parameters | added |
| `paths./v2/cardproxies/{cardProxy}.delete.responses` | responses | added |
| `paths./v2/cardproxies/{cardProxy}.delete.security` | security | added |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.parameters` | parameters | added |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.responses` | responses | added |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.security` | security | added |
| `paths./v2/customers/{customerReference}.get.parameters` | parameters | added |
| `paths./v2/customers/{customerReference}.get.responses` | responses | added |
| `paths./v2/customers/{customerReference}.get.security` | security | added |
| `paths./v2/customers/{customerReference}/status.get.parameters` | parameters | added |
| `paths./v2/customers/{customerReference}/status.get.responses` | responses | added |
| `paths./v2/customers/{customerReference}/status.get.security` | security | added |
| `paths./v2/customers/{customerReference}/status.put.parameters` | parameters | added |
| `paths./v2/customers/{customerReference}/status.put.responses` | responses | added |
| `paths./v2/customers/{customerReference}/status.put.security` | security | added |
| `paths./v2/customers/{customerReference}/status.put.requestBody` | requestBody | added |
| `paths./v2/customers/{customerReference}/account.get.parameters` | parameters | added |
| `paths./v2/customers/{customerReference}/account.get.responses` | responses | added |
| `paths./v2/customers/{customerReference}/account.get.security` | security | added |
| `paths./v2/customers/{customerReference}/account.put.parameters` | parameters | added |
| `paths./v2/customers/{customerReference}/account.put.responses` | responses | added |
| `paths./v2/customers/{customerReference}/account.put.security` | security | added |
| `paths./v2/customers/{customerReference}/account.put.requestBody` | requestBody | added |
| `paths./v2/customers/{customerReference}/profile.get.parameters` | parameters | added |
| `paths./v2/customers/{customerReference}/profile.get.responses` | responses | added |
| `paths./v2/customers/{customerReference}/profile.get.security` | security | added |
| `paths./v2/customers/{customerReference}/profile.put.parameters` | parameters | added |
| `paths./v2/customers/{customerReference}/profile.put.responses` | responses | added |
| `paths./v2/customers/{customerReference}/profile.put.security` | security | added |
| `paths./v2/customers/{customerReference}/profile.put.requestBody` | requestBody | added |
| `paths./v2/customers/{customerReference}/paymentOption.get.parameters` | parameters | added |
| `paths./v2/customers/{customerReference}/paymentOption.get.responses` | responses | added |
| `paths./v2/customers/{customerReference}/paymentOption.get.security` | security | added |
| `paths./v2/customers/{customerReference}/paymentOption.put.parameters` | parameters | added |
| `paths./v2/customers/{customerReference}/paymentOption.put.responses` | responses | added |
| `paths./v2/customers/{customerReference}/paymentOption.put.security` | security | added |
| `paths./v2/customers/{customerReference}/paymentOption.put.requestBody` | requestBody | added |
| `paths./v2/customers/{customerReference}/customerReference.put.parameters` | parameters | added |
| `paths./v2/customers/{customerReference}/customerReference.put.responses` | responses | added |
| `paths./v2/customers/{customerReference}/customerReference.put.security` | security | added |
| `paths./v2/customers/{customerReference}/customerReference.put.requestBody` | requestBody | added |
| `paths./v2/payments/{paymentReference}.get.parameters` | parameters | added |
| `paths./v2/payments/{paymentReference}.get.responses` | responses | added |
| `paths./v2/payments/{paymentReference}.get.security` | security | added |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.parameters` | parameters | added |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.responses` | responses | added |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.security` | security | added |
| `paths./v2/payments/{paymentReference}/refundrequests.get.parameters` | parameters | added |
| `paths./v2/payments/{paymentReference}/refundrequests.get.responses` | responses | added |
| `paths./v2/payments/{paymentReference}/refundrequests.get.security` | security | added |
| `paths./v2/payments/{paymentReference}/refundrequests.post.parameters` | parameters | added |
| `paths./v2/payments/{paymentReference}/refundrequests.post.responses` | responses | added |
| `paths./v2/payments/{paymentReference}/refundrequests.post.security` | security | added |
| `paths./v2/payments/{paymentReference}/refundrequests.post.requestBody` | requestBody | added |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.parameters` | parameters | added |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.responses` | responses | added |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.security` | security | added |
| `paths./v2/preauths/{preauthReference}.get.parameters` | parameters | added |
| `paths./v2/preauths/{preauthReference}.get.responses` | responses | added |
| `paths./v2/preauths/{preauthReference}.get.security` | security | added |
| `paths./v2/preauths/{preauthReference}/voids.put.parameters` | parameters | added |
| `paths./v2/preauths/{preauthReference}/voids.put.responses` | responses | added |
| `paths./v2/preauths/{preauthReference}/voids.put.security` | security | added |
| `paths./v2/preauths/{preauthReference}/captures.post.parameters` | parameters | added |
| `paths./v2/preauths/{preauthReference}/captures.post.responses` | responses | added |
| `paths./v2/preauths/{preauthReference}/captures.post.security` | security | added |
| `paths./v2/preauths/{preauthReference}/captures.post.requestBody` | requestBody | added |
| `paths./v2/proxies/{proxy}.get.parameters` | parameters | added |
| `paths./v2/proxies/{proxy}.get.responses` | responses | added |
| `paths./v2/proxies/{proxy}.get.security` | security | added |
| `paths./v2/proxies/{proxy}/pricing.get.parameters` | parameters | added |
| `paths./v2/proxies/{proxy}/pricing.get.responses` | responses | added |
| `paths./v2/proxies/{proxy}/pricing.get.security` | security | added |
| `paths./v2/requestpays/{requestPayId}.get.parameters` | parameters | added |
| `paths./v2/requestpays/{requestPayId}.get.responses` | responses | added |
| `paths./v2/requestpays/{requestPayId}.get.security` | security | added |
| `paths./v2/requestpays/{requestPayId}/entries.get.parameters` | parameters | added |
| `paths./v2/requestpays/{requestPayId}/entries.get.responses` | responses | added |
| `paths./v2/requestpays/{requestPayId}/entries.get.security` | security | added |
| `paths./v2/sessions/{sessionId}.get.parameters` | parameters | added |
| `paths./v2/sessions/{sessionId}.get.responses` | responses | added |
| `paths./v2/sessions/{sessionId}.get.security` | security | added |
| `paths./v2/sessions.post.responses` | responses | added |
| `paths./v2/sessions.post.security` | security | added |
| `paths./v2/sessions.post.requestBody` | requestBody | added |
| `components.schemas.ApiBatchPaySummary` | ApiBatchPaySummary | added |
| `components.schemas.ApiBatchPayEntry` | ApiBatchPayEntry | added |
| `components.schemas.BatchPaymentRequest` | BatchPaymentRequest | added |
| `components.schemas.BatchPaymentDataRecord` | BatchPaymentDataRecord | added |
| `components.schemas.BatchPaymentResponse` | BatchPaymentResponse | added |
| `components.schemas.AmbiguousResult` | AmbiguousResult | added |
| `components.schemas.ModelState` | ModelState | added |
| `components.schemas.ValueProviderResult` | ValueProviderResult | added |
| `components.schemas.ModelError` | ModelError | added |
| `components.schemas.InternalServerErrorResult` | InternalServerErrorResult | added |
| `components.schemas.TokenResponse` | TokenResponse | added |
| `components.schemas.PricingResponse` | PricingResponse | added |
| `components.schemas.Pricing` | Pricing | added |
| `components.schemas.CardProxyRequest` | CardProxyRequest | added |
| `components.schemas.ThreeDSecureData` | ThreeDSecureData | added |
| `components.schemas.ThreeDSecureBrowserData` | ThreeDSecureBrowserData | added |
| `components.schemas.CardProxyResponse` | CardProxyResponse | added |
| `components.schemas.PreconditionFailedResponse` | PreconditionFailedResponse | added |
| `components.schemas.CustomerResponse` | CustomerResponse | added |
| `components.schemas.CustomerProfile` | CustomerProfile | added |
| `components.schemas.CustomerAccountResponse` | CustomerAccountResponse | added |
| `components.schemas.CustomerPaymentOption` | CustomerPaymentOption | added |
| `components.schemas.CustomerAddress` | CustomerAddress | added |
| `components.schemas.BankAccount` | BankAccount | added |
| `components.schemas.CreditCard` | CreditCard | added |
| `components.schemas.PayIdDetail` | PayIdDetail | added |
| `components.schemas.BPayDetail` | BPayDetail | added |
| `components.schemas.CustomerStatusRequest` | CustomerStatusRequest | added |
| `components.schemas.CustomerAccountRequest` | CustomerAccountRequest | added |
| `components.schemas.CreditCardProxy` | CreditCardProxy | added |
| `components.schemas.AccountProxy` | AccountProxy | added |
| `components.schemas.ICustomerProfie` | ICustomerProfie | added |
| `components.schemas.CustomerProfileRequest` | CustomerProfileRequest | added |
| `components.schemas.NewCustomer` | NewCustomer | added |
| `components.schemas.AdditionalReference` | AdditionalReference | added |
| `components.schemas.NewCustomerResponse` | NewCustomerResponse | added |
| `components.schemas.PingResponse` | PingResponse | added |
| `components.schemas.PaymentResponse` | PaymentResponse | added |
| `components.schemas.SettlementPayment` | SettlementPayment | added |
| `components.schemas.SubPayment` | SubPayment | added |
| `components.schemas.RefundResponse` | RefundResponse | added |
| `components.schemas.RefundRequest` | RefundRequest | added |
| `components.schemas.PaymentRequest` | PaymentRequest | added |
| `components.schemas.PaymentCard` | PaymentCard | added |
| `components.schemas.PreauthResponse` | PreauthResponse | added |
| `components.schemas.PreauthRequest` | PreauthRequest | added |
| `components.schemas.VoidCardResponse` | VoidCardResponse | added |
| `components.schemas.CaptureCardRequest` | CaptureCardRequest | added |
| `components.schemas.CaptureCardResponse` | CaptureCardResponse | added |
| `components.schemas.PaymentAccountProxyResponse` | PaymentAccountProxyResponse | added |
| `components.schemas.ApiRequestPaySummary` | ApiRequestPaySummary | added |
| `components.schemas.ApiRequestPayEntry` | ApiRequestPayEntry | added |
| `components.schemas.RequestPayRequest` | RequestPayRequest | added |
| `components.schemas.RequestPayRequestRecord` | RequestPayRequestRecord | added |
| `components.schemas.RequestPayResponse` | RequestPayResponse | added |
| `components.schemas.SessionRequest` | SessionRequest | added |
| `components.schemas.PluginPaymentMethods` | PluginPaymentMethods | added |
| `components.schemas.PluginCustomization` | PluginCustomization | added |
| `components.schemas.SessionResponse` | SessionResponse | added |
| `components.securitySchemes.Api-Key` | Api-Key | added |

</details>

## 💡 Recommendations

### 🔴 Critical Actions Required

1. Review all 59 critical differences
2. Align schema structures between Postman and TravelPay
3. Ensure API contracts match exactly
4. Update tests to cover discovered differences

### 🟡 Documentation Improvements

1. Sync descriptions between both specs
2. Add missing summaries and examples
3. Standardize documentation style
4. Review and update operation IDs

---

*Generated by compare-postman-travelpay.ts - 100% comprehensive field-by-field comparison*
*Tool ensures complete coverage of all OpenAPI specification fields*
