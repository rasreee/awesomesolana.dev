export class CommonStore {
	appLoading = true

	constructor() {
		makeAutoObservable(this)
	}

	resetStore = () => {
		this.appLoading = true
	}

	setAppLoading(state: boolean) {
		this.appLoading = state
	}
}

