import invariant from "../invariant";
import { Tag, TagType } from "./types";

export const tagTypes = [
  "topic",
  "framework",
  "language",
  "dependency",
] as TagType[];

export const dependencies = Object.freeze({
  npm: [
    "@project-serum/anchor-cli",
    "@project-serum/anchor",
    "@project-serum/associated-token",
    "@project-serum/awesome-serum",
    "@project-serum/borsh",
    "@project-serum/common",
    "@project-serum/lockup",
    "@project-serum/pool",
    "@project-serum/registry",
    "@project-serum/serum",
    "@project-serum/sol-wallet-adapter",
    "@project-serum/spl-token-swap",
    "@project-serum/swap-ui",
    "@project-serum/swap",
    "@project-serum/token",
    "@project-serum/tokens",
    "@solana/buffer-layout",
    "@solana/spl-name-service",
    "@solana/spl-token-lending",
    "@solana/spl-token-registry",
    "@solana/spl-token",
    "@solana/token-swap",
    "@solana/wallet-adapter-phantom",
    "@solana/wallet-adapter-react",
    "@solana/wallet-adapter",
    "@solana/web3.js",
  ],
  cargo: ["cronos-sdk"],
});

export const tagNames = Object.freeze({
  language: [
    "C",
    "Golang",
    "Java",
    "JavaScript",
    "Kotlin",
    "Python",
    "Rust",
    "Swift",
    "Typescript",
  ],
  framework: [
    "Anchor",
    "Angular",
    "Express",
    "Next.js",
    "Node.js",
    "React Native",
    "React.js",
    "Svelte",
    "Vue.js",
    "Web3.js",
  ],
  topic: [
    "associated-token-account",
    "program-derived-address",
    "decentralized-identity",
    "did",
    "spl-token",
    "wallet",
    "nft",
    "solana-name-service",
    "staking",
    "lending",
    "program-deployment",
    "dao",
    "exchange",
    "game",
    "token-program",
    "system-program",
    "rent",
    "transaction",
    "token-swap-program",
    "token-program",
    "automated-market-marker",
    "amm",
    "cross-program-invocations",
    "program-signed-accounts",
  ],
  dependency: dependencies,
});

interface BaseToTagsArgs {
  type: TagType;
  values: any;
}

interface ToTagsArgsBase extends BaseToTagsArgs {
  type: Exclude<TagType, "dependency">;
  values: string[];
}

interface ToTagsArgsDependency extends BaseToTagsArgs {
  type: Exclude<TagType, "language" | "framework" | "topic">;
  values: Readonly<{
    npm: string[];
    cargo: string[];
  }>;
}

type ToTagsArgs = ToTagsArgsBase | ToTagsArgsDependency;

function isTagsArgs(o: any): o is ToTagsArgs {
  return (
    typeof o === "object" &&
    "type" in o &&
    typeof o.type === "string" &&
    tagTypes.includes(o.type) &&
    "values" in o &&
    (Array.isArray(o.values) ||
      (typeof o.values === "object" &&
        "npm" in o.values &&
        Array.isArray(o.values.npm) &&
        "cargo" in o.values &&
        Array.isArray(o.values.cargo)))
  );
}

function toTags(args: ToTagsArgsBase): Tag[];

function toTags(args: ToTagsArgsDependency): Tag[];

function toTags(args: any): Tag[] {
  invariant(isTagsArgs(args));
  if (args.type === "dependency") {
    const { npm, cargo } = args.values;
    return [
      ...npm.map((name) => ({ type: args.type, name })),
      ...cargo.map((name) => ({ type: args.type, name })),
    ].map((tag, index) => ({ ...tag, id: index }));
  } else {
    const values = args.values;
    return values
      .map((name) => ({
        type: args.type,
        name: name.toLowerCase(),
      }))
      .map((tag, index) => ({ ...tag, id: index }));
  }
}

export const allTags: Tag[] = Object.entries(tagNames)
  .map(([type, values]) =>
    toTags({
      type,
      values,
    } as any)
  )
  .flat();
