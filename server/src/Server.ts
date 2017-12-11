import { Server } from 'hapi';
import { initUser } from './user/index';

export class RHateMeServer {

	static run() {

		const server = new Server();

		server.connection({
			port: 8080,
			routes: {
				cors: true
			}
		});

		server.route({
			method: 'GET',
			path: '/',
			handler: function (request, reply) {

				reply('Olar');
			}
		});

		initUser(server);

		return server.start().then(() => {

			console.log('HE IS ALIVE! 🤖');
		});
	}
}