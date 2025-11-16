# 🔍 COMPLETE FIELD-BY-FIELD DIFFERENCES

**TravelPay API vs Zenith Developer Guide - EVERY DIFFERENCE**

## Summary

- Shared paths: 25
- Comparing: summaries, descriptions, operationIds, tags, parameters, request bodies, responses, examples, security

---

## POST /v2/batchpayments

### Summary

| Source | Value |
|--------|-------|
| TravelPay | This Method will be return to upload payments batch as a collection of json and process them |
| Zenith | Process Batch Payment |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | This method is used to upload batch payments as a collection of JSON and process them. |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | BatchPayments_CreateBatchPayment |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 0 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | collection of batchpayment entries inside a container | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) | application/json |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 201, 300, 400, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 201

| Source | Description |
|--------|-------------|
| TravelPay | Batch payment created successfully |
| Zenith | (none) |

### Response 300

| Source | Description |
|--------|-------------|
| TravelPay | Duplicate merchant unique id. The response will have 'Location' header which will have the orginal batch payment. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid batch payment details. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Batch payment may or may not be created. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/batchpayments/{batchPaymentId}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get the batch payment summary. |
| Zenith | Fetch Batch Payment Summary by batchPaymentID |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | This method returns a summary of a batch payment using the batchPaymentID. |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | BatchPayments_GetBatchPayment |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | batchPaymentId | path | true | Unique batch payment identifier | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 404, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Batch Payment summary |
| Zenith | Successful response |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Batch payment not found. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Unable to get the batch payment. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/batchpayments/{batchPaymentId}/entries

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Method return all the Batch payment transactions based on batch payment id |
| Zenith | Fetch Batch Payment Transactions by batchPaymentId |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | This method returns a list of entries in a batch payment. |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | BatchPayments_GetBatchPaymentEntries |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | batchPaymentId | path | true | Batch Payment Id | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 404, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | List of batch payment entries |
| Zenith | Successful response |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Batch payment not found. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Unable to get the batch payment. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## POST /v2/cardproxies

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Generate card proxy. Not recommended for software / sites that are not PCI DSS compliant. For an easy and secure card tokenisation and payment option, see our Payment Plugin jQuery. |
| Zenith | Create Card Proxy |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Generate a card proxy.

Not recommended for software / sites that are not PCI DSS compliant. For a easy and secure card tokenisation and payment option, see our Payment Plugin jQuery.

This endpoint is locked behind a setting and can only be utilized once it has been enabled by Zenith Payments. |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | CardProxies_Tokenise |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 0 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | Card details required to generate a card proxy | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 201, 400, 403, 409, 412 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 201

| Source | Description |
|--------|-------------|
| TravelPay | Card authorisation is successful. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 403

| Source | Description |
|--------|-------------|
| TravelPay | The credential provided doesn't support this endpoint. |
| Zenith | (none) |

### Response 409

| Source | Description |
|--------|-------------|
| TravelPay | Customer unique id is already used. |
| Zenith | (none) |

### Response 412

| Source | Description |
|--------|-------------|
| TravelPay | Tokenisation failed. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/cardproxies/{cardProxy}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get card proxy detail |
| Zenith | Fetch Card Proxy Details |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | CardProxies_GetTokenDetail |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | cardProxy | path | true | Card proxy for which token response is required | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 404 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Token response of the card proxy provided. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the token response for the card proxy provided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## DELETE /v2/cardproxies/{cardProxy}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Delete card proxy permanently from the system. This will not affect 
any customer, registered using this proxy. |
| Zenith | Delete Card Proxy |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Delete card proxy permanently from the system. This will not affect any customer, registered using this proxy. |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | CardProxies_Delete |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | cardProxy | path | true | Card proxy which will be used for processing the payment | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 204, 400, 404 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 204

| Source | Description |
|--------|-------------|
| TravelPay | Card proxy deleted successfully. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the Card proxy provided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/cardproxies/{cardProxy}/pricing

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get pricing for card proxy and payment amount |
| Zenith | Fetch Card Proxy Pricing |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | CardProxies_GetTransactionFee |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 2 |
| Zenith | 3 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | cardProxy | path | true | Card proxy which will be used for processing the payment | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | paymentAmount | query | true | Payment amount to determine the pricing | (none) |
| Zenith | api-key | header | undefined | (none) | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | paymentAmount | query | undefined | (Required) Payment amount to determine the pricing | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 404 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Pricing response for card proxy and payment amount provided. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the pricing response for the card proxy provided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/customers

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Return customers based on the filter provided. |
| Zenith | Fetch all Customers based on the filters |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_Get |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 9 |
| Zenith | 11 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | query | false | Customer reference | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerStatuses | query | false | Customer statuses. Default is all. 0 - Open, 1 - AwaitingEmailVerfication, 2 - AwaitingSignature, 3 ... | (none) |
| Zenith | api-key | header | undefined | (none) | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | fromOpenDate | query | false | From Customer open date. Format: yyyy-MM-dd | (none) |
| Zenith | customerReference | query | undefined | Customer reference | (none) |

