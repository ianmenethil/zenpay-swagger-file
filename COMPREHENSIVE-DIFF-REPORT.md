# Comprehensive OpenAPI Diff Report

**Generated:** 2025-11-18T03:06:19.721Z

## Specifications

| Property | Spec 1 | Spec 2 |
|----------|--------|--------|
| **File** | openapi.json | zenith-openapi-31.json |
| **Title** | Payments API v2.0 | Zenith Payments Developer Guide - Merchant APIs |
| **Operations** | 39 | 35 |
| **Schemas** | 59 | 0 |

## Summary

- **Total Differences:** 644
- 🔴 **Critical:** 59
- 🟡 **Important:** 224
- ⚪ **Informational:** 361

## 🔴 Critical Differences

These differences affect API structure and compatibility.

| Location | Field | Type | Spec 1 Value | Spec 2 Value |
|----------|-------|------|--------------|-------------|
| `paths./v2/batchpayments.post.requestBody.content.application/json.schema.type` | type | added | `(undefined)` | `"object"` |
| `paths./v2/batchpayments.post.requestBody.required` | required | missing | `true` | `(undefined)` |
| `paths./v2/cardproxies.post.requestBody.required` | required | missing | `true` | `(undefined)` |
| `paths./v2/customers.get.parameters[0].in` | in | modified | `"query"` | `"header"` |
| `paths./v2/customers.get.parameters[0].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/customers.get.parameters[1].schema.type` | type | modified | `"array"` | `"string"` |
| `paths./v2/customers.get.parameters[1].in` | in | modified | `"query"` | `"header"` |
| `paths./v2/customers.get.parameters[1].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/customers.get.parameters[2].schema.format` | format | missing | `"date-time"` | `(undefined)` |
| `paths./v2/customers.get.parameters[2].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/customers.get.parameters[3].schema.type` | type | modified | `"string"` | `"integer"` |
| `paths./v2/customers.get.parameters[3].schema.format` | format | missing | `"date-time"` | `(undefined)` |
| `paths./v2/customers.get.parameters[3].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/customers.get.parameters[4].schema.format` | format | missing | `"date-time"` | `(undefined)` |
| `paths./v2/customers.get.parameters[4].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/customers.get.parameters[5].schema.format` | format | missing | `"date-time"` | `(undefined)` |
| `paths./v2/customers.get.parameters[5].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/customers.get.parameters[6].schema.type` | type | modified | `"array"` | `"string"` |
| `paths./v2/customers.get.parameters[6].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/customers.get.parameters[7].schema.type` | type | modified | `"integer"` | `"string"` |
| `paths./v2/customers.get.parameters[7].schema.format` | format | missing | `"int32"` | `(undefined)` |
| `paths./v2/customers.get.parameters[7].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/customers.get.parameters[8].schema.format` | format | missing | `"int32"` | `(undefined)` |
| `paths./v2/customers.get.parameters[8].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/customers.get.responses.200.description` | description | modified | `"Return all the customers satisfies the filters."` | `"Successful response"` |
| `paths./v2/customers.post.requestBody.required` | required | missing | `true` | `(undefined)` |
| `paths./v2/diagnostics/ping.get.responses.200.description` | description | modified | `"Batch Payment summary"` | `"Successful response"` |
| `paths./v2/payments.get.parameters[0].in` | in | modified | `"query"` | `"header"` |
| `paths./v2/payments.get.parameters[0].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/payments.get.parameters[1].schema.format` | format | missing | `"date-time"` | `(undefined)` |
| `paths./v2/payments.get.parameters[1].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/payments.get.parameters[2].schema.format` | format | missing | `"date-time"` | `(undefined)` |
| `paths./v2/payments.get.parameters[2].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/payments.get.parameters[3].schema.format` | format | missing | `"date-time"` | `(undefined)` |
| `paths./v2/payments.get.parameters[3].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/payments.get.parameters[4].schema.type` | type | modified | `"integer"` | `"string"` |
| `paths./v2/payments.get.parameters[4].schema.format` | format | missing | `"int32"` | `(undefined)` |
| `paths./v2/payments.get.parameters[4].schema.enum` | enum | missing | `[0,1,2]` | `(undefined)` |
| `paths./v2/payments.get.parameters[4].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/payments.get.parameters[5].schema.type` | type | modified | `"array"` | `"integer"` |
| `paths./v2/payments.get.parameters[5].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/payments.get.parameters[6].schema.type` | type | modified | `"boolean"` | `"string"` |
| `paths./v2/payments.get.parameters[6].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/payments.get.parameters[7].schema.type` | type | modified | `"boolean"` | `"string"` |
| `paths./v2/payments.get.parameters[7].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/payments.get.parameters[8].schema.type` | type | modified | `"integer"` | `"boolean"` |
| `paths./v2/payments.get.parameters[8].schema.format` | format | missing | `"int32"` | `(undefined)` |
| `paths./v2/payments.get.parameters[8].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/payments.get.parameters[9].schema.type` | type | modified | `"integer"` | `"boolean"` |
| `paths./v2/payments.get.parameters[9].schema.format` | format | missing | `"int32"` | `(undefined)` |
| `paths./v2/payments.get.parameters[9].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/payments.get.responses.200.description` | description | modified | `"Return all the payments satisfies the filters."` | `"Successful response"` |
| `paths./v2/payments.post.requestBody.required` | required | missing | `true` | `(undefined)` |
| `paths./v2/preauths.get.parameters[0].in` | in | modified | `"query"` | `"header"` |
| `paths./v2/preauths.get.parameters[0].required` | required | missing | `false` | `(undefined)` |
| `paths./v2/preauths.get.responses.200.description` | description | modified | `"Found preauths."` | `"Successful response"` |
| `paths./v2/preauths.post.requestBody.required` | required | missing | `true` | `(undefined)` |
| `paths./v2/requestpays.post.requestBody.content.application/json.schema.type` | type | added | `(undefined)` | `"object"` |
| `paths./v2/requestpays.post.requestBody.required` | required | missing | `true` | `(undefined)` |

## 🟡 Important Differences

These differences affect documentation and usability.

| Location | Field | Type | Spec 1 Value | Spec 2 Value |
|----------|-------|------|--------------|-------------|
| `info.version` | version | modified | "V2" | "2.0.0" |
| `info.title` | title | modified | "Payments API v2.0" | "Zenith Payments Developer Guide - Merchant APIs" |
| `info.description` | description | modified | "Payments Web Api." | OpenAPI specification generated from Postman colle... |
| `servers[0].description` | description | added | undefined | "Sandbox Environment" |
| `tags[0].description` | description | modified | Manage Batch Payments. You can create or fetch bat... | ## Basic Authentication

