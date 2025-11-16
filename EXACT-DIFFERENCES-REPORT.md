# 🔍 100% EXACT DIFFERENCES: TravelPay API vs Zenith Developer Guide

## 📊 High-Level Summary

| Spec | Title | Version | Paths | Operations | Schemas |
|------|-------|---------|-------|------------|----------|
| TravelPay | Payments API v2.0 | V2 | 30 | 39 | 59 |
| Zenith | Zenith Payments Developer Guide - Merchant APIs | 2.0.0 | 26 | 35 | 0 |

## 🔴 Paths ONLY in TravelPay (23)

| Path | Methods |
|------|----------|
| /v2/batchpayments/{batchPaymentId} | GET |
| /v2/batchpayments/{batchPaymentId}/entries | GET |
| /v2/cardproxies/{cardProxy} | GET, DELETE |
| /v2/cardproxies/{cardProxy}/pricing | GET |
| /v2/customers/{customerReference} | GET |
| /v2/customers/{customerReference}/account | GET, PUT |
| /v2/customers/{customerReference}/customerReference | PUT |
| /v2/customers/{customerReference}/paymentOption | GET, PUT |
| /v2/customers/{customerReference}/profile | GET, PUT |
| /v2/customers/{customerReference}/status | GET, PUT |
| /v2/payments/uniqueId/{merchantUniqueId} | GET |
| /v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId} | GET |
| /v2/payments/{paymentReference} | GET |
| /v2/payments/{paymentReference}/refundrequests | GET, POST |
| /v2/preauths/{preauthReference} | GET |
| /v2/preauths/{preauthReference}/captures | POST |
| /v2/preauths/{preauthReference}/voids | PUT |
| /v2/proxies/{proxy} | GET |
| /v2/proxies/{proxy}/pricing | GET |
| /v2/requestpays/{requestPayId} | GET |
| /v2/requestpays/{requestPayId}/entries | GET |
| /v2/sessions | POST |
| /v2/sessions/{sessionId} | GET |

## 🟢 Paths ONLY in Zenith (19)

| Path | Methods |
|------|----------|
| /v2/batchpayments/:batchPaymentId | GET |
| /v2/batchpayments/:batchPaymentId/entries | GET |
| /v2/cardproxies/:cardProxy | DELETE, GET |
| /v2/cardproxies/:cardProxy/pricing | GET |
| /v2/customers/ | GET |
| /v2/customers/:customerReference | GET |
| /v2/customers/:customerReference/account | GET, PUT |
| /v2/customers/:customerReference/customerReference | PUT |
| /v2/customers/:customerReference/paymentOption | GET, PUT |
| /v2/customers/:customerReference/profile | GET, PUT |
| /v2/customers/:customerReference/status | GET, PUT |
| /v2/payments/:paymentReference | GET |
| /v2/payments/:paymentReference/refundrequests | POST, GET |
| /v2/payments/uniqueId/:merchantUniqueId | GET |
| /v2/preauths/:preauthReference | GET |
| /v2/preauths/:preauthReference/captures | POST |
| /v2/preauths/:preauthReference/voids | PUT |
| /v2/requestpays/:requestPayId | GET |
| /v2/requestpays/:requestPayId/entries | GET |

## ⚖️ Paths in BOTH (with differences) (7)

### POST /v2/batchpayments

| Field | TravelPay | Zenith |
|-------|-----------|--------|
| summary | This Method will be return to upload payments batch as a collection of json and process them | Process Batch Payment |
| description | (none) | This method is used to upload batch payments as a collection of JSON and process them. |
| operationId | BatchPayments_CreateBatchPayment | (none) |
| security | [{"Api-Key":[]}] | (none) |
| parameters count | 0 | 2 |
| response codes | 201, 300, 400, 500 | 200 |

### POST /v2/cardproxies

| Field | TravelPay | Zenith |
|-------|-----------|--------|
| summary | Generate card proxy. Not recommended for software / sites that are not PCI DSS compliant. For an eas... | Create Card Proxy |
| description | (none) | Generate a card proxy.  Not recommended for software / sites that are not PCI DSS compliant. For a e... |
| operationId | CardProxies_Tokenise | (none) |
| security | [{"Api-Key":[]}] | (none) |
| parameters count | 0 | 2 |
| response codes | 201, 400, 403, 409, 412 | 200 |

