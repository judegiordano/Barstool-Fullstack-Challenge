import { Migration } from '@mikro-orm/migrations';

export class Migration20210822180333 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "team_info" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "team_id" varchar(255) not null, "abbreviation" varchar(255) not null, "active" bool not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "conference" varchar(255) not null, "division" varchar(255) not null, "site_name" varchar(255) not null, "city" varchar(255) not null, "state" varchar(255) not null, "full_name" varchar(255) not null);');
    this.addSql('create index "team_info_uid_index" on "team_info" ("uid");');

    this.addSql('create table "site_info" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "capacity" int4 not null, "surface" varchar(255) not null, "name" varchar(255) not null, "state" varchar(255) not null, "city" varchar(255) not null);');
    this.addSql('create index "site_info_uid_index" on "site_info" ("uid");');

    this.addSql('create table "event_info" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "site_id" int4 not null, "temperature" int4 not null, "attendance" int4 not null, "duration" varchar(255) not null, "status" varchar(255) not null, "season_type" varchar(255) not null, "start_date_time" timestamptz(0) not null);');
    this.addSql('create index "event_info_uid_index" on "event_info" ("uid");');
    this.addSql('alter table "event_info" add constraint "event_info_site_id_unique" unique ("site_id");');

    this.addSql('create table "nba_total" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "minutes" int4 not null, "points" int4 not null, "assists" int4 not null, "turnovers" int4 not null, "steals" int4 not null, "blocks" int4 not null, "field_goals_attempted" int4 not null, "field_goals_made" int4 not null, "three_point_field_goals_attempted" int4 not null, "three_point_field_goals_made" int4 not null, "free_throws_attempted" int4 not null, "free_throws_made" int4 not null, "defensive_rebounds" int4 not null, "offensive_rebounds" int4 not null, "personal_fouls" int4 not null, "field_goal_percentage" int4 not null, "three_point_percentage" int4 not null, "free_throw_percentage" int4 not null);');
    this.addSql('create index "nba_total_uid_index" on "nba_total" ("uid");');

    this.addSql('create table "nba_game_data" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "league" varchar(255) not null, "away_period_scores" text[] not null, "home_period_scores" text[] not null, "away_team_id" int4 not null, "home_team_id" int4 not null, "event_information_id" int4 not null, "away_totals_id" int4 not null, "home_totals_id" int4 not null);');
    this.addSql('create index "nba_game_data_uid_index" on "nba_game_data" ("uid");');
    this.addSql('alter table "nba_game_data" add constraint "nba_game_data_away_team_id_unique" unique ("away_team_id");');
    this.addSql('alter table "nba_game_data" add constraint "nba_game_data_home_team_id_unique" unique ("home_team_id");');
    this.addSql('alter table "nba_game_data" add constraint "nba_game_data_event_information_id_unique" unique ("event_information_id");');
    this.addSql('alter table "nba_game_data" add constraint "nba_game_data_away_totals_id_unique" unique ("away_totals_id");');
    this.addSql('alter table "nba_game_data" add constraint "nba_game_data_home_totals_id_unique" unique ("home_totals_id");');

    this.addSql('create table "nba_official" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "game_id" int4 not null, "position" varchar(255) null, "first_name" varchar(255) not null, "last_name" varchar(255) not null);');
    this.addSql('create index "nba_official_uid_index" on "nba_official" ("uid");');

    this.addSql('create table "nba_stat" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "game_id" int4 not null, "last_name" varchar(255) not null, "first_name" varchar(255) not null, "display_name" varchar(255) not null, "position" varchar(255) not null, "minutes" int4 not null, "points" int4 not null, "assists" int4 not null, "turnovers" int4 not null, "steals" int4 not null, "blocks" int4 not null, "field_goals_attempted" int4 not null, "field_goals_made" int4 not null, "three_point_field_goals_attempted" int4 not null, "three_point_field_goals_made" int4 not null, "free_throws_attempted" int4 not null, "free_throws_made" int4 not null, "defensive_rebounds" int4 not null, "offensive_rebounds" int4 not null, "personal_fouls" int4 not null, "team_abbreviation" varchar(255) not null, "is_starter" bool not null, "field_goal_percentage" int4 not null, "three_point_percentage" int4 not null, "free_throw_percentage" int4 not null);');
    this.addSql('create index "nba_stat_uid_index" on "nba_stat" ("uid");');

    this.addSql('create table "mlb_batter_total" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "sacrifices" int4 not null, "at_bats" int4 not null, "plate_appearances" int4 not null, "singles" int4 not null, "doubles" int4 not null, "triples" int4 not null, "home_runs" int4 not null, "sac_flies" int4 not null, "sac_hits" int4 not null, "stolen_bases" int4 not null, "caught_stealing" int4 not null, "rbi_with_two_outs" int4 not null, "total_bases" int4 not null, "runs" int4 not null, "hits" int4 not null, "rbi" int4 not null, "walks" int4 not null, "strike_outs" int4 not null, "left_on_base" int4 not null, "hit_by_pitch" int4 not null, "ops" int4 not null, "avg" int4 not null, "obp" int4 not null, "slg" int4 not null, "at_bats_per_home_run" int4 not null, "at_bats_per_rbi" int4 not null, "walk_rate" int4 not null, "plate_appearances_per_rbi" int4 not null, "plate_appearances_per_home_run" int4 not null, "extra_base_hits" int4 not null, "stolen_base_average" int4 not null, "strikeout_rate" int4 not null, "ops_string" varchar(255) not null, "slg_string" varchar(255) not null, "obp_string" varchar(255) not null, "avg_string" varchar(255) not null, "batting_highlights" varchar(255) not null);');
    this.addSql('create index "mlb_batter_total_uid_index" on "mlb_batter_total" ("uid");');

    this.addSql('create table "mlb_game_data" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "league" varchar(255) not null, "away_period_scores" text[] not null, "home_period_scores" text[] not null, "away_team_id" int4 not null, "home_team_id" int4 not null, "event_information_id" int4 not null, "away_errors" int4 not null, "home_errors" int4 not null, "away_batter_totals_id" int4 not null, "home_batter_totals_id" int4 not null);');
    this.addSql('create index "mlb_game_data_uid_index" on "mlb_game_data" ("uid");');
    this.addSql('alter table "mlb_game_data" add constraint "mlb_game_data_away_team_id_unique" unique ("away_team_id");');
    this.addSql('alter table "mlb_game_data" add constraint "mlb_game_data_home_team_id_unique" unique ("home_team_id");');
    this.addSql('alter table "mlb_game_data" add constraint "mlb_game_data_event_information_id_unique" unique ("event_information_id");');
    this.addSql('alter table "mlb_game_data" add constraint "mlb_game_data_away_batter_totals_id_unique" unique ("away_batter_totals_id");');
    this.addSql('alter table "mlb_game_data" add constraint "mlb_game_data_home_batter_totals_id_unique" unique ("home_batter_totals_id");');

    this.addSql('create table "mlb_fielder" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "game_id" int4 not null, "last_name" varchar(255) not null, "first_name" varchar(255) not null, "display_name" varchar(255) not null, "errors" int4 not null, "team_abbreviation" varchar(255) not null);');
    this.addSql('create index "mlb_fielder_uid_index" on "mlb_fielder" ("uid");');

    this.addSql('create table "mlb_official" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "game_id" int4 not null, "position" varchar(255) null, "first_name" varchar(255) not null, "last_name" varchar(255) not null);');
    this.addSql('create index "mlb_official_uid_index" on "mlb_official" ("uid");');

    this.addSql('create table "mlb_pitcher" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "game_id" int4 not null, "last_name" varchar(255) not null, "first_name" varchar(255) not null, "display_name" varchar(255) not null, "pitch_order" int4 not null, "win" bool not null, "loss" bool not null, "save" bool not null, "hold" bool not null, "era" int4 not null, "whip" int4 not null, "innings_pitched" int4 not null, "hits_allowed" int4 not null, "runs_allowed" int4 not null, "earned_runs" int4 not null, "walks" int4 not null, "intentional_walks" int4 not null, "strike_outs" int4 not null, "home_runs_allowed" int4 not null, "pitch_count" int4 not null, "pitches_strikes" int4 not null, "wild_pitches" int4 not null, "hit_by_pitch" int4 not null, "errors" int4 not null, "team_abbreviation" varchar(255) not null);');
    this.addSql('create index "mlb_pitcher_uid_index" on "mlb_pitcher" ("uid");');

    this.addSql('create table "mlb_batter" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "game_id" int4 not null, "last_name" varchar(255) not null, "first_name" varchar(255) not null, "display_name" varchar(255) not null, "position" varchar(255) not null, "bat_order" int4 not null, "sub_bat_order" int4 not null, "sacrifices" int4 not null, "at_bats" int4 not null, "plate_appearances" int4 not null, "singles" int4 not null, "doubles" int4 not null, "triples" int4 not null, "home_runs" int4 not null, "sac_flies" int4 not null, "sac_hits" int4 not null, "stolen_bases" int4 not null, "caught_stealing" int4 not null, "rbi_with_two_outs" int4 not null, "total_bases" int4 not null, "runs" int4 not null, "hits" int4 not null, "rbi" int4 not null, "walks" int4 not null, "strike_outs" int4 not null, "left_on_base" int4 not null, "hit_by_pitch" int4 not null, "team_abbreviation" varchar(255) not null, "ops" int4 not null, "avg" int4 not null, "obp" int4 not null, "slg" int4 not null, "at_bats_per_home_run" int4 not null, "at_bats_per_rbi" int4 not null, "walk_rate" int4 not null, "plate_appearances_per_rbi" int4 not null, "plate_appearances_per_home_run" int4 not null, "extra_base_hits" int4 not null, "stolen_base_average" int4 not null, "strikeout_rate" int4 not null, "ops_string" varchar(255) not null, "slg_string" varchar(255) not null, "obp_string" varchar(255) not null, "avg_string" varchar(255) not null, "batting_highlights" varchar(255) not null);');
    this.addSql('create index "mlb_batter_uid_index" on "mlb_batter" ("uid");');

    this.addSql('alter table "event_info" add constraint "event_info_site_id_foreign" foreign key ("site_id") references "site_info" ("id") on update cascade;');

    this.addSql('alter table "nba_game_data" add constraint "nba_game_data_away_team_id_foreign" foreign key ("away_team_id") references "team_info" ("id") on update cascade;');
    this.addSql('alter table "nba_game_data" add constraint "nba_game_data_home_team_id_foreign" foreign key ("home_team_id") references "team_info" ("id") on update cascade;');
    this.addSql('alter table "nba_game_data" add constraint "nba_game_data_event_information_id_foreign" foreign key ("event_information_id") references "event_info" ("id") on update cascade;');
    this.addSql('alter table "nba_game_data" add constraint "nba_game_data_away_totals_id_foreign" foreign key ("away_totals_id") references "nba_total" ("id") on update cascade;');
    this.addSql('alter table "nba_game_data" add constraint "nba_game_data_home_totals_id_foreign" foreign key ("home_totals_id") references "nba_total" ("id") on update cascade;');

    this.addSql('alter table "nba_official" add constraint "nba_official_game_id_foreign" foreign key ("game_id") references "nba_game_data" ("id") on update cascade;');

    this.addSql('alter table "nba_stat" add constraint "nba_stat_game_id_foreign" foreign key ("game_id") references "nba_game_data" ("id") on update cascade;');

    this.addSql('alter table "mlb_game_data" add constraint "mlb_game_data_away_team_id_foreign" foreign key ("away_team_id") references "team_info" ("id") on update cascade;');
    this.addSql('alter table "mlb_game_data" add constraint "mlb_game_data_home_team_id_foreign" foreign key ("home_team_id") references "team_info" ("id") on update cascade;');
    this.addSql('alter table "mlb_game_data" add constraint "mlb_game_data_event_information_id_foreign" foreign key ("event_information_id") references "event_info" ("id") on update cascade;');
    this.addSql('alter table "mlb_game_data" add constraint "mlb_game_data_away_batter_totals_id_foreign" foreign key ("away_batter_totals_id") references "mlb_batter_total" ("id") on update cascade;');
    this.addSql('alter table "mlb_game_data" add constraint "mlb_game_data_home_batter_totals_id_foreign" foreign key ("home_batter_totals_id") references "mlb_batter_total" ("id") on update cascade;');

    this.addSql('alter table "mlb_fielder" add constraint "mlb_fielder_game_id_foreign" foreign key ("game_id") references "mlb_game_data" ("id") on update cascade;');

    this.addSql('alter table "mlb_official" add constraint "mlb_official_game_id_foreign" foreign key ("game_id") references "mlb_game_data" ("id") on update cascade;');

    this.addSql('alter table "mlb_pitcher" add constraint "mlb_pitcher_game_id_foreign" foreign key ("game_id") references "mlb_game_data" ("id") on update cascade;');

    this.addSql('alter table "mlb_batter" add constraint "mlb_batter_game_id_foreign" foreign key ("game_id") references "mlb_game_data" ("id") on update cascade;');
  }

}