### Parameter 4

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | toOpenDate | query | false | To Customer open date. Format: yyyy-MM-dd | (none) |
| Zenith | customerStatuses | query | undefined | Customer statuses. Default is all. 0 - Open, 1 - AwaitingEmailVerfication, 2 - AwaitingSignature, 3 ... | (none) |

### Parameter 5

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | fromClosedDate | query | false | From Customer closed date. Format: yyyy-MM-dd | (none) |
| Zenith | fromOpenDate | query | undefined | From Customer open date. Format: yyyy-MM-dd | (none) |

### Parameter 6

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | toClosedDate | query | false | To Customer closed date. Format: yyyy-MM-dd | (none) |
| Zenith | toOpenDate | query | undefined | To Customer open date. Format: yyyy-MM-dd | (none) |

### Parameter 7

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | paymentOptions | query | false | Payment options. Default is all. 22 - AutoPay, 23 - EmailReminder, 24 - SmsReminder, 25 - FixedTerm,... | (none) |
| Zenith | fromClosedDate | query | undefined | From Customer closed date. Format: yyyy-MM-dd | (none) |

### Parameter 8

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | offset | query | false | Starting index of the record. An index starts from 0. Default = 0 | (none) |
| Zenith | toClosedDate | query | undefined | To Customer closed date. Format: yyyy-MM-dd | (none) |

### Parameter 9

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | limit | query | false | Page size. Default = 20. Maximum page size allowed = 2000 | (none) |
| Zenith | paymentOptions | query | undefined | Payment options. Default is all. 22 - AutoPay, 23 - EmailReminder, 24 - SmsReminder, 25 - FixedTerm,... | (none) |

### Parameter 10

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | offset | query | undefined | Starting index of the record. An index starts from 0. Default = 0 | (none) |

### Parameter 11

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | limit | query | undefined | Page size. Default = 20. Maximum page size allowed = 2000 | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 404, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Return all the customers satisfies the filters. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid get request. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the customers by the filters provided. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Please try again. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## POST /v2/customers

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Create customer using the provided details |
| Zenith | Create customer |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_CreateCustomer |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 0 |
| Zenith | 3 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Content-Type | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | Customer details to create in the system | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 201, 300, 400, 403, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 201

| Source | Description |
|--------|-------------|
| TravelPay | Customer created successfully. |
| Zenith | (none) |

### Response 300

| Source | Description |
|--------|-------------|
| TravelPay | Duplicate customer reference. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 403

| Source | Description |
|--------|-------------|
| TravelPay | Merchant is forbidden to perform this operation. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Customer may or may not be created. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/customers/{customerReference}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Return the customer using the provided customer reference. |
| Zenith | Fetch Customer by customerReference |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_GetCustomer |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | path | true | Customer Reference provided by the merchant | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 404 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Found the customer. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid customer reference. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the customer by the reference provided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/customers/{customerReference}/account

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get Customer credit / debit card or bank account |
| Zenith | Fetch Customer payment method by customerReference |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_GetCustomerAccount |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | path | true | (none) | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 404 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Found the customer account. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid customer reference. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the customer by the reference provided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## PUT /v2/customers/{customerReference}/account

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | StartFragment

Customer Bank/Credit Card account. Use PaymentAccountProxy or CreditCardProxy or BankAccount.  
If more than one details are passed, only one detail used as per the following order, 1. PaymentAccountProxy 2. BankAccount 3. CreditCardProxy  
Preferred option is PaymentAccountProxy

EndFragment |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_UpdateCustomerAccount |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 3 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | path | true | (none) | (none) |
| Zenith | Content-Type | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | (none) | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 204, 400, 403, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 204

| Source | Description |
|--------|-------------|
| TravelPay | Updated the customer account. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 403

| Source | Description |
|--------|-------------|
| TravelPay | Merchant is forbidden to perform this operation. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Customer account may or may not be updated. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## PUT /v2/customers/{customerReference}/customerReference

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_UpdateCustomerReference |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 3 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | path | true | Old customer reference | (none) |
| Zenith | Content-Type | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | New customer reference | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 204, 400, 403, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 204

