export const XPAGE_STORE_URL = "https://8e9c584880e3.myxpage.shop";

export const XPAGE_LANDING_URLS: Record<string, string> = {
  x1: "https://x1.miroooo.us",
  x2: "https://offer.miroooo.us",
  x1_heads: "https://x1heads.miroooo.us",
  x2_heads: "https://x2heads.miroooo.us",
  giftcard: "https://giftcard.miroooo.us",
  package_protection: "https://packageprotection.miroooo.us",
  flosser: "https://flosser.miroooo.us",
};

export const XPAGE_VARIANTS = {
  // Miroooo X1 Brushes (Product: a2ce5266-8250-4f79-a587-d819e549bcd6) - Simple variants
  x1_silver: "a2ce5279-19c8-4e56-8253-a06d4b7a3bd7",
  x1_pink: "a2ce527a-ac20-4a6d-888a-ada52bc9d509",
  x1_grey: "a2ce527c-3b55-45a4-b832-9915d637ba8b",

  // 6pc brush head variants (aliases)
  x1_silver_6pc: "a2ce5280-e9fd-4b0c-b4a3-51c04be7bef8",
  x1_pink_6pc: "a2ce527f-5948-4fc5-8eb0-25681599eeb5",
  x1_grey_6pc: "a2ce527d-ca5a-4906-8d9a-4d019556062a",

  // Miroooo X1 Heads (Product: a2d0cb07-bb83-4f46-96ec-5d0de9e663b2)
  x1_heads: "a2d0cb07-ee63-4e45-b245-7bb90f494e2e",

  // Miroooo X2 Brushes (Product: a2d08cc2-373f-4ab4-9e57-241d29efb2a2)
  x2_silver: "a2d08cd4-6781-49a7-ad82-f3d52ba0270f",
  x2_grey: "a2d08cd9-0845-4697-ba03-495c14032931",
  x2_pink: "a2d08cdd-d5d3-47da-a294-ea8da721fc31",
  // Miroooo X2 Heads (Product: a2d0cb1d-c4f6-492e-a72d-27369d15ec0c)
  x2_heads: "a2d0cb1d-dfcf-425d-9251-7792053c08b8",

  // Miroooo Water Flosser (Product: a2f69a15-e357-403b-a11c-b3912eb49b1d)
  flosser_black_7: "a2f69a19-e45d-48ab-9d9d-8f837f327b23",
  flosser_black_4: "a2f69a19-d524-4360-b333-91a4fd350f2d",
  flosser_white_7: "a2f69a19-c917-4de3-9d64-3db9502ee9a6",
  flosser_white_4: "a2f69a19-b908-40c1-8214-2b6922aa4617",

  // Aliases for flosser
  flosser_black: "a2f69a19-d524-4360-b333-91a4fd350f2d",
  flosser_white: "a2f69a19-b908-40c1-8214-2b6922aa4617",

  gift_card: "a2f687d5-32cc-427c-81f1-5d153911e592",
  package_protection: "a2f6dfa1-50ae-46c9-a88e-fdb563e124a2",
} as const;

export const XPAGE_MIROOOO_VARIANTS = {
  ...XPAGE_VARIANTS,
  silver: XPAGE_VARIANTS.x1_silver,
  pink: XPAGE_VARIANTS.x1_pink,
  grey: XPAGE_VARIANTS.x1_grey,
  gray: XPAGE_VARIANTS.x1_grey,
  heads: XPAGE_VARIANTS.x1_heads,
  flosser_black_7: XPAGE_VARIANTS.flosser_black_7,
  flosser_black_4: XPAGE_VARIANTS.flosser_black_4,
  flosser_white_7: XPAGE_VARIANTS.flosser_white_7,
  flosser_white_4: XPAGE_VARIANTS.flosser_white_4,
};

