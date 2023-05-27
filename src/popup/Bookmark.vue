<template>
	<div>
		<!-- Mode: -->
		<select
			v-if="false"
			id="mode"
			onchange="selectMode(this)"
		>
			<option>prod</option>
			<option>dev</option>
		</select>

		<el-select
			ref="tags"
			v-model="category"
			placeholder="Tags..."
			filterable
			allow-create
			popper-class="select-dropdown"
			style="width: 100%;"
		>
			<el-option
				v-for="item in categories"
				:value="item.category"
				:key="item.category"
			>
			</el-option>
		</el-select>

		<br />

		<el-button
			type="primary"
			size="default"
			@click="saveBookmark"
		>Save Bookmark</el-button>

		<br/>{{message}}

		<!-- <button id="checkBookmarks">Check Bookmarks</button> -->
		<!-- <button id="devButton">Do It</button> -->
		<div
			id="message"
			style="color: green;"
		></div>

		<!-- <router-link to="/Login" class="nav-link">
             Login
          </router-link> -->
		<el-button
			type="info"
			size="default"
			@click="logout"
		>Logout</el-button>

		<!-- <Login /> -->
	</div>
</template>

<script>
import axios from 'axios'
import Login from './Login.vue'
import router from './router'
import BookmarkService from './services/bookmark.service'

export default {
	components: { Login },
	data() {
		return {
			msg: 'Welcome!',
			message: '',
			port: '',
			devMode: 1,
			categories: [],
			newCategory: '',
			category: '',
		}
	},
	mounted() {
		this.setMode()
		this.getTags()
	},
	methods: {
		getCurrentBookmark() {
			var self = this
			chrome.tabs.getSelected(null, function (tab) {
				var tablink = tab.url

				console.log('current tab is', tablink)

				var data = {
					Url: tablink,
					Category: self.newCategory || self.category,
				}

				BookmarkService.getOne(tablink).then(
					(response) => {
						var bookmark = response.data
						// .find((x) => x.url === tab.url)
						if (bookmark) {
							self.message = 'This is already bookmarked'
							self.category = bookmark.category
						}
					},
					(error) => {
						this.content =
							(error.response &&
								error.response.data &&
								error.response.data.message) ||
							error.message ||
							error.toString()
					}
				)

				// 		axios.get(
				// 			'https://localhost:' + self.port + '/api/bookmarks?url=' + encodeURIComponent(tab.url)
				// 		).then(function (bookmarks) {
				// 			var bookmark = bookmarks.data
				//   // .find((x) => x.url === tab.url)
				// 			if (bookmark) {
				// 				self.message = 'This is already bookmarked';
				// 				self.category = bookmark.category
				// 			}
				// 		})
				// debugger;
			})
		},
		getTags() {
			var self = this

			BookmarkService.getTags().then(
				(response) => {
					this.categories = response.data
					console.log('tags', this.bookmarks)
					self.getCurrentBookmark()
				},
				(error) => {
					console.log('tags response', error)
					if (error.toString().indexOf("Request failed with status code 401")){
						self.$router.push("/")
					}

					this.content =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				}
			)

			// 	axios.get('https://localhost:' + this.port + '/api/bookmark/tags').then((data) => {
			// 		// debugger;
			// console.log('got tags', data)
			// 		self.categories = data.data
			// 		// .map((x) => /*html*/ `<option>${x}</option>`)
			// 		// var optionsHtml =
			// 		// $('#category').html(optionsHtml)
			// 		self.getCurrentBookmark()
			// self.$refs.tags.focus();
			// 	})
		},
		logout() {
			this.$store.dispatch('auth/logout');
			router.push('/login')
		},
		saveBookmark() {
			// post("https://localhost:5000/api/bookmarks")
			var self = this
			chrome.tabs.getSelected(null, function (tab) {
				console.log('tab', tab)
				var tablink = tab.url
				var data = {
					url: tablink,
					category: self.newCategory || self.category,
					title: tab.title
				}

				BookmarkService.save(data).then(
					(response) => {
						window.close()
					},
					(error) => {
						console.log('saveBookmark response', error)
						this.content =
							(error.response &&
								error.response.data &&
								error.response.data.message) ||
							error.message ||
							error.toString()
					}
				)
				// axios
				// 	.post('https://localhost:' + self.port + '/api/bookmarks/save', data)
				// 	.then(() => window.close())

				// $.ajax({
				// 	type: 'POST',
				// 	//the url where you want to sent the userName and password to
				// 	url: 'https://localhost:' + port + '/api/bookmarks',
				// 	contentType: 'application/json',
				// 	async: true,
				// 	//json object to sent to the authentication url
				// 	data: JSON.stringify(data),
				// }).done(function () {
				// 	debugger
				// 	window.close()
				// 	//getTags()
				// })
				// debugger;
			})
		},
		setMode() {
			if (this.devMode) {
				this.port = '8080'
			} else {
				this.port = '5000'
			}
		},
	},
}
</script>

<style lang="css">
body {
	height: 224px;
}

.select-dropdown{
	max-height: 184px;
	overflow-y: auto;
	top: 28px !important;
	left: 1px !important;
}
</style>
