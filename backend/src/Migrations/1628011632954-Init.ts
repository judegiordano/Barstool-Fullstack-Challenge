import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1628011632954 implements MigrationInterface {
    name = 'Init1628011632954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nba_team_info" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "team_id" character varying NOT NULL, "abbreviation" character varying NOT NULL, "active" boolean NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "conference" character varying NOT NULL, "division" character varying NOT NULL, "site_name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "full_name" character varying NOT NULL, CONSTRAINT "PK_fba718ecf866ffdcb27f215e79e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nba_officials" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "position" character varying, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "gameId" integer, CONSTRAINT "PK_0ff5d2d9bd3b4db5e9b730cd347" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nba_stat_info" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "minutes" integer NOT NULL, "points" integer NOT NULL, "assists" integer NOT NULL, "turnovers" integer NOT NULL, "steals" integer NOT NULL, "blocks" integer NOT NULL, "field_goals_attempted" integer NOT NULL, "field_goals_made" integer NOT NULL, "three_point_field_goals_attempted" integer NOT NULL, "three_point_field_goals_made" integer NOT NULL, "free_throws_attempted" integer NOT NULL, "free_throws_made" integer NOT NULL, "defensive_rebounds" integer NOT NULL, "offensive_rebounds" integer NOT NULL, "personal_fouls" integer NOT NULL, "field_goal_percentage" numeric NOT NULL, "three_point_percentage" numeric NOT NULL, "free_throw_percentage" numeric NOT NULL, CONSTRAINT "PK_012a0938153b1aefd5fa8e35406" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nba_player_stat" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "last_name" character varying NOT NULL, "first_name" character varying NOT NULL, "display_name" character varying NOT NULL, "position" character varying NOT NULL, "minutes" integer NOT NULL, "points" integer NOT NULL, "assists" integer NOT NULL, "turnovers" integer NOT NULL, "steals" integer NOT NULL, "blocks" integer NOT NULL, "field_goals_attempted" integer NOT NULL, "field_goals_made" integer NOT NULL, "three_point_field_goals_attempted" integer NOT NULL, "three_point_field_goals_made" integer NOT NULL, "free_throws_attempted" integer NOT NULL, "free_throws_made" integer NOT NULL, "defensive_rebounds" integer NOT NULL, "offensive_rebounds" integer NOT NULL, "personal_fouls" integer NOT NULL, "team_abbreviation" character varying NOT NULL, "is_starter" boolean NOT NULL, "field_goal_percentage" numeric NOT NULL, "three_point_percentage" numeric NOT NULL, "free_throw_percentage" numeric NOT NULL, "gameId" integer, CONSTRAINT "PK_b22c2838069955e9a519a2e5735" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nba_game_data" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "league" character varying NOT NULL, "away_period_scores" integer array NOT NULL, "home_period_scores" integer array NOT NULL, "awayTeamId" integer, "homeTeamId" integer, "eventInformationId" integer, "awayTotalsId" integer, "homeTotalsId" integer, CONSTRAINT "REL_0bca3948c43ca352b851484362" UNIQUE ("awayTeamId"), CONSTRAINT "REL_11f32f31a7a2acdad314d12844" UNIQUE ("homeTeamId"), CONSTRAINT "REL_503a10abe4d010bf9bb3af1d31" UNIQUE ("eventInformationId"), CONSTRAINT "REL_c30299aaba4d2cfc34fb573a41" UNIQUE ("awayTotalsId"), CONSTRAINT "REL_776d0a94af2fef001cf002a15e" UNIQUE ("homeTotalsId"), CONSTRAINT "PK_fd45474e9325eaec77db651c8fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nba_site_info" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "capacity" integer NOT NULL, "surface" character varying NOT NULL, "name" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, CONSTRAINT "PK_18c99022ee12a8a951f5efad970" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nba_event_info" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "temperature" integer NOT NULL, "attendance" integer NOT NULL, "duration" character varying NOT NULL, "status" character varying NOT NULL, "season_type" character varying NOT NULL, "start_date_time" TIMESTAMP NOT NULL, "siteId" integer, CONSTRAINT "REL_2d32d485a7db2a42ff2add9c69" UNIQUE ("siteId"), CONSTRAINT "PK_8851a6f34ce40632fd4ea3b07e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "nba_officials" ADD CONSTRAINT "FK_2c9ca19a7583872269a3fdc4f90" FOREIGN KEY ("gameId") REFERENCES "nba_game_data"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nba_player_stat" ADD CONSTRAINT "FK_075e30d63f18a20420b8182dfcf" FOREIGN KEY ("gameId") REFERENCES "nba_game_data"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nba_game_data" ADD CONSTRAINT "FK_0bca3948c43ca352b851484362f" FOREIGN KEY ("awayTeamId") REFERENCES "nba_team_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nba_game_data" ADD CONSTRAINT "FK_11f32f31a7a2acdad314d128443" FOREIGN KEY ("homeTeamId") REFERENCES "nba_team_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nba_game_data" ADD CONSTRAINT "FK_503a10abe4d010bf9bb3af1d31b" FOREIGN KEY ("eventInformationId") REFERENCES "nba_event_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nba_game_data" ADD CONSTRAINT "FK_c30299aaba4d2cfc34fb573a416" FOREIGN KEY ("awayTotalsId") REFERENCES "nba_stat_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nba_game_data" ADD CONSTRAINT "FK_776d0a94af2fef001cf002a15e2" FOREIGN KEY ("homeTotalsId") REFERENCES "nba_stat_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nba_event_info" ADD CONSTRAINT "FK_2d32d485a7db2a42ff2add9c691" FOREIGN KEY ("siteId") REFERENCES "nba_site_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "nba_event_info" DROP CONSTRAINT "FK_2d32d485a7db2a42ff2add9c691"`);
        await queryRunner.query(`ALTER TABLE "nba_game_data" DROP CONSTRAINT "FK_776d0a94af2fef001cf002a15e2"`);
        await queryRunner.query(`ALTER TABLE "nba_game_data" DROP CONSTRAINT "FK_c30299aaba4d2cfc34fb573a416"`);
        await queryRunner.query(`ALTER TABLE "nba_game_data" DROP CONSTRAINT "FK_503a10abe4d010bf9bb3af1d31b"`);
        await queryRunner.query(`ALTER TABLE "nba_game_data" DROP CONSTRAINT "FK_11f32f31a7a2acdad314d128443"`);
        await queryRunner.query(`ALTER TABLE "nba_game_data" DROP CONSTRAINT "FK_0bca3948c43ca352b851484362f"`);
        await queryRunner.query(`ALTER TABLE "nba_player_stat" DROP CONSTRAINT "FK_075e30d63f18a20420b8182dfcf"`);
        await queryRunner.query(`ALTER TABLE "nba_officials" DROP CONSTRAINT "FK_2c9ca19a7583872269a3fdc4f90"`);
        await queryRunner.query(`DROP TABLE "nba_event_info"`);
        await queryRunner.query(`DROP TABLE "nba_site_info"`);
        await queryRunner.query(`DROP TABLE "nba_game_data"`);
        await queryRunner.query(`DROP TABLE "nba_player_stat"`);
        await queryRunner.query(`DROP TABLE "nba_stat_info"`);
        await queryRunner.query(`DROP TABLE "nba_officials"`);
        await queryRunner.query(`DROP TABLE "nba_team_info"`);
    }

}
