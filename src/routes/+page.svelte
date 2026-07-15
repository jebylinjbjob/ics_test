<script lang="ts">
	import { DownloadIcon, CopyIcon, CheckIcon, LinkIcon, CalendarPlusIcon } from '@lucide/svelte';
	import { page } from '$app/stores';
	import { googleCalendarEventUrl, googleCalendarSubscribeUrl } from '$lib/google-calendar';
	import { sampleEvents } from '$lib/ics';

	let copied = $state(false);

	const origin = $derived($page.url.origin);
	const subscribeUrl = $derived(`${origin}/calendar.ics`);
	const webcalUrl = $derived(subscribeUrl.replace(/^https?:/, 'webcal:'));
	const googleSubscribeUrl = $derived(googleCalendarSubscribeUrl(subscribeUrl));

	async function copySubscribeUrl() {
		await navigator.clipboard.writeText(subscribeUrl);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<div class="mx-auto max-w-3xl space-y-8">
	<header class="space-y-2">
		<h1 class="text-3xl font-bold">ICS 行事曆測試</h1>
		<p class="text-surface-600-300">
			此頁面用於測試 ICS 下載與訂閱兩種情境，資料由 SvelteKit API route 動態產生。
		</p>
	</header>

	<section class="space-y-4 card p-6">
		<h2 class="text-xl font-semibold">情境一：下載 ICS</h2>
		<p class="text-surface-600-300 text-sm">
			點擊下載按鈕取得 `.ics` 檔案，再匯入 Google、Outlook 或 Apple 行事曆。
		</p>
		<a
			href="/calendar.ics?download=1"
			download="calendar.ics"
			class="btn inline-flex items-center gap-2 preset-filled"
		>
			<DownloadIcon class="size-4" />
			下載 calendar.ics
		</a>
	</section>

	<section class="space-y-4 card p-6">
		<h2 class="text-xl font-semibold">情境二：訂閱 ICS</h2>
		<p class="text-surface-600-300 text-sm">
			複製下方 URL 到行事曆 App 的「透過 URL 訂閱」功能。訂閱不需獨立後端，SvelteKit `+server.ts`
			即可提供穩定端點。
		</p>

		<div class="space-y-3">
			<div class="space-y-1">
				<p class="text-sm font-medium">HTTPS 訂閱 URL</p>
				<code class="block rounded-container bg-surface-200-800 p-3 text-sm break-all"
					>{subscribeUrl}</code
				>
			</div>
			<div class="space-y-1">
				<p class="text-sm font-medium">WebCal 訂閱 URL</p>
				<code class="block rounded-container bg-surface-200-800 p-3 text-sm break-all"
					>{webcalUrl}</code
				>
			</div>
		</div>

		<div class="flex flex-wrap gap-2">
			<button
				type="button"
				class="btn inline-flex items-center gap-2 preset-tonal"
				onclick={copySubscribeUrl}
			>
				{#if copied}
					<CheckIcon class="size-4" />
					已複製
				{:else}
					<CopyIcon class="size-4" />
					複製 HTTPS URL
				{/if}
			</button>
			<a href={webcalUrl} class="btn inline-flex items-center gap-2 preset-tonal">
				<LinkIcon class="size-4" />
				以 WebCal 開啟
			</a>
		</div>

		<p class="text-surface-600-300 text-xs">
			注意：外部行事曆服務無法訂閱 `localhost`，部署至公開環境後請用正式網域重新測試。
		</p>
	</section>

	<section class="space-y-4 card p-6">
		<h2 class="text-xl font-semibold">情境三：加入 Google 行事曆</h2>
		<p class="text-surface-600-300 text-sm">
			一鍵開啟 Google 行事曆：可訂閱整份 ICS（自動同步後續更新），或將單一事件以預填表單方式加入。
		</p>

		<div class="space-y-1">
			<p class="text-sm font-medium">訂閱整份行事曆</p>
			<a
				href={googleSubscribeUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="btn inline-flex items-center gap-2 preset-filled"
			>
				<CalendarPlusIcon class="size-4" />
				在 Google 行事曆訂閱
			</a>
		</div>

		<div class="space-y-2">
			<p class="text-sm font-medium">加入單一事件</p>
			<div class="flex flex-wrap gap-2">
				{#each sampleEvents as event (event.uid)}
					<a
						href={googleCalendarEventUrl(event)}
						target="_blank"
						rel="noopener noreferrer"
						class="btn inline-flex items-center gap-2 preset-tonal"
					>
						<CalendarPlusIcon class="size-4" />
						{event.title}
					</a>
				{/each}
			</div>
		</div>

		<p class="text-surface-600-300 text-xs">
			注意：訂閱功能同樣無法使用 `localhost`；單一事件連結則不受此限制。
		</p>
	</section>
</div>
