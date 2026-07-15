import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import adapterNode from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Cloudflare Workers is the default deploy target; the Docker image
		// (see Dockerfile) builds with DEPLOY_TARGET=node to get a standalone
		// Node server in build/.
		adapter: process.env.DEPLOY_TARGET === 'node' ? adapterNode() : adapterCloudflare()
	}
};

export default config;
