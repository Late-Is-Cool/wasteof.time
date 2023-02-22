<script lang="ts">
	import '../app.postcss';
	import 'iconify-icon';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { navigating, page } from '$app/stores';
	import pb from '$lib/pocketbase';
	import type { Message } from '$lib/types';
	import TipTap from '$lib/components/TipTap.svelte';
	import { onMount, onDestroy } from 'svelte';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;

	$: messages = data.messages.filter((n) => !n?.read);

	NProgress.configure({
		minimum: 0.1
	});

	navigating.subscribe((value) => {
		if (value) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	});

	onMount(() => {
		pb.collection('messages').subscribe('*', ({ action, record }) => {
			if (record?.sentTo == data.user?.id) {
				if (action == 'create') {
					messages = [...messages, <Message>record];
				}
				if (action == 'delete') {
					messages = messages.filter((m) => m.id !== record.id);
				}
				if (action == 'update') {
					const message = messages.find((m) => m.id === record.id);
					if (record?.read) {
						messages = messages.filter((m) => m.id !== record.id);
					} else if (message?.read !== record?.read) {
						messages = [...messages, <Message>record];
					}
				}
			}
		});
	});

	onDestroy(() => {
		pb.collection('messages').unsubscribe('*');
	});
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
</svelte:head>

<div>
	<nav
		class="navbar bg-primary-400 shadow-md top-0 fixed p-2 px-12 mt-0 z-50 w-full flex-col gap-2 md:flex-row md:gap-0"
	>
		<div class="flex-0 md:flex-1">
			<a href="/"><img src="/images/brand.png" alt="logo" class="h-8" /></a>
		</div>
		<div class="flex-0">
			<ul class="menu menu-horizontal gap-3">
				{#if data.user?.roles?.includes('admin')}
					<li class="hover:bg-primary-600/50 rounded transition duration-200">
						<a
							href="/admin"
							class="font-bold text-primary-100 p-2 px-3"
							class:text-white={$page.route.id == '/(restricted)/admin'}
						>
							<span class="hidden sm:block">Admin</span>
							<iconify-icon icon="mdi:shield-check" class="block sm:hidden text-xl" />
						</a>
					</li>
				{/if}
				<li class="hover:bg-primary-600/50 rounded transition duration-200">
					<a
						href="/"
						class="font-bold text-primary-100 p-2 px-3"
						class:text-white={$page.route.id == '/'}
					>
						<span class="hidden sm:block">Home</span>
						<iconify-icon icon="mdi:home" class="block sm:hidden text-xl" />
					</a>
				</li>
				<li class="hover:bg-primary-600/50 rounded transition duration-200">
					<a
						href="/explore"
						class="font-bold text-primary-100 p-2 px-3"
						class:text-white={$page.route.id == '/explore'}
					>
						<span class="hidden sm:block">Explore</span>
						<iconify-icon icon="mdi:magnify" class="block sm:hidden text-xl" />
					</a>
				</li>
				{#if !data.user}
					<li class="hover:bg-primary-600/50 rounded transition duration-200">
						<a
							href="/join"
							class="font-bold text-primary-100 p-2 px-3"
							class:text-white={$page.route.id == '/(auth)/join'}>Join</a
						>
					</li>
					<li class="hover:bg-primary-600/50 rounded transition duration-200">
						<a
							href="/login"
							class="font-bold text-primary-100 p-2 px-3"
							class:text-white={$page.route.id == '/(auth)/login'}>Login</a
						>
					</li>
				{:else}
					<li class="hover:bg-primary-600/50 rounded transition duration-200">
						<a
							href="/users/{data.user?.username}"
							class="font-bold text-primary-100 p-2 px-3"
							class:text-white={$page.route.id == `/users/[user]`}
						>
							<div class="avatar sm:mr-2">
								<div class="h-5 rounded-md">
									<img src="/users/{data.user?.username}/picture" alt="avatar" />
								</div>
							</div>
							<span class="hidden sm:block">{data.user?.username}</span>
						</a>
					</li>
					<li class="hover:bg-primary-600/50 rounded transition duration-200">
						<a
							href="/messages"
							class="font-bold text-primary-100 text-xl p-2 px-3"
							class:text-white={$page.route.id == '/messages'}
						>
							<div class="indicator">
								{#if messages && messages.length != 0}
									<span class="indicator-item badge badge-sm bg-red-500 rounded-md px-2 text-white"
										>{messages.length}</span
									>
								{/if}
								<iconify-icon icon="mdi:bell" />
							</div></a
						>
					</li>
					<li class="hover:bg-primary-600/50 rounded transition duration-200">
						<a
							href="/settings"
							class="font-bold text-primary-100 text-xl p-2 px-3"
							class:text-white={$page.route.id == '/settings'}><iconify-icon icon="mdi:cog" /></a
						>
					</li>
					<li class="hover:bg-primary-600/50 rounded transition duration-200">
						<form action="/logout" method="post">
							<button
								type="submit"
								class="flex justify-center font-bold text-primary-100 p-2 px-3 text-xl"
							>
								<iconify-icon icon="mdi:logout" />
							</button>
						</form>
					</li>
				{/if}
			</ul>
		</div>
	</nav>

	<div class="text-secondary-500 px-14 pt-[6.5rem] h-screen overflow-y-auto md:pt-16">
		<slot />
		{#if data?.user}
			<label
				for="modal"
				class="bg-primary-400 h-16 w-16 flex items-center justify-center rounded-full cursor-pointer fixed bottom-4 right-4 z-50"
			>
				<iconify-icon icon="mdi:plus" class="text-xl text-white" />
			</label>
			<input type="checkbox" id="modal" class="modal-toggle" checked={false} />
			<label for="modal" class="modal bg-black/50 duration-200 ease-in-out">
				<label
					class="modal-box relative transition duration-200 ease-in-out max-w-xl w-full"
					for=""
				>
					<div class="bg-primary-400 text-white p-2 rounded-t-xl font-bold flex items-center">
						<h1 class="flex-1">Make a post</h1>
						<label for="modal" class="text-xl cursor-pointer flex-0 flex justify-center">
							<iconify-icon icon="mdi:close" />
						</label>
					</div>
					<div class="bg-white text-secondary-500 p-2 rounded-b-xl">
						<form method="post">
							<TipTap />
							<div class="mt-2">
								<button
									type="submit"
									class="btn btn-sm h-9 bg-primary-400 text-white font-bold"
									formaction="/posts/new">Post</button
								>
								<label
									for="modal"
									class="btn btn-sm h-9 bg-white border-secondary-200 border-2 font-bold"
									>Cancel
								</label>
							</div>
						</form>
					</div>
				</label>
			</label>
		{/if}
	</div>
</div>