| Source | Description |
|--------|-------------|
| TravelPay | Updated the customer reference. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 403

| Source | Description |
|--------|-------------|
| TravelPay | Merchant is forbidden to perform this operation. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Customer reference may or may not be updated. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/customers/{customerReference}/paymentOption

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get Customer payment option |
| Zenith | Fetch Customer payment options by customerReference |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | PaymentOptions human readable form:

AutoPay: 22; EmailReminder: 23; SmsReminder: 24; FixedTerm: 25; BatchPay: 26; ScheduledPay: 27; OneOff: 28; PayID: 148; BPAY: 149

PaymentFrequency human readable form:

Weekly: 32; Fortnightly: 33; Monthly: 34; Quarterly: 35; HalfYearly: 36; Yearly: 37; FourWeeks: 38

NotificationMethod human readable form:

None: 0; Sms: 1; Email: 2 |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_GetCustomerPaymentOption |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | path | true | (none) | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 404 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Found the customer payment option. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid customer reference. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the customer by the reference provided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## PUT /v2/customers/{customerReference}/paymentOption

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_UpdateCustomerPaymentOption |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 3 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | path | true | (none) | (none) |
| Zenith | Content-Type | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | (none) | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 204, 400, 403, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 204

| Source | Description |
|--------|-------------|
| TravelPay | Updated the customer payment option. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 403

| Source | Description |
|--------|-------------|
| TravelPay | Merchant is forbidden to perform this operation. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Customer payment option may or may not be updated. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/customers/{customerReference}/profile

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get Customer profile |
| Zenith | Fetch Customer profile by customerReference |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_GetCustomerProfile |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | path | true | (none) | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 404 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Found the customer profile. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid customer reference. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the customer by the reference provided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## PUT /v2/customers/{customerReference}/profile

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Update the customer profile. |
| Zenith | Update the customer profile |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_UpdateCustomerProfile |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 3 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | path | true | (none) | (none) |
| Zenith | Content-Type | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | (none) | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 204, 400, 403, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 204

| Source | Description |
|--------|-------------|
| TravelPay | Updated the customer profile. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 403

| Source | Description |
|--------|-------------|
| TravelPay | Merchant is forbidden to perform this operation. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Customer may or may not be updated. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/customers/{customerReference}/status

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get Customer status |
| Zenith | Fetch Customer status by customerReference |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_GetCustomerStatus |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | path | true | (none) | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 404 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Found the customer status. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid customer reference. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the customer by the reference provided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## PUT /v2/customers/{customerReference}/status

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_UpdateCustomerStatus |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 3 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | path | true | (none) | (none) |
| Zenith | Content-Type | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | (none) | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 204, 400, 403, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 204

| Source | Description |
|--------|-------------|
| TravelPay | Updated the customer payment option. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 403

| Source | Description |
|--------|-------------|
| TravelPay | Merchant is forbidden to perform this operation. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Customer payment option may or may not be updated. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/diagnostics/ping

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Ping method to get the server date time and version information |
| Zenith | Ping |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Diagnostics_Ping |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 0 |
| Zenith | 1 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Batch Payment summary |
| Zenith | Successful response |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/payments

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Fetch all Payments |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_Get |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 10 |
| Zenith | 12 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | query | false | (none) | (none) |
| Zenith | api-key | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | fromProcessedDate | query | false | (none) | (none) |
| Zenith | customerReference | query | undefined | (Optional) Filter by the customer reference | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | toProcessedDate | query | false | (none) | (none) |
| Zenith | fromProcessedDate | query | undefined | (Optional) Filter by the payments from date | (none) |

### Parameter 4

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | settlementDate | query | false | (none) | (none) |
| Zenith | toProcessedDate | query | undefined | (Optional) Filter by the payments to date | (none) |

### Parameter 5

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | paymentSettlement | query | false | Filter by payment settlement status. PaymentSettlement values: All: 0; Settled: 1; NotSettled: 2 | (none) |
| Zenith | settlementDate | query | undefined | (Optional) Filter by the payments settlement date | (none) |

### Parameter 6

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | transactionTypes | query | false | (none) | (none) |
| Zenith | paymentSettlement | query | undefined | (Optional) Filter by if the payment is settled to the merchant. "0" payment is not settled. "1" paym... | (none) |

### Parameter 7

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | isRecalled | query | false | (none) | (none) |
| Zenith | transactionTypes | query | undefined | (Optional) Filter by the different transaction types | (none) |

### Parameter 8

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | isRefunded | query | false | (none) | (none) |
| Zenith | transactionTypes | query | undefined | (Optional) Filter by the different transaction types | (none) |

