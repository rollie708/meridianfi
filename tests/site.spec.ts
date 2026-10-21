import { expect, test } from '@playwright/test';

test('home renders locally, with healthy assets and only approved external links', async ({ page }, testInfo) => {
  const failures: string[] = [];
  const externalRequests: string[] = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4173')) externalRequests.push(request.url()); });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A new direction.');
  await page.evaluate(() => document.fonts.ready);
  const destinations = await page.locator('a[href^="https:"]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href')))]);
  expect(destinations.sort()).toEqual(['https://t.me/meridianfii', 'https://x.com/meridianfii?s=11'].sort());
  expect(externalRequests).toEqual([]);
  expect(failures).toEqual([]);
  await page.screenshot({ path: `test-results/home-${testInfo.project.name}.png`, fullPage: true });
});

test('exploration, roadmap and FAQ interactions change real content', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: 'Discover', exact: true }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Make room for a new idea.');
  await page.getByRole('tab', { name: 'Discover', exact: true }).press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Participate', exact: true })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('The next step includes you.');
  await page.getByRole('button', { name: /Explore the possibilities/ }).click();
  await expect(page.locator('#roadmap-detail')).toContainText('Keep the horizon open.');
  await page.locator('summary').filter({ hasText: 'What is MERIDIAN?' }).click();
  await expect(page.locator('details[open]')).toContainText('a meeting point for curious minds');
  await page.locator('summary').filter({ hasText: 'What is MERIDIAN?' }).click();
  await expect(page.locator('details[open]')).toHaveCount(0);
});

test('navigation, article deep links, and missing routes work', async ({ page }, testInfo) => {
  await page.goto('/');
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /Journal/ }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  } else {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Journal' }).click();
  }
  await expect(page).toHaveURL('/#journal');
  await page.locator('.journal-card').first().click();
  await expect(page).toHaveURL('/journal/a-shared-horizon');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A shared horizon.');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'A point of connection' })).toBeVisible();
  await page.getByRole('link', { name: 'Back to journal' }).click();
  await expect(page).toHaveURL('/#journal');
  await page.goto('/this-page-does-not-exist');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('off course.');
  await page.getByRole('link', { name: 'Return to MERIDIAN' }).click();
  await expect(page).toHaveURL('/');
});

test('guide search, combined filters and empty-state recovery work', async ({ page }) => {
  await page.goto('/guide');
  const input = page.getByRole('searchbox', { name: 'Search questions' });
  await input.fill('logo');
  await expect(page.locator('.faq-item')).toHaveCount(1);
  await expect(page.getByRole('status')).toContainText('1 ANSWER');
  await page.getByRole('button', { name: 'Community', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'No matching questions.' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(input).toHaveValue('');
  await expect(input).toBeFocused();
  await expect(page.locator('.faq-item')).toHaveCount(7);
  await page.getByRole('button', { name: 'Resources', exact: true }).click();
  await expect(page.locator('.faq-item')).toHaveCount(2);
  await input.fill('logo');
  await page.locator('summary').filter({ hasText: 'Can I download' }).click();
  await page.getByRole('link', { name: 'Open the Brand kit' }).click();
  await expect(page).toHaveURL('/brand');
});

test('brand downloads are genuine SVG assets and color copying works', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/brand');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download MERIDIAN symbol' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('meridian-symbol.svg');
  expect(await download.failure()).toBeNull();
  const asset = await page.request.get('/assets/meridian-symbol.svg');
  expect(asset.status()).toBe(200);
  expect(await asset.text()).toContain('<svg');
  await page.getByRole('button', { name: 'Copy Signal blue #8AB4FF' }).click();
  await expect(page.getByRole('status')).toContainText('#8AB4FF copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('#8AB4FF');
});

test('all public pages fit the viewport and remain usable at small widths', async ({ page }, testInfo) => {
  const paths = ['/', '/guide', '/brand', '/privacy', '/journal/a-shared-horizon', '/journal/built-around-people', '/journal/room-for-whats-next', '/missing'];
  const widths = testInfo.project.name === 'mobile' ? [320, 390, 640] : [768, 1024, 1440];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      expect(overflow, `${path} overflows at ${width}px`).toBe(false);
      const headlineFits = await page.locator('h1').evaluate(heading => heading.scrollWidth <= heading.clientWidth + 1);
      expect(headlineFits, `${path} headline overflows its column at ${width}px`).toBe(true);
      const blankLinks = await page.locator('a').evaluateAll(links => links.filter(link => !link.getAttribute('href') || link.getAttribute('href') === '#').length);
      expect(blankLinks).toBe(0);
    }
  }
});

test('mobile navigation traps focus, dismisses with Escape, and restores focus', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile navigation only');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(toggle).toBeFocused();
});
