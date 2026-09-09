import assert from "node:assert/strict";
import test from "node:test";

async function render(path="/") {
  const workerUrl=new URL("../dist/server/index.js",import.meta.url);
  workerUrl.searchParams.set("test",`${process.pid}-${Date.now()}-${path}`);
  const {default:worker}=await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("Not found",{status:404})},IMAGES:{input(){return{transform(){return{output(){return Promise.resolve({response(){return new Response()}})}}}}}}},{waitUntil(){},passThroughOnException(){}});
}

test("server-renders the Bear River homepage",async()=>{const response=await render();assert.equal(response.status,200);const html=await response.text();assert.match(html,/Bear River Plumbing/);assert.match(html,/Plumbing made for Idaho/);assert.match(html,/Request Service/);assert.doesNotMatch(html,/codex-preview|SkeletonPreview/)});
test("renders representative service and location routes",async()=>{for(const path of ["/services/water-heaters","/service-areas/treasure-valley-id","/service-areas/victor-id/water-heaters","/service-areas/driggs-id/drain-sewer"]){const response=await render(path);assert.equal(response.status,200);const html=await response.text();assert.match(html,/Bear River Plumbing/);assert.match(html,/Request Service/)}});
