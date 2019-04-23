declare module "TVID_Season" {

	export interface Crew {
		id: number;
		credit_id: string;
		name: string;
		department: string;
		job: string;
		profile_path: string;
	}

	export interface GuestStar {
		id: number;
		name: string;
		credit_id: string;
		character: string;
		order: number;
		profile_path: string;
	}

	export interface Episode {
		air_date: string;
		crew: Crew[];
		episode_number: number;
		guest_stars: GuestStar[];
		name: string;
		overview: string;
		id: number;
		production_code: string;
		season_number: number;
		still_path: string;
		vote_average: number;
		vote_count: number;
	}

	export interface RootObject {
		_id: string;
		air_date: string;
		episodes: Episode[];
		name: string;
		overview: string;
		id: number;
		poster_path: string;
		season_number: number;
	}

}

declare module "SeriesList" {

	export interface Result {
		poster_path: string;
		popularity: number;
		id: number;
		backdrop_path: string;
		vote_average: number;
		overview: string;
		first_air_date: string;
		origin_country: string[];
		genre_ids: number[];
		original_language: string;
		vote_count: number;
		name: string;
		original_name: string;
	}

	export interface RootObject {
		page: number;
		results: Result[];
		total_results: number;
		total_pages: number;
	}

}

declare module "TVID" {

	export interface CreatedBy {
		id: number;
		credit_id: string;
		name: string;
		gender: number;
		profile_path: string;
	}

	export interface Genre {
		id: number;
		name: string;
	}

	export interface LastEpisodeToAir {
		air_date: string;
		episode_number: number;
		id: number;
		name: string;
		overview: string;
		production_code: string;
		season_number: number;
		show_id: number;
		still_path: string;
		vote_average: number;
		vote_count: number;
	}

	export interface Network {
		name: string;
		id: number;
		logo_path: string;
		origin_country: string;
	}

	export interface ProductionCompany {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}

	export interface Season {
		air_date: string;
		episode_count: number;
		id: number;
		name: string;
		overview: string;
		poster_path: string;
		season_number: number;
	}

	export interface RootObject {
		backdrop_path: string;
		created_by: CreatedBy[];
		episode_run_time: number[];
		first_air_date: string;
		genres: Genre[];
		homepage: string;
		id: number;
		in_production: boolean;
		languages: string[];
		last_air_date: string;
		last_episode_to_air: LastEpisodeToAir;
		name: string;
		next_episode_to_air?: any;
		networks: Network[];
		number_of_episodes: number;
		number_of_seasons: number;
		origin_country: string[];
		original_language: string;
		original_name: string;
		overview: string;
		popularity: number;
		poster_path: string;
		production_companies: ProductionCompany[];
		seasons: Season[];
		status: string;
		type: string;
		vote_average: number;
		vote_count: number;
	}

}

