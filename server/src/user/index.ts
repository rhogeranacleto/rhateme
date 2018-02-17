import { Server, RouteConfiguration } from 'hapi';
import { UserMiddleware } from './middleware';

export function initUser(server: Server) {

	const userRoutes: RouteConfiguration[] = [
		{
			method: 'GET',
			path: '/api/users',
			handler: UserMiddleware.getAll
		},
		{
			method: 'GET',
			path: '/api/user/{name}',
			handler: UserMiddleware.getOne
		},
		{
			method: 'PUT',
			path: '/api/user/{id}/note',
			handler: UserMiddleware.addNoteToUser
		},
		{
			method: 'POST',
			path: '/api/user/instagram/auth',
			handler: UserMiddleware.auth
		},
		{
			method: 'GET',
			path: '/api/user/{id}/note',
			handler: UserMiddleware.note
		}
	];

	server.route(userRoutes);
}