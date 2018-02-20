import { Server, RouteConfiguration } from 'hapi';
import { UserMiddleware } from './middleware';

export function initUser(server: Server) {

	const userRoutes: RouteConfiguration[] = [
		{
			method: 'GET',
			path: '/users',
			config: {
				handler: UserMiddleware.getAll
			}
		},
		{
			method: 'GET',
			path: '/user/{name}',
			config: {
				handler: UserMiddleware.getOne
			}
		},
		{
			method: 'PUT',
			path: '/user/{id}/note',
			config: {
				handler: UserMiddleware.addNoteToUser,
				auth: 'simple'
			}
		},
		{
			method: 'POST',
			path: '/user/instagram/auth',
			config: {
				handler: UserMiddleware.auth,
				auth: false
			}
		},
		{
			method: 'GET',
			path: '/user/{id}/note',
			handler: UserMiddleware.note
		}
	];

	server.route(userRoutes);
}