### Parameter 9

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | offset | query | false | (none) | (none) |
| Zenith | isRecalled | query | undefined | (Optional) Filter by if the payments are in recalled status | (none) |

### Parameter 10

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | limit | query | false | (none) | (none) |
| Zenith | isRefunded | query | undefined | (Optional) Filter by if the payments are in refunded status | (none) |

### Parameter 11

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | offset | query | undefined | (Optional) | (none) |

### Parameter 12

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | limit | query | undefined | (Optional) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Return all the payments satisfies the filters. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid get request. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Please try again. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## POST /v2/payments

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Perform OneOff payment for a registered customer with customer reference and payment amount |
| Zenith | Perform OneOff Payment |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | ### Important Notice for Using the Direct Card Payment Option:

This endpoint allows the submission of raw card details (`cardNumber`, `expiryMonth`, `expiryYear`, `cvv`) for processing payments. **However, this method requires a certain level of PCI DSS (Payment Card Industry Data Security Standard) compliance** to ensure the secure handling of sensitive card information. To enhance security and reduce the risks associated with directly managing card data, we strongly recommend using our **Paym... |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_Post |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 0 |
| Zenith | 3 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Content-Type | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | For making payment for existing customer, use Customer Reference and Payment Amount
For making card proxy based, use all the fields in the request | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 201, 300, 400, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 201

| Source | Description |
|--------|-------------|
| TravelPay | Payment is processed. |
| Zenith | (none) |

### Response 300

| Source | Description |
|--------|-------------|
| TravelPay | Duplicate merchant unique id. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Payment may or may not be created. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/payments/uniqueId/{merchantUniqueId}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Returns Payment details based on merchant unique reference |
| Zenith | Fetch Payment details based on merchant unique reference |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_GetPaymentByUniqueId |
| Zenith | (none) |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | merchantUniqueId | path | true | Merchant Unique Id. This is provided by the merchant when creating an payment. | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 404 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Found the payment. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid payment reference. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the payment by the reference provided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/payments/{paymentReference}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Returns Payment details based on Payment reference |
| Zenith | Fetch Payment details by paymentReference |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_GetPayment |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | paymentReference | path | true | Payment Reference | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 404 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Found the payment. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid payment reference. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the payment by the reference provided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/payments/{paymentReference}/refundrequests

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_GetRefundRequest |
| Zenith | (none) |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | ["Payments"] |
| Zenith | ["RefundRequests"] |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | paymentReference | path | true | Payment Reference | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 404, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Return refund request for the provided payment reference. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Payment not found. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Please try again. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## POST /v2/payments/{paymentReference}/refundrequests

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Allow the merchant to request for refund for provided payment using payment reference. |
| Zenith | Allow the merchant to request a refund for provided payment using payment reference. |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_CreateRefundRequests |
| Zenith | (none) |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | ["Payments"] |
| Zenith | ["RefundRequests"] |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 3 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | paymentReference | path | true | Payment Reference | (none) |
| Zenith | Content-Type | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Accept | header | undefined | (none) | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | (none) | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 201, 300, 400, 403, 404, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 201

| Source | Description |
|--------|-------------|
| TravelPay | Refund request is successfully created for the payment. |
| Zenith | (none) |

### Response 300

| Source | Description |
|--------|-------------|
| TravelPay | Duplicate refund request. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 403

| Source | Description |
|--------|-------------|
| TravelPay | Merchant is forbidden to perform this operation. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Payment not found. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Please try again. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/preauths

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Check PreAuth via customerReference |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Preauths_GetV2Preauths |
| Zenith | (none) |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | ["Preauths"] |
| Zenith | ["Pre-Auth"] |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 5 |
| Zenith | 1 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | customerReference | query | false | (none) | (none) |
| Zenith | api-key | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | fromProcessedDate | query | false | (none) | (none) |

### Parameter 3

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | toProcessedDate | query | false | (none) | (none) |

### Parameter 4

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | offset | query | false | (none) | (none) |

### Parameter 5

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | limit | query | false | (none) | (none) |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Found preauths. |
| Zenith | Successful response |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## POST /v2/preauths

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Create PreAuth |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Preauths_Post |
| Zenith | (none) |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | ["Preauths"] |
| Zenith | ["Pre-Auth"] |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 0 |
| Zenith | 1 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | (none) | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 201, 300, 400, 403, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 201

| Source | Description |
|--------|-------------|
| TravelPay | Preauth is created. |
| Zenith | (none) |

### Response 300

| Source | Description |
|--------|-------------|
| TravelPay | Duplicate merchant unique id. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid input detail. |
| Zenith | (none) |

