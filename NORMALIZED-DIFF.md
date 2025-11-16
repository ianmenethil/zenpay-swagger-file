# Complete OpenAPI Comparison: TravelPay vs Zenith

**Generated:** 2025-11-16T09:16:33.190Z

**TravelPay:** Payments API v2.0 vV2
**Zenith:** Zenith Payments Developer Guide - Merchant APIs v2.0.0

---

# Operations Comparison

## DELETE /v2/cardproxies/{cardProxy}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Delete card proxy permanently from the system. This will not affect 
any customer, registered using this proxy. |
| Zenith | Delete Card Proxy |
| **Match** | ❌ NO |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Delete card proxy permanently from the system. This will not affect any customer, registered using this proxy. |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | CardProxies_Delete |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | CardProxies |
| Zenith | CardProxies |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| cardProxy | TravelPay | path | true | Card proxy which will be used for processing the payment | (none) | (none) | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 204 | TravelPay | Card proxy deleted successfully. | (none) | (none) | (none) |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 404 | TravelPay | Unable to find the Card proxy provided. | (none) | (none) | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/batchpayments/{batchPaymentId}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get the batch payment summary. |
| Zenith | Fetch Batch Payment Summary by batchPaymentID |
| **Match** | ❌ NO |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | This method returns a summary of a batch payment using the batchPaymentID. |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | BatchPayments_GetBatchPayment |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | BatchPayments |
| Zenith | BatchPayments |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| batchPaymentId | TravelPay | path | true | Unique batch payment identifier | (none) | (none) | {"type":"integer","format":"int32"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{apiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Batch Payment summary | (none) | (none) | {"items":{"$ref":"#/components/schemas/ApiBatchPaySummary"},"xml":{"name":"ApiBatchPaySummary","wrapped":true},"type":"array"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 404 | TravelPay | Batch payment not found. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Unable to get the batch payment. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/batchpayments/{batchPaymentId}/entries

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Method return all the Batch payment transactions based on batch payment id |
| Zenith | Fetch Batch Payment Transactions by batchPaymentId |
| **Match** | ❌ NO |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | This method returns a list of entries in a batch payment. |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | BatchPayments_GetBatchPaymentEntries |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | BatchPayments |
| Zenith | BatchPayments |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| batchPaymentId | TravelPay | path | true | Batch Payment Id | (none) | (none) | {"type":"integer","format":"int32"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{apiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | List of batch payment entries | (none) | (none) | {"items":{"$ref":"#/components/schemas/ApiBatchPayEntry"},"xml":{"name":"ApiBatchPayEntry","wrapped":true},"type":"array"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 404 | TravelPay | Batch payment not found. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Unable to get the batch payment. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/cardproxies/{cardProxy}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get card proxy detail |
| Zenith | Fetch Card Proxy Details |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | CardProxies_GetTokenDetail |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | CardProxies |
| Zenith | CardProxies |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| cardProxy | TravelPay | path | true | Card proxy for which token response is required | (none) | (none) | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Token response of the card proxy provided. | (none) | (none) | {"$ref":"#/components/schemas/TokenResponse"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 404 | TravelPay | Unable to find the token response for the card proxy provided. | (none) | (none) | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/cardproxies/{cardProxy}/pricing

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get pricing for card proxy and payment amount |
| Zenith | Fetch Card Proxy Pricing |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | CardProxies_GetTransactionFee |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | CardProxies |
| Zenith | CardProxies |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| cardProxy | TravelPay | path | true | Card proxy which will be used for processing the payment | (none) | (none) | {"type":"string"} |
| paymentAmount | TravelPay | query | true | Payment amount to determine the pricing | (none) | (none) | {"type":"number","format":"double"} |
| paymentAmount | Zenith | query | false | (Required) Payment amount to determine the pricing | (none) | {"default":{"value":"<<double>>"}} | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Pricing response for card proxy and payment amount provided. | (none) | (none) | {"$ref":"#/components/schemas/PricingResponse"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 404 | TravelPay | Unable to find the pricing response for the card proxy provided. | (none) | (none) | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/customers

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Return customers based on the filter provided. |
| Zenith | Fetch all Customers based on the filters |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_Get |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | query | false | Customer reference | (none) | (none) | {"type":"string"} |
| customerReference | Zenith | query | false | Customer reference | (none) | {"default":{"value":"Ref1"}} | {"type":"string"} |
| customerStatuses | TravelPay | query | false | Customer statuses. Default is all. 0 - Open, 1 - AwaitingEmailVerfication, 2 - AwaitingSignature, 3 - SetUpIncomplete, 4 - Restricted, 5 - Closed, 6 - OnHold | (none) | (none) | {"type":"array","items":{"type":"integer","format" |
| customerStatuses | Zenith | query | false | Customer statuses. Default is all. 0 - Open, 1 - AwaitingEmailVerfication, 2 - AwaitingSignature, 3 - SetUpIncomplete, 4 - Restricted, 5 - Closed, 6 - OnHold | (none) | {"default":{"value":"0"}} | {"type":"integer"} |
| fromOpenDate | TravelPay | query | false | From Customer open date. Format: yyyy-MM-dd | (none) | (none) | {"type":"string","format":"date-time"} |
| fromOpenDate | Zenith | query | false | From Customer open date. Format: yyyy-MM-dd | (none) | {"default":{"value":"2022-05-12"}} | {"type":"string"} |
| toOpenDate | TravelPay | query | false | To Customer open date. Format: yyyy-MM-dd | (none) | (none) | {"type":"string","format":"date-time"} |
| toOpenDate | Zenith | query | false | To Customer open date. Format: yyyy-MM-dd | (none) | {"default":{"value":"2022-05-01"}} | {"type":"string"} |
| fromClosedDate | TravelPay | query | false | From Customer closed date. Format: yyyy-MM-dd | (none) | (none) | {"type":"string","format":"date-time"} |
| fromClosedDate | Zenith | query | false | From Customer closed date. Format: yyyy-MM-dd | (none) | {"default":{"value":"2020-01-01"}} | {"type":"string"} |
| toClosedDate | TravelPay | query | false | To Customer closed date. Format: yyyy-MM-dd | (none) | (none) | {"type":"string","format":"date-time"} |
| toClosedDate | Zenith | query | false | To Customer closed date. Format: yyyy-MM-dd | (none) | {"default":{"value":"2020-01-01"}} | {"type":"string"} |
| paymentOptions | TravelPay | query | false | Payment options. Default is all. 22 - AutoPay, 23 - EmailReminder, 24 - SmsReminder, 25 - FixedTerm, 26 - BatchPay, 27 - ScheduledPay, 28 - OneOff, 148 - PayID, 149 - BPAY | (none) | (none) | {"type":"array","items":{"type":"integer","format" |
| paymentOptions | Zenith | query | false | Payment options. Default is all. 22 - AutoPay, 23 - EmailReminder, 24 - SmsReminder, 25 - FixedTerm, 26 - BatchPay, 27 - ScheduledPay, 28 - OneOff, 148 - PayID, 149 - BPAY | (none) | {"default":{"value":"22"}} | {"type":"integer"} |
| offset | TravelPay | query | false | Starting index of the record. An index starts from 0. Default = 0 | (none) | (none) | {"type":"integer","format":"int32"} |
| offset | Zenith | query | false | Starting index of the record. An index starts from 0. Default = 0 | (none) | {"default":{"value":"0"}} | {"type":"integer"} |
| limit | TravelPay | query | false | Page size. Default = 20. Maximum page size allowed = 2000 | (none) | (none) | {"type":"integer","format":"int32"} |
| limit | Zenith | query | false | Page size. Default = 20. Maximum page size allowed = 2000 | (none) | {"default":{"value":"200"}} | {"type":"integer"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Return all the customers satisfies the filters. | (none) | (none) | {"items":{"$ref":"#/components/schemas/CustomerResponse"},"xml":{"name":"CustomerResponse","wrapped":true},"type":"array"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid get request. | (none) | (none) | {"type":"object"} |
| 404 | TravelPay | Unable to find the customers by the filters provided. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Something went wrong. Please try again. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/customers/

**Status:** ⚠️ Only in Zenith

## GET /v2/customers/

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Fetch all Customers |
| **Match** | ❌ NO |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | List of all customers.

It will display all customers regardless of customerStatus. It will include closed customers as well. |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Customers |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |


## GET /v2/customers/{customerReference}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Return the customer using the provided customer reference. |
| Zenith | Fetch Customer by customerReference |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_GetCustomer |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | path | true | Customer Reference provided by the merchant | (none) | (none) | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Found the customer. | (none) | (none) | {"$ref":"#/components/schemas/CustomerResponse"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid customer reference. | (none) | (none) | {"type":"object"} |
| 404 | TravelPay | Unable to find the customer by the reference provided. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/customers/{customerReference}/account

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get Customer credit / debit card or bank account |
| Zenith | Fetch Customer payment method by customerReference |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_GetCustomerAccount |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Found the customer account. | (none) | (none) | {"$ref":"#/components/schemas/CustomerAccountResponse"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid customer reference. | (none) | (none) | {"type":"object"} |
| 404 | TravelPay | Unable to find the customer by the reference provided. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/customers/{customerReference}/paymentOption

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get Customer payment option |
| Zenith | Fetch Customer payment options by customerReference |
| **Match** | ❌ NO |

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
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_GetCustomerPaymentOption |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Found the customer payment option. | (none) | (none) | {"$ref":"#/components/schemas/CustomerPaymentOption"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid customer reference. | (none) | (none) | {"type":"object"} |
| 404 | TravelPay | Unable to find the customer by the reference provided. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/customers/{customerReference}/profile

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get Customer profile |
| Zenith | Fetch Customer profile by customerReference |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_GetCustomerProfile |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Found the customer profile. | (none) | (none) | {"$ref":"#/components/schemas/ICustomerProfie"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid customer reference. | (none) | (none) | {"type":"object"} |
| 404 | TravelPay | Unable to find the customer by the reference provided. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/customers/{customerReference}/status

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get Customer status |
| Zenith | Fetch Customer status by customerReference |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_GetCustomerStatus |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Found the customer status. | (none) | (none) | {"type":"string"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid customer reference. | (none) | (none) | {"type":"object"} |
| 404 | TravelPay | Unable to find the customer by the reference provided. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/diagnostics/ping

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Ping method to get the server date time and version information |
| Zenith | Ping |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Diagnostics_Ping |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Diagnostics |
| Zenith | Diagnostics |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Batch Payment summary | (none) | (none) | {"$ref":"#/components/schemas/PingResponse"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/payments

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Fetch all Payments |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_Get |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Payments |
| Zenith | Payments |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | query | false | (none) | (none) | (none) | {"type":"string"} |
| customerReference | Zenith | query | false | (Optional) Filter by the customer reference | (none) | {"default":{"value":"Ref1"}} | {"type":"string"} |
| fromProcessedDate | TravelPay | query | false | (none) | (none) | (none) | {"type":"string","format":"date-time"} |
| fromProcessedDate | Zenith | query | false | (Optional) Filter by the payments from date | (none) | {"default":{"value":"2018-08-22"}} | {"type":"string"} |
| toProcessedDate | TravelPay | query | false | (none) | (none) | (none) | {"type":"string","format":"date-time"} |
| toProcessedDate | Zenith | query | false | (Optional) Filter by the payments to date | (none) | {"default":{"value":"2018-08-22"}} | {"type":"string"} |
| settlementDate | TravelPay | query | false | (none) | (none) | (none) | {"type":"string","format":"date-time"} |
| settlementDate | Zenith | query | false | (Optional) Filter by the payments settlement date | (none) | {"default":{"value":"2018-08-22"}} | {"type":"string"} |
| paymentSettlement | TravelPay | query | false | Filter by payment settlement status. PaymentSettlement values: All: 0; Settled: 1; NotSettled: 2 | (none) | (none) | {"type":"integer","format":"int32","enum":[0,1,2]} |
| paymentSettlement | Zenith | query | false | (Optional) Filter by if the payment is settled to the merchant. "0" payment is not settled. "1" payment is settled to the merchant | (none) | {"default":{"value":"0"}} | {"type":"integer"} |
| transactionTypes | TravelPay | query | false | (none) | (none) | (none) | {"type":"array","items":{"type":"integer","format" |
| transactionTypes | Zenith | query | false | (Optional) Filter by the different transaction types | (none) | {"default":{"value":"null"}} | {"type":"string"} |
| isRecalled | TravelPay | query | false | (none) | (none) | (none) | {"type":"boolean"} |
| isRecalled | Zenith | query | false | (Optional) Filter by if the payments are in recalled status | (none) | {"default":{"value":"false"}} | {"type":"boolean"} |
| isRefunded | TravelPay | query | false | (none) | (none) | (none) | {"type":"boolean"} |
| isRefunded | Zenith | query | false | (Optional) Filter by if the payments are in refunded status | (none) | {"default":{"value":"false"}} | {"type":"boolean"} |
| offset | TravelPay | query | false | (none) | (none) | (none) | {"type":"integer","format":"int32"} |
| offset | Zenith | query | false | (Optional) | (none) | {"default":{"value":"0"}} | {"type":"integer"} |
| limit | TravelPay | query | false | (none) | (none) | (none) | {"type":"integer","format":"int32"} |
| limit | Zenith | query | false | (Optional) | (none) | {"default":{"value":"20"}} | {"type":"integer"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Return all the payments satisfies the filters. | (none) | (none) | {"items":{"$ref":"#/components/schemas/PaymentResponse"},"xml":{"name":"PaymentResponse","wrapped":true},"type":"array"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid get request. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Something went wrong. Please try again. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/payments/uniqueId/{merchantUniqueId}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Returns Payment details based on merchant unique reference |
| Zenith | Fetch Payment details based on merchant unique reference |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_GetPaymentByUniqueId |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Payments |
| Zenith | Payments |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| merchantUniqueId | TravelPay | path | true | Merchant Unique Id. This is provided by the merchant when creating an payment. | (none) | (none) | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Found the payment. | (none) | (none) | {"$ref":"#/components/schemas/PaymentResponse"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid payment reference. | (none) | (none) | {"type":"object"} |
| 404 | TravelPay | Unable to find the payment by the reference provided. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}

**Status:** ⚠️ Only in TravelPay

## GET /v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_GetV2PaymentsUniqueIdByPaymentReferenceRefundrequestsByRefundRequestUniqueId |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Payments |
| Zenith | (none) |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| paymentReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |
| refundRequestUniqueId | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Return refund request for the provided payment reference. | (none) | (none) | {"$ref":"#/components/schemas/RefundResponse"} |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"type":"object"} |
| 404 | TravelPay | Unable to find the refund request by the reference provided. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Something went wrong. Please try again. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/payments/{paymentReference}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Returns Payment details based on Payment reference |
| Zenith | Fetch Payment details by paymentReference |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_GetPayment |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Payments |
| Zenith | Payments |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| paymentReference | TravelPay | path | true | Payment Reference | (none) | (none) | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Found the payment. | (none) | (none) | {"$ref":"#/components/schemas/PaymentResponse"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid payment reference. | (none) | (none) | {"type":"object"} |
| 404 | TravelPay | Unable to find the payment by the reference provided. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/payments/{paymentReference}/refundrequests

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Returns all the refund requests details based on payment reference |
| Zenith | Returns all the refund requests details based on payment reference |
| **Match** | ✅ YES |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_GetRefundRequest |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Payments |
| Zenith | RefundRequests |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| paymentReference | TravelPay | path | true | Payment Reference | (none) | (none) | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Return refund request for the provided payment reference. | (none) | (none) | {"items":{"$ref":"#/components/schemas/RefundResponse"},"xml":{"name":"RefundResponse","wrapped":true},"type":"array"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 404 | TravelPay | Payment not found. | (none) | (none) | (none) |
| 500 | TravelPay | Something went wrong. Please try again. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/preauths

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Check PreAuth via customerReference |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Preauths_GetV2Preauths |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Preauths |
| Zenith | Pre-Auth |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | query | false | (none) | (none) | (none) | {"type":"string"} |
| fromProcessedDate | TravelPay | query | false | (none) | (none) | (none) | {"type":"string","format":"date-time"} |
| toProcessedDate | TravelPay | query | false | (none) | (none) | (none) | {"type":"string","format":"date-time"} |
| offset | TravelPay | query | false | (none) | (none) | (none) | {"type":"integer","format":"int32"} |
| limit | TravelPay | query | false | (none) | (none) | (none) | {"type":"integer","format":"int32"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Found preauths. | (none) | (none) | {"items":{"$ref":"#/components/schemas/PreauthResponse"},"xml":{"name":"PreauthResponse","wrapped":true},"type":"array"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/preauths/{preauthReference}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Check PreAuth via preauthReference |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Preauths_Get |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Preauths |
| Zenith | Pre-Auth |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| preauthReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Found the preauth. | (none) | (none) | {"$ref":"#/components/schemas/PreauthResponse"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 404 | TravelPay | Unable to find the preauth by the reference provided. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/proxies/{proxy}

**Status:** ⚠️ Only in TravelPay

## GET /v2/proxies/{proxy}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get the payment information based on the proxy information provided. |
| Zenith | (none) |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Proxies_GetPaymentAccountProxy |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Proxies |
| Zenith | (none) |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| proxy | TravelPay | path | true | Payment account proxy | (none) | (none) | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Payment account proxy provided. | (none) | (none) | {"$ref":"#/components/schemas/PaymentAccountProxyResponse"} |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 404 | TravelPay | Unable to find the payment account proxy. | (none) | (none) | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/proxies/{proxy}/pricing

**Status:** ⚠️ Only in TravelPay

## GET /v2/proxies/{proxy}/pricing

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Get pricing for card/bank proxy and payment amount |
| Zenith | (none) |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Proxies_GetTransactionFee |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Proxies |
| Zenith | (none) |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| proxy | TravelPay | path | true | Proxy which will be used for processing the payment | (none) | (none) | {"type":"string"} |
| paymentAmount | TravelPay | query | true | Payment amount to determine the pricing | (none) | (none) | {"type":"number","format":"double"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Pricing response for proxy and payment amount provided. | (none) | (none) | {"$ref":"#/components/schemas/PricingResponse"} |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 404 | TravelPay | Unable to find the pricing response for the provided proxy. | (none) | (none) | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/requestpays/{requestPayId}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Api to get the request pay details |
| Zenith | Api to get the request pay details |
| **Match** | ✅ YES |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | RequestPays_GetRequestPay |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | RequestPays |
| Zenith | RequestPays |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| requestPayId | TravelPay | path | true | Request Pay Identifier | (none) | (none) | {"type":"integer","format":"int32"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Request Pay summary | (none) | (none) | {"$ref":"#/components/schemas/ApiRequestPaySummary"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 404 | TravelPay | Request to pay not found. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Unable to get the request payment. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/requestpays/{requestPayId}/entries

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Api to get the request pay entries |
| Zenith | Api to get the request pay entries |
| **Match** | ✅ YES |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | RequestPays_GetRequestPayEntries |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | RequestPays |
| Zenith | RequestPays |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| requestPayId | TravelPay | path | true | Request pay identifier | (none) | (none) | {"type":"integer","format":"int32"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | List of request pay entries | (none) | (none) | {"items":{"$ref":"#/components/schemas/ApiRequestPayEntry"},"xml":{"name":"ApiRequestPayEntry","wrapped":true},"type":"array"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 404 | TravelPay | Request pay not found. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Unable to get the request to pay. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## GET /v2/sessions/{sessionId}

**Status:** ⚠️ Only in TravelPay

## GET /v2/sessions/{sessionId}

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Not supported |
| Zenith | (none) |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Sessions_Get |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Sessions |
| Zenith | (none) |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| sessionId | TravelPay | path | true | (none) | (none) | (none) | {"type":"integer","format":"int32"} |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 501 | TravelPay | This endpoint is not currently supported | (none) | (none) | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## POST /v2/batchpayments

### Summary

| Source | Value |
|--------|-------|
| TravelPay | This Method will be return to upload payments batch as a collection of json and process them |
| Zenith | Process Batch Payment |
| **Match** | ❌ NO |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | This method is used to upload batch payments as a collection of JSON and process them. |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | BatchPayments_CreateBatchPayment |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | BatchPayments |
| Zenith | BatchPayments |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{apiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | collection of batchpayment entries inside a container | (none) | (none) | {"$ref":"#/components/schemas/BatchPaymentRequest"} |
| Zenith | false | (none) | (none) | (none) | {"type":"object","examples":[{"batchPaymentEntries":[{"customerReference":"<string>","paymentAmount":"<double>","merchantUniquePaymentId":"<string>","paymentAccountProxy":"<string>"},{"customerReferen |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 201 | TravelPay | Batch payment created successfully | (none) | (none) | {"$ref":"#/components/schemas/BatchPaymentResponse"} |
| 300 | TravelPay | Duplicate merchant unique id. The response will have 'Location' header which will have the orginal batch payment. | (none) | (none) | {"$ref":"#/components/schemas/AmbiguousResult"} |
| 400 | TravelPay | Invalid batch payment details. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 500 | TravelPay | Something went wrong. Batch payment may or may not be created. | (none) | (none) | {"$ref":"#/components/schemas/InternalServerErrorResult"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## POST /v2/cardproxies

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Generate card proxy. Not recommended for software / sites that are not PCI DSS compliant. For an easy and secure card tokenisation and payment option, see our Payment Plugin jQuery. |
| Zenith | Create Card Proxy |
| **Match** | ❌ NO |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Generate a card proxy.

Not recommended for software / sites that are not PCI DSS compliant. For a easy and secure card tokenisation and payment option, see our Payment Plugin jQuery.

This endpoint is locked behind a setting and can only be utilized once it has been enabled by Zenith Payments. |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | CardProxies_Tokenise |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | CardProxies |
| Zenith | CardProxies |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{apiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | Card details required to generate a card proxy | (none) | (none) | {"$ref":"#/components/schemas/CardProxyRequest"} |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 201 | TravelPay | Card authorisation is successful. | (none) | (none) | {"$ref":"#/components/schemas/CardProxyResponse"} |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 403 | TravelPay | The credential provided doesn't support this endpoint. | (none) | (none) | (none) |
| 409 | TravelPay | Customer unique id is already used. | (none) | (none) | (none) |
| 412 | TravelPay | Tokenisation failed. | (none) | (none) | {"$ref":"#/components/schemas/PreconditionFailedResponse"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## POST /v2/customers

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Create customer using the provided details |
| Zenith | Create customer |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_CreateCustomer |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| Content-Type | Zenith | header | false | (none) | (none) | {"default":{"value":"application/x-www-form-urlenc | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | Customer details to create in the system | (none) | (none) | {"$ref":"#/components/schemas/NewCustomer"} |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 201 | TravelPay | Customer created successfully. | (none) | (none) | {"$ref":"#/components/schemas/NewCustomer"} |
| 300 | TravelPay | Duplicate customer reference. | (none) | (none) | {"type":"object"} |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 403 | TravelPay | Merchant is forbidden to perform this operation. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Something went wrong. Customer may or may not be created. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## POST /v2/payments

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Perform OneOff payment for a registered customer with customer reference and payment amount |
| Zenith | Perform OneOff Payment |
| **Match** | ❌ NO |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | ### Important Notice for Using the Direct Card Payment Option:

This endpoint allows the submission of raw card details (`cardNumber`, `expiryMonth`, `expiryYear`, `cvv`) for processing payments. **However, this method requires a certain level of PCI DSS (Payment Card Industry Data Security Standard) compliance** to ensure the secure handling of sensitive card information. To enhance security and reduce the risks associated with directly managing card data, we strongly recommend using our **Payment Plugin jQuery** for secure card tokenization and payment processing.

**Please note:** This endpoint is restricted and can only be accessed once it has been enabled by Zenith Payments. Ensure you have the necessary permissions and configurations in place before attempting to use this method. For access or further assistance, please contact us at [integrations@zenithpayments.com.au](https://mailto:integrations@zenithpayments.com.au). |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_Post |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Payments |
| Zenith | Payments |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| Content-Type | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{apiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | For making payment for existing customer, use Customer Reference and Payment Amount
For making card proxy based, use all the fields in the request | (none) | (none) | {"$ref":"#/components/schemas/PaymentRequest"} |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 201 | TravelPay | Payment is processed. | (none) | (none) | {"$ref":"#/components/schemas/PaymentResponse"} |
| 300 | TravelPay | Duplicate merchant unique id. | (none) | (none) | {"type":"object"} |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 500 | TravelPay | Something went wrong. Payment may or may not be created. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## POST /v2/payments/{paymentReference}/refundrequests

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Allow the merchant to request for refund for provided payment using payment reference. |
| Zenith | Allow the merchant to request a refund for provided payment using payment reference. |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Payments_CreateRefundRequests |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Payments |
| Zenith | RefundRequests |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| paymentReference | TravelPay | path | true | Payment Reference | (none) | (none) | {"type":"string"} |
| Content-Type | Zenith | header | false | (none) | (none) | {"default":{"value":"application/x-www-form-urlenc | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | (none) | (none) | (none) | {"$ref":"#/components/schemas/RefundRequest"} |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 201 | TravelPay | Refund request is successfully created for the payment. | (none) | (none) | {"items":{"$ref":"#/components/schemas/RefundResponse"},"xml":{"name":"RefundResponse","wrapped":true},"type":"array"} |
| 300 | TravelPay | Duplicate refund request. | (none) | (none) | {"type":"object"} |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 403 | TravelPay | Merchant is forbidden to perform this operation. | (none) | (none) | {"type":"object"} |
| 404 | TravelPay | Payment not found. | (none) | (none) | (none) |
| 500 | TravelPay | Something went wrong. Please try again. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## POST /v2/preauths

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Create PreAuth |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Preauths_Post |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Preauths |
| Zenith | Pre-Auth |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | (none) | (none) | (none) | {"$ref":"#/components/schemas/PreauthRequest"} |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 201 | TravelPay | Preauth is created. | (none) | (none) | {"$ref":"#/components/schemas/PreauthResponse"} |
| 300 | TravelPay | Duplicate merchant unique id. | (none) | (none) | {"type":"object"} |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 403 | TravelPay | Invalid permission. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 500 | TravelPay | Something went wrong. Preauth may or may not be created. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## POST /v2/preauths/{preauthReference}/captures

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Capture PreAuth Card |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Preauths_CapturePreauth |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Preauths |
| Zenith | Pre-Auth |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| preauthReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | (none) | (none) | (none) | {"$ref":"#/components/schemas/CaptureCardRequest"} |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 201 | TravelPay | Preauth has been captured. | (none) | (none) | {"$ref":"#/components/schemas/CaptureCardResponse"} |
| 300 | TravelPay | The merchant unique id already exists. | (none) | (none) | {"type":"object"} |
| 400 | TravelPay | Invalid preauth reference. | (none) | (none) | {"type":"object"} |
| 403 | TravelPay | Invalid permission. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 404 | TravelPay | Unable to find the preauth by the preauth reference provided. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Something went wrong. Preauth may or may not be captured. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## POST /v2/requestpays

### Summary

| Source | Value |
|--------|-------|
| TravelPay | This Method will be return to upload request payments as a collection of json and process them |
| Zenith | Upload request to pay payments as a collection of json and process them |
| **Match** | ❌ NO |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | This API allows you to upload RequestPay payments as a collection of JSON parameters and processes them. |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | RequestPays_CreateRequestPayment |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | RequestPays |
| Zenith | RequestPays |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| Content-Type | Zenith | header | false | (none) | (none) | {"default":{"value":"application/x-www-form-urlenc | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | Collection of request pay entries inside a container | (none) | (none) | {"$ref":"#/components/schemas/RequestPayRequest"} |
| Zenith | false | (none) | (none) | (none) | {"type":"object","examples":[{"requestPaymentEntries":[{"customerReference":"<string>","paymentAmount":"<double>","firstName":"<string>","lastName":"<string>","email":"<string>","mobile":"0411111111", |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 201 | TravelPay | Request to pay created successfully | (none) | (none) | {"$ref":"#/components/schemas/RequestPayResponse"} |
| 300 | TravelPay | Duplicate merchant unique id. | (none) | (none) | {"$ref":"#/components/schemas/AmbiguousResult"} |
| 400 | TravelPay | Invalid request pay details. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 500 | TravelPay | Something went wrong. Request to pay may or may not be created. | (none) | (none) | {"$ref":"#/components/schemas/InternalServerErrorResult"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## POST /v2/sessions

**Status:** ⚠️ Only in TravelPay

## POST /v2/sessions

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Used to create session for Payment Plugin. The session created will have an expiry. |
| Zenith | (none) |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Sessions_Post |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Sessions |
| Zenith | (none) |
| **Match** | ❌ NO |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | Session request data. | (none) | (none) | {"$ref":"#/components/schemas/SessionRequest"} |
| Zenith | - | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 201 | TravelPay | Session created. | (none) | (none) | {"$ref":"#/components/schemas/SessionResponse"} |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 500 | TravelPay | Unable create session. Read the response content for more information. | (none) | (none) | (none) |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## PUT /v2/customers/{customerReference}/account

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Update the customer account |
| Zenith | Update the customer account |
| **Match** | ✅ YES |

### Description

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | StartFragment

Customer Bank/Credit Card account. Use PaymentAccountProxy or CreditCardProxy or BankAccount.  
If more than one details are passed, only one detail used as per the following order, 1. PaymentAccountProxy 2. BankAccount 3. CreditCardProxy  
Preferred option is PaymentAccountProxy

EndFragment |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_UpdateCustomerAccount |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |
| Content-Type | Zenith | header | false | (none) | (none) | {"default":{"value":"application/x-www-form-urlenc | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | (none) | (none) | (none) | {"$ref":"#/components/schemas/CustomerAccountRequest"} |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 204 | TravelPay | Updated the customer account. | (none) | (none) | (none) |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 403 | TravelPay | Merchant is forbidden to perform this operation. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Something went wrong. Customer account may or may not be updated. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## PUT /v2/customers/{customerReference}/customerReference

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Update the customer reference |
| Zenith | Update the customer reference |
| **Match** | ✅ YES |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_UpdateCustomerReference |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | path | true | Old customer reference | (none) | (none) | {"type":"string"} |
| Content-Type | Zenith | header | false | (none) | (none) | {"default":{"value":"application/x-www-form-urlenc | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | New customer reference | (none) | (none) | {"type":"string"} |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 204 | TravelPay | Updated the customer reference. | (none) | (none) | (none) |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 403 | TravelPay | Merchant is forbidden to perform this operation. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Something went wrong. Customer reference may or may not be updated. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## PUT /v2/customers/{customerReference}/paymentOption

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Update the customer payment option |
| Zenith | Update the customer payment option |
| **Match** | ✅ YES |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_UpdateCustomerPaymentOption |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |
| Content-Type | Zenith | header | false | (none) | (none) | {"default":{"value":"application/x-www-form-urlenc | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | (none) | (none) | (none) | {"$ref":"#/components/schemas/CustomerPaymentOption"} |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 204 | TravelPay | Updated the customer payment option. | (none) | (none) | (none) |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 403 | TravelPay | Merchant is forbidden to perform this operation. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Something went wrong. Customer payment option may or may not be updated. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## PUT /v2/customers/{customerReference}/profile

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Update the customer profile. |
| Zenith | Update the customer profile |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_UpdateCustomerProfile |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |
| Content-Type | Zenith | header | false | (none) | (none) | {"default":{"value":"application/x-www-form-urlenc | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | (none) | (none) | (none) | {"$ref":"#/components/schemas/CustomerProfileRequest"} |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 204 | TravelPay | Updated the customer profile. | (none) | (none) | (none) |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 403 | TravelPay | Merchant is forbidden to perform this operation. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Something went wrong. Customer may or may not be updated. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## PUT /v2/customers/{customerReference}/status

### Summary

| Source | Value |
|--------|-------|
| TravelPay | Update the customer status |
| Zenith | Update the customer status |
| **Match** | ✅ YES |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Customers_UpdateCustomerStatus |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Customers |
| Zenith | Customers |
| **Match** | ✅ YES |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| customerReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |
| Content-Type | Zenith | header | false | (none) | (none) | {"default":{"value":"application/x-www-form-urlenc | {"type":"string"} |
| Accept | Zenith | header | false | (none) | (none) | {"default":{"value":"application/json"}} | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | true | (none) | (none) | (none) | {"$ref":"#/components/schemas/CustomerStatusRequest"} |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 204 | TravelPay | Updated the customer payment option. | (none) | (none) | (none) |
| 400 | TravelPay | Invalid input detail. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 403 | TravelPay | Merchant is forbidden to perform this operation. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Something went wrong. Customer payment option may or may not be updated. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |


## PUT /v2/preauths/{preauthReference}/voids

### Summary

| Source | Value |
|--------|-------|
| TravelPay | (none) |
| Zenith | Void PreAuth Request |
| **Match** | ❌ NO |

### OperationId

| Source | Value |
|--------|-------|
| TravelPay | Preauths_VoidPreauth |
| Zenith | (none) |
| **Match** | ❌ NO |

### Tags

| Source | Value |
|--------|-------|
| TravelPay | Preauths |
| Zenith | Pre-Auth |
| **Match** | ❌ NO |

### Parameters

| Parameter | Source | In | Required | Description | Example | Examples | Schema |
|-----------|--------|-------|----------|-------------|---------|----------|--------|
| preauthReference | TravelPay | path | true | (none) | (none) | (none) | {"type":"string"} |
| api-key | Zenith | header | false | (none) | (none) | {"default":{"value":"{{ApiKey}}"}} | {"type":"string"} |

### Request Body

| Source | Required | Description | Example | Examples | Schema (first 200 chars) |
|--------|----------|-------------|---------|----------|--------|
| TravelPay | - | (none) | (none) | (none) | (none) |
| Zenith | false | (none) | (none) | (none) | (none) |

### Responses

| Status | Source | Description | Example | Examples | Schema (first 200 chars) |
|--------|--------|-------------|---------|----------|--------|
| 200 | TravelPay | Preauth has been voided. | (none) | (none) | {"$ref":"#/components/schemas/VoidCardResponse"} |
| 200 | Zenith | Successful response | (none) | (none) | (none) |
| 400 | TravelPay | Invalid preauth reference. | (none) | (none) | {"type":"object"} |
| 403 | TravelPay | Invalid permission. | (none) | (none) | {"additionalProperties":{"$ref":"#/components/schemas/ModelState"},"type":"object"} |
| 404 | TravelPay | Unable to find the preauth by the preauth reference provided. | (none) | (none) | {"type":"object"} |
| 500 | TravelPay | Something went wrong. Preauth may or may not be voided. | (none) | (none) | {"type":"object"} |

### Security

| Source | Value |
|--------|-------|
| TravelPay | [{"Api-Key":[]}] |
| Zenith | [] |
| **Match** | ❌ NO |

