<script lang="ts">
	import { MenuIcon } from '@lucide/svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { resolve } from '$app/paths';
	import SearchBar from '$lib/components/SearchBar.svelte';

	let {
		onMenuToggle,
		showSearch = $bindable(false),
		searchQuery = $bindable('')
	}: {
		onMenuToggle?: () => void;
		showSearch?: boolean;
		searchQuery?: string;
	} = $props();
</script>

<AppBar>
	<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
		<AppBar.Lead>
			<button
				type="button"
				class="btn-icon btn-icon-lg hover:preset-tonal"
				onclick={onMenuToggle}
				aria-label="切換選單"
			>
				<MenuIcon />
			</button>
		</AppBar.Lead>
		<AppBar.Headline>
			<a href={resolve('/')} class="text-2xl transition-opacity hover:opacity-80">
				ICS Test Website
			</a>
		</AppBar.Headline>
	</AppBar.Toolbar>
	<SearchBar bind:show={showSearch} bind:query={searchQuery} />
</AppBar>
