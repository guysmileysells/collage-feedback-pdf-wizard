import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker/src/index.js";

const PROD_ORIGIN = "https://guysmileysells.github.io";
const request = (path = "/copy-edit", options = {}) => new Request(`https://worker.example${path}`, options);
const env = (overrides = {}) => ({
  AI: {run: async (_model, input) => ({response: `Edited: ${input.messages[1].content}`})},
  COPY_EDIT_RATE_LIMIT: {limit: async () => ({success: true})},
  ...overrides,
});
const post = (body, origin = PROD_ORIGIN, extraHeaders = {}) => request("/copy-edit", {
  method: "POST",
  headers: {Origin: origin, "Content-Type": "application/json", ...extraHeaders},
  body: typeof body === "string" ? body : JSON.stringify(body),
});

test("accepts only POST /copy-edit and provides restricted CORS preflight", async () => {
  assert.equal((await worker.fetch(request("/other", {method: "POST", headers: {Origin: PROD_ORIGIN}}), env())).status, 404);
  assert.equal((await worker.fetch(request("/copy-edit", {method: "GET", headers: {Origin: PROD_ORIGIN}}), env())).status, 405);
  const response = await worker.fetch(request("/copy-edit", {method: "OPTIONS", headers: {Origin: PROD_ORIGIN}}), env());
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), PROD_ORIGIN);
  assert.equal(response.headers.get("Access-Control-Allow-Methods"), "POST, OPTIONS");
});

test("rejects unapproved origins including origin-less requests", async () => {
  assert.equal((await worker.fetch(post({comment: "Hello"}, "https://evil.example"), env())).status, 403);
  assert.equal((await worker.fetch(request("/copy-edit", {method: "POST", headers: {"Content-Type": "application/json"}, body: '{}'}), env())).status, 403);
});

test("allows loopback localhost origins for development", async () => {
  const response = await worker.fetch(post({comment: "Hello"}, "http://localhost:4187"), env());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "http://localhost:4187");
});

test("validates JSON shape, content type, and comment/instruction limits", async () => {
  assert.equal((await worker.fetch(post("{"), env())).status, 400);
  assert.equal((await worker.fetch(post({comment: "ok", student_name: "Private"}), env())).status, 400);
  assert.equal((await worker.fetch(post({comment: "x".repeat(3001)}), env())).status, 400);
  assert.equal((await worker.fetch(post({comment: "ok", instructions: "x".repeat(501)}), env())).status, 400);
  assert.equal((await worker.fetch(post({comment: "   "}), env())).status, 400);
  assert.equal((await worker.fetch(post({comment: "ok"}, PROD_ORIGIN, {"Content-Type": "text/plain"}), env())).status, 415);
});

test("sends only the comment to Workers AI and returns suggestion", async () => {
  let call;
  const response = await worker.fetch(post({comment: "  Clear sentence.  "}), env({AI: {run: async (model, input) => {
    call = {model, input};
    return {response: "Clearer sentence."};
  }}}));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {suggestion: "Clearer sentence."});
  assert.equal(call.model, "@cf/meta/llama-3.3-70b-instruct-fp8-fast");
  assert.equal(call.input.messages[1].content, "Clear sentence.");
  const systemPrompt = call.input.messages[0].content;
  assert.match(systemPrompt, /Correct only spelling, grammar, punctuation, capitalization, and obvious sentence-level clarity errors/);
  assert.match(systemPrompt, /Do not add new feedback, examples, praise, criticism, recommendations, or explanations/);
  assert.match(systemPrompt, /Preserve the original meaning, evaluation, tone, paragraph breaks, and placeholders/);
  assert.match(systemPrompt, /If no correction is needed, return the original text exactly unchanged/);
  assert.doesNotMatch(systemPrompt, /constructive professional tone/i);
  assert.equal(call.input.temperature, 0);
  assert.doesNotMatch(JSON.stringify(call.input), /student|grade|answer context/i);
});

test("passes optional user preferences only as narrower copy-edit constraints", async () => {
  let call;
  const response = await worker.fetch(post({comment: "Keep these questions?", instructions: "Preserve my questions and conversational voice."}), env({AI: {run: async (_model, input) => {
    call = input;
    return {response: "Keep these questions?"};
  }}}));
  assert.equal(response.status, 200);
  assert.equal(call.messages[1].content, "Keep these questions?");
  assert.match(call.messages[0].content, /Preserve my questions and conversational voice/);
  assert.match(call.messages[0].content, /only as additional restrictions/);
});

test("rejects runaway rewrites that expand or change question and paragraph structure", async () => {
  const original = "This is a good start, but push the analysis deeper. Why are people still choosing to drive? Do you think this is connected to safety?";
  const runaway = `${original}\n\nA closer examination reveals many new factors and recommendations. `.repeat(8);
  const expanded = await worker.fetch(post({comment: original}), env({AI: {run: async () => ({response: runaway})}}));
  assert.equal(expanded.status, 422);
  assert.deepEqual(await expanded.json(), {error: "Copy edit exceeded allowed scope. Add guidance and try again."});

  const lostQuestion = await worker.fetch(post({comment: original}), env({AI: {run: async () => ({response: "This is a good start, but the analysis should go deeper because people continue to drive and safety may be connected."})}}));
  assert.equal(lostQuestion.status, 422);
});

test("rate limits before invoking AI", async () => {
  let called = false;
  const response = await worker.fetch(post({comment: "Hello"}), env({
    AI: {run: async () => { called = true; }},
    COPY_EDIT_RATE_LIMIT: {limit: async () => ({success: false})},
  }));
  assert.equal(response.status, 429);
  assert.equal(called, false);
});

test("uses generic errors and security headers", async () => {
  const response = await worker.fetch(post({comment: "Hello"}), env({AI: {run: async () => { throw new Error("secret provider detail"); }}}));
  assert.equal(response.status, 500);
  const text = await response.text();
  assert.deepEqual(JSON.parse(text), {error: "Copy edit unavailable."});
  assert.equal(response.headers.get("X-Content-Type-Options"), "nosniff");
  assert.equal(response.headers.get("Referrer-Policy"), "no-referrer");
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.doesNotMatch(text, /secret provider detail/);
});
