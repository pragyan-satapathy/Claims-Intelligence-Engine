# Claims Intelligence Engine - proposal

## Business flow

The business team suggests a claim. A claim manager checks if it makes sense. A scientist submits the formula. An evaluator adds the study results. The tool checks if those results support the exact claim and saves its assessment. A person should make the final approval decision.

## Research performed

- Reviewed the business flow and identified the inputs: claim, formula and study evidence.
- Compared the sample claim (20% in four weeks) with the study result (12%, no control group) to decide what the AI should check.
- Read the [OpenAI Responses API](https://developers.openai.com/api/reference/resources/responses/methods/create) and [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) docs to return a fixed JSON result.
- Planned separate Claim and Assessment records to save the evidence and decision.

## Design

- React sends the claim, formula and evidence to NestJS.
- NestJS asks OpenAI to compare the claim with the evidence. It saves the claim and assessment in SQLite through Prisma, then returns the result.
- The prompt asks for a match on the tested product, measured result and timeframe. Missing or unclear evidence gives a "No" result with a reason.
- The confidence score is the model's own estimate. It is not a scientific confidence interval.
- SQLite keeps the demo easy to run. PostgreSQL would be a better fit for a shared production system.

## Product roadmap

1. Add a sign-in page so evaluators and claim managers can see their own work.
2. Show a list of saved claims and their assessment results.
3. Add an approve/reject button and a comment field for the claim manager's final decision.
4. Add fields for the study name, date and page reference so reviewers can find the supporting evidence.
