/* eslint-disable @typescript-eslint/no-unused-vars */
import { IDatabaseDriver, Connection, EntityManager, EntityRepository } from "@mikro-orm/core";
import { FastifyInstance, FastifyRequest } from "fastify";

declare module "fastify" {
	export interface FastifyInstance {
		developer(): void;
		client(): void;
	}

	export interface FastifyRequest {
		em: EntityManager<IDatabaseDriver<Connection>>
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