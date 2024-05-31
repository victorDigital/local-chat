<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { Bot, CornerDownLeft, User } from 'lucide-svelte/icons';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Card from '$lib/components/ui/card';
	import SvelteMarkdown from 'svelte-markdown';
	import CodeBlockRenderer from '$lib/extras/CodeBlockRenderer.svelte';

	const { input, handleSubmit, messages, isLoading } = useChat();
</script>

<main class="container mx-auto flex flex-col gap-4 pb-80 pt-4">
	{#each $messages as message, i}
		<Card.Root>
			{#if message.role === 'user'}
				<Card.Title>
					<div class="flex items-center justify-start gap-2 p-6">
						<User />
						{message.role}
					</div>
				</Card.Title>
				<Card.Content>
					<p>{message.content}</p>
				</Card.Content>
			{:else}
				<Card.Title>
					<div class="flex items-center justify-start gap-2 p-6">
						<Bot />
						{message.role}
					</div>
				</Card.Title>
				<Card.Content class="prose prose-zinc dark:prose-invert prose max-w-full">
					<SvelteMarkdown source={message.content} renderers={{ code: CodeBlockRenderer }} />
				</Card.Content>
			{/if}
		</Card.Root>
	{/each}
</main>

<form
	class="fixed bottom-0 m-4 w-[calc(100%-2rem)] overflow-hidden rounded-2xl border bg-background focus-within:ring-0 focus-visible:ring-0"
	on:submit={handleSubmit}
>
	<Label for="message" class="sr-only">Message</Label>
	<Textarea
		id="message"
		placeholder="Type your message here..."
		class="min-h-12 resize-none rounded-b-none border-0 p-3 shadow-none  focus-visible:ring-0"
		bind:value={$input}
	/>
	<div class="flex items-center p-3 pt-0">
		<Button type="submit" size="sm" class="ml-auto gap-1.5">
			Send Message
			<CornerDownLeft class="size-3.5" />
		</Button>
	</div>
</form>
