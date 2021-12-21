export const categoriesConst = [
	'github-repo',
	'github-org',
	'article',
	'whitepaper',
	'awesome-list',
	'video',
	'course',
	'devtool'
] as const

export type Category = typeof categoriesConst[number]

export const conceptsConst = [
	'associated token account',
	'program derived address',
	'decentralized identity / did',
	'anchor',
	'spl token',
	'big table',
	'wallet',
	'nft',
	'solana name service',
	'staking',
	'lending / borrowing',
	'program deployment',
	'dao',
	'exchange',
	'sdk',
	'game',
	'token program',
	'system program',
	'rent',
	'transaction',
	'token swap program',
	'token program',
	'amm',
	'proof of history',
	'phantom',
	'program development',
	'full-stack solana development',
	'dapp',
	'solana runtime',
	'cross-program invocations',
	'program signed accounts'
] as const

export type Concept = typeof conceptsConst[number]
