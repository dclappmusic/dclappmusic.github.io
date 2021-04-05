<template>
<div class="shows">
	<div v-for="(day, index) in shows_week" :key="index" class="dia">
		<div v-if="day[0]">
			<p class="when display-med">{{index === "0" ? "Hoy" : index === "1" ? "Mañana" : $moment(day[0].timestamp).format('dddd DD')}}</p>
			<ShowCard v-for="(show, subindex) in day" :key="subindex" 
				:show="show" 
				:type="'list'" 
				:from="'list'"
				:id="'show_' + show.show_id"
			/>
		</div>
	</div>
	<div v-if="other_shows[0]" class="dia">
		<p class="when display-med">Soon</p>
		<ShowCard class="list-soon" v-for="(show, index) in other_shows" :key="index" :show="show" :type="'list_soon'" :from="'list'" />
	</div>
    
	<!-- <button @click="show_showsubir = true" class="boton">subir show</button> -->
	<!-- <showSubir v-if="show_showsubir" @cerrar-form="show_showsubir = false" /> -->
</div>
</template>

<script>
import ShowCard from '@/components/ShowCard';
import { mapState } from 'vuex';

export default {
	name: 'agendaList',
	props:["shows"],
	components: {
		ShowCard
	},
	data() {
		return {
			shows_week: {},
			other_shows: [],
			shows_here: [],
			url_show_id: null
		}
	},
	computed: {
		...mapState([
			"city", "geolocation"
		])
	},
	watch: {
		shows() {
			this.shows_city();
		}
	},
	created() {
		this.url_show_id = this.getUrlParameter('showid');
	},
	mounted() {
		this.shows_city();
	},
	methods: {
		shows_city() {
			this.shows_here = [];
			this.shows.forEach(show => {
				// if (show.city === this.city) {
					this.shows_here.push(show);
				// }
			});
			if (this.url_show_id) {
				let show_highlighted = this.shows_here.find(show => show.show_id == this.url_show_id);
				console.log(show_highlighted);
				if (show_highlighted) {
					show_highlighted.highlight = true;
				}
			}
			this.filter_shows();
		},
		filter_shows() {
			// this.shows_here.sort((a, b) => this.$moment(a.timestamp).unix() - this.$moment(b.timestamp).unix());
			let today = this.$moment().hours(12).minutes(0).seconds(0).millisecond(0);
			let now = this.$moment();
			this.shows_week = {};

			this.shows_here.forEach(show => {
				if (show.timestamp) {
					var time = this.$moment(show.timestamp);
					var show_time = this.$moment().set({
						"year": time.year(), "month": time.month(), "date": time.date(),"hour": time.hour(), "minute": time.minute(), "second": 0, "millisecond": 0
					});
					var diff_days = show_time.diff(today, 'days');
					var diff_hours = time.diff(now, 'hours');
					var diff_minutes = time.diff(now, 'minutes');
					if (diff_days >= 0 && diff_days < 7) {
						show.diff_days = diff_days;
						show.diff_hours = diff_hours;
						// if (show.link && diff_hours > -1) {
						if (diff_hours > -1) {
							diff_minutes < 0 ? show.live = true : show.live = false;
							if (this.shows_week[diff_days]) {
								this.shows_week[diff_days].push(show);
							} else {
								this.shows_week[diff_days] = [show];
							}
						}
					} else if (diff_days > 6) {
						// if (show.link) {this.shows_week[diff_days].push(show);}
						if (show.link) {this.other_shows.push(show);}
					}
				}
			});
			for (let day in this.shows_week) {
				this.shows_week[day].sort((a, b) => this.$moment(a.timestamp).unix() - this.$moment(b.timestamp).unix());
			}
			this.other_shows.sort((a, b) => this.$moment(a.timestamp).unix() - this.$moment(b.timestamp).unix());
			if (this.url_show_id) {
				setTimeout(() => {
					let el = this.$el.querySelector('#show_' + this.url_show_id);
					el = el.previousSibling;
					el.scrollIntoView({block: "start", behavior: "smooth"});
					// container.scrollTop = el.offsetTop - 200;
				}, 500);
			}
		},
		getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(window.location.search.substring(1)),
				sURLVariables = sPageURL.split('&'),
				sParameterName,
				i;

			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');
				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
				}
			}
		}
	}
}
</script>
<style scoped lang="scss"> 
.shows {
	--color_titulo: var(--color-primario-fans);
	width: 100%;
	display: flex;
	flex-direction: column;
	// flex-wrap: wrap;
	// justify-content: center;
	.when {
		margin-top: 1em;
		color: var(--color-primario-fans);
		width: 100vw;
	}
	.dia > div {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		// justify-content: center;
	}
}
</style>
