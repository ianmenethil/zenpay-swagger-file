# Claude Validation Protocol

## The Problem
Claude made claims about "perfect comparison" but was comparing TravelPay spec to itself (extracted merchant APIs). This gave false confidence in meaningless results.

## Required Validation Checks

### Before Making ANY Comparison Claim:

1. **State EXACTLY what is being compared:**
   - ❌ BAD: "Comparing specs"
   - ✅ GOOD: "Comparing TravelPay openapi.json (source: downloaded Swagger 2.0 converted to 3.1) vs openapi-merchant-apis.json (source: extracted from TravelPay openapi.json)"

2. **Explain WHY this comparison is meaningful:**
   - ❌ BAD: "To check differences"
   - ✅ GOOD: "This comparison is MEANINGLESS because both files have the same source. We need to compare Postman collection vs TravelPay spec."

3. **Before claiming "X matches Y perfectly":**
   - Show sample data from BOTH sources
   - Verify they are from DIFFERENT origins
   - Check at least 3 examples manually
   - State what was NOT checked

4. **Required Evidence for Claims:**
   - "All descriptions match" → Show 5+ actual description comparisons
   - "Schemas are identical" → Diff at least 3 schemas
   - "No differences" → List what was compared AND what was skipped

## Validation Checklist

Before claiming comparison results:

- [ ] Identified the SOURCE of each file being compared
- [ ] Confirmed sources are DIFFERENT (not derived from each other)
- [ ] Manually verified 3+ samples from actual data
- [ ] Listed what was NOT compared
- [ ] Stated confidence level with reasoning

## Red Flags (Stop Immediately)

- Comparing a file to a derivative of itself
- Claiming "perfect match" without showing examples
- Using terms like "all", "every", "none" without sampling
- Getting identical results when differences are expected

## Example: How to Report Properly

❌ **WRONG:**
"Deep comparison shows only 2 differences. Everything else is identical."

✅ **RIGHT:**
"Comparison: TravelPay openapi.json (extracted from merchant section) vs openapi-merchant-apis.json (also extracted from TravelPay).

⚠️ WARNING: These have the SAME SOURCE, so this comparison is meaningless.

What we SHOULD compare:
- Postman collection descriptions vs TravelPay openapi.json descriptions
- Postman converted spec vs TravelPay spec

Current findings:
- TravelPay: 0/39 operations have descriptions (all null)
- Postman: 11 requests have detailed descriptions
- CONCLUSION: Postman has documentation that TravelPay is missing"

## Self-Validation Questions

1. "If these files are identical, would that be surprising?" (If no, you're comparing wrong things)
2. "Can I show 3 actual examples from the data?" (If no, you don't have evidence)
3. "What am I NOT checking?" (Always state limitations)
4. "Where did each file come from?" (Know the provenance)

## When User Questions Results

DO NOT defend the results. Instead:
1. Re-examine the sources
2. Show actual data samples
3. Admit if comparison was wrong
4. Do the RIGHT comparison

---

**This file must be read before making ANY claim about comparisons, matches, or completeness.**
