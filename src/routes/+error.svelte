<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	<h1 class="text-3xl font-bold text-black">{$page.status}</h1>
	<p>
		{#if $page.status == 404}
			Page not found, <a href="/" class="link text-primary-400 font-bold"
				>here's a page that DOES exist!</a
			>
		{:else if $page.status == 500}
			Something happened on the server, sorry about that!
		{:else}
			{$page.error?.message}
		{/if}
	</p>
</main>