[Basic authentication](ht... |
| `tags[1].description` | description | modified | "Manage card proxies." | #### POST: Process Batch Payment

This endpoint al... |
| `tags[2].description` | description | modified | "Manage customers" | #### POST: Create Card Proxy

This endpoint genera... |
| `tags[3].description` | description | modified | "System Diagnostics" | This API allows you to manage customers.

You can ... |
| `tags[4].description` | description | modified | Manage Payments. You can create or fetch one-off p... | # **POST: Create Payment**

- This endpoint allows... |
| `tags[5].description` | description | missing | "Preauth -- Create, Fetch, Void and Capture" | undefined |
| `tags[6].description` | description | modified | "Manage card and bank proxies." | This API allows you to manage request pays.

Using... |
| `tags[7].description` | description | modified | Manage request to pays.You can create or fetch req... | Pre-Authorization allows merchants to authorize a ... |
| `tags[8].description` | description | modified | "Sessions" | This API allows you to ping ZenPay internal server... |
| `paths./v2/batchpayments/{batchPaymentId}.get.tags` | tags | missing | ["BatchPayments"] | undefined |
| `paths./v2/batchpayments/{batchPaymentId}.get.summary` | summary | missing | "Get the batch payment summary." | undefined |
| `paths./v2/batchpayments/{batchPaymentId}.get.operationId` | operationId | missing | "BatchPayments_GetBatchPayment" | undefined |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.tags` | tags | missing | ["BatchPayments"] | undefined |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.summary` | summary | missing | Method return all the Batch payment transactions b... | undefined |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.operationId` | operationId | missing | "BatchPayments_GetBatchPaymentEntries" | undefined |
| `paths./v2/batchpayments.post.summary` | summary | modified | This Method will be return to upload payments batc... | "Process Batch Payment" |
| `paths./v2/batchpayments.post.operationId` | operationId | missing | "BatchPayments_CreateBatchPayment" | undefined |
| `paths./v2/batchpayments.post.requestBody.content.application/json.schema.examples` | examples | added | undefined | [{"batchPaymentEntries":[{"customerReference":"<string>","paymentAmount":"<double>","merchantUniquePaymentId":"<string>","paymentAccountProxy":"<string>"},{"customerReference":"<string>","paymentAmount":"<double>","merchantUniquePaymentId":"<string>","paymentAccountProxy":"<string>"}],"merchantUniqueBatchId":"<string>"}] |
| `paths./v2/batchpayments.post.requestBody.description` | description | missing | collection of batchpayment entries inside a contai... | undefined |
| `paths./v2/batchpayments.post.description` | description | added | undefined | This method is used to upload batch payments as a ... |
| `paths./v2/cardproxies/{cardProxy}.get.tags` | tags | missing | ["CardProxies"] | undefined |
| `paths./v2/cardproxies/{cardProxy}.get.summary` | summary | missing | "Get card proxy detail" | undefined |
| `paths./v2/cardproxies/{cardProxy}.get.operationId` | operationId | missing | "CardProxies_GetTokenDetail" | undefined |
| `paths./v2/cardproxies/{cardProxy}.delete.tags` | tags | missing | ["CardProxies"] | undefined |
| `paths./v2/cardproxies/{cardProxy}.delete.summary` | summary | missing | Delete card proxy permanently from the system. Thi... | undefined |
| `paths./v2/cardproxies/{cardProxy}.delete.operationId` | operationId | missing | "CardProxies_Delete" | undefined |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.tags` | tags | missing | ["CardProxies"] | undefined |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.summary` | summary | missing | "Get pricing for card proxy and payment amount" | undefined |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.operationId` | operationId | missing | "CardProxies_GetTransactionFee" | undefined |
| `paths./v2/cardproxies.post.summary` | summary | modified | Generate card proxy. Not recommended for software ... | "Create Card Proxy" |
| `paths./v2/cardproxies.post.operationId` | operationId | missing | "CardProxies_Tokenise" | undefined |
| `paths./v2/cardproxies.post.requestBody.description` | description | missing | "Card details required to generate a card proxy" | undefined |
| `paths./v2/cardproxies.post.description` | description | added | undefined | Generate a card proxy.

Not recommended for softwa... |
| `paths./v2/customers/{customerReference}.get.tags` | tags | missing | ["Customers"] | undefined |
| `paths./v2/customers/{customerReference}.get.summary` | summary | missing | Return the customer using the provided customer re... | undefined |
| `paths./v2/customers/{customerReference}.get.operationId` | operationId | missing | "Customers_GetCustomer" | undefined |
| `paths./v2/customers/{customerReference}/status.get.tags` | tags | missing | ["Customers"] | undefined |
| `paths./v2/customers/{customerReference}/status.get.summary` | summary | missing | "Get Customer status" | undefined |
| `paths./v2/customers/{customerReference}/status.get.operationId` | operationId | missing | "Customers_GetCustomerStatus" | undefined |
| `paths./v2/customers/{customerReference}/status.put.tags` | tags | missing | ["Customers"] | undefined |
| `paths./v2/customers/{customerReference}/status.put.summary` | summary | missing | "Update the customer status" | undefined |
| `paths./v2/customers/{customerReference}/status.put.operationId` | operationId | missing | "Customers_UpdateCustomerStatus" | undefined |
| `paths./v2/customers/{customerReference}/account.get.tags` | tags | missing | ["Customers"] | undefined |
| `paths./v2/customers/{customerReference}/account.get.summary` | summary | missing | "Get Customer credit / debit card or bank account" | undefined |
| `paths./v2/customers/{customerReference}/account.get.operationId` | operationId | missing | "Customers_GetCustomerAccount" | undefined |
| `paths./v2/customers/{customerReference}/account.put.tags` | tags | missing | ["Customers"] | undefined |
| `paths./v2/customers/{customerReference}/account.put.summary` | summary | missing | "Update the customer account" | undefined |
| `paths./v2/customers/{customerReference}/account.put.operationId` | operationId | missing | "Customers_UpdateCustomerAccount" | undefined |
| `paths./v2/customers/{customerReference}/profile.get.tags` | tags | missing | ["Customers"] | undefined |
| `paths./v2/customers/{customerReference}/profile.get.summary` | summary | missing | "Get Customer profile" | undefined |
| `paths./v2/customers/{customerReference}/profile.get.operationId` | operationId | missing | "Customers_GetCustomerProfile" | undefined |
| `paths./v2/customers/{customerReference}/profile.put.tags` | tags | missing | ["Customers"] | undefined |
| `paths./v2/customers/{customerReference}/profile.put.summary` | summary | missing | "Update the customer profile." | undefined |
| `paths./v2/customers/{customerReference}/profile.put.operationId` | operationId | missing | "Customers_UpdateCustomerProfile" | undefined |
| `paths./v2/customers/{customerReference}/paymentOption.get.tags` | tags | missing | ["Customers"] | undefined |
| `paths./v2/customers/{customerReference}/paymentOption.get.summary` | summary | missing | "Get Customer payment option" | undefined |
| `paths./v2/customers/{customerReference}/paymentOption.get.operationId` | operationId | missing | "Customers_GetCustomerPaymentOption" | undefined |
| `paths./v2/customers/{customerReference}/paymentOption.put.tags` | tags | missing | ["Customers"] | undefined |
| `paths./v2/customers/{customerReference}/paymentOption.put.summary` | summary | missing | "Update the customer payment option" | undefined |
| `paths./v2/customers/{customerReference}/paymentOption.put.operationId` | operationId | missing | "Customers_UpdateCustomerPaymentOption" | undefined |
| `paths./v2/customers.get.summary` | summary | modified | "Return customers based on the filter provided." | "Fetch all Customers based on the filters" |
| `paths./v2/customers.get.operationId` | operationId | missing | "Customers_Get" | undefined |
| `paths./v2/customers.get.parameters[0].description` | description | missing | "Customer reference" | undefined |
| `paths./v2/customers.get.parameters[0].examples` | examples | added | undefined | {"default":{"value":"application/json"}} |
| `paths./v2/customers.get.parameters[1].description` | description | missing | Customer statuses. Default is all. 0 - Open, 1 - A... | undefined |
| `paths./v2/customers.get.parameters[1].examples` | examples | added | undefined | {"default":{"value":"{{ApiKey}}"}} |
| `paths./v2/customers.get.parameters[2].description` | description | modified | "From Customer open date. Format: yyyy-MM-dd" | "Customer reference" |
| `paths./v2/customers.get.parameters[2].examples` | examples | added | undefined | {"default":{"value":"Ref1"}} |
| `paths./v2/customers.get.parameters[3].description` | description | modified | "To Customer open date. Format: yyyy-MM-dd" | Customer statuses. Default is all. 0 - Open, 1 - A... |
| `paths./v2/customers.get.parameters[3].examples` | examples | added | undefined | {"default":{"value":"0"}} |
| `paths./v2/customers.get.parameters[4].description` | description | modified | "From Customer closed date. Format: yyyy-MM-dd" | "From Customer open date. Format: yyyy-MM-dd" |
| `paths./v2/customers.get.parameters[4].examples` | examples | added | undefined | {"default":{"value":"2022-05-12"}} |
| `paths./v2/customers.get.parameters[5].description` | description | modified | "To Customer closed date. Format: yyyy-MM-dd" | "To Customer open date. Format: yyyy-MM-dd" |
| `paths./v2/customers.get.parameters[5].examples` | examples | added | undefined | {"default":{"value":"2022-05-01"}} |
| `paths./v2/customers.get.parameters[6].description` | description | modified | Payment options. Default is all. 22 - AutoPay, 23 ... | "From Customer closed date. Format: yyyy-MM-dd" |
| `paths./v2/customers.get.parameters[6].examples` | examples | added | undefined | {"default":{"value":"2020-01-01"}} |
| `paths./v2/customers.get.parameters[7].description` | description | modified | Starting index of the record. An index starts from... | "To Customer closed date. Format: yyyy-MM-dd" |
| `paths./v2/customers.get.parameters[7].examples` | examples | added | undefined | {"default":{"value":"2020-01-01"}} |
| `paths./v2/customers.get.parameters[8].description` | description | modified | Page size. Default = 20. Maximum page size allowed... | Payment options. Default is all. 22 - AutoPay, 23 ... |
| `paths./v2/customers.get.parameters[8].examples` | examples | added | undefined | {"default":{"value":"22"}} |
| `paths./v2/customers.post.summary` | summary | modified | "Create customer using the provided details" | "Create customer" |
| `paths./v2/customers.post.operationId` | operationId | missing | "Customers_CreateCustomer" | undefined |
| `paths./v2/customers.post.requestBody.description` | description | missing | "Customer details to create in the system" | undefined |
| `paths./v2/customers/{customerReference}/customerReference.put.tags` | tags | missing | ["Customers"] | undefined |
| `paths./v2/customers/{customerReference}/customerReference.put.summary` | summary | missing | "Update the customer reference" | undefined |
| `paths./v2/customers/{customerReference}/customerReference.put.operationId` | operationId | missing | "Customers_UpdateCustomerReference" | undefined |
| `paths./v2/diagnostics/ping.get.summary` | summary | modified | Ping method to get the server date time and versio... | "Ping" |
| `paths./v2/diagnostics/ping.get.operationId` | operationId | missing | "Diagnostics_Ping" | undefined |
| `paths./v2/payments/{paymentReference}.get.tags` | tags | missing | ["Payments"] | undefined |
| `paths./v2/payments/{paymentReference}.get.summary` | summary | missing | "Returns Payment details based on Payment reference" | undefined |
| `paths./v2/payments/{paymentReference}.get.operationId` | operationId | missing | "Payments_GetPayment" | undefined |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.tags` | tags | missing | ["Payments"] | undefined |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.summary` | summary | missing | Returns Payment details based on merchant unique r... | undefined |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.operationId` | operationId | missing | "Payments_GetPaymentByUniqueId" | undefined |
| `paths./v2/payments/{paymentReference}/refundrequests.get.tags` | tags | missing | ["Payments"] | undefined |
| `paths./v2/payments/{paymentReference}/refundrequests.get.summary` | summary | missing | Returns all the refund requests details based on p... | undefined |
| `paths./v2/payments/{paymentReference}/refundrequests.get.operationId` | operationId | missing | "Payments_GetRefundRequest" | undefined |
| `paths./v2/payments/{paymentReference}/refundrequests.post.tags` | tags | missing | ["Payments"] | undefined |
| `paths./v2/payments/{paymentReference}/refundrequests.post.summary` | summary | missing | Allow the merchant to request for refund for provi... | undefined |
| `paths./v2/payments/{paymentReference}/refundrequests.post.operationId` | operationId | missing | "Payments_CreateRefundRequests" | undefined |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.tags` | tags | missing | ["Payments"] | undefined |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.summary` | summary | missing | "" | undefined |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.operationId` | operationId | missing | Payments_GetV2PaymentsUniqueIdByPaymentReferenceRe... | undefined |
| `paths./v2/payments.get.operationId` | operationId | missing | "Payments_Get" | undefined |
| `paths./v2/payments.get.parameters[0].examples` | examples | added | undefined | {"default":{"value":"{{ApiKey}}"}} |
| `paths./v2/payments.get.parameters[1].description` | description | added | undefined | "(Optional) Filter by the customer reference" |
| `paths./v2/payments.get.parameters[1].examples` | examples | added | undefined | {"default":{"value":"Ref1"}} |
| `paths./v2/payments.get.parameters[2].description` | description | added | undefined | "(Optional) Filter by the payments from date" |
| `paths./v2/payments.get.parameters[2].examples` | examples | added | undefined | {"default":{"value":"2018-08-22"}} |
| `paths./v2/payments.get.parameters[3].description` | description | added | undefined | "(Optional) Filter by the payments to date" |
| `paths./v2/payments.get.parameters[3].examples` | examples | added | undefined | {"default":{"value":"2018-08-22"}} |
| `paths./v2/payments.get.parameters[4].description` | description | modified | Filter by payment settlement status. PaymentSettle... | "(Optional) Filter by the payments settlement date" |
| `paths./v2/payments.get.parameters[4].examples` | examples | added | undefined | {"default":{"value":"2018-08-22"}} |
| `paths./v2/payments.get.parameters[5].description` | description | added | undefined | (Optional) Filter by if the payment is settled to ... |
| `paths./v2/payments.get.parameters[5].examples` | examples | added | undefined | {"default":{"value":"0"}} |
| `paths./v2/payments.get.parameters[6].description` | description | added | undefined | (Optional) Filter by the different transaction typ... |
| `paths./v2/payments.get.parameters[6].examples` | examples | added | undefined | {"default":{"value":"null"}} |
| `paths./v2/payments.get.parameters[7].description` | description | added | undefined | (Optional) Filter by the different transaction typ... |
| `paths./v2/payments.get.parameters[7].examples` | examples | added | undefined | {"default":{"value":"null"}} |
| `paths./v2/payments.get.parameters[8].description` | description | added | undefined | (Optional) Filter by if the payments are in recall... |
| `paths./v2/payments.get.parameters[8].examples` | examples | added | undefined | {"default":{"value":"false"}} |
| `paths./v2/payments.get.parameters[9].description` | description | added | undefined | (Optional) Filter by if the payments are in refund... |
| `paths./v2/payments.get.parameters[9].examples` | examples | added | undefined | {"default":{"value":"false"}} |
| `paths./v2/payments.get.summary` | summary | added | undefined | "Fetch all Payments" |
| `paths./v2/payments.post.summary` | summary | modified | Perform OneOff payment for a registered customer w... | "Perform OneOff Payment" |
| `paths./v2/payments.post.operationId` | operationId | missing | "Payments_Post" | undefined |
| `paths./v2/payments.post.requestBody.description` | description | missing | For making payment for existing customer, use Cust... | undefined |
| `paths./v2/payments.post.description` | description | added | undefined | ### Important Notice for Using the Direct Card Pay... |
| `paths./v2/preauths/{preauthReference}.get.tags` | tags | missing | ["Preauths"] | undefined |
| `paths./v2/preauths/{preauthReference}.get.operationId` | operationId | missing | "Preauths_Get" | undefined |
| `paths./v2/preauths.get.tags[0]` | tags | modified | "Preauths" | "Pre-Auth" |
| `paths./v2/preauths.get.operationId` | operationId | missing | "Preauths_GetV2Preauths" | undefined |
| `paths./v2/preauths.get.parameters[0].examples` | examples | added | undefined | {"default":{"value":"{{ApiKey}}"}} |
| `paths./v2/preauths.get.summary` | summary | added | undefined | "Check PreAuth via customerReference" |
| `paths./v2/preauths.post.tags[0]` | tags | modified | "Preauths" | "Pre-Auth" |
| `paths./v2/preauths.post.operationId` | operationId | missing | "Preauths_Post" | undefined |
| `paths./v2/preauths.post.summary` | summary | added | undefined | "Create PreAuth" |
| `paths./v2/preauths/{preauthReference}/voids.put.tags` | tags | missing | ["Preauths"] | undefined |
| `paths./v2/preauths/{preauthReference}/voids.put.operationId` | operationId | missing | "Preauths_VoidPreauth" | undefined |
| `paths./v2/preauths/{preauthReference}/captures.post.tags` | tags | missing | ["Preauths"] | undefined |
| `paths./v2/preauths/{preauthReference}/captures.post.operationId` | operationId | missing | "Preauths_CapturePreauth" | undefined |
| `paths./v2/proxies/{proxy}.get.tags` | tags | missing | ["Proxies"] | undefined |
| `paths./v2/proxies/{proxy}.get.summary` | summary | missing | Get the payment information based on the proxy inf... | undefined |
| `paths./v2/proxies/{proxy}.get.operationId` | operationId | missing | "Proxies_GetPaymentAccountProxy" | undefined |
| `paths./v2/proxies/{proxy}/pricing.get.tags` | tags | missing | ["Proxies"] | undefined |
| `paths./v2/proxies/{proxy}/pricing.get.summary` | summary | missing | "Get pricing for card/bank proxy and payment amount" | undefined |
| `paths./v2/proxies/{proxy}/pricing.get.operationId` | operationId | missing | "Proxies_GetTransactionFee" | undefined |
| `paths./v2/requestpays/{requestPayId}.get.tags` | tags | missing | ["RequestPays"] | undefined |
| `paths./v2/requestpays/{requestPayId}.get.summary` | summary | missing | "Api to get the request pay details" | undefined |
| `paths./v2/requestpays/{requestPayId}.get.operationId` | operationId | missing | "RequestPays_GetRequestPay" | undefined |
| `paths./v2/requestpays/{requestPayId}/entries.get.tags` | tags | missing | ["RequestPays"] | undefined |
| `paths./v2/requestpays/{requestPayId}/entries.get.summary` | summary | missing | "Api to get the request pay entries" | undefined |
| `paths./v2/requestpays/{requestPayId}/entries.get.operationId` | operationId | missing | "RequestPays_GetRequestPayEntries" | undefined |
| `paths./v2/requestpays.post.summary` | summary | modified | This Method will be return to upload request payme... | Upload request to pay payments as a collection of ... |
| `paths./v2/requestpays.post.operationId` | operationId | missing | "RequestPays_CreateRequestPayment" | undefined |
| `paths./v2/requestpays.post.requestBody.content.application/json.schema.examples` | examples | added | undefined | [{"requestPaymentEntries":[{"customerReference":"<string>","paymentAmount":"<double>","firstName":"<string>","lastName":"<string>","email":"<string>","mobile":"0411111111","merchantUniquePaymentId":"<string>"},{"customerReference":"<string>","paymentAmount":"<double>","firstName":"<string>","lastName":"<string>","email":"<string>","mobile":"0411111111","merchantUniquePaymentId":"<string>"}],"merchantUniqueRequestBatchId":"<string>"}] |
| `paths./v2/requestpays.post.requestBody.description` | description | missing | Collection of request pay entries inside a contain... | undefined |
| `paths./v2/requestpays.post.description` | description | added | undefined | This API allows you to upload RequestPay payments ... |
| `paths./v2/sessions/{sessionId}.get.tags` | tags | missing | ["Sessions"] | undefined |
| `paths./v2/sessions/{sessionId}.get.summary` | summary | missing | "Not supported" | undefined |
| `paths./v2/sessions/{sessionId}.get.operationId` | operationId | missing | "Sessions_Get" | undefined |
| `paths./v2/sessions.post.tags` | tags | missing | ["Sessions"] | undefined |
| `paths./v2/sessions.post.summary` | summary | missing | Used to create session for Payment Plugin. The ses... | undefined |
| `paths./v2/sessions.post.operationId` | operationId | missing | "Sessions_Post" | undefined |
| `paths./v2/batchpayments/:batchPaymentId.get.tags` | tags | added | undefined | ["BatchPayments"] |
| `paths./v2/batchpayments/:batchPaymentId.get.summary` | summary | added | undefined | "Fetch Batch Payment Summary by batchPaymentID" |
| `paths./v2/batchpayments/:batchPaymentId.get.description` | description | added | undefined | This method returns a summary of a batch payment u... |
| `paths./v2/batchpayments/:batchPaymentId/entries.get.tags` | tags | added | undefined | ["BatchPayments"] |
| `paths./v2/batchpayments/:batchPaymentId/entries.get.summary` | summary | added | undefined | "Fetch Batch Payment Transactions by batchPaymentId" |
| `paths./v2/batchpayments/:batchPaymentId/entries.get.description` | description | added | undefined | This method returns a list of entries in a batch p... |
| `paths./v2/cardproxies/:cardProxy.get.tags` | tags | added | undefined | ["CardProxies"] |
| `paths./v2/cardproxies/:cardProxy.get.summary` | summary | added | undefined | "Fetch Card Proxy Details" |
| `paths./v2/cardproxies/:cardProxy.delete.tags` | tags | added | undefined | ["CardProxies"] |
| `paths./v2/cardproxies/:cardProxy.delete.summary` | summary | added | undefined | "Delete Card Proxy" |
| `paths./v2/cardproxies/:cardProxy.delete.description` | description | added | undefined | Delete card proxy permanently from the system. Thi... |
| `paths./v2/cardproxies/:cardProxy/pricing.get.tags` | tags | added | undefined | ["CardProxies"] |
| `paths./v2/cardproxies/:cardProxy/pricing.get.summary` | summary | added | undefined | "Fetch Card Proxy Pricing" |
| `paths./v2/customers/.get.tags` | tags | added | undefined | ["Customers"] |
| `paths./v2/customers/.get.summary` | summary | added | undefined | "Fetch all Customers" |
| `paths./v2/customers/.get.description` | description | added | undefined | List of all customers.

It will display all custom... |
| `paths./v2/customers/:customerReference.get.tags` | tags | added | undefined | ["Customers"] |
| `paths./v2/customers/:customerReference.get.summary` | summary | added | undefined | "Fetch Customer by customerReference" |
| `paths./v2/customers/:customerReference/status.get.tags` | tags | added | undefined | ["Customers"] |
| `paths./v2/customers/:customerReference/status.get.summary` | summary | added | undefined | "Fetch Customer status by customerReference" |
| `paths./v2/customers/:customerReference/status.put.tags` | tags | added | undefined | ["Customers"] |
| `paths./v2/customers/:customerReference/status.put.summary` | summary | added | undefined | "Update the customer status" |
| `paths./v2/customers/:customerReference/profile.get.tags` | tags | added | undefined | ["Customers"] |
| `paths./v2/customers/:customerReference/profile.get.summary` | summary | added | undefined | "Fetch Customer profile by customerReference" |
| `paths./v2/customers/:customerReference/profile.put.tags` | tags | added | undefined | ["Customers"] |
| `paths./v2/customers/:customerReference/profile.put.summary` | summary | added | undefined | "Update the customer profile" |
| `paths./v2/customers/:customerReference/account.get.tags` | tags | added | undefined | ["Customers"] |
| `paths./v2/customers/:customerReference/account.get.summary` | summary | added | undefined | "Fetch Customer payment method by customerReference" |
| `paths./v2/customers/:customerReference/account.put.tags` | tags | added | undefined | ["Customers"] |
| `paths./v2/customers/:customerReference/account.put.summary` | summary | added | undefined | "Update the customer account" |
| `paths./v2/customers/:customerReference/account.put.description` | description | added | undefined | StartFragment

Customer Bank/Credit Card account. ... |
| `paths./v2/customers/:customerReference/paymentOption.get.tags` | tags | added | undefined | ["Customers"] |
| `paths./v2/customers/:customerReference/paymentOption.get.summary` | summary | added | undefined | Fetch Customer payment options by customerReferenc... |
| `paths./v2/customers/:customerReference/paymentOption.get.description` | description | added | undefined | PaymentOptions human readable form:

AutoPay: 22; ... |
| `paths./v2/customers/:customerReference/paymentOption.put.tags` | tags | added | undefined | ["Customers"] |
| `paths./v2/customers/:customerReference/paymentOption.put.summary` | summary | added | undefined | "Update the customer payment option" |
| `paths./v2/customers/:customerReference/customerReference.put.tags` | tags | added | undefined | ["Customers"] |
| `paths./v2/customers/:customerReference/customerReference.put.summary` | summary | added | undefined | "Update the customer reference" |
| `paths./v2/payments/:paymentReference.get.tags` | tags | added | undefined | ["Payments"] |
| `paths./v2/payments/:paymentReference.get.summary` | summary | added | undefined | "Fetch Payment details by paymentReference" |
| `paths./v2/payments/uniqueId/:merchantUniqueId.get.tags` | tags | added | undefined | ["Payments"] |
| `paths./v2/payments/uniqueId/:merchantUniqueId.get.summary` | summary | added | undefined | Fetch Payment details based on merchant unique ref... |
| `paths./v2/payments/:paymentReference/refundrequests.get.tags` | tags | added | undefined | ["RefundRequests"] |
| `paths./v2/payments/:paymentReference/refundrequests.get.summary` | summary | added | undefined | Returns all the refund requests details based on p... |
| `paths./v2/payments/:paymentReference/refundrequests.post.tags` | tags | added | undefined | ["RefundRequests"] |
| `paths./v2/payments/:paymentReference/refundrequests.post.summary` | summary | added | undefined | Allow the merchant to request a refund for provide... |
| `paths./v2/requestpays/:requestPayId.get.tags` | tags | added | undefined | ["RequestPays"] |
| `paths./v2/requestpays/:requestPayId.get.summary` | summary | added | undefined | "Api to get the request pay details" |
| `paths./v2/requestpays/:requestPayId/entries.get.tags` | tags | added | undefined | ["RequestPays"] |
| `paths./v2/requestpays/:requestPayId/entries.get.summary` | summary | added | undefined | "Api to get the request pay entries" |
| `paths./v2/preauths/:preauthReference.get.tags` | tags | added | undefined | ["Pre-Auth"] |
| `paths./v2/preauths/:preauthReference.get.summary` | summary | added | undefined | "Check PreAuth via preauthReference" |
| `paths./v2/preauths/:preauthReference/captures.post.tags` | tags | added | undefined | ["Pre-Auth"] |
| `paths./v2/preauths/:preauthReference/captures.post.summary` | summary | added | undefined | "Capture PreAuth Card" |
| `paths./v2/preauths/:preauthReference/voids.put.tags` | tags | added | undefined | ["Pre-Auth"] |
| `paths./v2/preauths/:preauthReference/voids.put.summary` | summary | added | undefined | "Void PreAuth Request" |

## ⚪ Informational Differences

These differences are minor and typically don't affect functionality.

| Location | Field | Type | Spec 1 Value | Spec 2 Value |
|----------|-------|------|--------------|-------------|
| `info.x-swagger-net-version` | x-swagger-net-version | missing | `"8.4.19.001"` | `(undefined)` |
| `tags[0].name` | name | modified | `"BatchPayments"` | `"Authentication"` |
| `tags[1].name` | name | modified | `"CardProxies"` | `"BatchPayments"` |
| `tags[2].name` | name | modified | `"Customers"` | `"CardProxies"` |
| `tags[3].name` | name | modified | `"Diagnostics"` | `"Customers"` |
| `tags[5].name` | name | modified | `"Preauths"` | `"RefundRequests"` |
| `tags[6].name` | name | modified | `"Proxies"` | `"RequestPays"` |
| `tags[7].name` | name | modified | `"RequestPays"` | `"Pre-Auth"` |
| `tags[8].name` | name | modified | `"Sessions"` | `"Diagnostics"` |
| `paths./v2/batchpayments/{batchPaymentId}.get.parameters` | parameters | missing | `[{"schema":{"type":"integer","format":"int32"},"na` | `(undefined)` |
| `paths./v2/batchpayments/{batchPaymentId}.get.responses` | responses | missing | `{"200":{"description":"Batch Payment summary","con` | `(undefined)` |
| `paths./v2/batchpayments/{batchPaymentId}.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.parameters` | parameters | missing | `[{"schema":{"type":"integer","format":"int32"},"na` | `(undefined)` |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.responses` | responses | missing | `{"200":{"description":"List of batch payment entri` | `(undefined)` |
| `paths./v2/batchpayments/{batchPaymentId}/entries.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/batchpayments.post.responses.201` | 201 | missing | `{"description":"Batch payment created successfully` | `(undefined)` |
| `paths./v2/batchpayments.post.responses.300` | 300 | missing | `{"description":"Duplicate merchant unique id. The ` | `(undefined)` |
| `paths./v2/batchpayments.post.responses.400` | 400 | missing | `{"description":"Invalid batch payment details.","c` | `(undefined)` |
| `paths./v2/batchpayments.post.responses.500` | 500 | missing | `{"description":"Something went wrong. Batch paymen` | `(undefined)` |
| `paths./v2/batchpayments.post.responses.200` | 200 | added | `(undefined)` | `{"description":"Successful response","content":{"a` |
| `paths./v2/batchpayments.post.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/batchpayments.post.requestBody.content.application/json.schema.$ref` | $ref | missing | `"#/components/schemas/BatchPaymentRequest"` | `(undefined)` |
| `paths./v2/batchpayments.post.requestBody.content.text/json` | text/json | missing | `{"schema":{"$ref":"#/components/schemas/BatchPayme` | `(undefined)` |
| `paths./v2/batchpayments.post.requestBody.content.application/xml` | application/xml | missing | `{"schema":{"$ref":"#/components/schemas/BatchPayme` | `(undefined)` |
| `paths./v2/batchpayments.post.requestBody.content.text/xml` | text/xml | missing | `{"schema":{"$ref":"#/components/schemas/BatchPayme` | `(undefined)` |
| `paths./v2/batchpayments.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | missing | `{"schema":{"$ref":"#/components/schemas/BatchPayme` | `(undefined)` |
| `paths./v2/batchpayments.post.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/cardproxies/{cardProxy}.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"cardProxy","i` | `(undefined)` |
| `paths./v2/cardproxies/{cardProxy}.get.responses` | responses | missing | `{"200":{"description":"Token response of the card ` | `(undefined)` |
| `paths./v2/cardproxies/{cardProxy}.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/cardproxies/{cardProxy}.delete.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"cardProxy","i` | `(undefined)` |
| `paths./v2/cardproxies/{cardProxy}.delete.responses` | responses | missing | `{"204":{"description":"Card proxy deleted successf` | `(undefined)` |
| `paths./v2/cardproxies/{cardProxy}.delete.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"cardProxy","i` | `(undefined)` |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.responses` | responses | missing | `{"200":{"description":"Pricing response for card p` | `(undefined)` |
| `paths./v2/cardproxies/{cardProxy}/pricing.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/cardproxies.post.responses.201` | 201 | missing | `{"description":"Card authorisation is successful."` | `(undefined)` |
| `paths./v2/cardproxies.post.responses.400` | 400 | missing | `{"description":"Invalid input detail.","content":{` | `(undefined)` |
| `paths./v2/cardproxies.post.responses.403` | 403 | missing | `{"description":"The credential provided doesn't su` | `(undefined)` |
| `paths./v2/cardproxies.post.responses.409` | 409 | missing | `{"description":"Customer unique id is already used` | `(undefined)` |
| `paths./v2/cardproxies.post.responses.412` | 412 | missing | `{"description":"Tokenisation failed.","content":{"` | `(undefined)` |
| `paths./v2/cardproxies.post.responses.200` | 200 | added | `(undefined)` | `{"description":"Successful response","content":{"a` |
| `paths./v2/cardproxies.post.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/cardproxies.post.requestBody.content.application/json` | application/json | missing | `{"schema":{"$ref":"#/components/schemas/CardProxyR` | `(undefined)` |
| `paths./v2/cardproxies.post.requestBody.content.text/json` | text/json | missing | `{"schema":{"$ref":"#/components/schemas/CardProxyR` | `(undefined)` |
| `paths./v2/cardproxies.post.requestBody.content.application/xml` | application/xml | missing | `{"schema":{"$ref":"#/components/schemas/CardProxyR` | `(undefined)` |
| `paths./v2/cardproxies.post.requestBody.content.text/xml` | text/xml | missing | `{"schema":{"$ref":"#/components/schemas/CardProxyR` | `(undefined)` |
| `paths./v2/cardproxies.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | missing | `{"schema":{"$ref":"#/components/schemas/CardProxyR` | `(undefined)` |
| `paths./v2/cardproxies.post.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/customers/{customerReference}.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"customerRefer` | `(undefined)` |
| `paths./v2/customers/{customerReference}.get.responses` | responses | missing | `{"200":{"description":"Found the customer.","conte` | `(undefined)` |
| `paths./v2/customers/{customerReference}.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers/{customerReference}/status.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"customerRefer` | `(undefined)` |
| `paths./v2/customers/{customerReference}/status.get.responses` | responses | missing | `{"200":{"description":"Found the customer status."` | `(undefined)` |
| `paths./v2/customers/{customerReference}/status.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers/{customerReference}/status.put.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"customerRefer` | `(undefined)` |
| `paths./v2/customers/{customerReference}/status.put.responses` | responses | missing | `{"204":{"description":"Updated the customer paymen` | `(undefined)` |
| `paths./v2/customers/{customerReference}/status.put.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers/{customerReference}/status.put.requestBody` | requestBody | missing | `{"content":{"application/json":{"schema":{"$ref":"` | `(undefined)` |
| `paths./v2/customers/{customerReference}/account.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"customerRefer` | `(undefined)` |
| `paths./v2/customers/{customerReference}/account.get.responses` | responses | missing | `{"200":{"description":"Found the customer account.` | `(undefined)` |
| `paths./v2/customers/{customerReference}/account.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers/{customerReference}/account.put.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"customerRefer` | `(undefined)` |
| `paths./v2/customers/{customerReference}/account.put.responses` | responses | missing | `{"204":{"description":"Updated the customer accoun` | `(undefined)` |
| `paths./v2/customers/{customerReference}/account.put.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers/{customerReference}/account.put.requestBody` | requestBody | missing | `{"content":{"application/json":{"schema":{"$ref":"` | `(undefined)` |
| `paths./v2/customers/{customerReference}/profile.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"customerRefer` | `(undefined)` |
| `paths./v2/customers/{customerReference}/profile.get.responses` | responses | missing | `{"200":{"description":"Found the customer profile.` | `(undefined)` |
| `paths./v2/customers/{customerReference}/profile.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers/{customerReference}/profile.put.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"customerRefer` | `(undefined)` |
| `paths./v2/customers/{customerReference}/profile.put.responses` | responses | missing | `{"204":{"description":"Updated the customer profil` | `(undefined)` |
| `paths./v2/customers/{customerReference}/profile.put.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers/{customerReference}/profile.put.requestBody` | requestBody | missing | `{"content":{"application/json":{"schema":{"$ref":"` | `(undefined)` |
| `paths./v2/customers/{customerReference}/paymentOption.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"customerRefer` | `(undefined)` |
| `paths./v2/customers/{customerReference}/paymentOption.get.responses` | responses | missing | `{"200":{"description":"Found the customer payment ` | `(undefined)` |
| `paths./v2/customers/{customerReference}/paymentOption.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers/{customerReference}/paymentOption.put.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"customerRefer` | `(undefined)` |
| `paths./v2/customers/{customerReference}/paymentOption.put.responses` | responses | missing | `{"204":{"description":"Updated the customer paymen` | `(undefined)` |
| `paths./v2/customers/{customerReference}/paymentOption.put.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers/{customerReference}/paymentOption.put.requestBody` | requestBody | missing | `{"content":{"application/json":{"schema":{"$ref":"` | `(undefined)` |
| `paths./v2/customers.get.parameters` | parameters.length | modified | `9` | `11` |
| `paths./v2/customers.get.parameters[0].name` | name | modified | `"customerReference"` | `"Accept"` |
| `paths./v2/customers.get.parameters[1].schema.items` | items | missing | `{"type":"integer","format":"int32","enum":[0,1,2,3` | `(undefined)` |
| `paths./v2/customers.get.parameters[1].style` | style | missing | `"form"` | `(undefined)` |
| `paths./v2/customers.get.parameters[1].explode` | explode | missing | `true` | `(undefined)` |
| `paths./v2/customers.get.parameters[1].name` | name | modified | `"customerStatuses"` | `"api-key"` |
| `paths./v2/customers.get.parameters[2].name` | name | modified | `"fromOpenDate"` | `"customerReference"` |
| `paths./v2/customers.get.parameters[3].name` | name | modified | `"toOpenDate"` | `"customerStatuses"` |
| `paths./v2/customers.get.parameters[4].name` | name | modified | `"fromClosedDate"` | `"fromOpenDate"` |
| `paths./v2/customers.get.parameters[5].name` | name | modified | `"toClosedDate"` | `"toOpenDate"` |
| `paths./v2/customers.get.parameters[6].schema.items` | items | missing | `{"type":"integer","format":"int32","enum":[22,23,2` | `(undefined)` |
| `paths./v2/customers.get.parameters[6].style` | style | missing | `"form"` | `(undefined)` |
| `paths./v2/customers.get.parameters[6].explode` | explode | missing | `true` | `(undefined)` |
| `paths./v2/customers.get.parameters[6].name` | name | modified | `"paymentOptions"` | `"fromClosedDate"` |
| `paths./v2/customers.get.parameters[7].name` | name | modified | `"offset"` | `"toClosedDate"` |
| `paths./v2/customers.get.parameters[8].name` | name | modified | `"limit"` | `"paymentOptions"` |
| `paths./v2/customers.get.parameters[9]` | parameters | missing | `(undefined)` | `{"name":"offset","in":"query","schema":{"type":"in` |
| `paths./v2/customers.get.parameters[10]` | parameters | missing | `(undefined)` | `{"name":"limit","in":"query","schema":{"type":"int` |
| `paths./v2/customers.get.responses.200.content.application/json.schema` | schema | missing | `{"items":{"$ref":"#/components/schemas/CustomerRes` | `(undefined)` |
| `paths./v2/customers.get.responses.200.content.text/json` | text/json | missing | `{"schema":{"items":{"$ref":"#/components/schemas/C` | `(undefined)` |
| `paths./v2/customers.get.responses.200.content.application/xml` | application/xml | missing | `{"schema":{"items":{"$ref":"#/components/schemas/C` | `(undefined)` |
| `paths./v2/customers.get.responses.200.content.text/xml` | text/xml | missing | `{"schema":{"items":{"$ref":"#/components/schemas/C` | `(undefined)` |
| `paths./v2/customers.get.responses.400` | 400 | missing | `{"description":"Invalid get request.","content":{"` | `(undefined)` |
| `paths./v2/customers.get.responses.404` | 404 | missing | `{"description":"Unable to find the customers by th` | `(undefined)` |
| `paths./v2/customers.get.responses.500` | 500 | missing | `{"description":"Something went wrong. Please try a` | `(undefined)` |
| `paths./v2/customers.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers.post.responses.201` | 201 | missing | `{"description":"Customer created successfully.","c` | `(undefined)` |
| `paths./v2/customers.post.responses.300` | 300 | missing | `{"description":"Duplicate customer reference.","co` | `(undefined)` |
| `paths./v2/customers.post.responses.400` | 400 | missing | `{"description":"Invalid input detail.","content":{` | `(undefined)` |
| `paths./v2/customers.post.responses.403` | 403 | missing | `{"description":"Merchant is forbidden to perform t` | `(undefined)` |
| `paths./v2/customers.post.responses.500` | 500 | missing | `{"description":"Something went wrong. Customer may` | `(undefined)` |
| `paths./v2/customers.post.responses.200` | 200 | added | `(undefined)` | `{"description":"Successful response","content":{"a` |
| `paths./v2/customers.post.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers.post.requestBody.content.application/json` | application/json | missing | `{"schema":{"$ref":"#/components/schemas/NewCustome` | `(undefined)` |
| `paths./v2/customers.post.requestBody.content.text/json` | text/json | missing | `{"schema":{"$ref":"#/components/schemas/NewCustome` | `(undefined)` |
| `paths./v2/customers.post.requestBody.content.application/xml` | application/xml | missing | `{"schema":{"$ref":"#/components/schemas/NewCustome` | `(undefined)` |
| `paths./v2/customers.post.requestBody.content.text/xml` | text/xml | missing | `{"schema":{"$ref":"#/components/schemas/NewCustome` | `(undefined)` |
| `paths./v2/customers.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | missing | `{"schema":{"$ref":"#/components/schemas/NewCustome` | `(undefined)` |
| `paths./v2/customers.post.parameters` | parameters | added | `(undefined)` | `[{"name":"Content-Type","in":"header","schema":{"t` |
| `paths./v2/customers/{customerReference}/customerReference.put.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"customerRefer` | `(undefined)` |
| `paths./v2/customers/{customerReference}/customerReference.put.responses` | responses | missing | `{"204":{"description":"Updated the customer refere` | `(undefined)` |
| `paths./v2/customers/{customerReference}/customerReference.put.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/customers/{customerReference}/customerReference.put.requestBody` | requestBody | missing | `{"content":{"application/json":{"schema":{"type":"` | `(undefined)` |
| `paths./v2/diagnostics/ping.get.responses.200.content.application/json.schema` | schema | missing | `{"$ref":"#/components/schemas/PingResponse"}` | `(undefined)` |
| `paths./v2/diagnostics/ping.get.responses.200.content.text/json` | text/json | missing | `{"schema":{"$ref":"#/components/schemas/PingRespon` | `(undefined)` |
| `paths./v2/diagnostics/ping.get.responses.200.content.application/xml` | application/xml | missing | `{"schema":{"$ref":"#/components/schemas/PingRespon` | `(undefined)` |
| `paths./v2/diagnostics/ping.get.responses.200.content.text/xml` | text/xml | missing | `{"schema":{"$ref":"#/components/schemas/PingRespon` | `(undefined)` |
| `paths./v2/diagnostics/ping.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/diagnostics/ping.get.parameters` | parameters | added | `(undefined)` | `[{"name":"api-key","in":"header","schema":{"type":` |
| `paths./v2/payments/{paymentReference}.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"paymentRefere` | `(undefined)` |
| `paths./v2/payments/{paymentReference}.get.responses` | responses | missing | `{"200":{"description":"Found the payment.","conten` | `(undefined)` |
| `paths./v2/payments/{paymentReference}.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"merchantUniqu` | `(undefined)` |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.responses` | responses | missing | `{"200":{"description":"Found the payment.","conten` | `(undefined)` |
| `paths./v2/payments/uniqueId/{merchantUniqueId}.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/payments/{paymentReference}/refundrequests.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"paymentRefere` | `(undefined)` |
| `paths./v2/payments/{paymentReference}/refundrequests.get.responses` | responses | missing | `{"200":{"description":"Return refund request for t` | `(undefined)` |
| `paths./v2/payments/{paymentReference}/refundrequests.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/payments/{paymentReference}/refundrequests.post.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"paymentRefere` | `(undefined)` |
| `paths./v2/payments/{paymentReference}/refundrequests.post.responses` | responses | missing | `{"201":{"description":"Refund request is successfu` | `(undefined)` |
| `paths./v2/payments/{paymentReference}/refundrequests.post.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/payments/{paymentReference}/refundrequests.post.requestBody` | requestBody | missing | `{"content":{"application/json":{"schema":{"$ref":"` | `(undefined)` |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"paymentRefere` | `(undefined)` |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.responses` | responses | missing | `{"200":{"description":"Return refund request for t` | `(undefined)` |
| `paths./v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/payments.get.parameters` | parameters.length | modified | `10` | `12` |
| `paths./v2/payments.get.parameters[0].name` | name | modified | `"customerReference"` | `"api-key"` |
| `paths./v2/payments.get.parameters[1].name` | name | modified | `"fromProcessedDate"` | `"customerReference"` |
| `paths./v2/payments.get.parameters[2].name` | name | modified | `"toProcessedDate"` | `"fromProcessedDate"` |
| `paths./v2/payments.get.parameters[3].name` | name | modified | `"settlementDate"` | `"toProcessedDate"` |
| `paths./v2/payments.get.parameters[4].name` | name | modified | `"paymentSettlement"` | `"settlementDate"` |
| `paths./v2/payments.get.parameters[5].schema.items` | items | missing | `{"type":"integer","format":"int32","enum":[1,2,3,4` | `(undefined)` |
| `paths./v2/payments.get.parameters[5].style` | style | missing | `"form"` | `(undefined)` |
| `paths./v2/payments.get.parameters[5].explode` | explode | missing | `true` | `(undefined)` |
| `paths./v2/payments.get.parameters[5].name` | name | modified | `"transactionTypes"` | `"paymentSettlement"` |
| `paths./v2/payments.get.parameters[6].name` | name | modified | `"isRecalled"` | `"transactionTypes"` |
| `paths./v2/payments.get.parameters[7].name` | name | modified | `"isRefunded"` | `"transactionTypes"` |
| `paths./v2/payments.get.parameters[8].name` | name | modified | `"offset"` | `"isRecalled"` |
| `paths./v2/payments.get.parameters[9].name` | name | modified | `"limit"` | `"isRefunded"` |
| `paths./v2/payments.get.parameters[10]` | parameters | missing | `(undefined)` | `{"name":"offset","in":"query","schema":{"type":"in` |
| `paths./v2/payments.get.parameters[11]` | parameters | missing | `(undefined)` | `{"name":"limit","in":"query","schema":{"type":"int` |
| `paths./v2/payments.get.responses.200.content.application/json.schema` | schema | missing | `{"items":{"$ref":"#/components/schemas/PaymentResp` | `(undefined)` |
| `paths./v2/payments.get.responses.200.content.text/json` | text/json | missing | `{"schema":{"items":{"$ref":"#/components/schemas/P` | `(undefined)` |
| `paths./v2/payments.get.responses.200.content.application/xml` | application/xml | missing | `{"schema":{"items":{"$ref":"#/components/schemas/P` | `(undefined)` |
| `paths./v2/payments.get.responses.200.content.text/xml` | text/xml | missing | `{"schema":{"items":{"$ref":"#/components/schemas/P` | `(undefined)` |
| `paths./v2/payments.get.responses.400` | 400 | missing | `{"description":"Invalid get request.","content":{"` | `(undefined)` |
| `paths./v2/payments.get.responses.500` | 500 | missing | `{"description":"Something went wrong. Please try a` | `(undefined)` |
| `paths./v2/payments.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/payments.post.responses.201` | 201 | missing | `{"description":"Payment is processed.","content":{` | `(undefined)` |
| `paths./v2/payments.post.responses.300` | 300 | missing | `{"description":"Duplicate merchant unique id.","co` | `(undefined)` |
| `paths./v2/payments.post.responses.400` | 400 | missing | `{"description":"Invalid input detail.","content":{` | `(undefined)` |
| `paths./v2/payments.post.responses.500` | 500 | missing | `{"description":"Something went wrong. Payment may ` | `(undefined)` |
| `paths./v2/payments.post.responses.200` | 200 | added | `(undefined)` | `{"description":"Successful response","content":{"a` |
| `paths./v2/payments.post.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/payments.post.requestBody.content.application/json` | application/json | missing | `{"schema":{"$ref":"#/components/schemas/PaymentReq` | `(undefined)` |
| `paths./v2/payments.post.requestBody.content.text/json` | text/json | missing | `{"schema":{"$ref":"#/components/schemas/PaymentReq` | `(undefined)` |
| `paths./v2/payments.post.requestBody.content.application/xml` | application/xml | missing | `{"schema":{"$ref":"#/components/schemas/PaymentReq` | `(undefined)` |
| `paths./v2/payments.post.requestBody.content.text/xml` | text/xml | missing | `{"schema":{"$ref":"#/components/schemas/PaymentReq` | `(undefined)` |
| `paths./v2/payments.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | missing | `{"schema":{"$ref":"#/components/schemas/PaymentReq` | `(undefined)` |
| `paths./v2/payments.post.parameters` | parameters | added | `(undefined)` | `[{"name":"Content-Type","in":"header","schema":{"t` |
| `paths./v2/preauths/{preauthReference}.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"preauthRefere` | `(undefined)` |
| `paths./v2/preauths/{preauthReference}.get.responses` | responses | missing | `{"200":{"description":"Found the preauth.","conten` | `(undefined)` |
| `paths./v2/preauths/{preauthReference}.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/preauths.get.parameters` | parameters.length | modified | `5` | `1` |
| `paths./v2/preauths.get.parameters[0].name` | name | modified | `"customerReference"` | `"api-key"` |
| `paths./v2/preauths.get.parameters[1]` | parameters | added | `{"schema":{"type":"string","format":"date-time"},"` | `(undefined)` |
| `paths./v2/preauths.get.parameters[2]` | parameters | added | `{"schema":{"type":"string","format":"date-time"},"` | `(undefined)` |
| `paths./v2/preauths.get.parameters[3]` | parameters | added | `{"schema":{"type":"integer","format":"int32"},"nam` | `(undefined)` |
| `paths./v2/preauths.get.parameters[4]` | parameters | added | `{"schema":{"type":"integer","format":"int32"},"nam` | `(undefined)` |
| `paths./v2/preauths.get.responses.200.content.application/json.schema` | schema | missing | `{"items":{"$ref":"#/components/schemas/PreauthResp` | `(undefined)` |
| `paths./v2/preauths.get.responses.200.content.text/json` | text/json | missing | `{"schema":{"items":{"$ref":"#/components/schemas/P` | `(undefined)` |
| `paths./v2/preauths.get.responses.200.content.application/xml` | application/xml | missing | `{"schema":{"items":{"$ref":"#/components/schemas/P` | `(undefined)` |
| `paths./v2/preauths.get.responses.200.content.text/xml` | text/xml | missing | `{"schema":{"items":{"$ref":"#/components/schemas/P` | `(undefined)` |
| `paths./v2/preauths.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/preauths.post.responses.201` | 201 | missing | `{"description":"Preauth is created.","content":{"a` | `(undefined)` |
| `paths./v2/preauths.post.responses.300` | 300 | missing | `{"description":"Duplicate merchant unique id.","co` | `(undefined)` |
| `paths./v2/preauths.post.responses.400` | 400 | missing | `{"description":"Invalid input detail.","content":{` | `(undefined)` |
| `paths./v2/preauths.post.responses.403` | 403 | missing | `{"description":"Invalid permission.","content":{"a` | `(undefined)` |
| `paths./v2/preauths.post.responses.500` | 500 | missing | `{"description":"Something went wrong. Preauth may ` | `(undefined)` |
| `paths./v2/preauths.post.responses.200` | 200 | added | `(undefined)` | `{"description":"Successful response","content":{"a` |
| `paths./v2/preauths.post.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/preauths.post.requestBody.content.application/json` | application/json | missing | `{"schema":{"$ref":"#/components/schemas/PreauthReq` | `(undefined)` |
| `paths./v2/preauths.post.requestBody.content.text/json` | text/json | missing | `{"schema":{"$ref":"#/components/schemas/PreauthReq` | `(undefined)` |
| `paths./v2/preauths.post.requestBody.content.application/xml` | application/xml | missing | `{"schema":{"$ref":"#/components/schemas/PreauthReq` | `(undefined)` |
| `paths./v2/preauths.post.requestBody.content.text/xml` | text/xml | missing | `{"schema":{"$ref":"#/components/schemas/PreauthReq` | `(undefined)` |
| `paths./v2/preauths.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | missing | `{"schema":{"$ref":"#/components/schemas/PreauthReq` | `(undefined)` |
| `paths./v2/preauths.post.parameters` | parameters | added | `(undefined)` | `[{"name":"api-key","in":"header","schema":{"type":` |
| `paths./v2/preauths/{preauthReference}/voids.put.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"preauthRefere` | `(undefined)` |
| `paths./v2/preauths/{preauthReference}/voids.put.responses` | responses | missing | `{"200":{"description":"Preauth has been voided.","` | `(undefined)` |
| `paths./v2/preauths/{preauthReference}/voids.put.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/preauths/{preauthReference}/captures.post.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"preauthRefere` | `(undefined)` |
| `paths./v2/preauths/{preauthReference}/captures.post.responses` | responses | missing | `{"201":{"description":"Preauth has been captured."` | `(undefined)` |
| `paths./v2/preauths/{preauthReference}/captures.post.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/preauths/{preauthReference}/captures.post.requestBody` | requestBody | missing | `{"content":{"application/json":{"schema":{"$ref":"` | `(undefined)` |
| `paths./v2/proxies/{proxy}.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"proxy","in":"` | `(undefined)` |
| `paths./v2/proxies/{proxy}.get.responses` | responses | missing | `{"200":{"description":"Payment account proxy provi` | `(undefined)` |
| `paths./v2/proxies/{proxy}.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/proxies/{proxy}/pricing.get.parameters` | parameters | missing | `[{"schema":{"type":"string"},"name":"proxy","in":"` | `(undefined)` |
| `paths./v2/proxies/{proxy}/pricing.get.responses` | responses | missing | `{"200":{"description":"Pricing response for proxy ` | `(undefined)` |
| `paths./v2/proxies/{proxy}/pricing.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/requestpays/{requestPayId}.get.parameters` | parameters | missing | `[{"schema":{"type":"integer","format":"int32"},"na` | `(undefined)` |
| `paths./v2/requestpays/{requestPayId}.get.responses` | responses | missing | `{"200":{"description":"Request Pay summary","conte` | `(undefined)` |
| `paths./v2/requestpays/{requestPayId}.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/requestpays/{requestPayId}/entries.get.parameters` | parameters | missing | `[{"schema":{"type":"integer","format":"int32"},"na` | `(undefined)` |
| `paths./v2/requestpays/{requestPayId}/entries.get.responses` | responses | missing | `{"200":{"description":"List of request pay entries` | `(undefined)` |
| `paths./v2/requestpays/{requestPayId}/entries.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/requestpays.post.responses.201` | 201 | missing | `{"description":"Request to pay created successfull` | `(undefined)` |
| `paths./v2/requestpays.post.responses.300` | 300 | missing | `{"description":"Duplicate merchant unique id.","co` | `(undefined)` |
| `paths./v2/requestpays.post.responses.400` | 400 | missing | `{"description":"Invalid request pay details.","con` | `(undefined)` |
| `paths./v2/requestpays.post.responses.500` | 500 | missing | `{"description":"Something went wrong. Request to p` | `(undefined)` |
| `paths./v2/requestpays.post.responses.200` | 200 | added | `(undefined)` | `{"description":"Successful response","content":{"a` |
| `paths./v2/requestpays.post.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/requestpays.post.requestBody.content.application/json.schema.$ref` | $ref | missing | `"#/components/schemas/RequestPayRequest"` | `(undefined)` |
| `paths./v2/requestpays.post.requestBody.content.text/json` | text/json | missing | `{"schema":{"$ref":"#/components/schemas/RequestPay` | `(undefined)` |
| `paths./v2/requestpays.post.requestBody.content.application/xml` | application/xml | missing | `{"schema":{"$ref":"#/components/schemas/RequestPay` | `(undefined)` |
| `paths./v2/requestpays.post.requestBody.content.text/xml` | text/xml | missing | `{"schema":{"$ref":"#/components/schemas/RequestPay` | `(undefined)` |
| `paths./v2/requestpays.post.requestBody.content.application/x-www-form-urlencoded` | application/x-www-form-urlencoded | missing | `{"schema":{"$ref":"#/components/schemas/RequestPay` | `(undefined)` |
| `paths./v2/requestpays.post.parameters` | parameters | added | `(undefined)` | `[{"name":"Content-Type","in":"header","schema":{"t` |
| `paths./v2/sessions/{sessionId}.get.parameters` | parameters | missing | `[{"schema":{"type":"integer","format":"int32"},"na` | `(undefined)` |
| `paths./v2/sessions/{sessionId}.get.responses` | responses | missing | `{"501":{"description":"This endpoint is not curren` | `(undefined)` |
| `paths./v2/sessions/{sessionId}.get.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/sessions.post.responses` | responses | missing | `{"201":{"description":"Session created.","content"` | `(undefined)` |
| `paths./v2/sessions.post.security` | security | missing | `[{"Api-Key":[]}]` | `(undefined)` |
| `paths./v2/sessions.post.requestBody` | requestBody | missing | `{"content":{"application/json":{"schema":{"$ref":"` | `(undefined)` |
| `paths./v2/batchpayments/:batchPaymentId.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/batchpayments/:batchPaymentId.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/batchpayments/:batchPaymentId/entries.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/batchpayments/:batchPaymentId/entries.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/cardproxies/:cardProxy.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/cardproxies/:cardProxy.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/cardproxies/:cardProxy.delete.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/cardproxies/:cardProxy.delete.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/cardproxies/:cardProxy/pricing.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/cardproxies/:cardProxy/pricing.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/customers/.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/customers/.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/customers/:customerReference.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/customers/:customerReference.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/customers/:customerReference/status.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/customers/:customerReference/status.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/customers/:customerReference/status.put.requestBody` | requestBody | added | `(undefined)` | `{"content":{}}` |
| `paths./v2/customers/:customerReference/status.put.parameters` | parameters | added | `(undefined)` | `[{"name":"Content-Type","in":"header","schema":{"t` |
| `paths./v2/customers/:customerReference/status.put.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/customers/:customerReference/profile.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/customers/:customerReference/profile.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/customers/:customerReference/profile.put.requestBody` | requestBody | added | `(undefined)` | `{"content":{}}` |
| `paths./v2/customers/:customerReference/profile.put.parameters` | parameters | added | `(undefined)` | `[{"name":"Content-Type","in":"header","schema":{"t` |
| `paths./v2/customers/:customerReference/profile.put.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/customers/:customerReference/account.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/customers/:customerReference/account.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/customers/:customerReference/account.put.requestBody` | requestBody | added | `(undefined)` | `{"content":{}}` |
| `paths./v2/customers/:customerReference/account.put.parameters` | parameters | added | `(undefined)` | `[{"name":"Content-Type","in":"header","schema":{"t` |
| `paths./v2/customers/:customerReference/account.put.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/customers/:customerReference/paymentOption.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/customers/:customerReference/paymentOption.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/customers/:customerReference/paymentOption.put.requestBody` | requestBody | added | `(undefined)` | `{"content":{}}` |
| `paths./v2/customers/:customerReference/paymentOption.put.parameters` | parameters | added | `(undefined)` | `[{"name":"Content-Type","in":"header","schema":{"t` |
| `paths./v2/customers/:customerReference/paymentOption.put.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/customers/:customerReference/customerReference.put.requestBody` | requestBody | added | `(undefined)` | `{"content":{}}` |
| `paths./v2/customers/:customerReference/customerReference.put.parameters` | parameters | added | `(undefined)` | `[{"name":"Content-Type","in":"header","schema":{"t` |
| `paths./v2/customers/:customerReference/customerReference.put.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/payments/:paymentReference.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/payments/:paymentReference.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/payments/uniqueId/:merchantUniqueId.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/payments/uniqueId/:merchantUniqueId.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/payments/:paymentReference/refundrequests.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/payments/:paymentReference/refundrequests.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/payments/:paymentReference/refundrequests.post.requestBody` | requestBody | added | `(undefined)` | `{"content":{}}` |
| `paths./v2/payments/:paymentReference/refundrequests.post.parameters` | parameters | added | `(undefined)` | `[{"name":"Content-Type","in":"header","schema":{"t` |
| `paths./v2/payments/:paymentReference/refundrequests.post.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/requestpays/:requestPayId.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/requestpays/:requestPayId.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/requestpays/:requestPayId/entries.get.parameters` | parameters | added | `(undefined)` | `[{"name":"Accept","in":"header","schema":{"type":"` |
| `paths./v2/requestpays/:requestPayId/entries.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/preauths/:preauthReference.get.parameters` | parameters | added | `(undefined)` | `[{"name":"api-key","in":"header","schema":{"type":` |
| `paths./v2/preauths/:preauthReference.get.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/preauths/:preauthReference/captures.post.requestBody` | requestBody | added | `(undefined)` | `{"content":{}}` |
| `paths./v2/preauths/:preauthReference/captures.post.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `paths./v2/preauths/:preauthReference/voids.put.requestBody` | requestBody | added | `(undefined)` | `{"content":{}}` |
| `paths./v2/preauths/:preauthReference/voids.put.parameters` | parameters | added | `(undefined)` | `[{"name":"api-key","in":"header","schema":{"type":` |
| `paths./v2/preauths/:preauthReference/voids.put.responses` | responses | added | `(undefined)` | `{"200":{"description":"Successful response","conte` |
| `components.schemas.ApiBatchPaySummary` | ApiBatchPaySummary | missing | `{"description":"Batch payment summary","properties` | `(undefined)` |
| `components.schemas.ApiBatchPayEntry` | ApiBatchPayEntry | missing | `{"description":"Batch entry item","properties":{"c` | `(undefined)` |
| `components.schemas.BatchPaymentRequest` | BatchPaymentRequest | missing | `{"description":"Container for batch payment entrie` | `(undefined)` |
| `components.schemas.BatchPaymentDataRecord` | BatchPaymentDataRecord | missing | `{"description":"Represent one batch payment entry ` | `(undefined)` |
| `components.schemas.BatchPaymentResponse` | BatchPaymentResponse | missing | `{"description":"Batch Payment Response for call to` | `(undefined)` |
| `components.schemas.AmbiguousResult` | AmbiguousResult | missing | `{"description":"","properties":{},"xml":{"name":"A` | `(undefined)` |
| `components.schemas.ModelState` | ModelState | missing | `{"description":"Encapsulates the state of model bi` | `(undefined)` |
| `components.schemas.ValueProviderResult` | ValueProviderResult | missing | `{"description":"Represents the result of binding a` | `(undefined)` |
| `components.schemas.ModelError` | ModelError | missing | `{"description":"Represents an error that occurs du` | `(undefined)` |
| `components.schemas.InternalServerErrorResult` | InternalServerErrorResult | missing | `{"description":"Represents an action result that r` | `(undefined)` |
| `components.schemas.TokenResponse` | TokenResponse | missing | `{"description":"Token Response.","properties":{"ca` | `(undefined)` |
| `components.schemas.PricingResponse` | PricingResponse | missing | `{"description":"Pricing response.","properties":{"` | `(undefined)` |
| `components.schemas.Pricing` | Pricing | missing | `{"description":"Applicable fee for the card used."` | `(undefined)` |
| `components.schemas.CardProxyRequest` | CardProxyRequest | missing | `{"description":"Credit/Debit Card details.","requi` | `(undefined)` |
| `components.schemas.ThreeDSecureData` | ThreeDSecureData | missing | `{"properties":{"useThreeDSecure":{"description":"W` | `(undefined)` |
| `components.schemas.ThreeDSecureBrowserData` | ThreeDSecureBrowserData | missing | `{"properties":{"acceptHeader":{"description":"Exac` | `(undefined)` |
| `components.schemas.CardProxyResponse` | CardProxyResponse | missing | `{"description":"Card authorisation response.","pro` | `(undefined)` |
| `components.schemas.PreconditionFailedResponse` | PreconditionFailedResponse | missing | `{"properties":{"errorCode":{"readOnly":true,"type"` | `(undefined)` |
| `components.schemas.CustomerResponse` | CustomerResponse | missing | `{"description":"Customer information","properties"` | `(undefined)` |
| `components.schemas.CustomerProfile` | CustomerProfile | missing | `{"properties":{"enableBPayOption":{"type":"boolean` | `(undefined)` |
| `components.schemas.CustomerAccountResponse` | CustomerAccountResponse | missing | `{"properties":{"bankAccount":{"$ref":"#/components` | `(undefined)` |
| `components.schemas.CustomerPaymentOption` | CustomerPaymentOption | missing | `{"required":["paymentOption","paymentAmount","paym` | `(undefined)` |
| `components.schemas.CustomerAddress` | CustomerAddress | missing | `{"description":"Customer address model","required"` | `(undefined)` |
| `components.schemas.BankAccount` | BankAccount | missing | `{"description":"Bank Account","required":["bsb","a` | `(undefined)` |
| `components.schemas.CreditCard` | CreditCard | missing | `{"properties":{"label":{"description":"Label for t` | `(undefined)` |
| `components.schemas.PayIdDetail` | PayIdDetail | missing | `{"properties":{"payId":{"description":"PayID","typ` | `(undefined)` |
| `components.schemas.BPayDetail` | BPayDetail | missing | `{"properties":{"billerCode":{"description":"BPAY B` | `(undefined)` |
| `components.schemas.CustomerStatusRequest` | CustomerStatusRequest | missing | `{"description":"Status request","properties":{"rea` | `(undefined)` |
| `components.schemas.CustomerAccountRequest` | CustomerAccountRequest | missing | `{"description":"Customer Bank/Credit Card account.` | `(undefined)` |
| `components.schemas.CreditCardProxy` | CreditCardProxy | missing | `{"description":"Credit card proxy","required":["ca` | `(undefined)` |
| `components.schemas.AccountProxy` | AccountProxy | missing | `{"description":"Account proxy. Recommended to use ` | `(undefined)` |
| `components.schemas.ICustomerProfie` | ICustomerProfie | missing | `{"properties":{"enableBPayOption":{"type":"boolean` | `(undefined)` |
| `components.schemas.CustomerProfileRequest` | CustomerProfileRequest | missing | `{"required":["firstName","lastName","address","ema` | `(undefined)` |
| `components.schemas.NewCustomer` | NewCustomer | missing | `{"description":"Create customer request model","re` | `(undefined)` |
| `components.schemas.AdditionalReference` | AdditionalReference | missing | `{"properties":{"fullName":{"type":"string"},"custo` | `(undefined)` |
| `components.schemas.NewCustomerResponse` | NewCustomerResponse | missing | `{"description":"New Customer response","required":` | `(undefined)` |
| `components.schemas.PingResponse` | PingResponse | missing | `{"description":"Ping result","properties":{"server` | `(undefined)` |
| `components.schemas.PaymentResponse` | PaymentResponse | missing | `{"description":"Payment response.\r\n(Conditional)` | `(undefined)` |
| `components.schemas.SettlementPayment` | SettlementPayment | missing | `{"properties":{"processedOn":{"description":"Proce` | `(undefined)` |
| `components.schemas.SubPayment` | SubPayment | missing | `{"properties":{"processedOn":{"description":"Refun` | `(undefined)` |
| `components.schemas.RefundResponse` | RefundResponse | missing | `{"description":"Refund request response.","propert` | `(undefined)` |
| `components.schemas.RefundRequest` | RefundRequest | missing | `{"description":"Refund request object","required":` | `(undefined)` |
| `components.schemas.PaymentRequest` | PaymentRequest | missing | `{"description":"Payment request object","required"` | `(undefined)` |
| `components.schemas.PaymentCard` | PaymentCard | missing | `{"required":["cardHolder","cardNumber","expiryMont` | `(undefined)` |
| `components.schemas.PreauthResponse` | PreauthResponse | missing | `{"description":"Payment response.\r\n(Conditional)` | `(undefined)` |
| `components.schemas.PreauthRequest` | PreauthRequest | missing | `{"required":["customerReference","preauthAmount"],` | `(undefined)` |
| `components.schemas.VoidCardResponse` | VoidCardResponse | missing | `{"description":"Payment response.\r\n(Conditional)` | `(undefined)` |
| `components.schemas.CaptureCardRequest` | CaptureCardRequest | missing | `{"required":["paymentAmount"],"properties":{"payme` | `(undefined)` |
| `components.schemas.CaptureCardResponse` | CaptureCardResponse | missing | `{"description":"Payment response.\r\n(Conditional)` | `(undefined)` |
| `components.schemas.PaymentAccountProxyResponse` | PaymentAccountProxyResponse | missing | `{"description":"Payment Account Proxy Response Mod` | `(undefined)` |
| `components.schemas.ApiRequestPaySummary` | ApiRequestPaySummary | missing | `{"description":"Api request to pay summary","prope` | `(undefined)` |
| `components.schemas.ApiRequestPayEntry` | ApiRequestPayEntry | missing | `{"description":"Api request pay entry","properties` | `(undefined)` |
| `components.schemas.RequestPayRequest` | RequestPayRequest | missing | `{"description":"Container for request to pay entri` | `(undefined)` |
| `components.schemas.RequestPayRequestRecord` | RequestPayRequestRecord | missing | `{"description":"Represent one request pay entry se` | `(undefined)` |
| `components.schemas.RequestPayResponse` | RequestPayResponse | missing | `{"description":"Request pay response","properties"` | `(undefined)` |
| `components.schemas.SessionRequest` | SessionRequest | missing | `{"description":"Session request","required":["vers` | `(undefined)` |
| `components.schemas.PluginPaymentMethods` | PluginPaymentMethods | missing | `{"description":"Plugin payment methods","propertie` | `(undefined)` |
| `components.schemas.PluginCustomization` | PluginCustomization | missing | `{"description":"Plugin customization","properties"` | `(undefined)` |
| `components.schemas.SessionResponse` | SessionResponse | missing | `{"properties":{"secureToken":{"description":"Token` | `(undefined)` |
| `components.securitySchemes.Api-Key` | Api-Key | missing | `{"type":"apiKey","description":"API Key Authentica` | `(undefined)` |

---

*Generated by comprehensive-diff.ts - 100% field coverage OpenAPI comparison*
