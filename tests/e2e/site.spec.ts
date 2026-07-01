import { test, expect } from "@playwright/test";

for(const locale of ["en","ko","ja","es"]){
  test(`${locale} home loads`,async({page})=>{
    await page.goto(`/${locale}/`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(`a[href="/${locale}/planner/"]`).first()).toBeVisible();
  });
}

for (const [browserLocale, expected] of [["ko-KR","ko"],["ja-JP","ja"],["es-ES","es"],["fr-FR","en"]] as const) {
  test(`root redirects ${browserLocale} to ${expected}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ locale: browserLocale, baseURL });
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForURL(`**/${expected}/`);
    expect(new URL(page.url()).pathname).toBe(`/${expected}/`);
    await context.close();
  });
}

test("stored language overrides browser language",async({browser,baseURL})=>{
  const context=await browser.newContext({locale:"ja-JP",baseURL});
  const page=await context.newPage();
  await page.addInitScript(()=>localStorage.setItem("worldtime-grid-language-choice","ko"));
  await page.goto("/");
  await page.waitForURL("**/ko/");
  await context.close();
});

test("language switch preserves the current route and stores the choice",async({page})=>{
  await page.goto("/ko/planner/");
  await page.locator(".language-picker summary").click();
  await page.locator('.language-menu a[href="/en/planner/"]').click();
  await page.waitForURL("**/en/planner/");
  expect(await page.evaluate(()=>localStorage.getItem("worldtime-grid-language-choice"))).toBe("en");
});

test("guide language switch preserves the guide slug",async({page})=>{
  await page.goto("/en/guides/time-zone-converter-guide/");
  await page.locator(".language-picker summary").click();
  await page.locator('.language-menu a[href="/es/guides/time-zone-converter-guide/"]').click();
  await page.waitForURL("**/es/guides/time-zone-converter-guide/");
});

test("planner adds a city and relative slider supports pointer and keyboard",async({page})=>{
  await page.goto("/en/planner/");
  await page.getByPlaceholder(/Search Seoul/).fill("Tokyo");
  await page.getByRole("option",{name:/Tokyo/}).click();
  await expect(page.getByRole("row",{name:/Tokyo/})).toBeVisible();
  const slider=page.getByRole("slider",{name:/Adjust meeting start/});
  const before=Number(await slider.getAttribute("aria-valuenow"));
  const box=await slider.boundingBox();
  if(!box) throw new Error("Slider not visible");
  await page.mouse.click(box.x+box.width*.9,box.y+box.height/2);
  expect(Number(await slider.getAttribute("aria-valuenow"))).toBe(before);
  await page.mouse.move(box.x+box.width*.4,box.y+box.height/2);
  await page.mouse.down();
  await page.mouse.move(box.x+box.width*.6,box.y+box.height/2,{steps:5});
  await page.mouse.up();
  const dragged=Number(await slider.getAttribute("aria-valuenow"));
  expect(dragged).toBeGreaterThan(before);
  await slider.focus();
  await slider.press("ArrowRight");
  expect(Number(await slider.getAttribute("aria-valuenow"))).toBe(dragged+1);
  await slider.press("Home");
  expect(Number(await slider.getAttribute("aria-valuenow"))).toBe(0);
});

test("React console has no warnings or errors",async({page})=>{
  const messages:string[]=[];
  page.on("console",message=>{if(message.type()==="warning"||message.type()==="error")messages.push(`${message.type()}: ${message.text()}`)});
  page.on("pageerror",error=>messages.push(`pageerror: ${error.message}`));
  await page.goto("/en/planner/");
  await page.getByRole("slider").focus();
  await page.getByRole("slider").press("ArrowRight");
  expect(messages).toEqual([]);
});

test("planner restores a shared URL",async({page})=>{await page.goto("/en/planner/?zones=Asia%2FSeoul,America%2FNew_York&date=2026-06-29&time=2026-06-29T00%3A00%3A00.000Z&duration=60&format=24");await expect(page.getByRole("row",{name:/Seoul/})).toBeVisible();await expect(page.getByRole("row",{name:/New York/})).toBeVisible();});

test("ICS download is generated",async({page})=>{await page.goto("/en/planner/");const downloadPromise=page.waitForEvent("download");await page.getByRole("button",{name:/Download .ics/}).click();const download=await downloadPromise;expect(download.suggestedFilename()).toContain(".ics");});

test("public pages do not expose developer instructions",async({page})=>{
  for(const path of ["/en/","/ko/contact/","/ja/privacy/","/es/resources/"]){await page.goto(path);const text=await page.locator("body").innerText();expect(text).not.toMatch(/NEXT_PUBLIC_|Render|GitHub|Lighthouse|TODO|before launch/i);}
});

test("all resource routes and a guide avoid 404",async({page})=>{for(const path of ["/en/resources/","/en/resources/time-converter/","/en/resources/working-hours-overlap/","/en/resources/dst-checker/","/en/resources/date-line-visualizer/","/en/resources/utc-offset-explainer/","/en/guides/time-zone-converter-guide/"]){const response=await page.goto(path);expect(response?.status()).toBe(200);}});


test("Korean city search finds localized names and shows already-added cities", async ({ page }) => {
  await page.goto("/ko/planner/");
  const search = page.getByPlaceholder(/서울/);
  await search.fill("서울");
  const seoul = page.getByRole("option", { name: /서울/ }).first();
  await expect(seoul).toBeVisible();
  await expect(seoul).toBeDisabled();
  await expect(seoul).toContainText("이미 추가됨");
  await search.fill("도쿄");
  await page.getByRole("option", { name: /도쿄/ }).click();
  await expect(page.getByRole("row", { name: /도쿄/ })).toBeVisible();
});

test("Japanese and Spanish localized city names are searchable", async ({ page }) => {
  await page.goto("/ja/planner/");
  await page.getByPlaceholder(/東京/).fill("ロンドン");
  await expect(page.getByRole("option", { name: /ロンドン/ }).first()).toBeVisible();
  await page.goto("/es/planner/");
  await page.getByPlaceholder(/Seúl/).fill("Nueva York");
  await expect(page.getByRole("option", { name: /Nueva York/ }).first()).toBeVisible();
});
