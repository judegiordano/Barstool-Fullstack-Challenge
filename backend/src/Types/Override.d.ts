/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance, FastifyRequest } from "fastify";

declare module "fastify" {
	export interface FastifyInstance {
		developer(): void;
		client(): void;
	}
}

interface IQuery {
	limit: number
}
interface IParams {
	page: number,
	id: number,
	uid: string
}
export interface ReuqestInstance extends FastifyRequest {
	Querystring: IQuery,
	Params: IParams
}