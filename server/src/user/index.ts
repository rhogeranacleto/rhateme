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
		},
		{
			method: 'PUT',
			path: '/user/{id}/note',
			handler: UserMiddleware.addNoteToUser
		},
		{
			method: 'POST',
			path: '/user/instagram/auth',
			handler: UserMiddleware.auth
		},
		{
			method: 'GET',
			path: '/user/{id}/note',
			handler: UserMiddleware.note
		}
	];

	server.route(userRoutes);
}