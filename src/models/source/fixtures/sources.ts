import { Source } from '../Source'

const _sourcesFixture: Source[] = [
	{
		title: 'Banksea',
		tags: ['lending', 'nft', 'solana'],
		url: 'https://github.com/Banksea-Finance/',
		description: 'pool-based lending collateralized with a user’s NFT collection',
		type: 'github-repo',
		id: 'b4e59f67-61f6-45a4-aa0f-8d0c1be439dd',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'Genopets',
		tags: ['game', 'nft', 'solana'],
		url: 'https://github.com/Genopets/ignition-hackathon',
		description: 'NFT game on Solana for active lifestyles',
		type: 'github-repo',
		id: '0fbf7eb9-42a5-474c-aea3-f7338ff80c9d',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'mango-service-v3',
		tags: ['solana'],
		url: 'https://github.com/microwavedcola1/mango-v3-service',
		description: 'pool-based lending collateralized with a user’s NFT collection',
		type: 'github-repo',
		id: 'a6492a50-d563-4ae7-b82a-3e20e7cc9345',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'Superposition',
		tags: ['solana'],
		url: 'https://github.com/superposition-finance',
		description: 'a decentralized fixed income protocol.',
		type: 'github-repo',
		id: 'd39677c0-3fb2-400e-8745-1db2d244db1b',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'Madpacks',
		tags: ['anchor', 'solana'],
		url: 'https://github.com/nateshirley/madpacks',
		description: 'Friend-group primitive on Solana. Look in a wallet and find all of its friends.',
		type: 'github-repo',
		id: '26283713-16ca-46c2-af6f-ab7c2c0da51e',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'Solone SDK',
		tags: ['sdk', 'solana'],
		url: 'https://github.com/solone-io/Solone-SDK',
		description: 'Rapidly develop dApps for Solana',
		type: 'github-repo',
		id: '997f59b3-28f0-4486-97b5-772402ce333e',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'Cryptid',
		tags: ['did', 'solana'],
		url: 'https://github.com/identity-com/cryptid',
		description: 'Cryptid is a protocol and client-suite that brings the power of Identity to Solana.',
		type: 'github-repo',
		id: 'e57aa435-051a-4a6b-bd7a-b468df011cd0',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'StreamFlow',
		tags: ['anchor', 'solana'],
		url: 'https://github.com/streamflow-finance',
		description: 'https://devpost.com/software/streamflow-finance',
		type: 'github-repo',
		id: 'efa320d6-d781-4437-80c4-88abb7107e21',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'MeanDAO',
		tags: ['dao', 'solana'],
		url: 'https://github.com/mean-dao',
		description: 'A DeFi Protocol Powering Everyday Banking Workflows on Solana',
		type: 'github-repo',
		id: '530a0478-c5bd-4caa-87fb-1f9cb075ca2e',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'BuyMeCrypto',
		tags: ['solana'],
		url: 'https://github.com/baymac/buy-me-crypto',
		description: 'Buy me a coffee but crypto',
		type: 'github-repo',
		id: 'e7e04c2a-27a7-485a-8f72-4e799e25256d',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'eno',
		tags: ['solana'],
		url: 'https://github.com/shellrox/eno_demo_backend',
		description:
			'A content publishing protocol that enables creators to monetize each consumption and turns content into a traceable bearer asset existing in a decentralized environment.',
		type: 'github-repo',
		id: 'b6de072b-dd3a-407e-b8ab-83bce6736887',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'Tsunami',
		tags: ['nft', 'solana', 'metaplex'],
		url: 'https://github.com/tsunamiprotocol',
		description: '',
		type: 'github-repo',
		id: '04243ce9-e129-4595-b271-0ac34b84ed67',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'mywish',
		tags: ['angular', 'no-code', 'solana'],
		url: 'https://github.com/MyWishPlatform',
		description: 'Create your smart contract without coding',
		type: 'github-repo',
		id: 'd148c47a-70ca-4b4c-b4fa-bf8ecbecfbea',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'dassi',
		tags: ['solana'],
		url: 'https://github.com/DassiFinance',
		description: '',
		type: 'github-repo',
		id: 'c461a998-43c1-4e5e-890d-d6bc6014c1b1',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'easy-spl',
		tags: ['lib', 'solana'],
		url: 'https://github.com/solstar-tech/easy-spl.git',
		description: '',
		type: 'github-repo',
		id: '43a3c4e1-0be3-4f04-9cbc-7456a8c75128',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'infinitude',
		tags: ['anchor', 'solana'],
		url: 'https://github.com/jjyeow/hydra-solana-anchor',
		description: "It's Coreless banking solution to improve efficiencies at lesser cost with DLT as primary ledger.",
		type: 'github-repo',
		id: '355474ed-106d-4e71-8d2a-6c7308e7f8bf',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'Rust: Too Many Lists',
		tags: ['rust'],
		url: 'https://rust-unofficial.github.io/too-many-lists/index.html',
		description: 'Learn Rust With Entirely Too Many Linked Lists',
		type: 'article',
		id: 'd80275f1-793d-46a5-a125-9403a68d7922',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'Money Streaming Whitepaper',
		tags: ['solana', 'whitepaper', 'streaming'],
		url: 'https://docs.meanfi.com/platform/specifications/money-streaming-protocol',
		description: 'Money Streaming is one of key sub-graphs of the Mean Protocol',
		type: 'whitepaper',
		id: 'b1423976-257a-4e04-b55f-fa25b100a363',
		likes: 0,
		updatedAt: ''
	},
	{
		title: 'A Starter Kit for New Solana Developer',
		tags: ['solana', 'starter', 'article'],
		url: 'https://hackmd.io/@ironaddicteddog/solana-starter-kit#More-Advanced-Topics',
		description: 'How to get onboard to Solana develepement quickly?',
		type: 'article',
		id: '208df2f0-868f-4437-a9b0-9688de54611d',
		likes: 0,
		updatedAt: ''
	}
]

export const mockSourcesDb = (): Source[] => {
	return [..._sourcesFixture]
}