### GET /v2/customers

| Field | TravelPay | Zenith |
|-------|-----------|--------|
| summary | Return customers based on the filter provided. | Fetch all Customers based on the filters |
| operationId | Customers_Get | (none) |
| security | [{"Api-Key":[]}] | (none) |
| parameters count | 9 | 11 |
| response codes | 200, 400, 404, 500 | 200 |

### POST /v2/customers

| Field | TravelPay | Zenith |
|-------|-----------|--------|
| summary | Create customer using the provided details | Create customer |
| operationId | Customers_CreateCustomer | (none) |
| security | [{"Api-Key":[]}] | (none) |
| parameters count | 0 | 3 |
| response codes | 201, 300, 400, 403, 500 | 200 |

### GET /v2/diagnostics/ping

| Field | TravelPay | Zenith |
|-------|-----------|--------|
| summary | Ping method to get the server date time and version information | Ping |
| operationId | Diagnostics_Ping | (none) |
| security | [{"Api-Key":[]}] | (none) |
| parameters count | 0 | 1 |

### GET /v2/payments

| Field | TravelPay | Zenith |
|-------|-----------|--------|
| summary | (none) | Fetch all Payments |
| operationId | Payments_Get | (none) |
| security | [{"Api-Key":[]}] | (none) |
| parameters count | 10 | 12 |
| response codes | 200, 400, 500 | 200 |

### POST /v2/payments

| Field | TravelPay | Zenith |
|-------|-----------|--------|
| summary | Perform OneOff payment for a registered customer with customer reference and payment amount | Perform OneOff Payment |
| description | (none) | ### Important Notice for Using the Direct Card Payment Option:  This endpoint allows the submission ... |
| operationId | Payments_Post | (none) |
| security | [{"Api-Key":[]}] | (none) |
| parameters count | 0 | 3 |
| response codes | 201, 300, 400, 500 | 200 |

### GET /v2/preauths

| Field | TravelPay | Zenith |
|-------|-----------|--------|
| summary | (none) | Check PreAuth via customerReference |
| operationId | Preauths_GetV2Preauths | (none) |
| tags | ["Preauths"] | ["Pre-Auth"] |
| security | [{"Api-Key":[]}] | (none) |
| parameters count | 5 | 1 |

### POST /v2/preauths

| Field | TravelPay | Zenith |
|-------|-----------|--------|
| summary | (none) | Create PreAuth |
| operationId | Preauths_Post | (none) |
| tags | ["Preauths"] | ["Pre-Auth"] |
| security | [{"Api-Key":[]}] | (none) |
| parameters count | 0 | 1 |
| response codes | 201, 300, 400, 403, 500 | 200 |

### POST /v2/requestpays

| Field | TravelPay | Zenith |
|-------|-----------|--------|
| summary | This Method will be return to upload request payments as a collection of json and process them | Upload request to pay payments as a collection of json and process them |
| description | (none) | This API allows you to upload RequestPay payments as a collection of JSON parameters and processes t... |
| operationId | RequestPays_CreateRequestPayment | (none) |
| security | [{"Api-Key":[]}] | (none) |
| parameters count | 0 | 2 |
| response codes | 201, 300, 400, 500 | 200 |

## 📦 Schemas

**TravelPay:** 59 schemas
**Zenith:** 0 schemas

⚠️ **Zenith has NO schemas** - all schemas are inline or missing

**Only in TravelPay (59):** AccountProxy, AdditionalReference, AmbiguousResult, ApiBatchPayEntry, ApiBatchPaySummary, ApiRequestPayEntry, ApiRequestPaySummary, BPayDetail, BankAccount, BatchPaymentDataRecord, BatchPaymentRequest, BatchPaymentResponse, CaptureCardRequest, CaptureCardResponse, CardProxyRequest, CardProxyResponse, CreditCard, CreditCardProxy, CustomerAccountRequest, CustomerAccountResponse...

