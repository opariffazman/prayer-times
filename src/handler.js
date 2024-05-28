// Import prayerTimes
import prayerTimes from './PrayTimes.js';

// Helper function to handle CORS
const handleCors = (response) => {
	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,OPTIONS');
	response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
	return response;
};

// Main request handler
export async function handleRequest(request) {
	const url = new URL(request.url);

	if (request.method === 'OPTIONS') {
		return handleCors(new Response(null, { status: 204 }));
	}

	if (url.pathname === '/api/today') {
		const params = url.searchParams;
		const latitude = parseFloat(params.get('latitude'));
		const longitude = parseFloat(params.get('longitude'));
		const timezone = parseInt(params.get('timezone'));
		const method = params.get('method');

		prayerTimes.setMethod(method);
		const times = prayerTimes.getTimes(new Date(), [latitude, longitude], timezone);

		let response = new Response(JSON.stringify(times), {
			headers: { 'Content-Type': 'application/json' },
		});

		return handleCors(response);
	} else {
		return new Response('no endpoint listening here :)', { status: 404 });
	}
}
