import { Server } from 'hapi';
import { initUser } from './user/index';
import * as Path from 'path';

export class RHateMeServer {

	static run() {

		const server = new Server();

		server.connection({
			port: 8080,
			routes: {
				cors: true,
				files: {
					relativeTo: Path.join(__dirname, '../../angular')
				}
			}
		});

		server.register(require('inert')).then(() => {

			initUser(server);

			server.route({
				method: 'GET',
				path: '/{param*}',
				handler: {
					directory: {
						path: '.',
						redirectToSlash: true,
						index: true,
					}
				}
			});

			return server.start()
		}).then(() => {

			console.log('HE IS ALIVE! 🤖');
		}).catch(e => {

			console.log('Errror', e);
		});
	}
}