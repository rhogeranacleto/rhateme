import { Server } from 'hapi';
import { initUser } from './user/index';
import * as HapiBasicAuth from 'hapi-auth-basic';
import { Authenticate } from './Auth';

export class RHateMeServer {

	static run() {

		const server = new Server();

		server.connection({
			port: process.env.PORT || 8080,
			routes: {
				cors: true
			}
		});

		server.register(HapiBasicAuth, function (err) {

			if (err) {

				console.log('error', 'failed to install plugins')
				throw err
			}

			server.auth.strategy('simple', 'basic', {
				validateFunc: Authenticate
			});

			server.route({
				method: 'GET',
				path: '/',
				handler: function (request, reply) {

					reply('what you doing here?');
				}
			});

			initUser(server);

			return server.start().then(() => {

				console.log('HE IS ALIVE! 🤖');
			});
		});
	}
}