<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>wasteof.time</title>
</svelte:head>

<main>
	{#if !$page.data.user}
		<h1 class="lg:text-6xl font-extrabold mb-3 md:text-5xl text-4xl text-black">
			Previous degeneration <span class="text-primary-400">social media.</span>
		</h1>
		<p class="mb-3 text-xl ">
			wasteof.time is an offbrand version of <a
				href="https://wasteof.money/"
				class="link text-primary-400 font-bold">wasteof.money</a
			> made only for the funnies and to see how fast I can make a social media site.
		</p>
		<p class="mb-3 text-xl">
			Which turned out to be heckin' slow so I ended up scrapping the speedrun element.
		</p>
		<p class="mb-3 text-xl">
			(The name wasteof.time has everything to do with the wastage of time.. its literally the
			truth.)
		</p>
		<p class="mb-3 text-xl">
			Required reading: <a href="/privacy" class="link text-primary-400 font-bold">Privacy</a>,
			<a href="/rules" class="link text-primary-400 font-bold">Rules</a>
		</p>
		<p>
			<a href="/join" class="link text-primary-400 font-bold">Join</a> or
			<a href="/login" class="link text-primary-400 font-bold">Login</a>
		</p>
	{:else}
		<h1 class="text-4xl font-bold text-black">Feed</h1>
		{#if $page.data.user?.following}
			<div class="max-w-2xl mx-auto">
				<p class="text-center mt-4 w-full">
					This is your feed. You will see posts from people that you follow. Right now there is
					nothing here. Why not go <a href="/explore" class="link text-primary-400 font-bold"
						>follow some people?</a
					>
				</p>
			</div>
		{/if}
	{/if}
</main>