export const XPAGE_BUNDLES = {
  x2: {
    id: "a2d0d131-2f3a-4f9c-a8a7-70a398be8b39",
    buy1: {
      optionId: "a2d0d131-33fd-4d08-aadd-c56b2e8dc30d",
      conditionId: "a2e8badf-fa6c-412e-9ed0-8e2e35730e89",
      offeredId: "a2e8bae0-001c-4a35-8848-487d8ea3d430",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 1,
    },
    buy1_freehead: {
      optionId: "a2d0d131-33fd-4d08-aadd-c56b2e8dc30d",
      conditionId: "a2e8badf-fa6c-412e-9ed0-8e2e35730e89",
      offeredId: "a2e8bae0-001c-4a35-8848-487d8ea3d430",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 1,
    },
    buy1_1head: {
      optionId: "a2e88657-6fbd-410c-950c-56e0208d19a9",
      conditionId: "a2e8bae1-eda1-4ba1-b1ae-38cd1fd182f7",
      offeredId: "a2e8bae1-f651-464e-8a2f-fe38bb44d0de",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 2,
    },
    buy2: {
      optionId: "a2d0d131-3f1f-47c6-bfdb-112fd97f8952",
      conditionId: "a2e8bae0-64b2-4201-b8b5-938bc21435d2",
      offeredId: "a2e8bae0-6caa-43df-a68d-d8dce83ce99b",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 2,
    },
    buy2_1head: {
      optionId: "a2e8bae0-105f-49d8-917a-ec4574dcc0f4",
      conditionId: "a2e8bae0-2fd8-4959-a1cc-545f8cc2a14e",
      offeredId: "a2e8bae0-1983-4a60-b91b-bad0422198fa",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 3,
    },
    buy3: {
      optionId: "a2d0d131-4ca9-4fd6-a859-bb73df7c1550",
      conditionId: "a2e8bae0-98f2-451b-b234-de92c979a59f",
      offeredId: "a2e8bae0-b302-4e23-bb42-555616bc009c",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 3,
    },
    buy3_1head: {
      optionId: "a2e8bae1-384e-489d-bf59-5e969c873c06",
      conditionId: "a2e8bae1-4280-4d50-9335-538f54f3bf72",
      offeredId: "a2e8bae1-4037-493b-a66c-b02cb7e1c65f",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 4,
    },
    buy1_protection: {
      optionId: "a2f75d5a-fd80-4c75-a072-0272124c7476",
      conditionId: "a2f75f87-d6e1-4910-88ed-bb9a62be7211",
      offeredId: "a2f75f87-f16e-4dc9-9c41-4940e2558c66",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 1,
    },
    buy1_1head_protection: {
      optionId: "a2f75d5a-91b9-45f8-9780-433802869c8e",
      conditionId: "a2f75f88-2824-42d3-b3b8-96bdec2919fd",
      offeredId: "a2f75f88-2fbe-444b-9bb6-5a44b8fd3690",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 2,
    },
    buy2_protection: {
      optionId: "a2f75f84-dd5c-41a8-9016-d27713bce8d4",
      conditionId: "a2f75f85-1d34-4064-a7ac-0f303a548fb2",
      offeredId: "a2f75f84-e344-41d3-98a2-e29f79ae20d9",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 2,
    },
    buy3_protection: {
      optionId: "a2f75f82-37a2-4465-8f28-edffa20e3f80",
      conditionId: "a2f75f82-70af-49fa-a078-75808f447852",
      offeredId: "a2f75f82-3d36-47d5-87dc-6c73699b221b",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 3,
    },
    promoBuy1: {
      optionId: "a2d0d131-33fd-4d08-aadd-c56b2e8dc30d",
      conditionId: "a2e8badf-fa6c-412e-9ed0-8e2e35730e89",
      offeredId: "a2e8bae0-001c-4a35-8848-487d8ea3d430",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 1,
    },
    promoBuy2: {
      optionId: "a2d0d131-3f1f-47c6-bfdb-112fd97f8952",
      conditionId: "a2e8bae0-64b2-4201-b8b5-938bc21435d2",
      offeredId: "a2e8bae0-6caa-43df-a68d-d8dce83ce99b",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 2,
    },
    promoBuy3: {
      optionId: "a2d0d131-4ca9-4fd6-a859-bb73df7c1550",
      conditionId: "a2e8bae0-98f2-451b-b234-de92c979a59f",
      offeredId: "a2e8bae0-b302-4e23-bb42-555616bc009c",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 3,
    },
    promoBuy1_1head: {
      optionId: "a2e88657-6fbd-410c-950c-56e0208d19a9",
      conditionId: "a2e8bae1-eda1-4ba1-b1ae-38cd1fd182f7",
      offeredId: "a2e8bae1-f651-464e-8a2f-fe38bb44d0de",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 2,
    },
    promoBuy2_1head: {
      optionId: "a2e8bae0-105f-49d8-917a-ec4574dcc0f4",
      conditionId: "a2e8bae0-2fd8-4959-a1cc-545f8cc2a14e",
      offeredId: "a2e8bae0-1983-4a60-b91b-bad0422198fa",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 3,
    },
    promoBuy3_1head: {
      optionId: "a2e8bae1-384e-489d-bf59-5e969c873c06",
      conditionId: "a2e8bae1-4280-4d50-9335-538f54f3bf72",
      offeredId: "a2e8bae1-4037-493b-a66c-b02cb7e1c65f",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 4,
    },
    promoBuy1_protection: {
      optionId: "a2f75d5a-fd80-4c75-a072-0272124c7476",
      conditionId: "a2f75f87-d6e1-4910-88ed-bb9a62be7211",
      offeredId: "a2f75f87-f16e-4dc9-9c41-4940e2558c66",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 1,
    },
    promoBuy1_1head_protection: {
      optionId: "a2f75d5a-91b9-45f8-9780-433802869c8e",
      conditionId: "a2f75f88-2824-42d3-b3b8-96bdec2919fd",
      offeredId: "a2f75f88-2fbe-444b-9bb6-5a44b8fd3690",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 2,
    },
    promoBuy2_protection: {
      optionId: "a2f75f84-dd5c-41a8-9016-d27713bce8d4",
      conditionId: "a2f75f85-1d34-4064-a7ac-0f303a548fb2",
      offeredId: "a2f75f84-e344-41d3-98a2-e29f79ae20d9",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 2,
    },
    promoBuy3_protection: {
      optionId: "a2f75f82-37a2-4465-8f28-edffa20e3f80",
      conditionId: "a2f75f82-70af-49fa-a078-75808f447852",
      offeredId: "a2f75f82-3d36-47d5-87dc-6c73699b221b",
      headsVariant: XPAGE_VARIANTS.x2_heads,
      offeredQty: 3,
    },
  },
  x1: {
    id: "a2cea7c5-4c36-4f88-a757-4f93d767dfe3",
    buy1: {
      optionId: "a2cea7c5-54d1-4b8a-bcdc-6a7770bb62cc",
      conditionId: "a2fc2b44-ad89-4130-ad1f-5f8ccdb48bb6",
      offeredId: "a2fc2b44-bc39-46bf-b374-0b66c9328556",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 1,
    },
    buy1_freehead: {
      optionId: "a2cea7c5-54d1-4b8a-bcdc-6a7770bb62cc",
      conditionId: "a2fc2b44-ad89-4130-ad1f-5f8ccdb48bb6",
      offeredId: "a2fc2b44-bc39-46bf-b374-0b66c9328556",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 1,
    },
    buy1_1head: {
      optionId: "a2dc271a-fd9c-42f3-b45d-025cd35e0529",
      conditionId: "a2fc2b44-bc90-4db0-b8b9-2156681034fd",
      offeredId: "a2fc2b44-c4ff-4055-aae9-f77e0e873b3f",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 2,
    },
    buy2: {
      optionId: "a2cea7c5-639d-47bd-b9d9-f376089d336b",
      conditionId: "a2fc2b44-ade2-4453-90de-2fd729884711",
      offeredId: "a2fc2b44-bd68-4473-b519-309a91a0f665",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 2,
    },
    buy2_1head: {
      optionId: "a2dc271a-e294-4a2d-85c1-4e0f9d3599d8",
      conditionId: "a2fc2b44-bcec-42d0-8381-35bde0bcb9e8",
      offeredId: "a2fc2b44-c519-4139-a19a-55c423e2fac5",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 3,
    },
    buy3: {
      optionId: "a2cea7c5-6ea0-484b-bb28-a74048d6c9bd",
      conditionId: "a2fc2b42-587a-46eb-a88f-9f8fbd5867c1",
      offeredId: "a2fc2b42-6de1-476d-ab87-0a674a2a56b0",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 3,
    },
    buy3_1head: {
      optionId: "a2dc271b-0eaf-4f64-a474-e14bee288f66",
      conditionId: "a2fc2b44-9f0f-4167-a32a-5523229c1aa6",
      offeredId: "a2fc2b44-ad93-4c1c-be6c-b61b48aa80c7",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 4,
    },
    buy1_protection: {
      optionId: "a2fc2574-bb2c-4bfc-9571-f510c2cac8c0",
      conditionId: "a2fc2b45-b062-4e71-903b-2e44a5d8a414",
      offeredId: "a2fc2b45-bc9b-4b0e-b502-05fbed24e501",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 1,
    },
    buy1_1head_protection: {
      optionId: "a2fc2575-057d-4aa7-8451-6fdff4922ed2",
      conditionId: "a2fc2b45-b822-4f9d-9961-f3df066011f6",
      offeredId: "a2fc2b45-c1f6-429d-a659-10e4e0b955fc",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 2,
    },
    promoBuy1: {
      optionId: "a2cea7c5-54d1-4b8a-bcdc-6a7770bb62cc",
      conditionId: "a2fc2b44-ad89-4130-ad1f-5f8ccdb48bb6",
      offeredId: "a2fc2b44-bc39-46bf-b374-0b66c9328556",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 1,
    },
    promoBuy1_freehead: {
      optionId: "a2cea7c5-54d1-4b8a-bcdc-6a7770bb62cc",
      conditionId: "a2fc2b44-ad89-4130-ad1f-5f8ccdb48bb6",
      offeredId: "a2fc2b44-bc39-46bf-b374-0b66c9328556",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 1,
    },
    promoBuy1_1head: {
      optionId: "a2dc271a-fd9c-42f3-b45d-025cd35e0529",
      conditionId: "a2fc2b44-bc90-4db0-b8b9-2156681034fd",
      offeredId: "a2fc2b44-c4ff-4055-aae9-f77e0e873b3f",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 2,
    },
    promoBuy1_2head: {
      optionId: "a2dc271a-fd9c-42f3-b45d-025cd35e0529",
      conditionId: "a2fc2b44-bc90-4db0-b8b9-2156681034fd",
      offeredId: "a2fc2b44-c4ff-4055-aae9-f77e0e873b3f",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 2,
    },
    promoBuy2: {
      optionId: "a2cea7c5-639d-47bd-b9d9-f376089d336b",
      conditionId: "a2fc2b44-ade2-4453-90de-2fd729884711",
      offeredId: "a2fc2b44-bd68-4473-b519-309a91a0f665",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 2,
    },
    promoBuy2_1head: {
      optionId: "a2dc271a-e294-4a2d-85c1-4e0f9d3599d8",
      conditionId: "a2fc2b44-bcec-42d0-8381-35bde0bcb9e8",
      offeredId: "a2fc2b44-c519-4139-a19a-55c423e2fac5",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 3,
    },
    promoBuy3: {
      optionId: "a2cea7c5-6ea0-484b-bb28-a74048d6c9bd",
      conditionId: "a2fc2b42-587a-46eb-a88f-9f8fbd5867c1",
      offeredId: "a2fc2b42-6de1-476d-ab87-0a674a2a56b0",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 3,
    },
    promoBuy3_1head: {
      optionId: "a2dc271b-0eaf-4f64-a474-e14bee288f66",
      conditionId: "a2fc2b44-9f0f-4167-a32a-5523229c1aa6",
      offeredId: "a2fc2b44-ad93-4c1c-be6c-b61b48aa80c7",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 4,
    },
    promoBuy1_protection: {
      optionId: "a2fc2574-bb2c-4bfc-9571-f510c2cac8c0",
      conditionId: "a2fc2b45-b062-4e71-903b-2e44a5d8a414",
      offeredId: "a2fc2b45-bc9b-4b0e-b502-05fbed24e501",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 1,
    },
    promoBuy1_1head_protection: {
      optionId: "a2fc2575-057d-4aa7-8451-6fdff4922ed2",
      conditionId: "a2fc2b45-b822-4f9d-9961-f3df066011f6",
      offeredId: "a2fc2b45-c1f6-429d-a659-10e4e0b955fc",
      headsVariant: XPAGE_VARIANTS.x1_heads,
      offeredQty: 2,
    },
  },
  x1_heads: {
    id: "a2e82522-3843-45bf-bace-38a2ffda5175",
    buy1: {
      optionId: "a2e82522-4503-46f8-8b6b-fb8cc43949b1",
      conditionId: "a2e82522-5106-44a1-ab8a-f0cff71132c9",
      offeredQty: 0,
    },
    buy2: {
      optionId: "a2e82522-5590-419d-867c-13f53b00cd5f",
      conditionId: "a2e82522-5e14-435d-8aa9-bd2b00eeb555",
      offeredQty: 0,
    },
    buy3: {
      optionId: "a2e82522-62be-4805-841b-3416aa7aade1",
      conditionId: "a2e82522-6c2d-4c85-98b9-c43580b58a13",
      offeredQty: 0,
    },
  },
  x2_heads: {
    id: "a2e825f5-0519-4e38-a62c-be9c972241e3",
    buy1: {
      optionId: "a2e825f5-0d2d-4415-a548-14a0d53b4c22",
      conditionId: "a2e825f5-1543-440f-8108-19a78651f722",
      offeredQty: 0,
    },
    buy2: {
      optionId: "a2e825f5-196a-4051-9c7b-d64da7c95761",
      conditionId: "a2e825f5-21fe-416f-9fc6-1caabae90533",
      offeredQty: 0,
    },
    buy3: {
      optionId: "a2e825f5-2692-47e0-91c4-4406926a2c3c",
      conditionId: "a2e825f5-307f-47a7-9721-623eceea458e",
      offeredQty: 0,
    },
  },
  flosser: {
    productId: "a2f69a15-e357-403b-a11c-b3912eb49b1d",
    id: "a3014906-57b5-405d-8d9e-7e3b15d9782b",
    buy1: {
      optionId: "a3014906-5e8f-4b65-a55a-f3f03cb94954",
      conditionId: "a3014906-69d3-4326-a995-45a30656e6a2",
      offeredId: "a3014906-6624-4fbc-89a0-205a2635e7f8",
      offeredQty: 1,
    },
    buy2: {
      optionId: "a3014906-6f00-4af1-9c91-99030c112703",
      conditionId: "a3014906-7dd6-4028-905d-f5f00b48adf1",
      offeredProtectionId: "a3014906-7a49-4a52-8ff1-bd6f51129976",
      offeredFlosserId: "a3014906-75ac-4f6f-8957-07f655d1ffa2",
      offeredId: "a3014906-7a49-4a52-8ff1-bd6f51129976",
      offeredQty: 1,
    },
  },
} as const;

