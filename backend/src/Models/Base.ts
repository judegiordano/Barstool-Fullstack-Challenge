import { classToPlain, Exclude } from "class-transformer";
import { PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Base extends BaseEntity {

	// @Exclude()
	@PrimaryGeneratedColumn()
	id: number;

	@Exclude()
	@CreateDateColumn()
	createdAt: Date;

	@Exclude()
	@UpdateDateColumn()
	updatedAt: Date;

	toJSON(): Record<string, unknown> {
		return classToPlain(this);
	}
}
