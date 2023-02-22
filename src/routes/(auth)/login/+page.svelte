<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	// import type { PageData } from './$types';

	// export let data: PageData;
</script>

<main class="hero h-full">
	<div
		class="hero-content bg-gray-50 border-gray-100 border-2 max-w-lg w-full p-8 rounded-xl form-control"
	>
		<div class="text-center">
			<img src="/images/brand-invert.png" alt="logo" class="h-10 mx-auto" />
			<h1 class="text-2xl font-bold my-2 text-black">Login</h1>
			<p class="my-2">
				Or
				<a href="/join" class="link text-primary-400 font-bold">create a new account.</a>
			</p>
		</div>
		<form
			method="POST"
			class="w-full"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'failure' || result.type === 'error') {
						await applyAction(result);
					} else {
						await update();
					}
				};
			}}
		>
			<div class="form-control">
				<label for="username" class="label"
					><span class="label-text text-secondary-600 text-sm">Username</span></label
				>
				<input
					name="username"
					class="input input-sm py-2 border-2 rounded-md my-1 h-9"
					type="text"
				/>
			</div>
			<div class="form-control">
				<label for="password" class="label"
					><span class="label-text text-secondary-600 text-sm">Password</span></label
				>
				<input
					name="password"
					class="input input-sm py-2 border-2 rounded-md my-1 h-9"
					type="password"
				/>
			</div>
			<button
				type="submit"
				class="btn btn-sm btn-block h-9 bg-primary-400 text-white mt-2 font-bold">Login</button
			>
		</form>
		<!-- TODO: Add Github OAuth2 -->
	</div>
</main>
