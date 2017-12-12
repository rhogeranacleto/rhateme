import { Server, RouteConfiguration } from 'hapi';
import { UserMiddleware } from './middleware';

export function initUser(server: Server) {

	const userRoutes: RouteConfiguration[] = [
		{
			method: 'GET',
			path: '/users',
			handler: UserMiddleware.getAll
		},
		{
			method: 'GET',
			path: '/user/{name}',
			handler: UserMiddleware.getOne
		}
	];

	server.route(userRoutes);
}