const { test, expect } = require('@playwright/test');
async function downloaded(page, action) {
  const pending = page.waitForEvent('download'); await action(); const download = await pending;
  const stream = await download.createReadStream(); const chunks=[];
  for await (const chunk of stream) chunks.push(chunk);
  return {name:download.suggestedFilename(), data:Buffer.concat(chunks)};
}
test.beforeEach(async ({page}) => {
  page._errors=[]; page.on('pageerror',error=>page._errors.push(error.message));
});
test.afterEach(async ({page}) => { expect(page._errors).toEqual([]); });

test('gate fixture follows the same decision through validation, dashboard and report', async ({page}) => {
  await page.goto('/operations-demo/');
  await expect(page.locator('#scenario option')).toHaveCount(6);
  await page.getByLabel('Scenario',{exact:true}).selectOption('hold');
  await page.getByRole('button',{name:'Reveal validation result'}).click();
  await expect(page.locator('#decision')).toContainText('BLOCKED');await expect(page.locator('#decision')).toContainText('CUSTOMS-DEMO-01');
  await page.getByRole('button',{name:'Show dashboard impact'}).click();
  await expect(page.locator('#total')).toHaveText('6');await expect(page.locator('#blocked')).toHaveText('4');
  await expect(page.locator('tr.selected')).toHaveAttribute('data-event','hold');
  const file=await downloaded(page,()=>page.getByRole('link',{name:'Download gate report (CSV)'}).click());
  expect(file.data.toString()).toContain('CUSTOMS-DEMO-01');expect(file.data.toString().trim().split(/\r?\n/)).toHaveLength(7);
  await page.getByLabel('Scenario',{exact:true}).selectOption('inbound');
  await page.getByRole('button',{name:'Reveal validation result'}).click(); await expect(page.locator('#decision')).toContainText('APPROVED');
});
test('VBS dashboard filters and exports selected bookings', async ({page}) => {
  await page.goto('/vbs-analytics/'); await page.getByLabel('Status',{exact:true}).selectOption('blocked');
  const file=await downloaded(page,()=>page.getByRole('button',{name:'Export filtered CSV'}).click());
  expect(file.data.toString()).toContain('blocked');expect(file.data.toString()).not.toContain('approved');
  await page.locator('#booking-search').fill('NO-MATCH');await expect(page.locator('tbody')).toContainText('No bookings match');
});
