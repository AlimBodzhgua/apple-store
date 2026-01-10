import { headers } from 'next/headers';
import { auth } from '@/shared/lib/auth';

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	console.log(session);

	return (
		<main>
			<h1>Next apple store</h1>
		</main>
	);
}
