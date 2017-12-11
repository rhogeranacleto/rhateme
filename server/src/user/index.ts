import { Server, RouteConfiguration } from 'hapi';
import { UserMiddleware } from './middleware';

export function initUser(server: Server) {

	const userRoutes: RouteConfiguration[] = [
		{
			method: 'GET',
			path: '/users',
			handler: UserMiddleware.getAll
		}
	];

	server.route(userRoutes);
}