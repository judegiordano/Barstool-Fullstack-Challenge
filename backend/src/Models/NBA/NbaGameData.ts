import { Entity, OneToOne, OneToMany, Collection, wrap, Dictionary } from "@mikro-orm/core";

import { NbaOfficial } from "./NbaOfficial";
import { NbaTotal } from "./NbaTotal";
import { NbaStat } from "./NbaStat";
import { GameInfo } from "../Shared/GameInfo";

@Entity()
export class NbaGameData extends GameInfo {

	constructor(game?: Partial<NbaGameData>) {
		super();
		Object.assign(this, game);
	}

	@OneToMany(() => NbaOfficial, official => official.game, { eager: true, orphanRemoval: true })
	officials = new Collection<NbaOfficial>(this);

	@OneToMany(() => NbaStat, stat => stat.game, { eager: true, orphanRemoval: true })
	away_stats = new Collection<NbaStat>(this);

	@OneToMany(() => NbaStat, stat => stat.game, { eager: true, orphanRemoval: true })
	home_stats = new Collection<NbaStat>(this);

	@OneToOne({ owner: true, eager: true, orphanRemoval: true })
	away_totals: NbaTotal;

	@OneToOne({ owner: true, eager: true, orphanRemoval: true })
	home_totals: NbaTotal;

	toJSON(): Dictionary<NbaGameData> {
		return wrap(this).toObject();
	}
}