export const ALLOWED_ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "msclkid",
  "gclid",
  "fbclid",
  "ttclid",
] as const;

function sanitizeHeaderValue(value: unknown): string {
  if (!value) return "";
  return String(value).replace(/[\r\n]/g, "").trim();
}

/**
 * Fetch initial session to extract XSRF-TOKEN and cookies from XPage
 */
export async function loadXpageSession(
  currency = "GBP",
  product: "x1" | "x2" | "x1_heads" | "x2_heads" | "store" | "package_protection" | "giftcard" | "flosser" = "x2"
) {
  const origin = product === "store" ? XPAGE_STORE_URL : XPAGE_LANDING_URLS[product];
  if (!origin) throw new Error("Unknown Miroooo XPage offer.");
  const url = `${origin}/?currency=${encodeURIComponent(currency)}`;
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
    Origin: origin,
    Referer: url,
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
    redirect: "error",
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error("XPage offer could not be loaded.");
  const html = await response.text();

  const setCookieHeaders = (response.headers as any).getSetCookie
    ? (response.headers as any).getSetCookie()
    : [response.headers.get("set-cookie")].filter(Boolean);

  let xsrfToken = "";
  for (const c of setCookieHeaders) {
    const match = c.match(/XSRF-TOKEN=([^;]+)/);
    if (match) {
      xsrfToken = decodeURIComponent(match[1]);
    }
  }

  const cookieHeader = setCookieHeaders.map((c: string) => c.split(";")[0]).join("; ");

  const csrfToken = html.match(/["']X-CSRF-Token["']:\s*["']([^"']+)["']/)?.[1] || "";
  const landingPageId = html.match(/orderData\.landing_page_id\s*=\s*["']([\da-f-]{36})["']/)?.[1] || "";
  const requiresBundle = product !== "store" && product !== "package_protection" && product !== "giftcard";
  const expectedBundleId = requiresBundle ? (XPAGE_BUNDLES as any)[product]?.id : null;
  let bundle: any = null;
  if (expectedBundleId) {
    for (const match of html.matchAll(/\bx-data\s*=\s*(["'])([\s\S]*?)\1/g)) {
      if (!match[2].includes(expectedBundleId)) continue;
      try {
        const parsed = JSON.parse(match[2].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
        if (parsed.bundle?.id === expectedBundleId) bundle = parsed.bundle;
      } catch {}
    }
  }
  if (requiresBundle && (!csrfToken || !landingPageId || bundle?.status !== "ACTIVE")) {
    throw new Error("The published Miroooo XPage offer is unavailable.");
  }
  return {
    origin,
    url,
    csrfToken,
    landingPageId,
    bundle,
    xsrfToken,
    cookieHeader,
    setCookieHeaders,
  };
}

/**
 * Map cart items from Miroooo cart to XPage line items
 */
export function mapCartToXpageVariants(cartLines: any[] = []) {
  const xpageCart: Array<{ variant_id: string; quantity: number }> = [];

  for (const line of cartLines) {
    const qty = line.quantity === undefined ? 1 : Number(line.quantity);
    if (!Number.isSafeInteger(qty) || qty < 1) {
      throw new Error("Checkout item quantity must be a positive whole number.");
    }

    const variantIdRaw = (line.variant_id || line.variantId || "").toString().toLowerCase().trim();
    const productIdRaw = (line.productId || line.product_id || "").toString().toLowerCase().trim();
    const idRaw = (line.id || "").toString().toLowerCase().trim();
    const handleRaw = (line.productHandle || line.handle || "").toString().toLowerCase().trim();
    const titleRaw = (line.title || line.name || "").toString().toLowerCase().trim();
    const colorRaw = (line.color || "").toString().toLowerCase().trim();
    const variantTitleRaw = (line.variant || line.variantTitle || line.variantName || "").toString().toLowerCase().trim();
    const specRaw = (line.specifications || line.specification || "").toString().toLowerCase().trim();

    const allText = `${variantIdRaw} ${productIdRaw} ${idRaw} ${handleRaw} ${titleRaw} ${colorRaw} ${variantTitleRaw} ${specRaw}`.toLowerCase();

    let targetVariantId: string | null = null;

    // 0. Gift card & Package protection mapping
    if (
      variantIdRaw === XPAGE_VARIANTS.gift_card ||
      productIdRaw === "a2f687d2-56cd-4709-95a5-e6d280070c18" ||
      handleRaw === "miroooo-gift-card" ||
      idRaw.startsWith("miroooo-gift-card") ||
      allText.includes(XPAGE_VARIANTS.gift_card) ||
      allText.includes("a2f687d2-56cd-4709-95a5-e6d280070c18") ||
      allText.includes("miroooo-gift-card") ||
      allText.includes("gift card")
    ) {
      targetVariantId = XPAGE_VARIANTS.gift_card;
    } else if (
      variantIdRaw === XPAGE_VARIANTS.package_protection ||
      productIdRaw === "a2f6dfa1-50ae-46c9-a88e-fdb563e124a2" ||
      handleRaw === "miroooo-package-protection" ||
      idRaw.startsWith("miroooo-package-protection") ||
      allText.includes(XPAGE_VARIANTS.package_protection) ||
      allText.includes("a2f6dfa1-50ae-46c9-a88e-fdb563e124a2") ||
      allText.includes("miroooo-package-protection") ||
      allText.includes("package protection") ||
      allText.includes("shipping protection")
    ) {
      targetVariantId = XPAGE_VARIANTS.package_protection;
    }
    // 1. Direct XPage Variant ID match
    else if (variantIdRaw === XPAGE_VARIANTS.flosser_black_7 || allText.includes(XPAGE_VARIANTS.flosser_black_7)) {
      targetVariantId = XPAGE_VARIANTS.flosser_black_7;
    } else if (variantIdRaw === XPAGE_VARIANTS.flosser_black_4 || allText.includes(XPAGE_VARIANTS.flosser_black_4)) {
      targetVariantId = XPAGE_VARIANTS.flosser_black_4;
    } else if (variantIdRaw === XPAGE_VARIANTS.flosser_white_7 || allText.includes(XPAGE_VARIANTS.flosser_white_7)) {
      targetVariantId = XPAGE_VARIANTS.flosser_white_7;
    } else if (variantIdRaw === XPAGE_VARIANTS.flosser_white_4 || allText.includes(XPAGE_VARIANTS.flosser_white_4)) {
      targetVariantId = XPAGE_VARIANTS.flosser_white_4;
    } else if (variantIdRaw === XPAGE_VARIANTS.x2_heads || allText.includes(XPAGE_VARIANTS.x2_heads)) {
      targetVariantId = XPAGE_VARIANTS.x2_heads;
    } else if (variantIdRaw === XPAGE_VARIANTS.x2_pink || allText.includes(XPAGE_VARIANTS.x2_pink)) {
      targetVariantId = XPAGE_VARIANTS.x2_pink;
    } else if (variantIdRaw === XPAGE_VARIANTS.x2_grey || allText.includes(XPAGE_VARIANTS.x2_grey)) {
      targetVariantId = XPAGE_VARIANTS.x2_grey;
    } else if (variantIdRaw === XPAGE_VARIANTS.x2_silver || allText.includes(XPAGE_VARIANTS.x2_silver)) {
      targetVariantId = XPAGE_VARIANTS.x2_silver;
    } else if (
      variantIdRaw === XPAGE_VARIANTS.x1_heads ||
      variantIdRaw === "a2ce5282-7966-4891-a418-861b4c279974" ||
      allText.includes(XPAGE_VARIANTS.x1_heads) ||
      allText.includes("a2ce5282-7966-4891-a418-861b4c279974")
    ) {
      targetVariantId = XPAGE_VARIANTS.x1_heads;
    } else if (
      variantIdRaw === XPAGE_VARIANTS.x1_pink ||
      variantIdRaw === XPAGE_VARIANTS.x1_pink_6pc ||
      allText.includes(XPAGE_VARIANTS.x1_pink) ||
      allText.includes(XPAGE_VARIANTS.x1_pink_6pc)
    ) {
      targetVariantId = XPAGE_VARIANTS.x1_pink;
    } else if (
      variantIdRaw === XPAGE_VARIANTS.x1_grey ||
      variantIdRaw === XPAGE_VARIANTS.x1_grey_6pc ||
      allText.includes(XPAGE_VARIANTS.x1_grey) ||
      allText.includes(XPAGE_VARIANTS.x1_grey_6pc)
    ) {
      targetVariantId = XPAGE_VARIANTS.x1_grey;
    } else if (
      variantIdRaw === XPAGE_VARIANTS.x1_silver ||
      variantIdRaw === XPAGE_VARIANTS.x1_silver_6pc ||
      allText.includes(XPAGE_VARIANTS.x1_silver) ||
      allText.includes(XPAGE_VARIANTS.x1_silver_6pc)
    ) {
      targetVariantId = XPAGE_VARIANTS.x1_silver;
    }
    // 1.5 Miroooo Water Flosser Mapping
    else if (
      productIdRaw === "a2f69a15-e357-403b-a11c-b3912eb49b1d" ||
      handleRaw.includes("flosser") ||
      idRaw.includes("flosser") ||
      allText.includes("water-flosser") ||
      allText.includes("water flosser") ||
      allText.includes("flosser") ||
      allText.includes("a2f69a15-e357-403b-a11c-b3912eb49b1d")
    ) {
      const isWhite = colorRaw.includes("white") || allText.includes("white");
      const is7Nozzles =
        allText.includes("7 nozzle") ||
        allText.includes("7-nozzle") ||
        allText.includes("7 nozzles") ||
        allText.includes("7nozzle") ||
        allText.includes("7pc") ||
        allText.includes("7 pc");

      if (isWhite) {
        targetVariantId = is7Nozzles ? XPAGE_VARIANTS.flosser_white_7 : XPAGE_VARIANTS.flosser_white_4;
      } else {
        targetVariantId = is7Nozzles ? XPAGE_VARIANTS.flosser_black_7 : XPAGE_VARIANTS.flosser_black_4;
      }
    }
    // 2. Brush Heads Mapping (Differentiate X2 Heads vs X1 Heads)
    else if (
      variantIdRaw === "1000020718937117" ||
      productIdRaw === "1000000675616058" ||
      productIdRaw === "a2d0cb1d-c4f6-492e-a72d-27369d15ec0c" ||
      handleRaw === "miroooo-x2-heads" ||
      allText.includes("1000020718937117") ||
      allText.includes("1000000675616058") ||
      allText.includes("a2d0cb1d-c4f6-492e-a72d-27369d15ec0c") ||
      allText.includes("x2-heads") ||
      (allText.includes("x2") && (allText.includes("head") || allText.includes("dupont") || allText.includes("bristle")))
    ) {
      targetVariantId = XPAGE_VARIANTS.x2_heads;
    } else if (
      variantIdRaw === "1000020710139724" ||
      productIdRaw === "1000000675471182" ||
      productIdRaw === "a2d0cb07-bb83-4f46-96ec-5d0de9e663b2" ||
      handleRaw === "miroooo-x1-heads" ||
      handleRaw === "miroooo-x-heads" ||
      allText.includes("1000020710139724") ||
      allText.includes("1000000675471182") ||
      allText.includes("a2d0cb07-bb83-4f46-96ec-5d0de9e663b2") ||
      allText.includes("x1-heads") ||
      allText.includes("head") ||
      allText.includes("dupont") ||
      allText.includes("precision") ||
      allText.includes("replacement") ||
      allText.includes("bristle")
    ) {
      targetVariantId = XPAGE_VARIANTS.x1_heads;
    }
    // 3. Miroooo X2 Toothbrush Mapping
    else if (
      handleRaw === "miroooo-x2" ||
      productIdRaw === "1000000675072187" ||
      variantIdRaw === "1000020700182882" ||
      variantIdRaw === "1000020700182883" ||
      variantIdRaw === "1000020700182884" ||
      allText.includes("1000000675072187") ||
      allText.includes("1000020700182882") ||
      allText.includes("1000020700182883") ||
      allText.includes("1000020700182884") ||
      allText.includes("miroooo-x2") ||
      allText.includes("miroooo x2") ||
      allText.includes("x2")
    ) {
      if (
        variantIdRaw === "1000020700182882" ||
        colorRaw.includes("pink") ||
        colorRaw.includes("rose") ||
        allText.includes("pink") ||
        allText.includes("rose")
      ) {
        targetVariantId = XPAGE_VARIANTS.x2_pink;
      } else if (
        variantIdRaw === "1000020700182883" ||
        colorRaw.includes("grey") ||
        colorRaw.includes("gray") ||
        colorRaw.includes("dark") ||
        colorRaw.includes("black") ||
        colorRaw.includes("charcoal") ||
        colorRaw.includes("slate") ||
        allText.includes("grey") ||
        allText.includes("gray")
      ) {
        targetVariantId = XPAGE_VARIANTS.x2_grey;
      } else {
        targetVariantId = XPAGE_VARIANTS.x2_silver;
      }
    }
    // 4. Miroooo X1 Toothbrush Mapping
    else if (
      handleRaw === "miroooo-x" ||
      handleRaw === "miroooo-x1" ||
      productIdRaw === "1000000675113473" ||
      productIdRaw === "miroooo-x" ||
      productIdRaw === "miroooo-x1" ||
      productIdRaw === "x1" ||
      productIdRaw === "x" ||
      ["1000020700958562", "1000020700958563", "1000020700958564"].includes(variantIdRaw) ||
      allText.includes("miroooo x1") ||
      allText.includes("miroooo-x1") ||
      allText.includes("miroooo-x") ||
      allText.includes("x1")
    ) {
      if (
        variantIdRaw === "1000020700958562" ||
        colorRaw.includes("pink") ||
        colorRaw.includes("rose") ||
        allText.includes("pink") ||
        allText.includes("rose")
      ) {
        targetVariantId = XPAGE_VARIANTS.x1_pink;
      } else if (
        variantIdRaw === "1000020700958564" ||
        colorRaw.includes("grey") ||
        colorRaw.includes("gray") ||
        colorRaw.includes("dark") ||
        colorRaw.includes("black") ||
        colorRaw.includes("charcoal") ||
        colorRaw.includes("slate") ||
        allText.includes("grey") ||
        allText.includes("gray")
      ) {
        targetVariantId = XPAGE_VARIANTS.x1_grey;
      } else {
        targetVariantId = XPAGE_VARIANTS.x1_silver;
      }
    }
    // 5. Miroooo Gift Card & Package Protection Mapping
    else if (
      variantIdRaw === XPAGE_VARIANTS.gift_card ||
      productIdRaw === "a2f687d2-56cd-4709-95a5-e6d280070c18" ||
      handleRaw === "miroooo-gift-card" ||
      allText.includes("gift-card") ||
      allText.includes("gift card")
    ) {
      targetVariantId = XPAGE_VARIANTS.gift_card;
    } else if (
      variantIdRaw === XPAGE_VARIANTS.package_protection ||
      productIdRaw === "a2f6df9e-faf7-438b-a65a-da26ee25ce03" ||
      handleRaw === "miroooo-package-protection" ||
      allText.includes("package-protection") ||
      allText.includes("package protection")
    ) {
      targetVariantId = XPAGE_VARIANTS.package_protection;
    }

    if (!targetVariantId) throw new Error("Cart contains an unknown Miroooo product or variant.");
    if (targetVariantId) {
      const existing = xpageCart.find((i) => i.variant_id === targetVariantId);
      if (existing) {
        existing.quantity += qty;
      } else {
        xpageCart.push({
          quantity: qty,
          variant_id: targetVariantId,
        });
      }
    }
  }

  return xpageCart;
}

// XPage creates the complimentary and paid head sets from the selected bundle option.
export function detectBundlePayload(cartLines: any[] = [], discountCode = "") {
  const brushes: { x1: string[]; x2: string[] } = { x1: [], x2: [] };
  const flossers: string[] = [];
  const brushCounts = { x1: 0, x2: 0 };
  let flosserCount = 0;
  const freeHeads = { x1: 0, x2: 0 };
  const paidHeads = { x1: 0, x2: 0 };
  let hasPackageProtection = false;

  for (const line of cartLines) {
    const lineId = String(line.id || "").toLowerCase();
    const isFree = line.isFree === true || /(?:^|:)free(?:$|:)/i.test(lineId);

    // Package protection lines do not invalidate bundle detection
    if (
      line.variant_id === XPAGE_VARIANTS.package_protection ||
      line.variantId === XPAGE_VARIANTS.package_protection ||
      line.productHandle === "miroooo-package-protection" ||
      line.handle === "miroooo-package-protection" ||
      lineId === "miroooo-package-protection" ||
      lineId.startsWith("miroooo-package-protection")
    ) {
      hasPackageProtection = true;
      continue;
    }

    // Gift card lines do not invalidate bundle detection
    if (
      line.variant_id === XPAGE_VARIANTS.gift_card ||
      line.variantId === XPAGE_VARIANTS.gift_card ||
      line.productHandle === "miroooo-gift-card" ||
      line.handle === "miroooo-gift-card" ||
      lineId === "miroooo-gift-card" ||
      lineId.startsWith("miroooo-gift-card") ||
      lineId === "miroooo-gift-card:free" ||
      (isFree && (
        String(line.productHandle || line.handle || "").toLowerCase() === "miroooo-gift-card" ||
        String(line.variant_id || line.variantId || "").toLowerCase() === XPAGE_VARIANTS.gift_card.toLowerCase()
      ))
    ) {
      continue;
    }

    const mapped = mapCartToXpageVariants([line]);
    if (mapped.length !== 1) throw new Error("Could not identify a checkout item.");
    const { variant_id: variantId, quantity } = mapped[0];

    if (variantId === XPAGE_VARIANTS.gift_card) {
      continue;
    }
    if (variantId === XPAGE_VARIANTS.package_protection) {
      hasPackageProtection = true;
      continue;
    }

    const family = (Object.entries({
      x1: [
        XPAGE_VARIANTS.x1_silver,
        XPAGE_VARIANTS.x1_pink,
        XPAGE_VARIANTS.x1_grey,
        XPAGE_VARIANTS.x1_silver_6pc,
        XPAGE_VARIANTS.x1_pink_6pc,
        XPAGE_VARIANTS.x1_grey_6pc,
      ],
      x2: [XPAGE_VARIANTS.x2_silver, XPAGE_VARIANTS.x2_pink, XPAGE_VARIANTS.x2_grey],
    }) as Array<["x1" | "x2", readonly string[]]>).find(([, variants]) => variants.includes(variantId))?.[0];

    if (family) {
      brushCounts[family] += quantity;
      if (brushCounts[family] <= 3) brushes[family].push(...Array(quantity).fill(variantId));
      continue;
    }
    if (variantId === XPAGE_VARIANTS.x1_heads || variantId === XPAGE_VARIANTS.x2_heads) {
      const headFamily = variantId === XPAGE_VARIANTS.x1_heads ? "x1" : "x2";
      (isFree ? freeHeads : paidHeads)[headFamily] += quantity;
      continue;
    }

    const flosserVariants = [
      XPAGE_VARIANTS.flosser_black_7,
      XPAGE_VARIANTS.flosser_black_4,
      XPAGE_VARIANTS.flosser_white_7,
      XPAGE_VARIANTS.flosser_white_4,
    ];
    if (flosserVariants.includes(variantId as any)) {
      flosserCount += quantity;
      if (flosserCount <= 2) flossers.push(...Array(quantity).fill(variantId));
      continue;
    }

    return null;
  }

  if (flosserCount > 0) {
    if (
      brushCounts.x1 > 0 ||
      brushCounts.x2 > 0 ||
      paidHeads.x1 > 0 ||
      paidHeads.x2 > 0 ||
      freeHeads.x1 > 0 ||
      freeHeads.x2 > 0
    ) {
      return null;
    }
    if (flosserCount === 1) {
      const option = XPAGE_BUNDLES.flosser.buy1;
      return {
        bundle_option_id: option.optionId,
        product: "flosser" as const,
        flossers,
        brushes: flossers,
        headsVariant: "",
        offeredQty: option.offeredQty,
        matchedKey: "buy1",
      };
    }
    if (flosserCount === 2) {
      const option = XPAGE_BUNDLES.flosser.buy2;
      return {
        bundle_option_id: option.optionId,
        product: "flosser" as const,
        flossers,
        brushes: flossers,
        headsVariant: "",
        offeredQty: 1,
        matchedKey: "buy2",
      };
    }
    return null;
  }

  if (brushCounts.x1 && brushCounts.x2) {
    return null;
  }
  const product = brushCounts.x1 ? "x1" : brushCounts.x2 ? "x2" : null;
  if (!product) {
    if (hasPackageProtection) {
      return null;
    }
    if (brushCounts.x1 === 0 && brushCounts.x2 === 0) {
      if (paidHeads.x1 > 0 && paidHeads.x1 <= 3 && paidHeads.x2 === 0 && freeHeads.x1 === 0 && freeHeads.x2 === 0) {
        const bundleKey = paidHeads.x1 === 1 ? "buy1" : paidHeads.x1 === 2 ? "buy2" : "buy3";
        const option = (XPAGE_BUNDLES.x1_heads as any)[bundleKey];
        if (option) {
          return {
            bundle_option_id: option.optionId,
            product: "x1_heads" as const,
            brushes: Array(paidHeads.x1).fill(XPAGE_VARIANTS.x1_heads),
            headsVariant: XPAGE_VARIANTS.x1_heads,
            offeredQty: 0,
            matchedKey: bundleKey,
          };
        }
      } else if (paidHeads.x2 > 0 && paidHeads.x2 <= 3 && paidHeads.x1 === 0 && freeHeads.x1 === 0 && freeHeads.x2 === 0) {
        const bundleKey = paidHeads.x2 === 1 ? "buy1" : paidHeads.x2 === 2 ? "buy2" : "buy3";
        const option = (XPAGE_BUNDLES.x2_heads as any)[bundleKey];
        if (option) {
          return {
            bundle_option_id: option.optionId,
            product: "x2_heads" as const,
            brushes: Array(paidHeads.x2).fill(XPAGE_VARIANTS.x2_heads),
            headsVariant: XPAGE_VARIANTS.x2_heads,
            offeredQty: 0,
            matchedKey: bundleKey,
          };
        }
      }
    }
    return null;
  }
  const quantity = brushCounts[product];
  if (quantity > 3) {
    return null;
  }

  const otherProduct = product === "x1" ? "x2" : "x1";
  if (freeHeads[otherProduct] || paidHeads[otherProduct]) {
    return null;
  }

  const isPromo = ["MIROOOO10", "MIROOOO"].includes(String(discountCode).trim().toUpperCase());
  const paidHeadQty = paidHeads[product];
  const freeHeadQty = freeHeads[product];

  let bundleKey: string | null = null;

  if (product === "x2") {
    if (quantity === 1) {
      const total = freeHeadQty + paidHeadQty;
      if (total <= 1) {
        bundleKey = hasPackageProtection
          ? (isPromo ? "promoBuy1_protection" : "buy1_protection")
          : (isPromo ? "promoBuy1" : "buy1_freehead");
      } else if (total === 2) {
        bundleKey = hasPackageProtection
          ? (isPromo ? "promoBuy1_1head_protection" : "buy1_1head_protection")
          : (isPromo ? "promoBuy1_1head" : "buy1_1head");
      } else {
        return null;
      }
    } else if (quantity === 2) {
      const total = freeHeadQty + paidHeadQty;
      if (total <= 2) {
        bundleKey = hasPackageProtection
          ? (isPromo ? "promoBuy2_protection" : "buy2_protection")
          : (isPromo ? "promoBuy2" : "buy2");
      } else if (total === 3) {
        bundleKey = hasPackageProtection
          ? null
          : (isPromo ? "promoBuy2_1head" : "buy2_1head");
      } else {
        return null;
      }
    } else if (quantity === 3) {
      const total = freeHeadQty + paidHeadQty;
      if (total <= 3) {
        bundleKey = hasPackageProtection
          ? (isPromo ? "promoBuy3_protection" : "buy3_protection")
          : (isPromo ? "promoBuy3" : "buy3");
      } else if (total === 4) {
        bundleKey = hasPackageProtection
          ? null
          : (isPromo ? "promoBuy3_1head" : "buy3_1head");
      } else {
        return null;
      }
    }
  } else if (product === "x1") {
    if (quantity === 1) {
      const total = freeHeadQty + paidHeadQty;
      if (total <= 1) {
        bundleKey = hasPackageProtection
          ? (isPromo ? "promoBuy1_protection" : "buy1_protection")
          : (isPromo ? "promoBuy1_freehead" : (freeHeadQty === 1 ? "buy1_freehead" : null));
      } else if (total === 2) {
        bundleKey = hasPackageProtection
          ? (isPromo ? "promoBuy1_1head_protection" : "buy1_1head_protection")
          : (isPromo ? "promoBuy1_1head" : "buy1_1head");
      } else {
        return null;
      }
    } else if (quantity === 2) {
      if (hasPackageProtection) {
        return null;
      }
      const total = freeHeadQty + paidHeadQty;
      if (total <= 2) {
        bundleKey = isPromo ? "promoBuy2" : "buy2";
      } else if (total === 3) {
        bundleKey = isPromo ? "promoBuy2_1head" : "buy2_1head";
      } else {
        return null;
      }
    } else if (quantity === 3) {
      if (hasPackageProtection) {
        return null;
      }
      const total = freeHeadQty + paidHeadQty;
      if (total <= 3) {
        bundleKey = isPromo ? "promoBuy3" : "buy3";
      } else if (total === 4) {
        bundleKey = isPromo ? "promoBuy3_1head" : "buy3_1head";
      } else {
        return null;
      }
    }
  }

  if (!bundleKey) return null;

  const option = (XPAGE_BUNDLES[product] as any)[bundleKey];
  if (!option) return null;

  return {
    bundle_option_id: option.optionId,
    product: product as "x1" | "x2" | "x1_heads" | "x2_heads" | "flosser",
    brushes: brushes[product],
    headsVariant: option.headsVariant || (product === "x1" ? XPAGE_VARIANTS.x1_heads : XPAGE_VARIANTS.x2_heads),
    offeredQty: option.offeredQty || 0,
    matchedKey: bundleKey,
  };
}

/**
 * Append discount and clean attribution to checkout URL
 */
export function buildCheckoutUrl(
  baseCheckoutUrl: string,
  discountCode = "",
  attribution: Record<string, any> = {},
  currency = "GBP"
) {
  const url = new URL(baseCheckoutUrl);

  const effectiveCurrency = currency || url.searchParams.get("currency") || "GBP";
  if (effectiveCurrency) {
    url.searchParams.set("currency", effectiveCurrency);
  }

  if (discountCode) {
    url.searchParams.set("discount", discountCode);
  }

  if (attribution && typeof attribution === "object") {
    for (const key of ALLOWED_ATTRIBUTION_KEYS) {
      const val = attribution[key];
      if (val && typeof val === "string") {
        url.searchParams.set(key, sanitizeHeaderValue(val));
      }
    }
  }

  return url.toString();
}

export function brandedCheckoutUrl(href: string, product: "x1" | "x2" | "x1_heads" | "x2_heads" | "flosser" = "x2") {
  if (typeof href !== "string") throw new Error("XPage did not return a checkout session.");
  const url = new URL(href);
  const brandedOrigin = XPAGE_LANDING_URLS[product];
  if (!brandedOrigin) throw new Error("Unknown Miroooo checkout destination.");
  const allowedOrigins = [XPAGE_STORE_URL, brandedOrigin, ...Object.values(XPAGE_LANDING_URLS)];
  if (
    !allowedOrigins.includes(url.origin) ||
    url.username ||
    url.password ||
    !/\/checkout\/[\da-f]{64}$/i.test(url.pathname)
  ) {
    throw new Error("XPage returned an unexpected checkout destination.");
  }
  return new URL(url.pathname, brandedOrigin).toString();
}

function validatePublishedBundle(
  session: any,
  product: "x1" | "x2" | "x1_heads" | "x2_heads" | "flosser",
  payload: any
) {
  const selected = session.bundle?.options?.find((option: any) => option.id === payload.bundle_option_id);
  if (!selected) {
    throw new Error("The published XPage bundle has changed; checkout was not created.");
  }

  if (product === "flosser") {
    const flosserList = payload.flossers || payload.brushes || [];
    const condition = selected.conditions?.[0];
    if (!condition || condition.product?.status !== "ACTIVE") {
      throw new Error("The published XPage bundle has changed; checkout was not created.");
    }
    const variants = condition.product?.variants || [];
    const firstFlosser = flosserList[0];
    if (!firstFlosser || !variants.some((v: any) => v.id === firstFlosser && v.is_visible)) {
      throw new Error("The published XPage bundle has changed; checkout was not created.");
    }

    const offeredSelections: Record<string, string[]> = {};
    if (Array.isArray(selected.offered)) {
      for (const item of selected.offered) {
        const prodId = (item.product?.id || item.product_id || "").toLowerCase();
        const slug = (item.product?.slug || item.product?.handle || "").toLowerCase();
        const isGiftCard =
          prodId === "a2f687d2-56cd-4709-95a5-e6d280070c18" ||
          slug === "miroooo-gift-card" ||
          item.product?.variants?.some((v: any) => v.id === XPAGE_VARIANTS.gift_card) ||
          (item.product?.name || "").toLowerCase().includes("gift card");
        const isPackageProtection =
          prodId === "a2f6df9e-faf7-438b-a65a-da26ee25ce03" ||
          slug === "miroooo-package-protection" ||
          item.product?.variants?.some((v: any) => v.id === XPAGE_VARIANTS.package_protection) ||
          (item.product?.name || "").toLowerCase().includes("package protection");

        if (isPackageProtection) {
          offeredSelections[item.id] = Array(item.quantity).fill(XPAGE_VARIANTS.package_protection);
        } else if (isGiftCard) {
          offeredSelections[item.id] = Array(item.quantity).fill(XPAGE_VARIANTS.gift_card);
        } else {
          const secondFlosser = flosserList[1] || firstFlosser;
          offeredSelections[item.id] = Array(item.quantity).fill(secondFlosser);
        }
      }
    }

    return {
      bundle_option_id: selected.id,
      bundle_selected_variants: {
        conditions: { [condition.id]: [firstFlosser] },
        offered: offeredSelections,
      },
    };
  }

  const quantity = payload.brushes?.length || 0;
  const condition = selected?.conditions?.find((item: any) => item.quantity === quantity);
  const offered =
    payload.offeredQty > 0
      ? selected?.offered?.find(
          (item: any) =>
            item.product?.variants?.some((variant: any) => variant.id === payload.headsVariant)
        )
      : null;
  const variants = condition?.product?.variants || [];
  const chosen = payload.brushes || [];

  if (
    !selected ||
    !condition ||
    condition.quantity !== quantity ||
    condition.product?.status !== "ACTIVE" ||
    !chosen.every((id: string) => variants.some((variant: any) => variant.id === id && variant.is_visible)) ||
    (payload.offeredQty > 0 &&
      (!offered ||
        offered.quantity !== payload.offeredQty ||
        offered.product?.status !== "ACTIVE" ||
        !offered.product.variants.some((variant: any) => variant.id === payload.headsVariant && variant.is_visible)))
  ) {
    throw new Error("The published XPage bundle has changed; checkout was not created.");
  }

  const offeredSelections: Record<string, string[]> = {};
  if (Array.isArray(selected.offered)) {
    for (const item of selected.offered) {
      const prodId = (item.product?.id || item.product_id || "").toLowerCase();
      const slug = (item.product?.slug || item.product?.handle || "").toLowerCase();
      const isGiftCard =
        prodId === "a2f687d2-56cd-4709-95a5-e6d280070c18" ||
        slug === "miroooo-gift-card" ||
        item.product?.variants?.some((v: any) => v.id === XPAGE_VARIANTS.gift_card) ||
        (item.product?.name || "").toLowerCase().includes("gift card");
      const isPackageProtection =
        prodId === "a2f6df9e-faf7-438b-a65a-da26ee25ce03" ||
        slug === "miroooo-package-protection" ||
        item.product?.variants?.some((v: any) => v.id === XPAGE_VARIANTS.package_protection) ||
        (item.product?.name || "").toLowerCase().includes("package protection");

      if (isPackageProtection) {
        offeredSelections[item.id] = Array(item.quantity).fill(XPAGE_VARIANTS.package_protection);
      } else if (isGiftCard) {
        offeredSelections[item.id] = Array(item.quantity).fill(XPAGE_VARIANTS.gift_card);
      } else {
        offeredSelections[item.id] = Array(item.quantity).fill(payload.headsVariant);
      }
    }
  } else if (offered) {
    offeredSelections[offered.id] = Array(payload.offeredQty).fill(payload.headsVariant);
  }

  return {
    bundle_option_id: selected.id,
    bundle_selected_variants: {
      conditions: { [condition.id]: chosen },
      offered: offeredSelections,
    },
  };
}

/**
 * Create tokenized XPage Cart Checkout session
 */
export async function createXpageCartCheckout({
  cart = [],
  discountCode = "",
  attribution = {},
  currency = "GBP",
  forceStandardCart = false,
}: {
  cart: any[];
  discountCode?: string;
  attribution?: Record<string, any>;
  currency?: string;
  forceStandardCart?: boolean;
}) {
  const isPromo = ["MIROOOO10", "MIROOOO"].includes(String(discountCode).trim().toUpperCase());
  const bundlePayload = forceStandardCart ? null : detectBundlePayload(cart, discountCode);

  if (bundlePayload) {
    const product: "x1" | "x2" | "x1_heads" | "x2_heads" | "flosser" = bundlePayload.product;
    const session = await loadXpageSession(currency, product);
    const publishedPayload = validatePublishedBundle(session, product, bundlePayload);
    const response = await fetch(`${session.origin}/create-bundle-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": session.csrfToken,
        Origin: session.origin,
        Referer: session.url,
        Cookie: `xp_currency=${currency}${session.cookieHeader ? `; ${session.cookieHeader}` : ""}`,
      },
      body: JSON.stringify({ ...publishedPayload, landing_page_id: session.landingPageId }),
      redirect: "error",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`XPage bundle checkout failed (${response.status}).`);
    const data = await response.json();
    if (data.status !== "success") throw new Error("XPage could not prepare the selected bundle.");

    return {
      ok: true,
      checkoutUrl: buildCheckoutUrl(brandedCheckoutUrl(data.checkout_url, product), "", attribution, currency),
      cart: mapCartToXpageVariants(cart),
      isBundle: true,
      isPromoBundle: isPromo,
    };
  }

  // Ordinary checkout cannot price a storefront-only gift as free. Omit gift placeholders
  const paidCart = cart.filter(
    (line: any) => line.isFree !== true && !/(?:^|:)free(?:$|:)/i.test(String(line.id || ""))
  );
  const xpageLines = mapCartToXpageVariants(paidCart);
  if (!xpageLines.length) {
    throw new Error("No valid Miroooo variants found in cart.");
  }

  const session = await loadXpageSession(currency, "store");
  const setCartUrl = `${XPAGE_STORE_URL}/set-cart?checkout=true`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    Origin: XPAGE_STORE_URL,
    Referer: `${XPAGE_STORE_URL}/?currency=${encodeURIComponent(currency)}`,
    Cookie: session.cookieHeader || `xp_currency=${currency}`,
  };

  if (session.xsrfToken) {
    headers["X-XSRF-TOKEN"] = session.xsrfToken;
    headers["X-CSRF-TOKEN"] = session.xsrfToken;
  }

  const payload = {
    cart: xpageLines,
  };

  const setCartRes = await fetch(setCartUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
  });
  if (!setCartRes.ok) throw new Error(`XPage cart checkout failed (${setCartRes.status}).`);

  const setCartCookies = (setCartRes.headers as any).getSetCookie
    ? (setCartRes.headers as any).getSetCookie()
    : [setCartRes.headers.get("set-cookie")].filter(Boolean);

  const allCookies = [...session.setCookieHeaders, ...setCartCookies]
    .map((c: string) => c.split(";")[0])
    .join("; ");

  const setCartText = await setCartRes.text();
  let setCartJson: any = null;
  try {
    setCartJson = JSON.parse(setCartText);
  } catch {}

  const checkoutEndpoint = setCartJson?.checkout_url || `${XPAGE_STORE_URL}/checkout`;
  let baseCheckoutUrl: string = checkoutEndpoint;

  const checkoutRes = await fetch(checkoutEndpoint, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      Origin: XPAGE_STORE_URL,
      Referer: `${XPAGE_STORE_URL}/?currency=${encodeURIComponent(currency)}`,
      Cookie: allCookies,
    },
    redirect: "manual",
  });

  const location = checkoutRes.headers.get("location");
  if (location && location.includes("/checkout/")) {
    baseCheckoutUrl = location.startsWith("http") ? location : `${XPAGE_STORE_URL}${location}`;
  } else if (setCartJson && setCartJson.checkout_url && setCartJson.checkout_url.includes("/checkout/")) {
    baseCheckoutUrl = setCartJson.checkout_url;
  } else {
    baseCheckoutUrl = location || checkoutEndpoint;
  }

  const x1Variants = new Set([
    XPAGE_VARIANTS.x1_pink,
    XPAGE_VARIANTS.x1_grey,
    XPAGE_VARIANTS.x1_silver,
    XPAGE_VARIANTS.x1_pink_6pc,
    XPAGE_VARIANTS.x1_grey_6pc,
    XPAGE_VARIANTS.x1_silver_6pc,
    XPAGE_VARIANTS.x1_heads,
  ]);
  const flosserVariants = new Set([
    XPAGE_VARIANTS.flosser_black_7,
    XPAGE_VARIANTS.flosser_black_4,
    XPAGE_VARIANTS.flosser_white_7,
    XPAGE_VARIANTS.flosser_white_4,
  ]);
  const product: "x1" | "x2" | "x1_heads" | "x2_heads" | "flosser" = xpageLines.some((line) =>
    flosserVariants.has(line.variant_id as any)
  )
    ? "flosser"
    : xpageLines.every((line) => line.variant_id === XPAGE_VARIANTS.x1_heads)
    ? "x1_heads"
    : xpageLines.every((line) => line.variant_id === XPAGE_VARIANTS.x2_heads)
    ? "x2_heads"
    : xpageLines.every((line) => x1Variants.has(line.variant_id as any))
    ? "x1"
    : "x2";
  const finalCheckoutUrl = buildCheckoutUrl(brandedCheckoutUrl(baseCheckoutUrl, product), "", attribution, currency);

  return {
    ok: true,
    checkoutUrl: finalCheckoutUrl,
    cart: xpageLines,
    isBundle: false,
    isPromoBundle: false,
  };
}

export default {
  XPAGE_STORE_URL,
  XPAGE_VARIANTS,
  XPAGE_MIROOOO_VARIANTS,
  XPAGE_BUNDLES,
  ALLOWED_ATTRIBUTION_KEYS,
  loadXpageSession,
  detectBundlePayload,
  mapCartToXpageVariants,
  buildCheckoutUrl,
  brandedCheckoutUrl,
  createXpageCartCheckout,
};