### Response 403

| Source | Description |
|--------|-------------|
| TravelPay | Invalid permission. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Preauth may or may not be created. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/preauths/{preauthReference}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Check PreAuth via preauthReference |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Preauths_Get |
| Zenith | (none) |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | ["Preauths"] |
| Zenith | ["Pre-Auth"] |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | preauthReference | path | true | (none) | (none) |
| Zenith | api-key | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 404 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Found the preauth. |
| Zenith | Successful response |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the preauth by the reference provided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## POST /v2/preauths/{preauthReference}/captures

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Capture PreAuth Card |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Preauths_CapturePreauth |
| Zenith | (none) |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | ["Preauths"] |
| Zenith | ["Pre-Auth"] |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 1 |
| Zenith | 0 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | preauthReference | path | true | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | (none) | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 201, 300, 400, 403, 404, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 201

| Source | Description |
|--------|-------------|
| TravelPay | Preauth has been captured. |
| Zenith | (none) |

### Response 300

| Source | Description |
|--------|-------------|
| TravelPay | The merchant unique id already exists. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid preauth reference. |
| Zenith | (none) |

### Response 403

| Source | Description |
|--------|-------------|
| TravelPay | Invalid permission. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the preauth by the preauth reference provided. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Preauth may or may not be captured. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## PUT /v2/preauths/{preauthReference}/voids

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Void PreAuth Request |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Preauths_VoidPreauth |
| Zenith | (none) |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | ["Preauths"] |
| Zenith | ["Pre-Auth"] |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | preauthReference | path | true | (none) | (none) |
| Zenith | api-key | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | false | (none) | none |
| Zenith | false | (none) |  |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 400, 403, 404, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Preauth has been voided. |
| Zenith | Successful response |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid preauth reference. |
| Zenith | (none) |

### Response 403

| Source | Description |
|--------|-------------|
| TravelPay | Invalid permission. |
| Zenith | (none) |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Unable to find the preauth by the preauth reference provided. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Preauth may or may not be voided. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## POST /v2/requestpays

### Summary

| Source | Value |
|--------|-------|
| TravelPay | This Method will be return to upload request payments as a collection of json and process them |
| Zenith | Upload request to pay payments as a collection of json and process them |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | This API allows you to upload RequestPay payments as a collection of JSON parameters and processes them. |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | RequestPays_CreateRequestPayment |
| Zenith | (none) |

### Parameters Count

| Source | Count |
|--------|-------|
| TravelPay | 0 |
| Zenith | 2 |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Content-Type | header | undefined | (none) | (none) |

### Parameter 2

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| Zenith | Accept | header | undefined | (none) | (none) |

### Request Body

| Source | Required | Description | Content Types |
|--------|----------|-------------|---------------|
| TravelPay | true | Collection of request pay entries inside a container | application/json, text/json, application/xml, text/xml, application/x-www-form-urlencoded |
| Zenith | false | (none) | application/json |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 201, 300, 400, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | (none) |
| Zenith | Successful response |

### Response 201

| Source | Description |
|--------|-------------|
| TravelPay | Request to pay created successfully |
| Zenith | (none) |

### Response 300

| Source | Description |
|--------|-------------|
| TravelPay | Duplicate merchant unique id. |
| Zenith | (none) |

### Response 400

| Source | Description |
|--------|-------------|
| TravelPay | Invalid request pay details. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Something went wrong. Request to pay may or may not be created. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/requestpays/{requestPayId}

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | RequestPays_GetRequestPay |
| Zenith | (none) |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | requestPayId | path | true | Request Pay Identifier | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 404, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | Request Pay summary |
| Zenith | Successful response |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Request to pay not found. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Unable to get the request payment. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

## GET /v2/requestpays/{requestPayId}/entries

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | RequestPays_GetRequestPayEntries |
| Zenith | (none) |

### Parameter 1

| Source | Name | In | Required | Description | Example |
|--------|------|----|-----------|--------------|---------|
| TravelPay | requestPayId | path | true | Request pay identifier | (none) |
| Zenith | Accept | header | undefined | (none) | (none) |

### Response Codes

| Source | Codes |
|--------|-------|
| TravelPay | 200, 404, 500 |
| Zenith | 200 |

### Response 200

| Source | Description |
|--------|-------------|
| TravelPay | List of request pay entries |
| Zenith | Successful response |

### Response 404

| Source | Description |
|--------|-------------|
| TravelPay | Request pay not found. |
| Zenith | (none) |

### Response 500

| Source | Description |
|--------|-------------|
| TravelPay | Unable to get the request to pay. |
| Zenith | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |

---

