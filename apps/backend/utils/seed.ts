import { z } from "zod";

const CatalogItemSchema = z.tuple([
  // Item ID
  z.string().uuid(),
  // Code
  z.string().min(3),
  // Color
  z.string(),
  // Size
  z.string().optional().nullable(),
  // Description
  z.string().optional().nullable(),
  // Location
  z.string(),
]);

const StorageItemSchema = z.tuple([
  // Storage ID
  z.string().uuid(),
  // Storage Location
  z.string(),
  // Item Id
  z.string().uuid(),
  // Cartons
  z.number(),
  // Pieces
  z.number(),
]);

export const catalogData: z.infer<typeof CatalogItemSchema>[] = [
  ["fbe3d393-98a2-4e6b-b2fc-67f11436f8f2", "AH022", "WHITE", null, "HBC Unstructured Hat", "11S11"],

  ["ab22dc9e-13b9-44b3-945b-aa090dbc249f", "AH097", "BLACK", null, "Acrylic Two Tone Beanie", "11AA31"],
  ["5b64af45-2785-422e-a179-45d24494a98e", "AH097", "NAVY", null, "Acrylic Two Tone Beanie", "11AA31"],

  ["46331e1d-426a-4433-baf0-9234aa17a63a", "AH129", "BLACK, KHAKI", null, "Enzyme Washed Cap Sandwich", "11Y31/41"],
  ["18c652bc-c827-46db-8c47-84e44d9c100d", "AH129", "KHAKI, NAVY", null, "Enzyme Washed Cap Sandwich", "11Y32"],
  ["03fe64a9-ab6a-4336-8bda-a0e75497f81e", "AH129", "NAVY, KHAKI", null, "Enzyme Washed Cap Sandwich", "11Y32"],
  ["9feb7467-db0c-44c8-84ec-a93c782c26f5", "AH129", "RED, NAVY", null, "Enzyme Washed Cap Sandwich", "11Y31"],

  ["2fccfef4-c28d-4b50-ab4a-9db9ec4a7c1a", "AH130", "BLACK", null, "Enzyme Washed Cap", "11X31/41"],
  ["bf8567b0-b454-42cd-b16b-427819151879", "AH130", "BOTTLE", null, "Enzyme Washed Cap", "11X31"],
  ["1c7c8921-6289-4a57-a9ac-2b86f5867ffc", "AH130", "KHAKI", null, "Enzyme Washed Cap", "11X41"],
  ["424745d3-7382-41fe-8f67-bcc36adb97e0", "AH130", "NAVY", null, "Enzyme Washed Cap", "11X41"],
  ["deca7f83-c6da-49f5-9ee7-a531aa5043e3", "AH130", "ORANGE", null, "Enzyme Washed Cap", "11X41"],
  ["08c4dda9-588e-433c-8714-93247c115cd3", "AH130", "RED", null, "Enzyme Washed Cap", "11X41"],

  ["64e6cf92-4ef5-4781-8ece-efce24165150", "AH139", "WHITE, NAVY", null, "Kids Snapback Cap", "21R31"],

  ["27398d58-08f7-4028-a878-6fa905fc7034", "AH142", "BLACK", null, "Mamba Cap", "21T11"],
  ["97650a7d-e51e-4a99-afa1-83600e1f81c1", "AH142", "WHITE", null, "Mamba Cap", "21T11"],

  ["cd15debc-3bc2-4bac-9215-ab4984d46e6e", "AH150", "BLACK", null, "Mesh Design Cap", "11S41"],
  ["068a2758-da4f-417d-b9c7-357c9f15c61d", "AH150", "BLACK, RED", null, "Mesh Design Cap", "11S31"],
  ["911df611-e4b2-4b9d-bc35-a5af26fb56e6", "AH150", "FLURO ORANGE", null, "Mesh Design Cap", "11S21"],
  ["8672a703-e590-41e7-965b-3b5a457bcc8f", "AH150", "FLURO ORANGE, BLACK", null, "Mesh Design Cap", "11S31"],
  ["fe28b898-14e1-4ebc-919c-5f8ba7366aeb", "AH150", "FLURO YELLOW", null, "Mesh Design Cap", "11S21"],
  ["964da62e-a439-43e5-af5d-2d67061f5424", "AH150", "FLURO YELLOW, BLACK", null, "Mesh Design Cap", "11S31"],
  ["52ed3d6c-b2d7-4410-bcfc-e378f7682a55", "AH150", "MAROON", null, "Mesh Design Cap", "11S31"],
  ["666d69a3-da9e-4748-983d-bcc476074554", "AH150", "NAVY", null, "Mesh Design Cap", "11S31/41"],
  ["eb0aa750-f6da-4ad4-b5d1-02c2610b2e01", "AH150", "NAVY, RED", null, "Mesh Design Cap", "11S31"],
  ["fdd8f045-89ee-492e-9c0d-dc84184876b5", "AH150", "NAVY, WHITE", null, "Mesh Design Cap", "11S21"],
  ["9c4cf9d5-c236-44ca-9f19-309134c77af6", "AH150", "RED", null, "Mesh Design Cap", "11S41"],
  ["01b7971a-65a0-4778-b63d-070f76a7596e", "AH150", "ROYAL", null, "Mesh Design Cap", "11S41"],
  ["d4943fe6-a739-4faa-ba6c-a81494e85bdd", "AH150", "WHITE", null, "Mesh Design Cap", "11S41"],

  ["3e146711-1be9-43d8-995d-b100b8f104d8", "AH152", "BEIGE, WHITE, BLACK", null, "Ascent Cap", "11Q32/42"],
  ["6850750e-301d-4314-8462-3f337aafe3d1", "AH152", "BLACK, WHITE, HOT PINK", null, "Ascent Cap", "11Q32"],
  ["e18ec2b9-49f6-472e-99e8-47809fe5e925", "AH152", "CHARCOAL, WHITE, BLACK", null, "Ascent Cap", "11Q32"],
  ["b283dd08-5c0c-43bb-a9cc-f6f56ad32494", "AH152", "NAVY, WHITE, DARK GREY", null, "Ascent Cap", "11Q32"],
  ["1400f934-8e94-4bce-af74-8d96b7aeb651", "AH152", "ROYAL, WHITE, GOLD", null, "Ascent Cap", "11Q32"],

  ["b7ac26ab-b87d-4a32-8029-e38ff33fece5", "AH159", "BLACK", null, "CAZAMATAZ Cap", "21D31"],
  ["b9c9640c-146c-4968-bc39-6cca49912833", "AH159", "GREY", null, "CAZAMATAZ Cap", "21D31"],
  ["2eceea23-977b-4638-b9be-fd2ec2602ed7", "AH159", "MARBLE", null, "CAZAMATAZ Cap", "21D31"],
  ["22a4bb9e-5ae3-4cdd-a56b-126e738ad79d", "AH159", "NAVY", null, "CAZAMATAZ Cap", "21D31"],
  ["f5b083ed-0916-471d-9995-125a6fe52ea4", "AH159", "RED", null, "CAZAMATAZ Cap", "21D31"],
  ["834be534-247d-4d9a-ab3f-5134d80b54fe", "AH159", "ROYAL", null, "CAZAMATAZ Cap", "21D31"],

  ["8156d893-1890-429d-966d-38b046b08c76", "AH163", "BLACK", null, "Reflex Cap", "11H21"],
  ["cb7e9a82-3f16-4142-b376-2db5dd3faeea", "AH163", "CHARCOAL", null, "Reflex Cap", "11H21"],
  ["4babc074-a514-4f52-94f2-e3fe121e0e50", "AH163", "NAVY", null, "Reflex Cap", "11H21"],
  ["b0defdea-5ce0-4457-8776-6a6b5ce0215f", "AH163", "WHITE", null, "Reflex Cap", "11H21"],
  ["7f578823-0815-4435-83c2-95c2630ac818", "AH165", "BEIGE", null, "Visor", "11O22"],

  ["01f90a40-f2fc-4c94-a7e6-587a3e0e583c", "AH230", "AQUA", null, "Heavy Brushed Cotton Cap", "21D11"],
  ["0d9f9723-dc45-4cba-a429-bfd7390089d1", "AH230", "BLACK", null, "Heavy Brushed Cotton Cap", "21B12"],
  ["0f1a65bf-7389-411f-820f-2cba52ec3a4a", "AH230", "CHARCOAL", null, "Heavy Brushed Cotton Cap", "21B12"],
  ["d8f68ccf-18e1-4359-b334-5def322bbbf4", "AH230", "MAROON", null, "Heavy Brushed Cotton Cap", "21B11"],
  ["1fe22d42-cbcd-4b18-a07c-177145c572bf", "AH230", "NAVY", null, "Heavy Brushed Cotton Cap", "21B11"],
  ["fda10202-16cb-4346-92a9-ab987a9524d7", "AH230", "RED", null, "Heavy Brushed Cotton Cap", "21B11"],
  ["5569bff6-4dc8-41d8-ac46-f468405a42a7", "AH230", "WHITE", null, "Heavy Brushed Cotton Cap", "21B11"],

  ["5875f39e-5adb-4aae-b8d5-05b6c1810cc5", "AH238", "BLACK", null, "Cotton Back Coolde Cap", "11V31"],
  ["2e7a92a9-dc15-4e72-a4db-9175725b4dfd", "AH238", "NAVY", null, "Cotton Back Coolde Cap", "11V21/31"],
  ["3f62cc5c-3ae7-4d05-8406-527a4f64b8ce", "AH238", "WHITE", null, "Cotton Back Coolde Cap", "11V31"],

  ["f919c180-8152-43bb-9e68-d4efba4d76b3", "AH295", "BLACK", null, "Polymesh Trucker Cap", "11M11"],
  ["eeac0ad5-8155-4472-97c8-6b85b23dc39f", "AH295", "CHARCOAL", null, "Polymesh Trucker Cap", "11M32"],
  ["53c292a0-833f-4a6e-a585-520b8da1a7e9", "AH295", "NAVY", null, "Polymesh Trucker Cap", "11M12"],
  ["bcaf8419-4428-4b08-bc82-4568f8d18f8a", "AH295", "RED", null, "Polymesh Trucker Cap", "11M31"],
  ["8380ee86-7b8b-41e4-9762-16851ba54381", "AH295", "WHITE, NAVY", null, "Polymesh Trucker Cap", "11M21"],
  ["a6cd79e1-4c21-4c48-bb30-07f007b5ea8b", "AH295", "WHITE, PINK", null, "Polymesh Trucker Cap", "11M31"],
  ["34826911-ba7f-4419-bfe2-cac3ffefb2c3", "AH295", "WHITE, ROYAL", null, "Polymesh Trucker Cap", "11M32"],

  ["10cf6d6b-5e13-4f4e-85be-4c74473caff7", "AH317", "BOTTLE", null, "JK Cap", "21D31"],
  ["8fc31e03-0fda-4c78-aeed-e2c4b360b944", "AH317", "MARBLE", null, "JK Cap", "21D31"],
  ["bc107174-0361-4d35-a859-35f182499c36", "AH317", "MAROON", null, "JK Cap", "21D31"],
  ["c6461c15-3a01-43fe-b8bc-67a7394df0ec", "AH317", "ROYAL", null, "JK Cap", "21D31"],
  ["18d8f0de-292f-4bc1-9752-7e3512dc2eb3", "AH317", "RED", null, "JK Cap", "21D31"],

  ["57215869-8a64-499d-bd50-e3d8d350cbad", "AH328", "ROYAL", null, "SAB Cap", "21E21"],

  ["534e1b80-6c0c-4f57-978a-0691f76929bc", "AH331", "BLACK", null, "D-Lux 5 Panel Cap", "11T32"],
  ["6c5bdc24-0076-4774-8f10-ec405db8feb0", "AH331", "CHARCOAL", null, "D-Lux 5 Panel Cap", "11T42"],
  ["41151f01-0f17-45c9-9a8e-b0a1398d5190", "AH331", "MAROON", null, "D-Lux 5 Panel Cap", "11T42"],
  ["cee3463d-c6e6-4fbf-bf1d-27f52fe649af", "AH331", "NAVY", null, "D-Lux 5 Panel Cap", "11T32"],
  ["95d253e4-a93d-4d47-9605-eebe1a07ff90", "AH331", "OLIVE", null, "D-Lux 5 Panel Cap", "11T42"],
  ["cc898158-b2ac-4687-88e6-9959eff91b0d", "AH331", "RED", null, "D-Lux 5 Panel Cap", "11T42"],

  ["28699d5b-b66f-4f3c-bfe3-3de37e36097b", "AH332", "NAVY, GREY", null, "NORTH WIND Cap", "21V21"],

  ["729bc528-82d4-4444-8ce5-4e8a640872ca", "AH385", "NAVY", null, "Denver Drill Mesh", "11M41"],

  ["75f45980-a064-4da5-bcd4-1d9d10a1557a", "AH456", "BLACK, WHITE, BLACK, BLACK", null, "A-Frame Striped Trucker Cap", "2GC32"],
  ["a57b5704-ae73-464b-b769-54377c1a3588", "AH456", "MAROON, WHITE, MAROON, WHITE", null, "A-Frame Striped Trucker Cap", "2GC42"],
  ["c126abf0-ca07-4c73-ae50-9ccb4820b10f", "AH456", "NAVY, GREY, NAVY, WHITE", null, "A-Frame Striped Trucker Cap", "2GC41"],
  ["b9656bf3-44a4-43ed-8afc-58cad39acffe", "AH456", "KHAKI, BLACK, KHAKI, KHAKI", null, "A-Frame Striped Trucker Cap", "2GB42"],
  ["5d6cc0a0-b255-40d7-8757-e5443cfaf596", "AH456", "PINK, BLACK, WHITE, PINK", null, "A-Frame Striped Trucker Cap", "2GB41"],
  ["ee9b4cd1-4e9c-4fc9-b666-eb7304078aa2", "AH456", "RED, RED, WHITE, WHITE", null, "A-Frame Striped Trucker Cap", "2GC41"],

  ["b4083c95-d4d5-4a69-8be7-1278e433b510", "AH500", "BLACK", null, "100% cotton - 6 Panel Cap", "11L31"],
  ["234e47be-9892-4f1a-a5c7-060e8740c4ad", "AH500", "NAVY", null, "100% cotton - 6 Panel Cap", "11L41"],

  ["1d7a8311-72c6-46ab-b381-a6a119e532c7", "AH525", "BLACK, WHITE, RED", null, "Adventure Cap", "11H41"],
  ["36f9477e-8f6f-497e-bf4b-10486348a6c6", "AH525", "BOTTLE, WHITE, RED", null, "Adventure Cap", "11H42"],
  ["a39205c0-f1d7-48a4-992a-9fee9fa6a32a", "AH525", "MAROON, WHITE, NAVY", null, "Adventure Cap", "11H42"],
  ["7560204a-e97d-463b-9e8e-1bf5fd005f51", "AH525", "NAVY, WHITE, GREY", null, "Adventure Cap", "11H41"],
  ["c7b65320-88c6-4dc9-bcce-6a0dc02659a4", "AH525", "NAVY, WHITE, RED", null, "Adventure Cap", "11H42"],
  ["2b29bf98-7142-451e-8435-edacd75b1543", "AH525", "NAVY, WHITE, SKY BLUE", null, "Adventure Cap", "11H42"],
  ["0fcd5015-180d-4a68-a3f4-5eb7ca6faeee", "AH525", "ROYAL, WHITE, BLACK", null, "Adventure Cap", "11H42"],
  ["008993fc-ecd4-46cf-a42a-ec7984c70c08", "AH525", "WHITE, RED, BLACK", null, "Adventure Cap", "11H42"],

  ["64ee868b-968b-4260-aeb8-b30e1821dd48", "AH631", "BLACK", "S/M", "Mesh Bucket Hat", "21M32"],
  ["51e3664a-c794-4d20-bed9-a5b38c3a1221", "AH631", "BLACK", "L/XL", "Mesh Bucket Hat", "21M32"],
  ["2e75e9ac-c51f-4fad-9898-ad2a3530d01e", "AH631", "NAVY", "S/S", "Mesh Bucket Hat", "21M32"],
  ["c82779be-045c-4259-8d52-44913e152932", "AH631", "NAVY", "L/XL", "Mesh Bucket Hat", "21M11"],

  ["08168613-7d98-4b60-af13-d6b310434541", "DAH650", "BLACK", "S/S", "Trilby Hat", "21ZZ41"],

  ["cb43676f-6aa2-4bb9-ab94-8e6a83332c7e", "AH677", "BLACK", "50cm", "KINDY Hat", "11Y21"],
  ["2951c30e-f7c9-48db-b901-e95acf74a242", "AH677", "MAROON", "50cm", "KINDY Hat", "11F11"],
  ["226177a5-cd9a-49b5-8b59-89eb21d15c5a", "AH677", "MAROON", "58cm", "KINDY Hat", "11F41"],
  ["1ae700a3-ea8b-469a-aee0-525f5e3d66e4", "AH677", "MAROON", "54cm", "KINDY Hat", "11F31"],
  ["d2cbea68-94b2-4ec1-a77a-c0fccd929758", "AH677", "RED", "54cm", "KINDY Hat", "11Y11"],
  ["d84ad53b-f256-4252-8f89-7db17a42b502", "AH677", "ROYAL", "54cm", "KINDY Hat", "11Y11"],

  ["89f01a37-ad65-4a62-a3ee-e443c7783493", "AH695", "BLACK, GOLD", "S/S", "HBC Sandwich Bucket Hat", "21I11"],
  ["f1d048da-b04f-4785-bfcc-8e835f3fa687", "AH695", "BLACK, GOLD", "S/M", "HBC Sandwich Bucket Hat", "21G32"],
  ["2ecb9475-b8d4-4c0a-be9b-3d440a1d8c6c", "AH695", "BLACK, GOLD", "L/XL", "HBC Sandwich Bucket Hat", "21G31"],
  ["4894a40b-f6b3-48a4-980b-f06ccfa95327", "AH695", "BLACK, RED", "S/S", "HBC Sandwich Bucket Hat", "21I32"],
  ["3de7ac05-118f-48e2-96b6-2c6661be11b8", "AH695", "BLACK, RED", "S/M", "HBC Sandwich Bucket Hat", "21H12"],
  ["c32b7b2f-5575-4d20-abd0-afa92f5e08d3", "AH695", "BLACK, RED", "L/XL", "HBC Sandwich Bucket Hat", "21H11"],
  ["4cf392ab-a2ec-4347-bd14-1620542979aa", "AH695", "BLACK, WHITE", "S/S", "HBC Sandwich Bucket Hat", "21I22"],
  ["b5ef2435-560f-4018-9a0f-87a025f019ed", "AH695", "BLACK, WHITE", "S/M", "HBC Sandwich Bucket Hat", "21G22"],
  ["5405ee77-4f17-4df9-bb65-41df056800de", "AH695", "BLACK, WHITE", "L/XL", "HBC Sandwich Bucket Hat", "21G21"],
  ["672689e1-09b7-40af-98bb-3a3e4700f933", "AH695", "BOTTLE, GOLD", "L/XL", "HBC Sandwich Bucket Hat", "21H21"],
  ["94b3e217-dc86-4ce1-898f-ebd46a90ea02", "AH695", "BOTTLE, GOLD", "S/M", "HBC Sandwich Bucket Hat", "21H22"],
  ["a75c69c5-c23a-41c8-bc1d-cb3729695bd4", "AH695", "BOTTLE, GOLD", "S/S", "HBC Sandwich Bucket Hat", "21I31"],
  ["025cba8e-25f4-4519-bb56-66bdf1f7a816", "AH695", "CHARCOAL, BLACK", "L/XL", "HBC Sandwich Bucket Hat", "21G11"],
  ["830ebb55-cef3-4cf1-8ba2-c6957144240d", "AH695", "CHARCOAL, BLACK", "S/M", "HBC Sandwich Bucket Hat", "21M11"],
  ["0ac2cf50-f5a0-4646-a298-e35e7b3327bb", "AH695", "CHARCOAL, BLACK", "S/S", "HBC Sandwich Bucket Hat", "21I12"],
  ["bcec0762-c1e0-4980-8e78-d40046e7bf52", "AH695", "MAROON, GOLD", "L/XL", "HBC Sandwich Bucket Hat", "21H11"],
  ["d6970d6d-12c8-4ce5-99cc-5051f97cc889", "AH695", "MAROON, GOLD", "S/M", "HBC Sandwich Bucket Hat", "21H12"],
  ["8f7b6f49-47c4-46b6-889d-363c37dd3a0e", "AH695", "MAROON, GOLD", "S/S", "HBC Sandwich Bucket Hat", "21I22"],
  ["01ba8c56-f63d-425a-8b38-4554b5d7e56c", "AH695", "MAROON, NAVY", "L/XL", "HBC Sandwich Bucket Hat", "21G31"],
  ["4d2fe8fc-0960-4a3e-be5e-722b10b1b98a", "AH695", "MAROON, NAVY", "S/M", "HBC Sandwich Bucket Hat", "21G32"],
  ["8bd11918-ee9e-436a-96cd-b9a90bebfff3", "AH695", "MAROON, NAVY", "S/S", "HBC Sandwich Bucket Hat", "21I32"],
  ["e1bfe7da-3747-4695-bebb-df550f9f3a25", "AH695", "NATURAL, NAVY", "L/XL", "HBC Sandwich Bucket Hat", "21G21"],
  ["7954a72e-4361-439f-b720-27b3b37eef29", "AH695", "NATURAL, NAVY", "S/M", "HBC Sandwich Bucket Hat", "21G22"],
  ["0300ac86-527a-41c8-8a3e-fe583689579c", "AH695", "NATURAL, NAVY", "S/S", "HBC Sandwich Bucket Hat", "21I21"],
  ["bc21fba7-acbc-4b06-9581-7e228a294740", "AH695", "NAVY, GOLD", "L/XL", "HBC Sandwich Bucket Hat", "21G21"],
  ["8708d7b4-0dc0-4b6f-a0e6-3119568e93b6", "AH695", "NAVY, GOLD", "S/M", "HBC Sandwich Bucket Hat", "21G22"],
  ["3f34484b-61fe-400e-a5fc-2985d1e4ca1a", "AH695", "NAVY, GOLD", "S/S", "HBC Sandwich Bucket Hat", "21I32"],
  ["c0fb0b8c-6e32-4f24-820a-d38ce58554df", "AH695", "NAVY, RED", "L/XL", "HBC Sandwich Bucket Hat", "21H11"],
  ["f94d7dbe-5fb4-49fc-a1a6-c21f4e2dfc6b", "AH695", "NAVY, RED", "S/M", "HBC Sandwich Bucket Hat", "21H12"],
  ["457c8db9-581f-4897-a251-6c11917c2442", "AH695", "NAVY, RED", "S/S", "HBC Sandwich Bucket Hat", "21I31"],
  ["c2c43aad-9692-4306-8f49-018596666af8", "AH695", "NAVY, WHITE", "L/XL", "HBC Sandwich Bucket Hat", "21H31"],
  ["6a32b80f-1897-4280-93bc-1bf49231822e", "AH695", "NAVY, WHITE", "S/M", "HBC Sandwich Bucket Hat", "21H32"],
  ["70a01a73-e60e-4e8f-b003-830cd6658763", "AH695", "NAVY, WHITE", "S/S", "HBC Sandwich Bucket Hat", "21I11"],
  ["238fbefe-3fa0-43b5-a73e-b3273a9979d2", "AH695", "OCHRE, BLACK", "L/XL", "HBC Sandwich Bucket Hat", "21I11"],
  ["aea3f9f4-103f-438d-a8a0-3575e13fdfc8", "AH695", "OCHRE, BLACK", "S/M", "HBC Sandwich Bucket Hat", "21I12"],
  ["01dc60e3-02dd-41d7-a1ae-45de64456cde", "AH695", "OCHRE, BLACK", "S/S", "HBC Sandwich Bucket Hat", "21J11"],
  ["2e90707c-fc6d-4af8-b11c-6ff27151a2db", "AH695", "ORANGE, BLACK", "L/XL", "HBC Sandwich Bucket Hat", "21H31"],
  ["8c04fe43-26cc-4f95-9a61-d4f9aa4a3094", "AH695", "ORANGE, BLACK", "S/M", "HBC Sandwich Bucket Hat", "21H32"],
  ["b88d5d16-eae9-4059-b4b3-ab7ed92bd96a", "AH695", "ORANGE, BLACK", "S/S", "HBC Sandwich Bucket Hat", "21I21"],
  ["dfc8e7f0-d5fa-4d7e-828b-75fc2af01c4f", "AH695", "RED, BLACK", "L/XL", "HBC Sandwich Bucket Hat", "21H21"],
  ["3b7af591-dedc-4b29-a4c4-713fa5f638fc", "AH695", "RED, BLACK", "S/M", "HBC Sandwich Bucket Hat", "21H22"],
  ["90f38aea-fe15-44bc-b9aa-8876ce4ebe90", "AH695", "RED, BLACK", "S/S", "HBC Sandwich Bucket Hat", "21J11"],
  ["fc14ecb7-ed27-4308-bd74-2fe9b1dc5992", "AH695", "RED, WHITE", "L/XL", "HBC Sandwich Bucket Hat", "21G11"],
  ["5d429e93-0799-4cba-86cf-93460c51fbea", "AH695", "RED, WHITE", "S/M", "HBC Sandwich Bucket Hat", "21G12"],
  ["47d158a4-ffea-4702-ace2-5570c1b73cc2", "AH695", "RED, WHITE", "S/S", "HBC Sandwich Bucket Hat", "21I31"],
  ["76dc4a86-a1b1-4961-930c-2327d4b8e595", "AH695", "ROYAL, GOLD", "L/XL", "HBC Sandwich Bucket Hat", "21H21"],
  ["48e77414-07f9-489f-aed3-20b9564916fc", "AH695", "ROYAL, GOLD", "S/M", "HBC Sandwich Bucket Hat", "21H22"],
  ["8fc94585-50a9-4579-9ccb-b03df9732cac", "AH695", "ROYAL, GOLD", "S/S", "HBC Sandwich Bucket Hat", "21J11"],
  ["7d351caa-e1a6-11ed-b5ea-0242ac120002", "AH695", "ROYAL, WHITE", "L/XL", "HBC Sandwich Bucket Hat", "21H31"],
  ["80e1b4ed-0511-4f38-a8bd-e668e76af0e3", "AH695", "ROYAL, WHITE", "S/M", "HBC Sandwich Bucket Hat", "21H32"],
  ["c1a5e40d-5802-41a0-b7f5-49ca9beef60f", "AH695", "ROYAL, WHITE", "S/S", "HBC Sandwich Bucket Hat", "21I21"],
  ["60647f43-b4db-4cf9-adf4-dfb22eb3bf4a", "AH695", "SKY, NAVY", "L/XL", "HBC Sandwich Bucket Hat", "21G11"],
  ["98c0a983-296a-4ac5-88d0-241c380b64d9", "AH695", "SKY, NAVY", "S/M", "HBC Sandwich Bucket Hat", "21G12"],
  ["278ad4e6-5478-47fd-9dc3-617cb6c50aac", "AH695", "SKY, NAVY", "S/S", "HBC Sandwich Bucket Hat", "21I22"],
  ["054fd39f-f43e-450b-81f5-e39b3f1293b0", "AH695", "WHITE, BLACK", "L/XL", "HBC Sandwich Bucket Hat", "21G31"],
  ["c35124f6-767a-4563-8083-3c0844f7fd5e", "AH695", "WHITE, BLACK", "S/M", "HBC Sandwich Bucket Hat", "21G32"],
  ["c894a64d-4560-4bde-a2c3-d509f56b28e6", "AH695", "WHITE, BLACK", "S/S", "HBC Sandwich Bucket Hat", "21I12"],

  ["70530fe6-7987-4efe-9639-3b3b4f2263f4", "AH707", "BOTTLE", "55cm", "HBC Surf Hat", "11N41"],
  ["ae565dd8-c752-40af-a9d8-996c1e2a3bfc", "AH707", "BOTTLE", "57cm", "HBC Surf Hat", "11N31"],
  ["6a74bcaf-4517-47b6-9ba9-e5e400a7e46a", "AH707", "BOTTLE", "59cm", "HBC Surf Hat", "11N21"],
  ["1dcc1f63-a4cc-4040-a670-8db64edd0260", "AH707", "BOTTLE", "61cm", "HBC Surf Hat", "11N11"],

  ["3c99f84b-043f-4281-a6bc-9356b71b1828", "AH708", "BOTTLE", "L/XL", "Polyviscose School Hat", "11Y31"],
  ["c5006384-1a63-42b7-b7e2-75aa380dce77", "AH708", "BOTTLE", "S/M", "Polyviscose School Hat", "11Y31"],
  ["66a30a26-1aa4-4e50-9ff1-d7b429b3987d", "AH708", "BOTTLE", "S/S", "Polyviscose School Hat", "11Y41"],
  ["524719a1-91e1-4627-8728-e4e84a88536d", "AH708", "MAROON", "L/XL", "Polyviscose School Hat", "11Y31"],
  ["ae7144af-56f8-41cf-935a-fb77ecdd498d", "AH708", "MAROON", "S/M", "Polyviscose School Hat", "11Y41"],
  ["3f5ad707-6aea-4e78-82e0-788924300e6d", "AH708", "MAROON", "S/S", "Polyviscose School Hat", "11Y41"],
  ["7e402c64-51b9-4bce-8318-f573371d8d5e", "AH708", "NAVY", "L/XL", "Polyviscose School Hat", "11Y31"],
  ["0f73fc07-2a3a-4355-aa16-efebe2b002ad", "AH708", "NAVY", "S/M", "Polyviscose School Hat", "11Y41"],
  ["37177557-2f5b-4246-ad84-71b27d3351f1", "AH708", "NAVY", "S/S", "Polyviscose School Hat", "11Y41"],
  ["515b93d9-e295-4c91-bb69-ec504aba20be", "AH708", "ROYAL", "L/XL", "Polyviscose School Hat", "11Y31"],
  ["82d3e3c0-76a8-475a-bea4-85d6d221be9e", "AH708", "ROYAL", "S/M", "Polyviscose School Hat", "11Y31"],
  ["f68c5d4f-b649-4a9c-9c49-c0d62e8231b7", "AH708", "ROYAL", "S/S", "Polyviscose School Hat", "11Y41"],

  ["9ac8e454-dd15-4464-8eaf-26c515c26be0", "AH711", "BOTTLE", "55cm", "School Foam Hat", "Bay 4-1/5-1"],
  ["8062c761-1ecf-4f06-b5b3-ad16ae35a960", "AH711", "BOTTLE", "57cm", "School Foam Hat", "Bay 7-2"],
  ["f7f1e51e-47c0-4e9c-bee5-89a81967adc0", "AH711", "BOTTLE", "59cm", "School Foam Hat", "Bay 4-2/5-2"],
  ["db99db0c-82b7-49f5-9478-8ba7f5d78918", "AH711", "BOTTLE", "61cm", "School Foam Hat", "Bay 2-2"],
  ["216baabe-3846-4741-82fc-46ee210cb007", "AH711", "MAROON", "55cm", "School Foam Hat", "Bay 6-1/7-1"],
  ["175c8742-7259-4089-b7f7-aba0f401efa9", "AH711", "MAROON", "57cm", "School Foam Hat", "Bay 6-2"],
  ["5c94a65f-dacf-4cfb-b700-ce010b7c7543", "AH711", "MAROON", "59cm", "School Foam Hat", "Bay 3-2/4-2"],
  ["000d4286-bacf-4611-b65f-83ed27d4ac43", "AH711", "MAROON", "61cm", "School Foam Hat", "Bay 1-2"],
  ["15c7ad30-9268-426e-88a7-239b099696b7", "AH711", "NAVY", "55cm", "School Foam Hat", "Bay 5-1/6-1"],
  ["d070e407-ca23-427e-9bc9-7dcd8298d004", "AH711", "NAVY", "57cm", "School Foam Hat", "Bay 6-2/7-2"],
  ["77d39cfe-d0da-42d8-a34c-11365ef35539", "AH711", "NAVY", "59cm", "School Foam Hat", "Bay 4-2"],
  ["644defce-bb69-45ef-8e08-e6d90c5e4fbe", "AH711", "NAVY", "61cm", "School Foam Hat", "Bay 1-2/2-2"],
  ["a15b58dc-0dc3-42d7-aeef-50c0ea490cd8", "AH711", "ROYAL", "55cm", "School Foam Hat", "Bay 4-1"],
  ["aed9531c-8c3c-43b6-b7e6-c68494357f3b", "AH711", "ROYAL", "57cm", "School Foam Hat", "Bay 7-1"],
  ["3962ee47-6a89-4254-b1dc-77c0e3d3f24a", "AH711", "ROYAL", "59cm", "School Foam Hat", "Bay 5-2/6-2"],
  ["b6db2685-4cbd-4a4a-b07b-7783dee5d2a5", "AH711", "ROYAL", "61cm", "School Foam Hat", "Bay 3-2"],

  ["f8ec15e6-5269-4df7-b968-d5fef754a0b4", "AH713", "BLACK", "S/M", "Polycotton School Bucket Hat", "21ZZ22"],
  ["a3d5d9ad-5131-4ecd-97f3-1e3f9ec70da1", "AH713", "BLACK", "S/S", "Polycotton School Bucket Hat", "21ZZ32"],
  ["b7d6ec89-c982-46d6-a3b7-1d6fd00f26ef", "AH713", "BLACK", "M/L", "Polycotton School Bucket Hat", "21ZZ21"],
  ["b39247e9-2df9-4c8c-96e2-dfbd0dd8fddd", "AH713", "BOTTLE", "M/L", "Polycotton School Bucket Hat", "21ZZ31"],
  ["6882e382-0ad3-4295-8f7b-080eb8100549", "AH713", "BOTTLE", "S/M", "Polycotton School Bucket Hat", "21ZZ32"],
  ["1e86da3e-f397-40a2-89a1-939f5bb97c1f", "AH713", "BOTTLE", "S/S", "Polycotton School Bucket Hat", "21ZZ41"],
  ["0c1d046f-7d92-437e-b3b1-bdbda294a984", "AH713", "MAROON", "S/M", "Polycotton School Bucket Hat", "21ZZ2"],
  ["56870e06-c0bb-40f8-9a41-33201dc444f0", "AH713", "MAROON", "S/S", "Polycotton School Bucket Hat", "21ZZ42"],
  ["3ba1dbc9-5c63-4c81-95a3-6cab74e7d385", "AH713", "MAROON", "M/L", "Polycotton School Bucket Hat", "21ZZ21"],
  ["f1c188e4-e6f6-486b-be29-befd30aff739", "AH713", "NAVY", "S/M", "Polycotton School Bucket Hat", "21ZZ22"],
  ["0ba61a7a-4f25-4c74-bbf8-daea00b78967", "AH713", "NAVY", "S/S", "Polycotton School Bucket Hat", "21ZZ31"],
  ["d2f822d4-bf78-415e-a7c1-7f4b86b5ec5f", "AH713", "NAVY", "M/L", "Polycotton School Bucket Hat", "21ZZ21"],
  ["9ed64a06-af24-4e80-91e1-da5f3b325412", "AH713", "RED", "S/M", "Polycotton School Bucket Hat", "21ZZ32"],
  ["75104d13-46c5-4f3f-8307-999a6f257786", "AH713", "RED", "S/S", "Polycotton School Bucket Hat", "21ZZ41"],
  ["b2dd08b0-fa27-4cbe-9ec0-286eebff588e", "AH713", "RED", "M/L", "Polycotton School Bucket Hat", "21ZZ31"],
  ["ab1dbdcc-c75b-4080-8b00-82718a20c507", "AH713", "ROYAL", "M/L", "Polycotton School Bucket Hat", "21ZZ21"],
  ["5caaec9a-ac66-4c1b-8621-2eff2c5a43dd", "AH713", "ROYAL", "S/M", "Polycotton School Bucket Hat", "21ZZ22"],
  ["48608de1-4288-4b59-b592-973e9c01d8f4", "AH713", "ROYAL", "S/S", "Polycotton School Bucket Hat", "21ZZ42"],

  ["4ee59ee3-ec55-4223-81ac-7c815bd578f5", "AH715", "BLACK", "L/XL", "Bucket Hat", "21J31"],
  ["574f3249-7e6f-436a-90c2-503b60fee960", "AH715", "BLACK", "S/M", "Bucket Hat", "21J32"],
  ["943b8991-86f1-4f38-9cea-6dac73119b55", "AH715", "BLACK", "S/S", "Bucket Hat", "21K12"],
  ["3968635a-7de0-4548-8a6a-74b92ae3396b", "AH715", "BOTTLE", "L/XL", "Bucket Hat", "21K21"],
  ["e0ceec85-5458-486f-a54e-f42d08ee8122", "AH715", "BOTTLE", "S/M", "Bucket Hat", "21K22"],
  ["45812019-a4bb-472c-86cc-00810bdb13a0", "AH715", "BOTTLE", "S/S", "Bucket Hat", "21J12"],
  ["2d006b73-13fe-4db7-9dd2-309d0f64b64c", "AH715", "BROWN", "L/XL", "Bucket Hat", "21K31"],
  ["b1587f4b-6fcb-44a6-b03d-cffbd1758f17", "AH715", "BROWN", "S/M", "Bucket Hat", "21K32"],
  ["d375f1c1-45e1-46c6-8a61-f83696abd043", "AH715", "BROWN", "S/S", "Bucket Hat", "21K11"],
  ["23d6628c-3acb-40b3-9f2c-e89765f4d2bd", "AH715", "HOT PINK", "L/XL", "Bucket Hat", "21K21"],
  ["6919ac2d-6561-4a6b-9884-8bbb6e0908c0", "AH715", "HOT PINK", "S/M", "Bucket Hat", "21K22"],
  ["4d888ecd-c31b-445c-9d7f-42bccf59bed3", "AH715", "HOT PINK", "S/S", "Bucket Hat", "21K22"],
  ["a0468064-e074-4f98-8c22-adedecb6597f", "AH715", "KHAKI", "L/XL", "Bucket Hat", "21K31"],
  ["90f2a616-97aa-4cb4-987e-cd09552540ad", "AH715", "KHAKI", "S/M", "Bucket Hat", "21K32"],
  ["aaffd7ae-1276-4edc-86bc-b4185b7eeb03", "AH715", "KHAKI", "S/S", "Bucket Hat", "21K11"],
  ["dd2aee98-0e28-4eda-af0a-196fb1eab069", "AH715", "MAROON", "L/XL", "Bucket Hat", "21J21"],
  ["0f1caa1e-a222-46c7-a40a-1fb0466ba66d", "AH715", "MAROON", "S/M", "Bucket Hat", "21J22"],
  ["cbbc0269-df02-40fd-b676-675ee999f266", "AH715", "MAROON", "S/S", "Bucket Hat", "21K12"],
  ["c8a3a9ec-0f24-47e6-9ff7-43ad97859a81", "AH715", "NAVY", "L/XL", "Bucket Hat", "21J21"],
  ["a7d511d4-ab6d-4303-ac42-972acae1d015", "AH715", "NAVY", "S/M", "Bucket Hat", "21J22"],
  ["6dc2295c-3a59-402e-8df2-9748cf8bdbe5", "AH715", "NAVY", "S/S", "Bucket Hat", "21J12"],
  ["189d4419-b676-4c84-b8d2-d9861f98a6d1", "AH715", "RED", "L/XL", "Bucket Hat", "21J21"],
  ["7894e958-c0e9-4448-93c7-88859582064d", "AH715", "RED", "S/M", "Bucket Hat", "21J22"],
  ["9b2118ba-4bb1-4481-a6a3-3ce7d84e47c7", "AH715", "RED", "S/S", "Bucket Hat", "21K11"],
  ["8c5a99bc-5576-4364-a166-6863cc037515", "AH715", "ROYAL", "L/XL", "Bucket Hat", "21J31"],
  ["b34540e3-6f3f-4f23-8339-be5419c3c340", "AH715", "ROYAL", "S/M", "Bucket Hat", "21J32"],
  ["92b44cb4-1e5f-4d93-99cc-9e084429ab59", "AH715", "ROYAL", "S/S", "Bucket Hat", "21K12"],
  ["5e1008c6-3975-43ab-9065-358ea2f64c39", "AH715", "WHITE", "L/XL", "Bucket Hat", "21K31"],
  ["45af37a7-0722-4fff-a73c-79a09f9dc62d", "AH715", "WHITE", "S/M", "Bucket Hat", "21K32"],
  ["c87f6a76-d073-4d2d-8a8e-5f767481d03c", "AH715", "WHITE", "S/S", "Bucket Hat", "21J12"],
  ["ee492a46-49a2-4158-81b5-c7cd65ad6eaf", "AH715", "YELLOW", "L/XL", "Bucket Hat", "21J31"],
  ["9891a2bb-458b-46be-b820-b1fc1a21fdda", "AH715", "YELLOW", "S/M", "Bucket Hat", "21J32"],
  ["76db7b6c-4680-44b5-a2cb-5d7823bc8346", "AH715", "YELLOW", "S/S", "Bucket Hat", "21K21"],

  ["90106b60-09de-4868-a6cb-fe95f26de1e5", "AH718", "DARK NAVY", "55cm", "Microfibre Surf Hat", "11R11"],
  ["adb4fd50-3ada-4f0e-a6dd-40d41ef24c0e", "AH718", "DARK NAVY", "57cm", "Microfibre Surf Hat", "11Q11"],
  ["695e8d90-6f56-4a57-a221-ad5ce4cef5f1", "AH718", "DARK NAVY", "59cm", "Microfibre Surf Hat", "11Q21"],
  ["6d577022-03a5-4158-8fe5-bda2aa4d9f9d", "AH718", "DARK NAVY", "61cm", "Microfibre Surf Hat", "11Q21"],
  ["866f50c3-40eb-4347-a771-f0d6622bb3ec", "AH718", "NATURAL", "55cm", "Microfibre Surf Hat", "11Q11"],
  ["065d7a21-4b22-4de2-b906-11372cf077c4", "AH718", "NATURAL", "57cm", "Microfibre Surf Hat", "11Q11"],
  ["c2d7aed6-80da-4a85-92ff-79e4a9efd2e9", "AH718", "NATURAL", "59cm", "Microfibre Surf Hat", "11Q21"],
  ["f78d9e1b-1d8e-4c73-ac28-41dc3be4bdeb", "AH718", "NATURAL", "61cm", "Microfibre Surf Hat", "11Q21"],

  ["1c20e764-8167-40bc-8dea-264301154eec", "AH720", "BLACK", null, "Acrylic Beanie", "11BB12"],
  ["d2158e5d-97f0-4425-ab3b-913b7fb08a77", "AH720", "NAVY", null, "Acrylic Beanie", "11BB12"],
  ["5cd1bd49-437c-4ff7-98f2-098524c64ea0", "AH720", "ROYAL", null, "Acrylic Beanie", "11BB12"],

  ["7e329759-09dc-4418-9a3f-ae542af990db", "AH731", "BLACK, AUSSIE GOLD", null, "Acrylic Beanie", "11BB42"],
  ["a4a2a5db-7ece-45ea-9f0b-3f3ea202684a", "AH731", "BLACK, RED", null, "Acrylic Beanie", "11BB32"],
  ["9396427c-250b-471f-9678-e594c344da5e", "AH731", "BLACK, WHITE", null, "Acrylic Beanie", "11BB32"],
  ["f85f9668-715a-4998-a1a2-4b5db272378b", "AH731", "NAVY, AUSSIE GOLD", null, "Acrylic Beanie", "11BB32"],
  ["0af41901-8405-42e3-91d9-d4cb7bb92146", "AH731", "NAVY, RED", null, "Acrylic Beanie", "11BB32"],
  ["b690a8a3-4837-4bdc-97bc-0b657f1546db", "AH731", "NAVY, WHITE", null, "Acrylic Beanie", "11BB22"],
  ["7b352e3c-2216-4159-af8d-674cf2baf082", "AH731", "ROYAL, BLACK", null, "Acrylic Beanie", "11BB42"],
  ["5fda5fda-6c1e-44d6-ae13-e7b54a1c3112", "AH731", "ROYAL, WHITE", null, "Acrylic Beanie", "11BB42"],
  ["c4f430ad-93a9-4266-a63d-c567d58a1c03", "AH731", "SKY, NAVY", null, "Acrylic Beanie", "11BB42"],

  ["a511f643-b967-4e1f-838f-074e293e37b4", "AH733", "BLACK, WHITE", null, "Beanie", "11Y11"],

  ["aa1d46d7-538f-48ec-8cac-84f133f86b4d", "AH735", "GREY, BLACK", null, "Beanie", "11K12"],

  ["0e4e797a-6241-4e78-9a7b-3cc74114f630", "AH742", "BLACK", null, "100% Wool Beanie", "11A32"],

  ["7cdfdeb0-d6aa-4e71-adea-e5b585843afc", "AH755", "BLACK, GOLD", null, "Acrylic Cable Knit Beanie", "DUNNO"],

  ["4f18647a-96e0-4006-9790-bbec021a1d28", "AH769", "FLURO ORANGE", null, "Beanie Reflective Trim", "11BB22"],
  ["4881bda2-8d8f-48cf-bb0b-bc297b53392a", "AH769", "FLURO YELLOW", null, "Beanie Reflective Trim", "11BB22"],

  ["4165e20b-9852-420f-9d59-f882b1704e7c", "AH776", "NAVY", null, "Wrist Band 5 Inch", "1GW42"],
  ["4fdd1391-2740-4094-ad0b-f6dc91380b24", "AH776", "YELLOW", null, "Wrist Band 5 Inch", "1GW42"],
  ["48169efa-4fbb-406d-bab4-7b840aca8e7e", "AH776", "SKY", null, "Wrist Band 5 Inch", "1GW42"],
  ["ba227ac9-7858-428f-8d71-7fb96b4577ec", "AH776", "BOTTLE", null, "Wrist Band 5 Inch", "1GW42"],
  ["3d8d832f-d2ad-4bae-9108-be62b537bfd6", "AH776", "PINK", null, "Wrist Band 5 Inch", "1GW42"],
  ["53129944-3289-4f43-a85d-ec2696cf83d6", "AH776", "RED", null, "Wrist Band 5 Inch", "1GW42"],
  ["a894b7c2-1140-4f3c-bfc8-373ad1798c34", "AH776", "ROYAL", null, "Wrist Band 5 Inch", "1GW52"],
  ["ce599020-1d33-43b5-8b47-f05dfae9a8d4", "AH776", "BLACK", null, "Wrist Band 5 Inch", "1GW32"],
  ["523c2f09-8faf-481c-b4c0-ed2bdf4fd643", "AH776", "ORANGE", null, "Wrist Band 5 Inch", "1GW42"],
  ["3cb4209f-4905-4ec9-bb66-ff73ecf6b211", "AH776", "WHITE", null, "Wrist Band 5 Inch", "1GW42"],

  ["7214ff02-449f-45ad-9ab1-182bc26ca308", "AH777", "WHITE", null, "Headband", "1GW52"],
  ["a3898ad2-7498-4e8e-8508-a8719aeea932", "AH777", "SKY", null, "Headband", "1GW52"],
  ["335483c7-a34d-4077-b3ce-3c9232447045", "AH777", "RED", null, "Headband", "1GW52"],
  ["ab283536-2719-41f8-ac92-7bb5acf429d8", "AH777", "BOTTLE", null, "Headband", "1GW52"],
  ["10660807-6166-45b0-8abf-69b1bdc3dc70", "AH777", "YELLOW", null, "Headband", "1GW52"],
  ["dbb51415-a5fe-4858-b0c9-482b9a9385d8", "AH777", "BLACK", null, "Headband", "1GW52"],
  ["c23d8d15-09dc-4db6-98d8-8a13cae85fb9", "AH777", "NAVY", null, "Headband", "1GW52"],
  ["b7e89147-9888-4016-a7a9-5fc80afddba6", "AH777", "ROYAL", null, "Headband", "1GW52"],
  ["4e8ece4b-c792-4475-8a49-6dc43eabd66e", "AH777", "ORANGE", null, "Headband", "1GW52"],
  ["d0ab2322-5a54-4d74-85cc-07e0df64ac77", "AH777", "PINK", null, "Headband", "1GW52"],

  ["04a9e8ae-4393-4e8c-9464-2cdf3bd574ed", "AH805", "BLACK, AUSSIE GOLD", null, "Acrylic Scarf", "11BB51"],
  ["3c5e91e0-a429-488b-b0c6-8d8bef2c2757", "AH805", "BLACK, ORANGE", null, "Acrylic Scarf", "11BB41"],
  ["9118eb7e-bca2-4dee-8036-56248e0620a9", "AH805", "BLACK, RED", null, "Acrylic Scarf", "11BB51"],
  ["3ed37e8e-7b90-4b68-8d7f-20435ac57dd6", "AH805", "BOTTLE, AUSSIE GOLD", null, "Acrylic Scarf", "11BB41"],
  ["45e3756d-2c26-4682-8a01-5fb651d200c6", "AH805", "MAROON, WHITE", null, "Acrylic Scarf", "11BB52"],
  ["f6ad833d-4400-4af3-a904-17aa12c07bff", "AH805", "NAVY, RED", null, "Acrylic Scarf", "11BB41"],
  ["24389f67-7af8-4e0b-bc60-995cc255ca17", "AH805", "NAVY, WHITE", null, "Acrylic Scarf", "11BB41"],
  ["4f103753-01d2-4625-87e0-7e1c1c68574d", "AH805", "NAVY, AUSSIE GOLD", null, "Acrylic Scarf", "11BB51"],
  ["46a5bcab-c202-4196-a621-dd8168276d07", "AH805", "RED, WHITE", null, "Acrylic Scarf", "11BB51"],
  ["ebabcd17-9e0d-463e-bbef-f114dcdecc42", "AH805", "ROYAL, AUSSIE GOLD", null, "Acrylic Scarf", "11BB41"],

  ["edb8d44f-bf9e-467c-b343-b8a96d55c5b3", "AH809", "BLACK, GOLD", null, "Acrylic Scarf", "DUNNO"],
  ["a0e9d02e-c3a4-4a01-a7a5-b5fc8dd04a03", "AH809", "BLACK, RED", null, "Acrylic Scarf", "DUNNO"],
  ["3ffed7b3-caba-481d-985a-9f5f8186fa8f", "AH809", "BOTTLE, GOLD", null, "Acrylic Scarf", "DUNNO"],
  ["5690c9ae-0c32-4970-9d0d-bf465d9ca9ba", "AH809", "NAVY, GOLD", null, "Acrylic Scarf", "DUNNO"],

  ["4a089155-50d3-41d0-a835-bb3551f3224f", "AH999", "NATURAL", null, "Straw Hat", "21Z11/12"],

  ["f1572518-bf03-4caa-8d4c-522ca2578451", "B6320", "WHITE, RED, BLACK", null, "YP Classics", "2GZ21"],

  ["cf1b0404-2ff6-400e-ac45-5258a43f0d7f", "G1082", "GOLD, WHITE, BOTTLE", null, "Advent Sports Bag", "1GO12/22"],
  ["daa58374-5a4b-4725-b19d-326f89bf0d0b", "G1082", "MAROON, WHITE, NAVY", null, "Advent Sports Bag", "1GO22"],
  ["bbfa1064-22cf-41e4-a8a8-2c5f6e6ed1d9", "G1082", "RED, WHITE, BLACK", null, "Advent Sports Bag", "1GO42/52"],
  ["768c9c62-d1e3-42c3-9380-4e86fa7348ae", "G1082", "ROYAL, WHITE, BLACK", null, "Advent Sports Bag", "1GO42"],
  ["98d8ef69-f9d2-4236-842d-23843519c558", "G1082", "SKY, WHITE, NAVY", null, "Advent Sports Bag", "1GO32"],

  ["e7f1fe15-4fcd-4070-8fd3-ffeeb8e2e531", "G1100", "ROYAL, BLACK", null, null, "DUNNO"],

  ["1c67202e-85cd-46aa-be42-dd18816aec87", "G1117", "BLACK, WHITE", null, "Stellar Sports Bag", "1GC21/31"],
  ["eac6fa83-564f-4d29-ab94-5d791f085075", "G1117", "MAROON, WHITE", null, "Stellar Sports Bag", "1GC31/41"],
  ["a3d08c40-109e-4cf8-9997-fa8646f656cc", "G1117", "NAVY, WHITE", null, "Stellar Sports Bag", "1GC11/21"],

  ["a8d6a874-9f63-4761-bb24-0f3e42423d11", "G1120", "GOLD, BLACK", null, "Soho Sports Bag", "1GG41"],
  ["f6af84e4-e929-4ff0-ae09-216c94c9e26c", "G1120", "RED, BLACK", null, "Soho Sports Bag", "1GG51"],

  ["cb19a2a8-269c-4c65-a971-27f2fb80320a", "G1215", "BLACK, GOLD", null, "Fortress Sports Bag", "1GE51"],
  ["12f88002-44d3-4a4c-8fcd-39613e4daaf2", "G1215", "MAROON, GOLD", null, "Fortress Sports Bag", "1GE41"],

  ["d7d719d9-9396-4756-af32-384cf0953a6f", "G1232", "ROYAL, WHITE, BLACK", null, "Virage Backpack", "1GD22"],

  ["edf34ae5-5623-4bda-910b-2c9108b92f35", "G1250", "BLACK", null, "Team Bag", "1GD41"],
  ["868a4818-43a0-4c72-bc32-6f1aa7e21cdd", "G1250", "NAVY", null, "Team Bag", "1GD51"],
  ["54ddfe5e-cbf8-4ead-9f4f-ad7dffb10b98", "G1250", "ORANGE, BLACK", null, "Team Bag", "1GD41/51"],
  ["adfa1bf3-1cc9-48c9-bf05-9822bd5b3357", "G1250", "RED, BLACK", null, "Team Bag", "1GD31/41"],
  ["ce02f176-f321-4395-a64b-0ff3284e8a31", "G1250", "ROYAL", null, "Team Bag", "1GD21/31"],
  ["acb10576-8461-4830-a245-48c47703b215", "G1250", "ROYAL, BLACK", null, "Team Bag", "1GD11"],
  ["52e0963a-606c-4f9a-8f69-0ec272356e49", "G1250", "YELLOW, BLACK", null, "Team Bag", "1GD11/21"],

  ["7f49c75e-c80b-4f69-b2d3-4118023090a3", "G1277", "BLACK, ROYAL", null, "Orion Sports Bag", "1GT32"],

  ["911197e5-3096-46d8-b80d-bca4e359777b", "G1319", "CHARCOAL, WHITE, BLACK", null, "Pronto Sports Bag", "1GR22/32"],

  ["f63ee4b4-e1a6-11ed-b5ea-0242ac120002", "G1345", "BLACK, ROYAL, WHITE, CHARCOAL", null, "Atlantis Sports Bag", "1GB22"],

  ["162ccee6-24b6-43c6-a189-6e434a483d6c", "G1346", "BLACK, RED, WHITE, CHARCOAL", null, "College Backpack", "DUNNO"],

  ["3cc2d9e5-85ca-4b9f-a804-0e889c176a5a", "G1355", "AQUA, BLACK", null, "Lunar Sports Bag", "1GZ41"],

  ["14bb4e78-8420-4fb0-a590-1a57657a69d5", "G1365", "BLACK, WHITE", null, "Hurley Sports Bag", "1GO31"],
  ["a517e2e2-125c-49d7-ad54-28aedd8613e1", "G1365", "NAVY, WHITE", null, "Hurley Sports Bag", "1GO31"],

  ["5b165936-7159-4615-8283-ced02c1a3323", "G1602", "BLACK, WHITE, BLACK", null, "Precinct Backpack", "1GE22"],
  ["105677ba-ea4c-424d-b38a-793485de6008", "G1602", "GOLD, WHITE, BOTTLE", null, "Precinct Backpack", "1GE12"],
  ["24e5923c-31eb-4aa7-a6bd-734b8747cd17", "G1602", "RED, WHITE, BLACK", null, "Precinct Backpack", "1GE32"],
  ["b236cb49-a0cb-45f4-a855-4df709442194", "G1602", "ROYAL, GREY, BLACK", null, "Precinct Backpack", "1GE22"],
  ["e0ef1c8a-05bc-43d3-af58-2d9ca783e547", "G1602", "SKY, WHITE, NAVY", null, "Precinct Backpack", "1GE32"],

  ["1876f526-29be-4ef9-9bed-ba3bbc26a9d7", "G1800", "BLACK, GREY", null, "Deluxe Sports Bag", "1GF51"],

  ["49737edb-8cfd-4159-b176-9e5bc35ce4b9", "G2000", "BLACK", null, "Large Sports Bag", "1GE52"],
  ["ea0d8ef0-c7cf-415a-88d2-d7c439077b48", "G2000", "NAVY", null, "Large Sports Bag", "1GE52"],
  ["a128185e-aaa3-4c07-9f88-d386841a3c0f", "G2000", "RED, BLACK", null, "Large Sports Bag", "1GE42"],
  ["d7287cf5-4145-467d-be44-0503874194a3", "G2000", "ROYAL, BLACK", null, "Large Sports Bag", "1GE42"],

  ["5b1a2975-2532-43b4-b1f0-6ea752685244", "G2002", "BLACK", null, "Trolley Travel Bag", "1GX32"],

  ["f23c0a26-550b-41b0-afcd-70509433567b", "G2138", "GREY", null, "Rukus Backpack", "1GW21"],
  ["59ab0b17-5b92-4646-8bff-abc15320a07a", "G2138", "NAVY", null, "Rukus Backpack", "1GW11"],
  ["b5353455-64c5-4381-ba80-a1b51ffd5801", "G2138", "RED", null, "Rukus Backpack", "1GW11/21"],

  ["3c298d1b-a243-48cd-8bf1-3df2202664de", "G2143", "BLACK", null, "Vibe Backpack", "1GQ41"],

  ["21a27077-8276-4cc1-a6c3-47ebcb987d70", "G2155", "BLACK, WHITE, BLACK", null, "Backpack", "1GAA31/41"],
  ["bfee01e3-6898-48c5-90bb-fdc5c6b08a7a", "G2155", "BLACK, WHITE, ROYAL", null, "Backpack", "1GAA41"],

  ["aaa7c4d2-8cb9-4803-a71b-071a73f2f548", "G2163", "LIME, BLACK", null, "Backpack", "1GAA21"],
  ["254371c2-a8d9-4f8f-9f3e-46d215dc5b5a", "G2163", "WHITE, BLACK", null, "Backpack", "1GAA21/31"],

  ["fee59132-de23-4478-b5ae-2aaabd500ff9", "G2168", "BLACK", null, "Trinity Back Pack", "1GI21"],
  ["4dde5095-9373-4c51-9d8b-bf59a85efcd2", "G2168", "MAROON", null, "Trinity Back Pack", "1GI31"],
  ["9e705200-eecd-45df-b04a-b943ac529a63", "G2168", "ROYAL", null, "Trinity Back Pack", "1GI31"],

  ["dc44ba43-0fb9-4b11-ad9b-3366263f430b", "G2183", "BLACK, NAVY", null, "Oregon Backpack", "1GS11"],
  ["760b66d6-3fe9-4060-bc40-6fd7034b741f", "G2183", "ROYAL", null, "Oregon Backpack", "1GS11"],

  ["7cc8fd1f-dc14-45b1-a151-c7c7ca4f7881", "G2184", "BOTTLE", null, "Castell Back Pack", "1GW31"],
  ["3ef574d9-e2ac-4601-88b6-b7deaba180bf", "G2184", "MAROON", null, "Castell Back Pack", "1GW31"],
  ["2566ac01-a2a3-46c7-adc9-d8090e4e0ed6", "G2184", "ROYAL", null, "Castell Back Pack", "1GW31"],

  ["e802add6-0111-4ab2-8112-c6e0394e8cd3", "G2186", "BLACK, AQUA, GREY", null, "Mercury Backpack", "1GT52"],

  ["5fb039ab-a147-4e4e-89c5-97ba22b2824e", "G2195", "BLACK", null, "Boxy Backpack", "1GQ31"],

  ["25cedb22-0265-46f5-8d19-53b5ca87e837", "G2198", "BLACK, BLACK", null, "Rally Backpack", "1GT12"],

  ["9fea9e22-bc0e-40b3-a3b2-8613835b1343", "G2209", "BLACK", null, "Belroy Backpack", "1GO11"],
  ["6728027a-a5f4-4901-8215-7f0d2efe6490", "G2209", "NAVY", null, "Belroy Backpack", "1GO11"],

  ["d78e8d95-910b-452a-b351-7efdede9e492", "G3220", "BLACK, SILVER, ORANGE", null, "Business Bag", "1GAA51"],
  ["7a27f62d-f2ad-4059-8bbd-338d42fcb144", "G3220", "ROYAL, WHITE, NAVY", null, "Business Bag", "1GAA51"],

  ["4ef0d710-9677-44cd-ae77-9255abac2d02", "G3255", "MARINE BLUE", null, "Premier Bag", "1GI22"],

  ["fcce6c6d-7246-41dd-b6c6-6923f7eb83e4", "G3335", "BLACK", null, "Cobalt Trolley Bag", "1GR12"],
  ["7a9ec51d-ddbc-4518-ac19-5e03294c59dc", "G3335", "BLACK, BLACK", null, "Cobalt Trolley Bag", "1GR12"],
  ["4fcb3072-2caf-48bf-8069-1c27d814a34c", "G3335", "BLACK, ROYAL", null, "Cobalt Trolley Bag", "1GR12"],

  ["59e4a077-542b-43c8-a3cf-3804973627ba", "G3337", "BLACK, DARK GREY", null, "Regal Trolley Bag", "1GJ11"],

  ["e9f0d7ab-90b6-4bba-970e-d359c5b0bd00", "G3475", "BLACK", null, "Shoe Bag", "1GO12"],

  ["df37289d-0f7e-42a9-aba0-c57571924b3d", "G3620", "BLACK", null, "Casual Backpack", "1GI52"],
  ["da56af09-d918-420e-bf28-95ace9f3d3d1", "G3620", "MAROON", null, "Casual Backpack", "1GI52"],
  ["e02690cc-2f47-4075-83d7-005005002a96", "G3620", "NAVY", null, "Casual Backpack", "1GI32"],
  ["cbb410e6-3c05-4d7e-9f09-67e84cf72ef2", "G3620", "ROYAL", null, "Casual Backpack", "1GI42"],
  ["3998a879-6b7b-4b19-a30c-dd26f432227f", "G3620", "YELLOW", null, "Casual Backpack", "1GI32/42"],

  ["7be57131-107e-4201-b67c-8922afd2d208", "G3999", "BOTTLE", null, "Non-woven Shopping Bag", "1GJ51"],
  ["66dba3ac-48bd-45dd-a98f-5d2567e74047", "G3999", "ORANGE", null, "Non-woven Shopping Bag", "1GJ51"],
  ["ebdaf70e-128d-45f1-9679-af24b04b248b", "G3999", "NAVY", null, "Non-woven Shopping Bag", "1GJ51"],

  ["78b66fdc-1fb8-4cae-aeb3-c7ad55cdb594", "G4001", "BLACK, LIME", null, "Arial Carry Bag", "1GBB52"],
  ["e8d88815-029b-4f61-b3c0-021f3c8ab6f2", "G4001", "BLACK, ORANGE", null, "Arial Carry Bag", "1GBB52"],

  ["6c7c74ea-3fd0-49c9-bfe8-7f55d63cb623", "G4027", "BLACK", null, "DUNNO", "DUNNO"],

  ["7fa2ab65-e5c6-4052-a440-ca1351ad11a1", "G4037", "NATURAL", null, "Iconic Shopping Bag", "1GY31"],
  ["69f342a7-fcd7-4322-8fcb-4bd92029b11b", "G4037", "NAVY", null, "Iconic Shopping Bag", "1GY21"],
  ["b06abc50-845f-41a2-9607-1470e92d3702", "G4037", "RED", null, "Iconic Shopping Bag", "1GY31"],
  ["12577f69-0455-4b47-86e9-7aae105a28f9", "G4037", "ROYAL", null, "Iconic Shopping Bag", "1GY31"],
  ["846855d1-3a26-4803-99a3-b24d63515092", "G4037", "BLACK", null, "Iconic Shopping Bag", "1GY31"],
  ["f6f5ab2b-cfb5-4762-ad76-084cfd3f337c", "G4037", "BOTTLE", null, "Iconic Shopping Bag", "1GY21"],
  ["9c96114d-b201-4054-b571-b6c41fc1a363", "G4037", "GREY", null, "Iconic Shopping Bag", "1GY31"],
  ["74bea0fa-587c-490a-8f09-00736ca25b8d", "G4037", "LIME", null, "Iconic Shopping Bag", "1GY21"],
  ["7a2c5da4-2c75-4577-8a74-1b11237ab21e", "G4037", "RED, ROYAL", null, "Iconic Shopping Bag", "1GY21"],

  ["b275940b-f707-49a2-86af-8892b8e35575", "G4100", "BLACK, GREY, BLACK", null, "Arctic Cooler Bag", "1GN41"],
  ["48c28a50-fd10-4d02-96e4-aea10679c740", "G4100", "NAVY, GREY, BLACK", null, "Arctic Cooler Bag", "1GN51"],
  ["ae1dcd8f-f627-4ded-88c1-1a5df10203d7", "G4100", "ROYAL, GREY, BLACK", null, "Arctic Cooler Bag", "1GN31/41"],

  ["5f1cc2a9-2e2c-43bc-94fa-8d82442d20c3", "G4388", "BLACK, WHITE, ROYAL", null, "Caddy Cooler Bag", "1GN52"],

  ["93f6632f-87e8-4927-b704-63f2dc854f60", "G4688", "BLACK", null, "Edge Cooler Bag", "1GL31"],
  ["751667a8-ffe6-4b26-a1b3-d0cecaa42a12", "G4688", "BOTTLE", null, "Edge Cooler Bag", "1GL11"],
  ["cd5e041b-c092-4b6e-9c0d-982c74ac6bf4", "G4688", "NAVY", null, "Edge Cooler Bag", "1GL41"],
  ["a3d4aded-d752-43f6-9772-9095ad08bc30", "G4688", "ROYAL", null, "Edge Cooler Bag", "1GL21"],

  ["442add26-3ef9-499e-acee-b25347f1d448", "G5222", "BLACK, BLACK", null, "Casual Sports Bag", "1GV11"],
  ["57e00ecc-2c9b-4751-8153-da47e38f5c03", "G5222", "BLACK, NAVY", null, "Casual Sports Bag", "1GV31"],
  ["39b5f71e-bee3-432b-b824-aed86cbbb9db", "G5222", "BLACK, ROYAL", null, "Casual Sports Bag", "1GV21"],

  ["bddfbcda-a1fa-4527-a3b4-87a66e5ab7b1", "IV101", "BLACK, WHITE, BLACK", null, "Cotton/Mesh", "DUNNO"],
  ["bfcb45c1-8323-4737-a602-e232f13d77d6", "IV101", "GREY", null, "Cotton/Mesh", "DUNNO"],
  ["91f09b25-4b62-4528-940d-9b48d0e5ca8a", "IV101", "NAVY", null, "Cotton/Mesh", "DUNNO"],
  ["5d9a4de1-c8df-459b-b442-8434fb3d4874", "IV101", "NAVY, WHITE, NAVY", null, "Cotton/Mesh", "DUNNO"],
  ["0fd674c4-8445-4dfc-a6ad-c31ecd2ca99d", "IV101", "RED", null, "Cotton/Mesh", "DUNNO"],
  ["b754ea39-f066-4ff1-9df0-92d5fa155a8e", "IV101", "RED, BLACK", null, "Cotton/Mesh", "DUNNO"],
  ["df0953e1-d0c5-4ad9-bfe3-c67ec565689b", "IV101", "ROYAL", null, "Cotton/Mesh", "DUNNO"],
  ["c68eebfb-72c9-4765-8d40-3d7cb7ccde21", "IV101", "ROYAL, BLACK", null, "Cotton/Mesh", "DUNNO"],
  ["2bec573b-1a99-4c37-a843-f67e481d9ab2", "IV101", "WHITE", null, "Cotton/Mesh", "DUNNO"],

  ["8c8df5f0-6dad-422e-ae18-819e319e114e", "IV102", "BLACK", null, "Polyester/Mesh", "DUNNO"],
  ["74569a12-74c9-4e62-b40c-ceb7b9743e2a", "IV102", "BLACK, WHITE", null, "Polyester/Mesh", "DUNNO"],
  ["be5560e5-2d0a-4290-b7d6-c83bc684dd04", "IV102", "DARK CHARCOAL, BLACK", null, "Polyester/Mesh", "DUNNO"],
  ["cd54d584-a56e-4adb-bc3c-91bb43e563ec", "IV102", "NAVY", null, "Polyester/Mesh", "DUNNO"],
  ["1709ca61-9b77-4e2b-928d-b31e656df6ca", "IV102", "NAVY, WHITE", null, "Polyester/Mesh", "DUNNO"],

  ["53838b0c-df1b-4239-bc26-e374017959f4", "IV104", "BLACK", null, "Cotton/Mesh", "21Q22"],
  ["ffcaf486-205b-4986-900e-b8ba3c61eea2", "IV104", "CHARCOAL", null, "Cotton/Mesh", "21Q22"],
  ["c4ed74c5-3d08-4e39-b6e5-ac99ce7b6bc1", "IV104", "NAVY", null, "Cotton/Mesh", "21Q22"],
  ["9aa6859d-8c25-43cf-8e15-5900403d9f12", "IV104", "ROYAL", null, "Cotton/Mesh", "21Q22"],
  ["67a1807b-0663-405d-bb86-9e9e7529da6e", "IV104", "WHITE", null, "Cotton/Mesh", "21Q22"],

  ["7a47cd86-afd9-401d-8069-aab890050663", "IV111", "BLACK", null, "100% Polyester (Cool Dry)", "21P12"],
  ["33c2852c-8310-4a11-97c3-c9fd48eb367d", "IV111", "NAVY", null, "100% Polyester (Cool Dry)", "21P22"],
  ["b63f42b6-88bd-47cc-bbfe-3e648900cb7c", "IV111", "RED", null, "100% Polyester (Cool Dry)", "21P12"],
  ["2dab233d-36a0-4aaa-be8a-7ccf092a2557", "IV111", "ROYAL", null, "100% Polyester (Cool Dry)", "21P22"],
  ["8b83dee1-1079-45ac-b634-dfe5bc39c576", "IV111", "WHITE", null, "100% Polyester (Cool Dry)", "21P22"],

  ["2fdb7a95-260b-4dec-9f4f-03f7e2a5423b", "IV112", "LIGHT MARBLE", null, "100% Polyester", "DUNNO"],
  ["99a7cbc8-f3a6-4ee2-9c6d-de1b7872798e", "IV112", "DARK MARBLE", null, "100% Polyester", "DUNNO"],

  ["0dee5a47-6998-4018-a198-ecad331d11e1", "IV113", "BLACK", "S/M", "Cotton/Spandex", "21P22"],
  ["118ebd39-2580-4394-9553-25054048b042", "IV113", "BLACK", "L/XL", "Cotton/Spandex", "21P21"],
  ["3362cdaf-1afd-4543-8153-3461f563cb80", "IV113", "GREY", "L/XL", "Cotton/Spandex", "21P21"],
  ["b5b41c42-727c-4f82-8a5c-c65fea542378", "IV113", "GREY", "S/M", "Cotton/Spandex", "21P22"],
  ["06a20bbf-d135-402e-be2f-17afeef0239e", "IV113", "NAVY", "S/M", "Cotton/Spandex", "21P31"],
  ["9fd22b66-ac0d-48c3-8510-45575e7b12e3", "IV113", "NAVY", "L/XL", "Cotton/Spandex", "21P32"],
  ["bdcdae63-6292-4087-8484-0e5894d5b360", "IV113", "RED", "L/XL", "Cotton/Spandex", "21P21"],
  ["52faeec1-c5fc-4bc9-b953-894f3f6e17a8", "IV113", "RED", "S/M", "Cotton/Spandex", "21P22"],
  ["1cbdba59-5443-4c74-bb89-ecd61aa5f98b", "IV113", "ROYAL", "L/XL", "Cotton/Spandex", "21P31"],
  ["778ecc29-93bc-4da6-a401-35b775bd1fbe", "IV113", "ROYAL", "S/M", "Cotton/Spandex", "21P32"],

  ["f389e9a4-a197-445f-8b16-f3caea3796be", "IV114", "BLACK", null, "Cotton/Spandex", "21Q21"],
  ["e061a4b2-4e4c-4467-98fe-1acf9f1b0272", "IV114", "GREY", null, "Cotton/Spandex", "21Q31"],
  ["59e88241-c573-4d7b-8e33-377676e2d968", "IV114", "KHAKI", null, "Cotton/Spandex", "21Q31"],
  ["fb7de931-01a4-45e3-bf3b-590055c9ca18", "IV114", "NAVY", null, "Cotton/Spandex", "21Q31"],
  ["9f97719c-a7f2-4092-b874-a07f46797c2f", "IV114", "RED", null, "Cotton/Spandex", "21Q31"],
  ["6a969836-ef27-4a4d-b2b6-96950d23b22f", "IV114", "ROYAL", null, "Cotton/Spandex", "21Q31"],
  ["2cdd1d18-71fb-42e3-8264-8be1b7c3d290", "IV114", "WHITE", null, "Cotton/Spandex", "21Q31"],

  ["eed04790-9687-408a-8d0c-f0ea6d60a6fb", "IV115", "BLACK", null, "100% Cotton", "DUNNO"],
  ["aa81d851-e7f7-4bbb-8fef-77dd97cf3504", "IV115", "NAVY", null, "100% Cotton", "DUNNO"],

  ["4ea7809d-e4da-465e-a754-4e34e7f48a79", "IV116", "BLACK", null, "Polyester/Mesh", "DUNNO"],
  ["bbb59985-18c5-4e53-806c-5e3050f3283f", "IV116", "NAVY", null, "Polyester/Mesh", "DUNNO"],
  ["08adf7c5-bf19-41b5-8364-e6cf4a2899ac", "IV116", "WHITE", null, "Polyester/Mesh", "DUNNO"],

  ["ed0089db-8890-4c20-a72c-3608a10bbfc1", "IV122", "DARK MARBLE", null, "", "DUNNO"],
  ["64f6a15e-1837-4be5-a5f5-15b04503cb99", "IV122", "LIGHT MARBLE", null, "", "DUNNO"],

  ["86223ecd-18d4-48dc-a7e5-34227b450d4e", "ST1012", "BLACK, WHITE, RED", "S", "Raymond Polos", "2GE12"],
  ["e5225d7a-c273-454d-a81c-a92fb6a45843", "ST1012", "NAVY, WHITE, RED", "S", "Raymond Polos", "2GE12"],
  ["1a63c989-4ad2-4399-a10b-77ee65b354ae", "ST1012", "WHITE, NAVY, RED", "S", "Raymond Polos", "2GE11"],

  ["9f714de3-2829-41fd-a1af-cb20a3fa6283", "ST1016", "ROYAL, WHITE", "S", "Blade Polos", "2GJ23"],

  ["c9f287bc-094f-4f12-b916-1b10461643b6", "ST1018", "BOTTLE, GOLD", "S", "Titan Polos", "2GM23"],
  ["e1df9535-8ab3-4a2a-a87b-042ac9689a37", "ST1018", "STONE, NAVY", "S", "Titan Polos", "2GM23"],
  ["6ea58105-72d3-4faa-89f4-f7dde8147e89", "ST1018", "WHITE, NAVY", "S", "Titan Polos", "2GM23"],

  ["c2418c79-a667-492c-96ea-5ffc1c9522d5", "ST1020", "NAVY, WHITE", "S", "Eureka Polos", "2GL23"],
  ["068314e9-60aa-4756-8141-e1b948bb192b", "ST1020", "RED, WHITE", "S", "Eureka Polos", "2GL23"],
  ["49808511-cc2d-428f-a7bc-7c9fe0b3c770", "ST1020", "ROYAL, WHITE", "10", "Eureka Polos", "Bay42-3"],

  ["0dbb2696-ade8-4ad9-b339-3b81411b8c57", "ST1022", "", "", "", "DUNNO"],

  ["ce26b2a5-1204-4e7b-850c-d7b9c66f1d07", "ST1023", "NAVY, WHITE", "S", "Stealth Polos", "2GK23"],

  ["758a4689-ac76-42eb-8398-7b077fc15843", "ST1027", "ROYAL, WHITE, BLACK", "S", "Century Polos", "2GN12"],

  ["1bea6f54-012d-4ab6-9237-e71c0cf3a3fa", "ST1043", "BLACK, RED", "S", "Clifford Polos", "2GI33"],
  ["85e1bf3f-7fdf-470b-b216-e9d27524b49e", "ST1043", "BLACK, WHITE", "S", "Clifford Polos", "2GI33"],
  ["87b2841a-922c-4a76-b714-047bd5c2ee8e", "ST1043", "BOTTLE", "S", "Clifford Polos", "2GI33"],
  ["1bcdaddb-d329-46ab-9e8e-bfe09d6f8685", "ST1043", "BOTTLE, GOLD", "S", "Clifford Polos", "2GI33"],
  ["61bb67de-7ffd-4f72-8141-895e431de73e", "ST1043", "BOTTLE, WHITE", "S", "Clifford Polos", "2GI33"],
  ["dc72b748-2602-42d0-aa76-88447f58f3b6", "ST1043", "DARK MAROON, WHITE", "S", "Clifford Polos", "2GI33"],
  ["2ff3c93e-447a-48c9-870a-2885fa39cdf6", "ST1043", "NAVY, GOLD", "S", "Clifford Polos", "2GI43"],
  ["168a5b69-4de4-4a5e-be44-c1ae176d1c58", "ST1043", "NAVY, RED", "S", "Clifford Polos", "2GI43"],
  ["ced76412-0976-46e0-9912-726dd55aa8cb", "ST1043", "NAVY, WHITE", "S", "Clifford Polos", "2GI43"],
  ["bd443f56-a479-4eab-8425-442b189b421f", "ST1043", "RED, WHITE", "S", "Clifford Polos", "2GI43"],
  ["a77a4f91-7bf3-406a-8218-46c5f41f43fa", "ST1043", "ROYAL, WHITE", "S", "Clifford Polos", "2GI43"],
  ["d9507842-b832-4662-a8c3-5219075b3ca3", "ST1043", "STONE, NAVY", "S", "Clifford Polos", "2GI43"],
  ["bb0671c1-5e4a-4423-ae4a-430f8b58d4f5", "ST1043", "SKY, NAVY", "S", "Clifford Polos", "2GI43"],
  ["e5f0dc61-b2b5-4bc4-8f69-6ea046827b9d", "ST1043", "WHITE, NAVY", "S", "Clifford Polos", "2GI42"],
  ["4ef74554-0d01-4a7c-9d35-9011e7494041", "ST1043", "WHITE, RED", "S", "Clifford Polos", "2GI42"],

  ["a0dff6eb-2332-4f87-a541-883d306eb631", "ST1097", "BLACK, RED, GREY", "S", "Corbel Polos", "22O21"],

  ["266897bc-8172-4246-a7a2-813cb4112da1", "ST1141", "BLACK, RED, DARK GREY", "S", "Ignite Polos", "2GY12"],

  ["c3728d31-b62f-437a-857d-ccf6ef79161a", "ST1147", "BLACK, WHITE, DARK GREY", "S", "Avid Polos", "12B42"],

  ["1dc195b6-b722-46d4-a2a0-45c2520bc661", "ST1206", "RED, WHITE", "S", "Avalon Polos", "2GQ32"],

  ["86a59a83-6044-4421-a4d3-3d87c97c50a0", "ST1211", "YELLOW, WHITE", "S", "Allegro Polos", "2GU22"],

  ["398b43c0-b5ce-44c8-ba2a-348b8eefcebf", "ST1220", "WHITE, NAVY", "8", "Fairlady Polos", "11G42"],

  ["57f19e9c-cae2-4454-abdd-3e89773a3c69", "ST1222", "APPLE GREEN", "S", "Brentwell Polos", "2GF33"],
  ["c07ff911-3963-45fa-ae67-2a3bb9211e7c", "ST1222", "BLACK", "S", "Brentwell Polos", "2GF33"],
  ["e5d96985-d137-4f5e-8722-e2c8f0e513da", "ST1222", "BOTTLE", "S", "Brentwell Polos", "2GF33"],
  ["a22646a2-d1b0-4a96-815d-dd22cca0cee2", "ST1222", "DARK MAROON", "S", "Brentwell Polos", "2GF33"],
  ["81c617fc-92ab-474c-9ffa-ceeeaa059e25", "ST1222", "GOLD, ROYAL", "S", "Brentwell Polos", "2GF43"],
  ["488fa619-bf6e-4d8c-b087-82c088f13028", "ST1222", "MARBLE", "S", "Brentwell Polos", "2GF33"],
  ["1537424f-4788-4059-b0bc-224c5d2ae7f3", "ST1222", "NAVY", "S", "Brentwell Polos", "2GF33"],
  ["e04d0b5c-f8af-48c3-96b2-6f5bf589727a", "ST1222", "ORANGE", "S", "Brentwell Polos", "2GF43"],
  ["29159805-be58-435c-8d6a-29089026227b", "ST1222", "STONE", "S", "Brentwell Polos", "2GF43"],

  ["11527743-ad6a-43bc-8056-1d84419bf6da", "ST1225", "WHITE, NAVY", "S", "Portland Polos", "11CA ISLE"],

  ["80f29dfe-c5d5-412f-8c44-bdaa3ea4df5d", "ST1232", "ROYAL, WHITE", "S", "Attune Polos", "Bay50-3"],
  ["1f6085fe-14b5-4ab4-b03f-04fce8368dd0", "ST1232", "WHITE, NAVY", "S", "Attune Polos", "Bay50-3"],
  ["d10cc15c-1574-4dc1-8746-b1fcbf622e0d", "ST1232", "BLACK, GOLD", "S", "Attune Polos", "Bay50-3"],
  ["6e543ade-1264-4c87-bf17-d53d2f3c460a", "ST1232", "NAVY, SKY", "S", "Attune Polos", "Bay50-3"],

  ["f30c388d-7adb-4dba-b3d4-302cdfcab63d", "ST1238", "BLACK, WHITE, ORANGE", "S", "Crescent Polos", "2GO22"],
  ["3fc038a0-33f4-44ca-aaad-74b486dc3e41", "ST1238", "RED, WHITE, BLACK", "S", "Crescent Polos", "2GO22"],

  ["3a983d6e-1e8a-48ed-b126-2da5ca103038", "ST1239", "BLACK, RED", "S", "Pitstop Polos", "2GP31"],

  ["177da811-bb50-46cf-a5d2-fe9e54df19aa", "ST1240", "WHITE, BLACK", "S", "Mossman Polos", "2GU11"],

  ["0e8e9457-fe2a-4024-9bda-0ba8805d9847", "ST1242", "BLACK, HOT PINK", "8", "Meribel Polos", "Bay46-3"],

  ["f07afd67-adcf-424f-8765-9734275ccf79", "ST1243", "BLACK, RED", "S", "Incline Polos", "Bay 27-3"],
  ["17c5595d-9d89-43f8-b0e6-b8a12d20d5a3", "ST1243", "NAVY, WHITE", "S", "Incline Polos", "Bay27-3"],
  ["198a449f-0e86-43f6-81a1-949c3d8281cb", "ST1243", "ROYAL, WHITE", "S", "Incline Polos", "Bay27-3"],

  ["e7baaa27-61d9-40fb-be9f-2391814510fd", "ST1248", "BLACK, WHITE, DARK GREY", "S", "Verve Polos", "11C21"],

  ["11fc7da3-a7e4-4e75-b690-99a9f0f94a2a", "ST1250", "WHITE, NAVY, RED", "S", "Avanti Polos", "2GR32"],

  ["d2f4fbed-f0fe-492e-933d-6a742f0b0989", "ST1252", "BLACK", "S", "Greenwich Polos", "11E41"],

  ["bc06f696-5d3d-448f-b0ea-2a85d9397e1c", "ST1255", "RED, BLACK, WHITE", "8", "Sheridan Polos", "Bay47-3"],

  ["1af475b8-1a7a-4811-bf75-4e66ba97d837", "ST1257", "RED, BLACK, WHITE", "S", "Driftwood Polos", "2GT13"],

  ["723faf5d-a278-4ab0-9e59-6d3893da523a", "ST1259", "BLACK, RED", "S", "Stride Polos", "2GR33"],
  ["07c25553-953c-4926-a750-6ab9227ca5ad", "ST1259", "NAVY, WHITE", "S", "Stride Polos", "2GR33"],
  ["22efe9c0-408e-480d-9e51-46e123f6822a", "ST1259", "WHITE, NAVY", "S", "Stride Polos", "2GR43"],

  ["e14483f8-51c9-47eb-9901-77dc37da7fc7", "ST1260", "BLACK, RED, BLACK", "S", "Tempo Polos", "2GT41"],
  ["045da4f0-5e59-4d43-8364-abec0bbac38d", "ST1260", "BLACK, WHITE, RED", "S", "Tempo Polos", "2GT41"],

  ["c8bf22e0-1d13-426f-ae20-870987bf62b9", "ST1261", "BLACK, RED", "S", "Forte Polos", "2GS12"],

  ["edab9f6b-4a53-4a1a-bee0-a34d81a8fbf7", "ST1270", "BLACK, RED", "S", "Westbury Polos", "2GS13"],
  ["25a723aa-51a6-4487-821a-a0b718276b4b", "ST1270", "NAVY, WHITE", "S", "Westbury Polos", "2GS13"],

  ["6c19c162-0ce8-4536-813d-12df198ccdc2", "ST1271", "BLACK", "L", "Cascade Polos", "12J52"],

  ["2e23c494-55bf-4a06-9bc5-484473a478d7", "ST1272", "BLACK", "S", "Cascade Polos", "2GU13"],

  ["b9f6ee05-f51a-41cc-8da0-c8fb26e81890", "ST1275", "BLACK", "S", "Gambit Polos", "11C51"],

  ["d7403295-8f23-46a5-8267-cd5d7e13ee92", "ST1280", "ROYAL, WHITE", "S", "Milstead Polos", "2GD12"],

  ["57b9d4c8-0050-4102-ac42-46d158d3baae", "ST1290", "BLACK, WHITE", "S", "Brampton Polos", "2GR33"],

  ["6262f47c-aace-4687-9e45-37441cea0f6b", "ST1333", "BLACK, APPLE GREEN", "8", "Centaur Polos", "12D41"],
  ["366191bd-4eb6-4084-a2b8-25de495a9944", "ST1333", "BLACK, APPLE GREEN", "10", "Centaur Polos", "12D51"],
  ["40e6bce6-0ac7-4dda-9264-377ff75568a4", "ST1333", "BLACK, APPLE GREEN", "12", "Centaur Polos", "12D51"],
  ["7326ab67-3f94-427f-b3dd-8b959acdbb8c", "ST1333", "BLACK, APPLE GREEN", "14", "Centaur Polos", "12D51"],
  ["c946dc22-8fe5-49cd-a716-e1766734eda2", "ST1333", "BLACK, APPLE GREEN", "16", "Centaur Polos", "12D41"],
  ["99352ac0-9918-43e6-950d-eb9b6a6aed6f", "ST1333", "BLACK, APPLE GREEN", "18", "Centaur Polos", "12D51"],
  ["78045324-71d7-4f48-8af5-df66a7b3d29c", "ST1333", "BLACK, APPLE GREEN", "20", "Centaur Polos", "12C31"],
  ["2a69c580-f969-4462-85fc-4e8133fc8229", "ST1333", "BLACK, APPLE GREEN", "22", "Centaur Polos", "12C21"],
  ["b9faeb8a-0ba9-401d-94cd-cd7d8f8ceec5", "ST1333", "BLACK, APPLE GREEN", "S", "Centaur Polos", "12C32"],
  ["47fa0a86-c50a-458d-a6b4-9118a16f5391", "ST1333", "BLACK, APPLE GREEN", "M", "Centaur Polos", "12C32"],
  ["11f326e4-3fd5-422b-a654-7d58d9bb4f6f", "ST1333", "BLACK, APPLE GREEN", "L", "Centaur Polos", "12C42"],
  ["ce44c1f4-a385-406d-bf84-5de8e3a2add9", "ST1333", "BLACK, APPLE GREEN", "XL", "Centaur Polos", "12C52"],
  ["7b8e4d7c-a439-4567-9771-7d476301be56", "ST1333", "BLACK, APPLE GREEN", "2XL", "Centaur Polos", "12C52"],
  ["79a8e461-8d17-4212-8388-cb6bd5246d25", "ST1333", "BLACK, APPLE GREEN", "3XL", "Centaur Polos", "12D52"],
  ["185fcc24-ce03-4aa4-aced-c23b2513087b", "ST1333", "BLACK, APPLE GREEN", "5XL", "Centaur Polos", "12D42"],
  ["208eab5d-8aa4-4ae2-854c-fffb32e740b3", "ST1333", "BLACK, RED", "8", "Centaur Polos", "12D41"],
  ["d41bf59b-a762-4270-b28a-93d80d3d173f", "ST1333", "BLACK, RED", "10", "Centaur Polos", "12D51"],
  ["8ca3a41c-42a0-4b7e-bf5f-452ed67c6cb7", "ST1333", "BLACK, RED", "12", "Centaur Polos", "12D51"],
  ["dc7f75f6-fde0-475b-ad20-7fcc7a2d9dcb", "ST1333", "BLACK, RED", "14", "Centaur Polos", "12C51"],
  ["2e1ed15b-83f4-41d7-b672-45a056cfacc3", "ST1333", "BLACK, RED", "16", "Centaur Polos", "12C41"],
  ["2ec1f935-9ede-4cf5-ada9-0a122afea741", "ST1333", "BLACK, RED", "18", "Centaur Polos", "12C41"],
  ["2b0dbcca-329f-48b5-b053-dc051ac05366", "ST1333", "BLACK, RED", "20", "Centaur Polos", "12C31"],
  ["e05100cd-8660-4f68-b171-a7582f5b7413", "ST1333", "BLACK, RED", "22", "Centaur Polos", "12C21"],
  ["968519a9-a9a1-4a59-bc4a-140b60c500d1", "ST1333", "BLACK, RED", "S", "Centaur Polos", "12C32"],
  ["3d1b695f-ed37-4539-ba2f-806f3cd6b238", "ST1333", "BLACK, RED", "M", "Centaur Polos", "12C32"],
  ["9acdc959-a80a-4538-9be3-5f526b7b2de4", "ST1333", "BLACK, RED", "L", "Centaur Polos", "12C42"],
  ["7e2bf2e5-cf75-4b69-ba5d-a70e7571da7b", "ST1333", "BLACK, RED", "XL", "Centaur Polos", "12C52"],
  ["5c4cfae7-d944-4afd-b268-c90d8d4a0f51", "ST1333", "BLACK, RED", "2XL", "Centaur Polos", "12C52"],
  ["b07b1ad9-d8e4-4234-9732-31b83b94b6d3", "ST1333", "BLACK, RED", "3XL", "Centaur Polos", "12D52"],
  ["ab1dc0e9-0d2b-43dc-8431-bde6589e6bcb", "ST1333", "BLACK, RED", "5XL", "Centaur Polos", "12D42"],
  ["5610cde2-3fb2-47b1-98b1-7ec0163bcf93", "ST1333", "BOTTLE, WHITE", "8", "Centaur Polos", "12D41"],
  ["41ecf6d4-d21b-4fbf-8f05-34d6a4b9bf0f", "ST1333", "BOTTLE, WHITE", "10", "Centaur Polos", "12D51"],
  ["7385ed8d-beb3-4c39-ada0-242532d7ff07", "ST1333", "BOTTLE, WHITE", "12", "Centaur Polos", "12C51"],
  ["7d78d476-a761-44c7-8ee1-b44a6a63ddab", "ST1333", "BOTTLE, WHITE", "14", "Centaur Polos", "12C51"],
  ["65df2fcb-659f-43c2-93cc-76688811fa05", "ST1333", "BOTTLE, WHITE", "16", "Centaur Polos", "12C41"],
  ["bf5a8898-2f8a-47b5-b1af-23054fd045b7", "ST1333", "BOTTLE, WHITE", "18", "Centaur Polos", "12C31"],
  ["1e6d6540-f546-4b1a-bd69-687cbe8550fa", "ST1333", "BOTTLE, WHITE", "20", "Centaur Polos", "12C31"],
  ["154888b0-a936-4dd9-ab52-2b0dd283853d", "ST1333", "BOTTLE, WHITE", "22", "Centaur Polos", "12C22"],
  ["964a2a8b-0a95-46e5-8e66-36ff49b295a1", "ST1333", "BOTTLE, WHITE", "S", "Centaur Polos", "12C32"],
  ["9ca3b837-8cfc-47e5-b8e8-d05aee60c227", "ST1333", "BOTTLE, WHITE", "M", "Centaur Polos", "12C42"],
  ["1cc2787a-7bad-4484-bccf-2159cbf4d04a", "ST1333", "BOTTLE, WHITE", "L", "Centaur Polos", "12C42"],
  ["450baad9-1a9f-4e25-bb97-cde4b58852b6", "ST1333", "BOTTLE, WHITE", "XL", "Centaur Polos", "12C52"],
  ["ffba975d-cabb-4f48-84f7-b72db8a58456", "ST1333", "BOTTLE, WHITE", "2XL", "Centaur Polos", "12D52"],
  ["57cc9081-bb5c-4610-97e3-8c68e2df8aa5", "ST1333", "BOTTLE, WHITE", "3XL", "Centaur Polos", "12D52"],
  ["f92e0554-06e5-470b-b070-ece071a02811", "ST1333", "BOTTLE, WHITE", "5XL", "Centaur Polos", "12D42"],
  ["934ce800-5a87-4190-b053-61aafe2309db", "ST1333", "NAVY, WHITE", "8", "Centaur Polos", "12D41"],
  ["46ce5d97-8a53-47b3-8296-fbb51896c265", "ST1333", "NAVY, WHITE", "10", "Centaur Polos", "12D51"],
  ["ce7d84fb-48de-4820-9b05-009cd02c0424", "ST1333", "NAVY, WHITE", "12", "Centaur Polos", "12C51"],
  ["2a3d11b2-4b35-4ae9-b0cf-44b2fedb87a4", "ST1333", "NAVY, WHITE", "14", "Centaur Polos", "12C51"],
  ["3cc92778-cd2b-419f-8285-0e8a82cbe2cd", "ST1333", "NAVY, WHITE", "16", "Centaur Polos", "12C41"],
  ["c452fbd4-4c86-4cfb-9001-8bdca4fb3f8e", "ST1333", "NAVY, WHITE", "18", "Centaur Polos", "12C31"],
  ["268b13e8-5314-44c8-be0c-e9b4ff9e4e54", "ST1333", "NAVY, WHITE", "20", "Centaur Polos", "12C31"],
  ["7cd261a1-f4a2-4990-8d33-88b197dbc0c9", "ST1333", "NAVY, WHITE", "22", "Centaur Polos", "12C22"],
  ["2bf1c8fe-7e1d-41d9-a6d6-ff64eb61dbe8", "ST1333", "NAVY, WHITE", "S", "Centaur Polos", "12C32"],
  ["ff843f7e-901c-432e-9a5e-04057e693741", "ST1333", "NAVY, WHITE", "M", "Centaur Polos", "12C42"],
  ["40ec2e3c-fe80-44e8-ab26-9704d6158515", "ST1333", "NAVY, WHITE", "L", "Centaur Polos", "12C42"],
  ["d959db15-fc74-4a68-aad9-22105d515ea2", "ST1333", "NAVY, WHITE", "XL", "Centaur Polos", "12C52"],
  ["7355b997-7029-4246-a498-c86731976893", "ST1333", "NAVY, WHITE", "2XL", "Centaur Polos", "12D52"],
  ["6ac9ad75-cf8d-4212-90ef-4cba9c3649ea", "ST1333", "NAVY, WHITE", "3XL", "Centaur Polos", "12D52"],
  ["081479ea-868a-426a-b3ec-b4a94b969484", "ST1333", "NAVY, WHITE", "5XL", "Centaur Polos", "12D42"],

  ["5d253317-995c-4fec-8d09-5f5d77e01a7c", "ST1431", "HOT PINK, BLACK", "10", "Rochelle Top", "12M33"],

  ["8e3047cd-f7ed-4565-be63-9eaa9644ebae", "ST1438", "BLACK", "6", "Karrise Top", "12P33"],

  ["b807cdb0-840e-44a4-bf03-46ca07b77e10", "ST1460", "AQUA", "S", "Eastwood Tees", "2GG33"],
  ["df0896a5-0853-446c-b174-095159a13a1a", "ST1460", "BLACK", "S", "Eastwood Tees", "2GG33"],
  ["99e8ee57-1f88-46e6-aa5e-3b5217667566", "ST1460", "BROWN", "S", "Eastwood Tees", "2GG33"],
  ["6c2585bb-4829-4980-87d6-9e46f5da83b9", "ST1460", "LIME", "S", "Eastwood Tees", "2GG43"],
  ["88bbacd4-7078-4f4c-bcd7-a240aecd6d9d", "ST1460", "MARBLE", "S", "Eastwood Tees", "2GG43"],
  ["a1b8efc6-642b-42d9-8fa4-ed66f59df6ce", "ST1460", "MAROON", "S", "Eastwood Tees", "2GG43"],
  ["8082dd3a-89e3-403a-93dc-bb52e41fd44d", "ST1460", "NAVY", "S", "Eastwood Tees", "2GG43"],
  ["9f83214e-8962-414f-9b85-ba41d33d8264", "ST1460", "ORANGE", "S", "Eastwood Tees", "2GG43"],
  ["c4147580-a1ba-483a-b9ed-e16633d0fa95", "ST1460", "PINK", "S", "Eastwood Tees", "2GG43"],
  ["2b98e73a-4d64-4f4c-871e-db792860d45f", "ST1460", "PURPLE", "S", "Eastwood Tees", "2GG43"],
  ["3b1277f9-c1e9-4f5d-bd44-6db27c448312", "ST1460", "RED", "S", "Eastwood Tees", "2GG42"],
  ["9b5ae7da-11ea-4d11-9468-caf540caec6f", "ST1460", "ROYAL", "S", "Eastwood Tees", "2GG42"],
  ["95c5f12f-4487-40f0-9dbd-f3bc97e5fe30", "ST1460", "SKY", "S", "Eastwood Tees", "2GG42"],
  ["04a5a3aa-0437-4a4c-b7dd-6afb59a41cb7", "ST1460", "STONE", "S", "Eastwood Tees", "2GG42"],
  ["5cce275c-5dc9-4b5d-bfa0-204733c01c13", "ST1460", "YELLOW", "S", "Eastwood Tees", "2GG42"],

  ["8b45d9bb-c6d8-43ec-8715-6ca527e6a6fb", "ST1471", "WHITE", "8", "Amber Tees", "Bay63-2"],

  ["b57b0b57-5d5d-4b68-89a6-8596957095ca", "ST1481", "RED", "8", "Onyx Tees", "Bay64-2"],

  ["4bd6a9e8-318a-4ed7-a16f-86dbfc77b765", "ST1485", "BLACK", "2XL", "Ashton Tees", "2GU43"],
  ["5cd44c42-bc12-4255-8948-3a0777d93032", "ST1485", "BLACK", "L", "Ashton Tees", "2GU33"],
  ["0d82089d-2176-4a74-bb78-6b4bdec35bb2", "ST1485", "BLACK", "M", "Ashton Tees", "2GU33"],
  ["5c2f7f75-0cda-4b18-97b2-276b7684befa", "ST1485", "BLACK", "S", "Ashton Tees", "2GU23"],
  ["5ca9aa2a-c189-43c8-bd3a-e1b3a57be59c", "ST1485", "BLACK", "XL", "Ashton Tees", "2GU43"],
  ["e04a5431-a6f2-47b9-96aa-ad3d40596faa", "ST1485", "NAVY", "2XL", "Ashton Tees", "2GU43"],
  ["df77b080-2879-4924-9058-fd1c6addc570", "ST1485", "NAVY", "L", "Ashton Tees", "2GU33"],
  ["e9ad5d7f-cf61-4906-ad1c-3021db4798b3", "ST1485", "NAVY", "M", "Ashton Tees", "2GU33"],
  ["cf3d9398-e179-42e8-9682-db6fde7c7539", "ST1485", "NAVY", "S", "Ashton Tees", "2GU33"],
  ["0d459463-8113-4d44-ae79-8e5fe6d1a86c", "ST1485", "NAVY", "XL", "Ashton Tees", "2GU43"],
  ["7f8969c7-a2a1-4c03-8eb2-d7e0bdc274ef", "ST1485", "WHITE", "2XL", "Ashton Tees", "2GU43"],
  ["23d0881b-45fc-4b28-a708-8bbabb2e4df0", "ST1485", "WHITE", "L", "Ashton Tees", "2GU43"],
  ["a22e63c8-8b66-4011-9f9f-6607bb657d8e", "ST1485", "WHITE", "M", "Ashton Tees", "2GU33"],
  ["9766f1e0-24ea-440b-b9b5-531641492ff6", "ST1485", "WHITE", "S", "Ashton Tees", "2GU33"],
  ["f4efb1a7-bbbf-46c8-99d3-62b6778ebf06", "ST1485", "WHITE", "XL", "Ashton Tees", "2GU43"],

  ["30fd4867-202a-44aa-b556-65b4b8cc8522", "ST1492", "BLACK, BLACK", "8", "", "12I33"],

  ["f9076bce-353c-4481-bb75-c9e04ead4e2a", "STH3060", "NAVY, WHITE", "S", "Optima Hoodies", "12Z51"],

  ["3154258c-2004-4e66-a44b-f612c0f93e2c", "STP5020", "PINK", "10", "Carrington Polar Fleece", "12O52"],

  ["7eb2929c-22e8-4c02-83cf-54c71106e685", "STS5050", "BLACK", "2XL", "Sierra Shorts", "12K41"],
  ["ed4025d3-34f8-4a89-a5fe-9e2d36eb3d38", "STS5050", "BLACK", "2XS", "Sierra Shorts", "12K42"],
  ["179b6bee-df5d-417b-ae3d-eda817563585", "STS5050", "BLACK", "3XS", "Sierra Shorts", "12K42"],
  ["123b7f79-0cbf-430a-9b4e-63f75c6fe248", "STS5050", "BLACK", "L", "Sierra Shorts", "12K41"],
  ["577643ea-1ba3-4e7d-bb4b-7632e7dce404", "STS5050", "BLACK", "M", "Sierra Shorts", "12K31"],
  ["e27f1a34-771d-43f1-8c6e-fb339e200159", "STS5050", "BLACK", "S", "Sierra Shorts", "12K32"],
  ["de5569ab-6744-443b-b6dc-de6f48eb6fdf", "STS5050", "BLACK", "XL", "Sierra Shorts", "12K41"],
  ["9b405d92-5032-4a14-b219-18ec03cde3f0", "STS5050", "BLACK", "XS", "Sierra Shorts", "12K42"],
  ["ba18efd2-6def-4cc2-90f9-a4fcbb5cf6d1", "STS5050", "NAVY", "XS", "Sierra Shorts", "12K42"],
  ["bf0cf3f0-7b09-40fe-b72e-5796226507c5", "STS5050", "NAVY", "2XL", "Sierra Shorts", "12K41"],
  ["a8b2b033-38c2-4c5d-b96d-45259a3dbf93", "STS5050", "NAVY", "2XS", "Sierra Shorts", "12K42"],
  ["5e15a709-d687-4f46-b1c5-d727cb099cdd", "STS5050", "NAVY", "3XS", "Sierra Shorts", "12K42"],
  ["0f9a9679-39c4-4fa7-a9ea-74017e318c07", "STS5050", "NAVY", "L", "Sierra Shorts", "12K41"],
  ["343192c3-a583-4bbe-a8d1-e5194a3a4ad2", "STS5050", "NAVY", "M", "Sierra Shorts", "12K31"],
  ["1807c4c7-407f-44db-a910-a08928a88b0c", "STS5050", "NAVY", "S", "Sierra Shorts", "12K32"],
  ["2ddb4418-eb77-407f-904f-e52364cf0a6a", "STS5050", "NAVY", "XL", "Sierra Shorts", "12K41"],

  // MISC
  ["058618c6-5ff6-4413-951b-6809956850a9", "RECORDS", "", null, "Records 2013 - 2015 - 2016", ""],
  ["41b2a458-71f3-4eeb-bd49-11b40419aa30", "RECORDS", "", null, "Records March 2015 - Carpet", ""],
  ["8c86dfc8-21ae-485d-80d9-7c965cac6ae5", "RECORDS", "", null, "Records 2015", ""],
  ["a3b1821e-5cc5-42c0-bd89-ef8cc93dbf0c", "RECORDS", "", null, "Records 2014-2015", ""],
  ["06f21122-b8e7-41a2-9e87-61495eb37a90", "RECORDS", "", null, "Records 2007, 2013-2014", ""],
  ["b8bea33a-a4d7-47bf-9140-b25e97f0b648", "RECORDS", "", null, "Pontoon - 2015", ""],
  ["66b35316-ee67-4127-9d73-8e7fea7c8462", "RECORDS", "", null, "Records 2014", ""],
  ["b79f6b98-a99a-4b6c-abc6-432625dff985", "RECORDS", "", null, "Records 2010-2017", ""],
  ["3019b5b6-6cf1-4b41-b8ba-5f27c613f5e0", "RECORDS", "", null, "Records 2012-2014", ""],

  ["7216541f-ab35-4e0f-9e4c-6d27b99090c2", "BOXES", "", null, "FlexFit Boxes", ""],
  ["3448c438-e1a6-11ed-b5ea-0242ac120002", "BOXES", "", null, "BOXES", ""],

  ["780b5f80-bd9f-446d-adc6-b303204f01bf", "PROMO", "", null, "Promo Shop", ""],

  ["66707b6c-7ec4-4f75-acc0-7aeb8a05e8ee", "JOB", "", null, "UMS Coomera Anglican", ""],

  ["15e485e5-bda4-44fc-9893-0c341a9c2262", "Shirt Pallet", "", null, "Shirt Pallet A", ""],
];

export const storageData: z.infer<typeof StorageItemSchema>[] = [
  ["ae02950a-09bc-4f86-a6c8-1f138974ed9b", "01-2-2", "2ddb4418-eb77-407f-904f-e52364cf0a6a", 10, 200],

  ["569686b9-7995-459f-a7d7-713ed9e164c7", "13-1-2", "7fa2ab65-e5c6-4052-a440-ca1351ad11a1", 22, 1100],
  ["76cd4692-52b5-4215-a69c-6950a2b69557", "13-1-2", "69f342a7-fcd7-4322-8fcb-4bd92029b11b", 12, 600],
  ["010f345d-6ff9-40b4-b966-eb0e2dd2843f", "13-1-2", "b06abc50-845f-41a2-9607-1470e92d3702", 2, 100],

  ["45e912c8-7f87-4b36-8b44-0b8f04c71585", "59-3-1", "b06abc50-845f-41a2-9607-1470e92d3702", 18, 900],
  ["ef426a67-7b40-48d6-8d82-f4fbbfbd1b11", "59-3-1", "12577f69-0455-4b47-86e9-7aae105a28f9", 12, 600],

  ["23b23e83-a920-4a90-9372-8e988d1ce7e8", "1GB2-3-1", "3fc038a0-33f4-44ca-aaad-74b486dc3e41", 0, 0],

  ["48442b5b-7a67-4341-8aa0-fa5b53e5deca", "1GB2-3-2", "80f29dfe-c5d5-412f-8c44-bdaa3ea4df5d", 0, 0],

  ["7eae5b93-b784-46c2-801a-576ff1ae2b79", "1GB2-4-1", "1f6085fe-14b5-4ab4-b03f-04fce8368dd0", 0, 0],

  ["a971abec-2068-45ca-99b5-6b204e5de598", "1GB3-3-1", "1bcdaddb-d329-46ab-9e8e-bfe09d6f8685", 0, 0],

  ["c671a826-bcd7-4d06-91ad-c61a32f89f52", "1GB3-3-2", "0e8e9457-fe2a-4024-9bda-0ba8805d9847", 0, 0],

  ["4a7731d8-cd05-4d70-aef4-f8edf50a159a", "1GB3-4-1", "3fc038a0-33f4-44ca-aaad-74b486dc3e41", 0, 0],

  ["64fbfaf1-6990-40d7-8f74-1ac854ddb966", "1GB3-4-2", "b5353455-64c5-4381-ba80-a1b51ffd5801", 8, 200],

  ["7d3c716d-667c-4e6a-b5d3-dc27cb36ed49", "1GB4-3-1", "41b2a458-71f3-4eeb-bd49-11b40419aa30", 0, 0],

  ["ccd46e0e-ebda-4447-9533-61c32f91bf18", "1GB4-3-2", "a0dff6eb-2332-4f87-a541-883d306eb631", 0, 0],

  ["a7913369-61b7-4075-91a8-a40d3c8f5349", "1GB4-3-3", "8c86dfc8-21ae-485d-80d9-7c965cac6ae5", 0, 0],

  ["64eb83e6-885d-4346-a04d-7f7a9fd02fbe", "1GB4-4-1", "5d253317-995c-4fec-8d09-5f5d77e01a7c", 0, 0],

  ["ceea6822-5a1b-48e9-ae86-a7749ae37a1b", "1GB4-4-2", "e8d88815-029b-4f61-b3c0-021f3c8ab6f2", 4, 200],

  ["440b1d75-7e83-49c9-8189-4a911ffb6f4e", "1GB4-4-3", "df0896a5-0853-446c-b174-095159a13a1a", 0, 0],

  ["c85cc3e9-716d-4c16-b4ff-9f6a43e282af", "1GB5-3-1", "27398d58-08f7-4028-a878-6fa905fc7034", 6, 900],

  ["f2fe480a-48c3-4e34-a048-64bf80500a17", "1GB5-3-2", "d78e8d95-910b-452a-b351-7efdede9e492", 8, 200],

  ["dbc28551-e45b-47ef-a0b3-394b2a26d9cd", "1GB5-3-3", "4dde5095-9373-4c51-9d8b-bf59a85efcd2", 3, 30],
  ["1178c57a-39a5-4a0d-9fdc-c8ba8858c951", "1GB5-3-3", "fee59132-de23-4478-b5ae-2aaabd500ff9", 7, 70],

  ["d0ab1f9e-acba-490a-8b60-823f86488e0a", "1GB5-4-1", "177da811-bb50-46cf-a5d2-fe9e54df19aa", 0, 0],

  ["5814a63a-51ca-4529-9844-5802ad0391f3", "1GB5-4-2", "80f29dfe-c5d5-412f-8c44-bdaa3ea4df5d", 0, 0],

  ["80628519-3750-4f09-b2f3-0bb5699e0130", "1GB5-4-3", "d10cc15c-1574-4dc1-8746-b1fcbf622e0d", 0, 0],

  ["99527c60-a22d-41c8-b76d-31780c3f9ad8", "AB1-1-1", "d2f4fbed-f0fe-492e-933d-6a742f0b0989", 0, 0],

  ["3915e1f3-863d-4544-aa8b-5b29c365bc67", "AB1-1-2", "61bb67de-7ffd-4f72-8141-895e431de73e", 0, 0],

  ["3cb915fa-6bee-424e-bb41-107434c95b0e", "AB1-2-1", "a77a4f91-7bf3-406a-8218-46c5f41f43fa", 0, 0],

  ["6ca83d60-f86a-4037-9829-42e329f67085", "AB1-2-2", "168a5b69-4de4-4a5e-be44-c1ae176d1c58", 0, 0],

  ["38a62dc4-0834-4e23-8622-e67cb0719f46", "AB1-3-2", "7cc8fd1f-dc14-45b1-a151-c7c7ca4f7881", 12, 96],

  ["cfc1930d-5fd5-4aa9-ac1a-8f418ec52155", "AB2-1-1", "068314e9-60aa-4756-8141-e1b948bb192b", 5, 125],
  ["088677b6-2770-4784-a511-fb02aae811a9", "AB2-1-1", "49808511-cc2d-428f-a7bc-7c9fe0b3c770", 5, 125],

  ["b0035c95-7515-491b-a211-20318dc94665", "AB2-1-2", "86223ecd-18d4-48dc-a7e5-34227b450d4e", 11, 550],
  ["c40d3f20-a35c-4691-a6ad-f07f58298aeb", "AB2-1-2", "e5225d7a-c273-454d-a81c-a92fb6a45843", 0, 0],
  ["7fc0d6e7-f286-41c0-9abf-4feba0a2fb7e", "AB2-1-2", "1a63c989-4ad2-4399-a10b-77ee65b354ae", 0, 0],

  ["dec663d6-eff9-40c5-9dfc-79fb71bb924d", "AB2-1-3", "3fc038a0-33f4-44ca-aaad-74b486dc3e41", 0, 0],

  ["6e8d4202-4e00-4b98-a214-502e32e99047", "AB-2-2-1", "e5f0dc61-b2b5-4bc4-8f69-6ea046827b9d", 0, 0],

  ["56f5fa6d-00e9-4188-918b-a47d30be9476", "AB2-2-2", "11fc7da3-a7e4-4e75-b690-99a9f0f94a2a", 0, 0],

  ["ca9e8e53-41e9-4cb8-88f1-b6466d29245f", "AB2-2-3", "ced76412-0976-46e0-9912-726dd55aa8cb", 0, 0],

  ["a56cb7ac-c51c-4b24-a2c1-38ae6afa53d0", "AB2-3-1", "168a5b69-4de4-4a5e-be44-c1ae176d1c58", 0, 0],

  ["819bc7b8-ed1a-476e-8768-07f97fac3125", "AB2-3-2", "168a5b69-4de4-4a5e-be44-c1ae176d1c58", 0, 0],

  ["854a4fa8-91f5-4394-b9f8-9ab144211861", "AB2-3-3", "11fc7da3-a7e4-4e75-b690-99a9f0f94a2a", 0, 0],

  ["caeef184-2fb6-4cc0-886f-5a040509c970", "01-3-1", "7cdfdeb0-d6aa-4e71-adea-e5b585843afc", 10, 1950],

  ["623c9c94-3bde-4260-b86d-7bced61d8dac", "01-3-2", "7cc8fd1f-dc14-45b1-a151-c7c7ca4f7881", 12, 96],

  ["98707e76-e450-44a4-b7a3-e759370dffc6", "01-3-3", "1bea6f54-012d-4ab6-9237-e71c0cf3a3fa", 0, 0],

  ["d91e4b98-e700-4c0d-9b4c-c8cf400a91da", "01-4-3", "7a47cd86-afd9-401d-8069-aab890050663", 7, 1050],

  ["9aaee345-3988-4c61-b1d9-41c77107df85", "02-3-2", "d7287cf5-4145-467d-be44-0503874194a3", 11, 88],

  ["7fdceee3-2b9c-4fbf-9c45-b1e33eb44efd", "02-3-3", "e7f1fe15-4fcd-4070-8fd3-ffeeb8e2e531", 9, 135],

  ["10f3eee6-de69-40cd-9a19-7da01c86eeda", "02-4-1", "95c5f12f-4487-40f0-9dbd-f3bc97e5fe30", 0, 0],

  ["b8b5f09e-c59a-4528-8ce4-020e7d7097dd", "02-4-2", "25cedb22-0265-46f5-8d19-53b5ca87e837", 15, 150],

  ["489d6bd9-34c0-48e0-908e-3eaaf3c9cf88", "02-4-3", "bc06f696-5d3d-448f-b0ea-2a85d9397e1c", 0, 0],

  ["c377e782-9a4c-4bd8-a35c-96a0b211420a", "03-3-1", "dc44ba43-0fb9-4b11-ad9b-3366263f430b", 8, 120],

  ["1843b6a1-f477-4ddf-a62b-3c202d31890a", "03-3-2", "81c617fc-92ab-474c-9ffa-ceeeaa059e25", 0, 0],

  ["44595c99-32d8-4916-9e22-7be6d5cb9a8c", "03-3-3", "7a27f62d-f2ad-4059-8bbd-338d42fcb144", 11, 275],

  ["90efdec7-69c7-4962-96c1-8c0a7b92271f", "03-4-1", "59ab0b17-5b92-4646-8bff-abc15320a07a", 18, 450],

  ["c3afb5ec-5761-44e5-a87d-6d99b8fec564", "03-4-2", "1dc195b6-b722-46d4-a2a0-45c2520bc661", 0, 0],

  ["d7a37776-5720-4a6a-9c8d-756e056f5a5c", "03-4-3", "bc06f696-5d3d-448f-b0ea-2a85d9397e1c", 0, 0],

  ["e720ff78-1948-4839-a412-b2913a0d540d", "04-3-1", "a8d6a874-9f63-4761-bb24-0f3e42423d11", 7, 105],

  ["54b9277b-49cb-4a8c-b7c1-6d2c6db02f55", "04-3-2", "534e1b80-6c0c-4f57-978a-0691f76929bc", 6, 900],

  ["e7df5c33-b786-4a6b-a4b0-93d991e34b65", "04-3-3", "08168613-7d98-4b60-af13-d6b310434541", 5, 0],

  ["05252ddc-8913-4646-bee9-db0b95c3216f", "04-4-1", "768c9c62-d1e3-42c3-9380-4e86fa7348ae", 18, 270],

  ["08f8bba2-f726-4d08-b791-60ad32670270", "04-4-2", "5fda5fda-6c1e-44d6-ae13-e7b54a1c3112", 3, 600],
  ["e1330c90-d2c7-4297-8a2b-10bcadf5caa6", "04-4-2", "b690a8a3-4837-4bdc-97bc-0b657f1546db", 3, 600],
  ["4e1ecba0-25a7-4e51-b193-9271976c0ca1", "04-4-2", "0af41901-8405-42e3-91d9-d4cb7bb92146", 3, 600],
  ["aa7ebca0-e95c-4460-b1bc-77763e876f20", "04-4-2", "9396427c-250b-471f-9678-e594c344da5e", 1, 200],
  ["6eb9ca73-b59b-4fef-a0be-81befbf26dbb", "04-4-2", "f85f9668-715a-4998-a1a2-4b5db272378b", 1, 200],
  ["d3e8342d-7973-4040-b9ae-f9cb54ff36cb", "04-4-2", "a4a2a5db-7ece-45ea-9f0b-3f3ea202684a", 1, 200],

  ["64cdbe71-e77b-48a7-9f5e-dbb98b4655bd", "04-4-3", "ce26b2a5-1204-4e7b-850c-d7b9c66f1d07", 0, 0],

  ["e132ef75-eb13-420b-a5ed-33abb119d153", "05-3-1", "760b66d6-3fe9-4060-bc40-6fd7034b741f", 10, 250],

  ["03479bfa-4720-4d52-8fe1-84ee400097d5", "05-3-2", "7a9ec51d-ddbc-4518-ac19-5e03294c59dc", 6, 90],

  ["d7c65144-5a76-49d9-b910-006bd4cb1152", "05-4-1", "234e47be-9892-4f1a-a5c7-060e8740c4ad", 16, 2400],

  ["b94bc69e-2bee-40c6-8ac4-3d777d5febdc", "05-4-2", "a3d08c40-109e-4cf8-9997-fa8646f656cc", 12, 192],

  ["d7265bc1-e83c-4294-82e6-e7232ad2c2d2", "05-4-2", "eac6fa83-564f-4d29-ab94-5d791f085075", 12, 192],

  ["cb5c3e5e-dd74-4a87-be82-68b4f5691d19", "06-3-1", "1c67202e-85cd-46aa-be42-dd18816aec87", 9, 144],

  ["0e77004d-c896-47ee-a0e0-9bb592eb2ed5", "06-3-2", "59e4a077-542b-43c8-a3cf-3804973627ba", 10, 96],

  ["e693b600-19a1-4403-847d-735cd6a9bcbe", "06-3-3", "5f1cc2a9-2e2c-43bc-94fa-8d82442d20c3", 8, 160],

  ["b2fe8bde-0910-4052-a543-b2faa369ca81", "06-4-1", "c8bf22e0-1d13-426f-ae20-870987bf62b9", 0, 0],

  ["9e57ff94-aeeb-4c44-8806-cc5e6c0e4217", "06-4-2", "644defce-bb69-45ef-8e08-e6d90c5e4fbe", 8, 160],

  ["e9db433a-5b2e-4ca6-a5ca-5a996002b4e8", "06-4-3", "a3d4aded-d752-43f6-9772-9095ad08bc30", 12, 300],

  ["ec5c7715-bdf6-4bbf-b41e-a347ba9ea850", "07-1-1", "c8bf22e0-1d13-426f-ae20-870987bf62b9", 0, 0],

  ["aafbd963-6d23-4b16-9bba-6ca83b057025", "07-1-2", "d84ad53b-f256-4252-8f89-7db17a42b502", 3, 450],
  ["432bf735-790c-49a2-8fef-64cd9c9ea456", "07-1-2", "d2cbea68-94b2-4ec1-a77a-c0fccd929758", 1, 150],
  ["4058ea91-9cc2-4e4c-80a3-8e02424214a6", "07-1-2", "cb43676f-6aa2-4bb9-ab94-8e6a83332c7e", 1, 150],
  ["e52bdde7-3393-45ec-9c5d-d677bfb1cdac", "07-1-2", "2951c30e-f7c9-48db-b901-e95acf74a242", 2, 300],
  ["99511edf-69ec-411a-8954-fcb9988f8518", "07-1-2", "1ae700a3-ea8b-469a-aee0-525f5e3d66e4", 2, 300],
  ["2264a21a-e713-4890-9195-e9e9c8e2b87a", "07-1-2", "226177a5-cd9a-49b5-8b59-89eb21d15c5a", 3, 450],

  ["6bec164c-379e-4e0e-9693-694d8348e9a4", "07-1-3", "6a32b80f-1897-4280-93bc-1bf49231822e", 8, 1200],

  ["7d389835-2231-4b64-950c-f5f9815b277c", "07-2-1", "f6af84e4-e929-4ff0-ae09-216c94c9e26c", 8, 120],

  ["137cb6b8-a7cd-4627-804c-4448e7626478", "07-2-2", "bcaf8419-4428-4b08-bc82-4568f8d18f8a", 7, 1050],

  ["d2b78625-9709-4df0-bb24-c5c7acff6a4d", "07-2-3", "1876f526-29be-4ef9-9bed-ba3bbc26a9d7", 10, 160],

  ["ba474fe9-1bab-445a-b7d6-55cf79042e17", "07-3-1", "f9076bce-353c-4481-bb75-c9e04ead4e2a", 0, 0],

  ["2a6b2cde-9788-47f9-94b3-c0ff8e10ed61", "07-3-2", "254371c2-a8d9-4f8f-9f3e-46d215dc5b5a", 8, 200],

  ["af13703c-416e-4ee7-b323-c2eecb0579f8", "07-3-3", "ab22dc9e-13b9-44b3-945b-aa090dbc249f", 12, 2400],

  ["17aff16f-8fdf-4c5d-a542-ba10208261ff", "08-2-1", "aaa7c4d2-8cb9-4803-a71b-071a73f2f548", 8, 200],

  ["3d98e8f4-eae1-4c1d-85b4-ca227716bc3e", "08-2-2", "a517e2e2-125c-49d7-ad54-28aedd8613e1", 8, 120],

  ["a2a8691f-3a68-48c9-9ad5-bd72cfa48cdc", "08-2-3", "f23c0a26-550b-41b0-afcd-70509433567b", 6, 150],

  ["cb0c77e8-9354-43f7-8056-ebd3debfbd63", "08-3-1", "9f83214e-8962-414f-9b85-ba41d33d8264", 0, 0],

  ["6926095b-82f0-4ef4-a1d1-c9f81864ab06", "08-3-2", "f30c388d-7adb-4dba-b3d4-302cdfcab63d", 8, 562],

  ["09612af5-de88-46f1-8b85-2d168d5b6fe5", "08-3-3", "25cedb22-0265-46f5-8d19-53b5ca87e837", 12, 120],

  ["b7e58f5c-9d81-4914-bc04-eb7f41e81322", "08-4-1", "48c28a50-fd10-4d02-96e4-aea10679c740", 16, 160],

  ["38ac4ae3-2fa7-4de9-a7ac-7d975101b4dd", "08-4-2", "04a9e8ae-4393-4e8c-9464-2cdf3bd574ed", 7, 1050],

  ["cdd9825f-167a-4948-8ed3-7d83562abe6d", "08-4-3", "edab9f6b-4a53-4a1a-bee0-a34d81a8fbf7", 0, 0],
  ["f38c0fec-2a0e-4d70-8526-2e6499665be5", "08-4-3", "25a723aa-51a6-4487-821a-a0b718276b4b", 0, 0],

  ["9397bb09-d8c3-491d-87b2-f349dbd7c375", "09-1-1", "bcaf8419-4428-4b08-bc82-4568f8d18f8a", 12, 1800],

  ["b80197d0-e035-4c5e-a6ad-bb07ede101b4", "09-1-2", "d2158e5d-97f0-4425-ab3b-913b7fb08a77", 16, 3200],

  ["2c567b93-dcdf-4981-9de2-eb11832eb89d", "09-1-3", "53c292a0-833f-4a6e-a585-520b8da1a7e9", 14, 2100],

  ["2deea22e-34b8-41a3-b63b-a91d710d7839", "09-2-1", "266897bc-8172-4246-a7a2-813cb4112da1", 0, 0],

  ["e7132248-ad20-4f56-8ecf-7c5983289eca", "09-2-2", "ae1dcd8f-f627-4ded-88c1-1a5df10203d7", 8, 80],

  ["5911afdb-b2cc-4d2f-ae9b-6cd0fc63bc55", "09-2-3", "6c7c74ea-3fd0-49c9-bfe8-7f55d63cb623", 24, 1200],

  ["ad7dadc0-d9ab-4c48-a26c-969288363a43", "09-3-1", "88bbacd4-7078-4f4c-bcd7-a240aecd6d9d", 0, 0],

  ["00602359-6029-4ca2-8334-32cb8d2d6d9f", "09-3-2", "f919c180-8152-43bb-9e68-d4efba4d76b3", 16, 2400],

  ["737ded41-baa3-42db-9823-352c893a340c", "09-3-3", "2ff3c93e-447a-48c9-870a-2885fa39cdf6", 0, 0],

  ["2e7c73b2-3e7c-45af-8c7c-2ddda0e79443", "10-1-2", "1c20e764-8167-40bc-8dea-264301154eec", 16, 3200],

  ["20a8783a-cd66-4962-9ca6-18ba31382f28", "10-1-3", "bcaf8419-4428-4b08-bc82-4568f8d18f8a", 7, 1050],

  ["914bd93c-4ae5-4062-abfe-18c346c795ed", "10-2-1", "95c5f12f-4487-40f0-9dbd-f3bc97e5fe30", 0, 0],

  ["9fdc5fdc-8223-40fc-a5f3-47584e0a13cb", "10-2-2", "198a449f-0e86-43f6-81a1-949c3d8281cb", 0, 0],

  ["f640d640-50cd-44d4-ad61-9c17561b3c6d", "10-2-3", "04a5a3aa-0437-4a4c-b7dd-6afb59a41cb7", 0, 0],
  ["c4eb81d2-24d8-4c00-ab81-94cdcb982105", "10-2-3", "df0896a5-0853-446c-b174-095159a13a1a", 0, 0],

  ["8507c8a9-019c-4016-a84f-5615522eb22a", "10-3-1", "a1b8efc6-642b-42d9-8fa4-ed66f59df6ce", 0, 0],

  ["89c7075e-6883-4f2b-ac84-a2624556537b", "10-3-2", "04a9e8ae-4393-4e8c-9464-2cdf3bd574ed", 6, 600],
  ["2452fb31-3b5e-41e7-af25-4674e1bc2860", "10-3-2", "45e3756d-2c26-4682-8a01-5fb651d200c6", 4, 400],
  ["9ce640b9-71fb-4397-865c-792184380b56", "10-3-2", "3ed37e8e-7b90-4b68-8d7f-20435ac57dd6", 3, 300],
  ["32039605-5a17-40d5-8c08-e1ab4e415d01", "10-3-2", "24389f67-7af8-4e0b-bc60-995cc255ca17", 2, 200],
  ["6a902880-8060-4406-9f04-534b5a6adf06", "10-3-2", "f6ad833d-4400-4af3-a904-17aa12c07bff", 2, 200],
  ["7eb45e8a-fa71-4cf1-9046-64eca91ef6c8", "10-3-2", "46a5bcab-c202-4196-a621-dd8168276d07", 1, 100],

  ["a5fa12f5-d904-45a0-afb5-a6467cdae2ca", "10-3-3", "c9f287bc-094f-4f12-b916-1b10461643b6", 0, 0],

  ["e6e2c180-0dad-4d5e-8da4-c66f00d9c4af", "11-1-1", "eeac0ad5-8155-4472-97c8-6b85b23dc39f", 7, 1050],

  ["d53176ae-c25d-44a3-921e-0decaeab1714", "11-1-2", "f919c180-8152-43bb-9e68-d4efba4d76b3", 12, 1800],

  ["bcb0fe25-8928-465c-af56-c71e6a89615b", "11-1-3", "8380ee86-7b8b-41e4-9762-16851ba54381", 10, 1500],

  ["d1472d9f-ce6e-447d-b59b-400d4d353bc9", "11-2-1", "a77a4f91-7bf3-406a-8218-46c5f41f43fa", 0, 0],

  ["17c74418-e1a2-438f-a120-24c7a5335802", "11-2-2", "1bea6f54-012d-4ab6-9237-e71c0cf3a3fa", 0, 0],
  ["13d2c18a-bfd2-4186-b50a-155819eb2d1e", "11-2-2", "c9f287bc-094f-4f12-b916-1b10461643b6", 0, 0],
  ["abef3943-d401-4bf2-97b5-194dd3618eb2", "11-2-2", "068314e9-60aa-4756-8141-e1b948bb192b", 0, 0],

  ["faac07eb-457b-4166-b939-29acbeddc6d0", "11-3-1", "e1df9535-8ab3-4a2a-a87b-042ac9689a37", 0, 0],

  ["8c583bb8-e4b1-45de-8610-69a7b6edf0a4", "11-3-2", "d9507842-b832-4662-a8c3-5219075b3ca3", 0, 0],

  ["83eb029a-e2f9-4fa5-8ae1-2b178023ba7d", "11-3-3", "068314e9-60aa-4756-8141-e1b948bb192b", 0, 0],

  ["c87a01b7-d0ef-40c2-a238-d29eac7f0d3e", "12-1-1", "7b352e3c-2216-4159-af8d-674cf2baf082", 0, 0],
  ["2a05a961-9932-4510-b65e-7e2b8445db8c", "12-1-1", "7e329759-09dc-4418-9a3f-ae542af990db", 0, 0],
  ["37b1b308-462e-4963-91ff-b5457f734a41", "12-1-1", "c4f430ad-93a9-4266-a63d-c567d58a1c03", 0, 0],

  ["cb7d7f94-d6c7-432d-b287-534446eef4ee", "2GA2-3-1", "758a4689-ac76-42eb-8398-7b077fc15843", 0, 0],

  ["25b2dd0d-1b8d-4ade-a97b-929c346fdbd2", "2GA2-3-2", "a3b1821e-5cc5-42c0-bd89-ef8cc93dbf0c", 0, 0],

  ["88704880-732a-4221-8d0d-35364dcbb389", "2GA2-4-1", "2e23c494-55bf-4a06-9bc5-484473a478d7", 0, 0],

  ["f39efbf8-620e-4f5c-ab69-f14965be6707", "2GA2-4-2", "06f21122-b8e7-41a2-9e87-61495eb37a90", 0, 0],

  ["6741104a-d612-48e4-886f-05b636077132", "2GA3-3-1", "6e543ade-1264-4c87-bf17-d53d2f3c460a", 0, 0],

  ["8c48ebae-ebd4-4bf3-9242-dae27ff64cb7", "2GA3-4-2", "b8bea33a-a4d7-47bf-9140-b25e97f0b648", 0, 0],

  ["6220db69-a76d-4bfc-82df-16e155bd5432", "2GA40301", "11fc7da3-a7e4-4e75-b690-99a9f0f94a2a", 0, 0],

  ["12394134-e4bd-4abb-bf5f-527289f06279", "2GA4-3-2", "78b66fdc-1fb8-4cae-aeb3-c7ad55cdb594", 6, 300],

  ["8bdf1b54-4701-4c2d-925f-4859c96978f3", "2GA4-4-1", "b4083c95-d4d5-4a69-8be7-1278e433b510", 8, 1200],

  ["8cd290bc-7f0f-43b9-bb5c-2653d046df99", "2GA4-4-2", "66b35316-ee67-4127-9d73-8e7fea7c8462", 0, 0],

  ["8f0d3219-a3f7-4f8a-bf8f-177539b631b6", "14-1-1", "7216541f-ab35-4e0f-9e4c-6d27b99090c2", 0, 0],

  ["56a82868-31dc-4f42-ac8b-3dc4bcad5e68", "14-1-2", "7216541f-ab35-4e0f-9e4c-6d27b99090c2", 0, 0],

  ["ba8c607a-95c5-499f-996d-1bafc315f6e6", "14-2-1", "e802add6-0111-4ab2-8112-c6e0394e8cd3", 8, 200],

  ["b04d4ec5-cd2a-4b55-8f11-10762a9db973", "14-2-2", "7216541f-ab35-4e0f-9e4c-6d27b99090c2", 0, 0],

  ["3e48bf8c-0f8c-4c90-a3a1-79a9aec0f6dd", "14-4-1", "9118eb7e-bca2-4dee-8036-56248e0620a9", 8, 1200],
  ["9a21a41c-0d26-45d1-8896-949628cb152b", "14-4-1", "ebabcd17-9e0d-463e-bbef-f114dcdecc42", 8, 1200],

  ["02eb71bc-f2ba-420d-b902-48d4ac7c3314", "15-4-1", "cb19a2a8-269c-4c65-a971-27f2fb80320a", 8, 128],

  ["9ccf3be6-ae0d-4e0d-bc78-6b31b32e16a2", "15-4-2", "bddfbcda-a1fa-4527-a3b4-87a66e5ab7b1", 9, 1350],

  ["3c13e1cf-b82e-4e3c-af06-edfd286705ce", "15-5-2", "4ef0d710-9677-44cd-ae77-9255abac2d02", 20, 399],

  ["0b7a909f-82cf-4bf2-888d-89550a5ecc23", "16-4-2", "5d9a4de1-c8df-459b-b442-8434fb3d4874", 7, 1050],

  ["ca894c1f-fd4e-4cf9-8882-4c741140c804", "16-5-51", "28699d5b-b66f-4f3c-bfe3-3de37e36097b", 14, 2100],

  ["6825b2fe-e33e-45d6-902a-1f6a8054618c", "16-5-2", "bbfa1064-22cf-41e4-a8a8-2c5f6e6ed1d9", 16, 240],

  ["be3a4c46-ae72-4918-be94-7fb45b3fd500", "17-4-1", "a6cd79e1-4c21-4c48-bb30-07f007b5ea8b", 4, 600],
  ["1a2dfa5d-dc51-4d51-8feb-fc1d708ccf22", "17-4-1", "34826911-ba7f-4419-bfe2-cac3ffefb2c3", 4, 600],

  ["79a6dbec-455b-41b4-b39b-7fad430d8c34", "17-4-2", "8fc31e03-0fda-4c78-aeed-e2c4b360b944", 8, 1200],

  ["e5039de9-a90f-40ac-801f-73bec163e882", "17-5-1", "ae1dcd8f-f627-4ded-88c1-1a5df10203d7", 15, 150],

  ["8a71b244-b4d7-48a0-9304-c5e8a578e6e3", "17-5-2", "bcaf8419-4428-4b08-bc82-4568f8d18f8a", 12, 1800],

  ["f9461425-1001-412c-a671-95d101f8520c", "17-5-2", "c126abf0-ca07-4c73-ae50-9ccb4820b10f", 8, 1200],

  ["adcd2686-e49f-4719-8a29-ea3a8d30429c", "18-4-1", "49737edb-8cfd-4159-b176-9e5bc35ce4b9", 10, 80],

  ["2a5c41c1-764c-4380-a6a2-ccb7ca9e61f3", "18-4-2", "64ee868b-968b-4260-aeb8-b30e1821dd48", 4, 600],
  ["65d047c3-60e8-4176-9caf-a4208f5b60df", "18-4-2", "51e3664a-c794-4d20-bed9-a5b38c3a1221", 2, 300],

  ["caaae542-fcf0-4251-83bc-b2015c07363d", "18-5-1", "aed9531c-8c3c-43b6-b7e6-c68494357f3b", 5, 180],
  ["f833ed14-7477-4a20-9c51-9adeb6f6767b", "18-5-1", "b6db2685-4cbd-4a4a-b07b-7783dee5d2a5", 4, 80],

  ["37bf75ae-f9ad-409c-bb4d-067456cb737a", "18-5-2", "57215869-8a64-499d-bd50-e3d8d350cbad", 10, 1500],

  ["6d75549d-da5a-468d-bdef-a75dac98c73e", "19-4-1", "49737edb-8cfd-4159-b176-9e5bc35ce4b9", 15, 120],

  ["5ffe71b6-01f5-470b-9e4a-c62ca1089b92", "19-4-2", "99e8ee57-1f88-46e6-aa5e-3b5217667566", 0, 0],

  ["0d00ec6f-fca4-4775-a3ee-1f968141b239", "19-5-2", "2566ac01-a2a3-46c7-adc9-d8090e4e0ed6", 28, 224],

  ["1dcfdffa-6a20-4b2c-9708-37c9328c2811", "20-5-1", "15e485e5-bda4-44fc-9893-0c341a9c2262", 17, 0],

  ["4ec38b26-4b5f-4419-aa0b-3f8a3564225a", "20-5-2", "4ee59ee3-ec55-4223-81ac-7c815bd578f5", 11, 1650],
  ["11380dba-deb6-46b8-8dd2-0b0a1bd02a35", "20-5-2", "574f3249-7e6f-436a-90c2-503b60fee960", 5, 750],

  ["e9835de2-9c32-42ee-9fe4-df5280bf4cf9", "21-4-1", "834be534-247d-4d9a-ab3f-5134d80b54fe", 6, 900],
  ["5a0e8985-4ff3-44ea-b1c3-97ef47e6e704", "21-4-1", "f5b083ed-0916-471d-9995-125a6fe52ea4", 6, 900],

  ["d8622850-169b-4c40-95c4-1f08d2d08987", "21-4-2", "c2418c79-a667-492c-96ea-5ffc1c9522d5", 11, 0],
  ["f384fbd4-e43d-44f1-ae50-161001ae8475", "21-4-2", "49808511-cc2d-428f-a7bc-7c9fe0b3c770", 11, 0],

  ["9be9c45c-a3ca-4dc7-8525-5ad7917e7602", "21-5-1", "1fe22d42-cbcd-4b18-a07c-177145c572bf", 13, 1950],

  ["d92dd1b9-0239-4504-b26e-89fb8280361f", "22-4-1", "e5225d7a-c273-454d-a81c-a92fb6a45843", 0, 0],

  ["367b835f-a58b-4271-92b8-1ed5c7b64d9c", "22-5-1", "53838b0c-df1b-4239-bc26-e374017959f4", 10, 1500],

  ["3c0fa164-8665-481a-b155-ab01b8fce55d", "23-4-1", "11fc7da3-a7e4-4e75-b690-99a9f0f94a2a", 11, 0],

  ["d921af2f-429e-42b6-835a-267224b70ce7", "23-4-2", "2ff3c93e-447a-48c9-870a-2885fa39cdf6", 0, 0],

  ["6042da18-9c5b-499a-9973-06fd5acf3fde", "23-5-1", "1fe22d42-cbcd-4b18-a07c-177145c572bf", 15, 2250],

  ["2c9715be-3276-4837-853f-f76ec49467db", "23-5-2", "a0e9d02e-c3a4-4a01-a7a5-b5fc8dd04a03", 8, 800],
  ["3b8e850b-f801-4edd-b66b-82b365b62b9f", "23-5-2", "5690c9ae-0c32-4970-9d0d-bf465d9ca9ba", 12, 1200],

  ["be7226a7-dae0-48de-9133-b4168774036c", "24-4-1", "3ffed7b3-caba-481d-985a-9f5f8186fa8f", 7, 700],
  ["3d4ac214-ec52-4b6b-978c-5498fdc97435", "24-4-1", "edb8d44f-bf9e-467c-b343-b8a96d55c5b3", 9, 900],

  ["9db95c1c-4ea5-4349-a4f5-ab865d272d03", "24-4-2", "8c5a99bc-5576-4364-a166-6863cc037515", 6, 900],

  ["5d1912e8-2865-4a08-9ba5-aa47d4b28332", "24-5-1", "1fe22d42-cbcd-4b18-a07c-177145c572bf", 15, 2250],

  ["e7b5bb39-f031-42fc-84b1-87aac8be9559", "24-5-2", "d7403295-8f23-46a5-8267-cd5d7e13ee92", 0, 0],

  ["49e8c8f2-9942-4699-b0e9-34ed23ca4100", "25-4-1", "758a4689-ac76-42eb-8398-7b077fc15843", 0, 0],
  ["2a5d8cc6-c5b7-473c-957c-15c2d4ecbc38", "25-4-1", "ce26b2a5-1204-4e7b-850c-d7b9c66f1d07", 0, 0],
  ["ce6e87cd-6bd5-43e8-bbeb-9957e224d89d", "25-4-1", "1bea6f54-012d-4ab6-9237-e71c0cf3a3fa", 0, 0],

  ["c246182c-62c6-4f38-a72e-d1ca38a6094a", "25-4-2", "0dee5a47-6998-4018-a198-ecad331d11e1", 3, 450],
  ["6132706b-707a-4610-a469-f12eb5b1bd27", "25-4-2", "118ebd39-2580-4394-9553-25054048b042", 4, 600],

  ["3a48fe11-a15f-4853-a96a-63fcb24ec026", "25-5-1", "175c8742-7259-4089-b7f7-aba0f401efa9", 3, 40],
  ["8b5865d3-5c39-484e-8bd8-d660c7c668d4", "25-5-1", "5c94a65f-dacf-4cfb-b700-ce010b7c7543", 7, 140],
  ["b5cfc519-4e0f-4461-a1ec-e218daa656d6", "25-5-1", "000d4286-bacf-4611-b65f-83ed27d4ac43", 2, 40],

  ["c21ec16e-3757-452c-a741-1e82269d2947", "25-5-2", "6ea58105-72d3-4faa-89f4-f7dde8147e89", 0, 0],

  ["e099664f-6600-4a6f-9e5e-b56f359872ff", "26-4-1", "a1b8efc6-642b-42d9-8fa4-ed66f59df6ce", 0, 0],

  ["adee490a-2ca5-452b-801c-022afe1a7c93", "26-4-2", "a1b8efc6-642b-42d9-8fa4-ed66f59df6ce", 0, 0],

  ["5dc64a75-ad59-4489-922e-975a01be1198", "26-5-2", "4cf392ab-a2ec-4347-bd14-1620542979aa", 10, 1500],
  ["79d106d1-61eb-4e8b-bf26-cc73ba7fb345", "26-5-2", "b5ef2435-560f-4018-9a0f-87a025f019ed", 5, 750],
  ["f9d38400-3d5e-4af9-a006-c58609936893", "26-5-2", "5405ee77-4f17-4df9-bb65-41df056800de", 5, 750],

  ["710a9805-15c9-47be-94df-b323301b04da", "26-5-2", "3962ee47-6a89-4254-b1dc-77c0e3d3f24a", 7, 140],
  ["fac8f0e5-68d2-4a80-be93-5795f0122d6c", "26-5-2", "b6db2685-4cbd-4a4a-b07b-7783dee5d2a5", 7, 130],

  ["3f98a81f-fab9-4ed4-b5ba-816ecdc2b0e5", "27-4-1", "0d9f9723-dc45-4cba-a429-bfd7390089d1", 12, 1800],

  ["b3d3a475-83be-429e-920f-57c9b41d2b23", "27-4-2", "5569bff6-4dc8-41d8-ac46-f468405a42a7", 12, 1800],

  ["753cc9f9-f890-4408-8f51-9356c1f5eeda", "27-5-1", "06a20bbf-d135-402e-be2f-17afeef0239e", 4, 600],
  ["75ffb8fc-152b-4e33-bee4-0bcf0ebb4fac", "27-5-1", "9fd22b66-ac0d-48c3-8510-45575e7b12e3", 5, 750],

  ["564908c3-956d-4934-8c2f-62c7871c9805", "27-5-2", "f7f1e51e-47c0-4e9c-bee5-89a81967adc0", 6, 90],
  ["1a1b2a1a-da07-4f14-9d25-638bb73da4c6", "27-5-2", "db99db0c-82b7-49f5-9478-8ba7f5d78918", 9, 180],

  ["5c92b525-ef36-4214-a0e3-347c0ab35647", "28-4-1", "3a983d6e-1e8a-48ed-b126-2da5ca103038", 0, 0],

  ["09c47695-e461-46f3-9d8c-ef1d379ea3b0", "28-4-2", "3a983d6e-1e8a-48ed-b126-2da5ca103038", 9, 630],

  ["720b07a1-6d8d-4b7e-af34-eed960d34ea7", "28-5-1", "08168613-7d98-4b60-af13-d6b310434541", 0, 0],

  ["b4802372-791f-46d0-9b77-86331c402a6f", "25-5-2", "59e4a077-542b-43c8-a3cf-3804973627ba", 20, 200],

  ["dd146e3f-3ae8-4afb-9837-56d45bc57777", "29-4-1", "3b1277f9-c1e9-4f5d-bd44-6db27c448312", 11, 0],

  ["95910b23-e866-4aa5-898b-40db712aaaf3", "29-4-2", "8b45d9bb-c6d8-43ec-8715-6ca527e6a6fb", 0, 0],

  ["45a42dd7-d23c-413c-a794-1adfa2d2fbcf", "29-5-1", "08168613-7d98-4b60-af13-d6b310434541", 0, 0],

  ["8e053f57-454a-4e65-8cfc-776e98ad0e2a", "30-3-1", "9f714de3-2829-41fd-a1af-cb20a3fa6283", 0, 0],

  ["8e9f696a-7fc8-44c2-9ac9-7562da0a0e85", "30-4-1", "ce26b2a5-1204-4e7b-850c-d7b9c66f1d07", 0, 0],

  ["4efcf14a-ec5f-4127-9de9-a856c089444e", "30-4-2", "5cd1bd49-437c-4ff7-98f2-098524c64ea0", 9, 1800],

  ["b30616ad-fbae-4d34-a7f6-20ce873301c3", "31-5-1", "59e4a077-542b-43c8-a3cf-3804973627ba", 20, 200],

  ["2818d83d-a006-485c-a1af-61bef81fa4bf", "32-4-2", "dc72b748-2602-42d0-aa76-88447f58f3b6", 22, 0],

  ["61eb92b5-70b1-4ff4-873c-41ff2d490c95", "32-5-1", "80f29dfe-c5d5-412f-8c44-bdaa3ea4df5d", 0, 0],
  ["0bdae79d-1996-4698-8758-61535f809318", "32-5-1", "81c617fc-92ab-474c-9ffa-ceeeaa059e25", 0, 0],
  ["f1dcbeca-1909-407e-a1b4-d0b9b15a7212", "32-5-1", "1bea6f54-012d-4ab6-9237-e71c0cf3a3fa", 0, 0],
  ["bc739713-d8bd-409a-a9ba-23f69a21a4e2", "32-5-1", "758a4689-ac76-42eb-8398-7b077fc15843", 0, 0],

  ["e029a13c-7402-4363-adbb-48683bc525d3", "32-5-2", "22efe9c0-408e-480d-9e51-46e123f6822a", 0, 0],

  ["60b206ec-e1a6-11ed-b5ea-0242ac120002", "33-1-1", "3448c438-e1a6-11ed-b5ea-0242ac120002", 0, 0],

  ["63357516-e1a6-11ed-b5ea-0242ac120002", "33-1-2", "3448c438-e1a6-11ed-b5ea-0242ac120002", 0, 0],

  ["877584f2-e1a6-11ed-b5ea-0242ac120002", "33-2-1", "7d351caa-e1a6-11ed-b5ea-0242ac120002", 7, 1050],

  ["a3b5d900-e1a6-11ed-b5ea-0242ac120002", "33-2-1", "3448c438-e1a6-11ed-b5ea-0242ac120002", 0, 0],

  ["b96acd00-e1a6-11ed-b5ea-0242ac120002", "33-3-2", "e0ef1c8a-05bc-43d3-af58-2d9ca783e547", 8, 20],

  ["cf062164-e1a6-11ed-b5ea-0242ac120002", "33-4-1", "1c20e764-8167-40bc-8dea-264301154eec", 16, 2400],

  ["00302b04-e1a7-11ed-b5ea-0242ac120002", "33-4-2", "f63ee4b4-e1a6-11ed-b5ea-0242ac120002", 14, 210],

  ["88bbacd4-7078-4f4c-bcd7-a240aecd6d9d", "34-4-2", "88bbacd4-7078-4f4c-bcd7-a240aecd6d9d", 0, 0],

  ["2f922bb5-a017-4180-83ba-b40ce1bd02dc", "34-5-1", "cd54d584-a56e-4adb-bc3c-91bb43e563ec", 0, 0],
  ["28b69507-1f3a-447c-9163-c43c97269d99", "34-5-1", "8c8df5f0-6dad-422e-ae18-819e319e114e", 0, 0],

  ["7489d338-d3fc-4de5-b0bc-93b3dcf7fb9b", "34-5-2", "1709ca61-9b77-4e2b-928d-b31e656df6ca", 0, 0],
  ["e9b463e9-788d-41ce-bfdc-8ff32c30b3f2", "34-5-2", "74569a12-74c9-4e62-b40c-ceb7b9743e2a", 0, 0],
  ["c34ed76e-55ed-432a-b061-0a0bbbc31d61", "34-5-2", "be5560e5-2d0a-4290-b7d6-c83bc684dd04", 0, 0],

  ["04e53c86-dbda-4a2e-9568-0db8f131d333", "35-4-1", "4fcb3072-2caf-48bf-8069-1c27d814a34c", 13, 195],

  ["f3c06f48-7541-44db-9cb3-06f71fae00cb", "35-4-2", "4ea7809d-e4da-465e-a754-4e34e7f48a79", 0, 0],
  ["e09b37c3-084d-4702-a700-d5a377ebfeba", "35-4-2", "bbb59985-18c5-4e53-806c-5e3050f3283f", 0, 0],
  ["981198c9-68ca-4f67-83c4-c0364f3df81d", "35-4-2", "08adf7c5-bf19-41b5-8364-e6cf4a2899ac", 0, 0],

  ["cfc21974-90e2-4a79-88b8-6199ba2d5ad8", "35-5-2", "911197e5-3096-46d8-b80d-bca4e359777b", 0, 0],

  ["7995012f-82c5-4854-8908-be23edfe72b6", "36-4-2", "61bb67de-7ffd-4f72-8141-895e431de73e", 0, 0],

  ["3979bbf1-e851-4315-9061-c6ea44e72977", "36-5-1", "b754ea39-f066-4ff1-9df0-92d5fa155a8e", 0, 0],
  ["747ded48-37eb-4fad-8bd0-0ebe499ae808", "36-5-1", "c68eebfb-72c9-4765-8d40-3d7cb7ccde21", 0, 0],
  ["58e13264-3266-4d6c-9364-df9e7e92b148", "36-5-1", "0fd674c4-8445-4dfc-a6ad-c31ecd2ca99d", 0, 0],
  ["b5d3f563-b042-4d51-8e7a-d17ac592fca3", "36-5-1", "df0953e1-d0c5-4ad9-bfe3-c67ec565689b", 0, 0],
  ["0e6921ab-0f45-4dee-b9f6-ee22876f1c9f", "36-5-1", "bfcb45c1-8323-4737-a602-e232f13d77d6", 0, 0],
  ["0784cfac-149c-4824-8168-aa3dd974b70f", "36-5-1", "2bec573b-1a99-4c37-a843-f67e481d9ab2", 0, 0],
  ["4f9421f1-4678-4dbf-a00d-f4faa9baa31b", "36-5-1", "91f09b25-4b62-4528-940d-9b48d0e5ca8a", 0, 0],

  ["dcd0402e-0999-4471-b921-50c17f3e0055", "36-5-2", "45af37a7-0722-4fff-a73c-79a09f9dc62d", 15, 2250],

  ["070376d0-0c33-4c3a-bbee-0d08eaf099e0", "37-4-1", "8062c761-1ecf-4f06-b5b3-ad16ae35a960", 8, 160],

  ["7b9eb529-5347-4846-b0ba-03f8f4557d91", "37-4-2", "2fdb7a95-260b-4dec-9f4f-03f7e2a5423b", 2, 300],
  ["5d31a346-d71f-49da-81f1-aa8ae018a678", "37-4-2", "99a7cbc8-f3a6-4ee2-9c6d-de1b7872798e", 6, 900],

  ["0c4bb5ce-aa5f-42df-9549-b8944de6c23d", "37-5-1", "a22646a2-d1b0-4a96-815d-dd22cca0cee2", 0, 0],

  ["3919e898-e7cc-45f3-8464-8462db2d2d81", "37-5-2", "a22646a2-d1b0-4a96-815d-dd22cca0cee2", 0, 0],

  ["4ca83ed5-fc22-42ba-8880-8199b3dd453f", "38-4-2", "bddfbcda-a1fa-4527-a3b4-87a66e5ab7b1", 9, 1350],

  ["04b1c4ad-d8e1-4a31-9154-48af16dc3d83", "38-4-2", "6c2585bb-4829-4980-87d6-9e46f5da83b9", 0, 0],

  ["4d4af763-a5e5-476c-b9c4-5b9119b3a94d", "38-5-2", "9e705200-eecd-45df-b04a-b943ac529a63", 18, 180],

  ["4bc9ae35-2264-4387-b2da-303fd6894943", "39-4-1", "1cbdba59-5443-4c74-bb89-ecd61aa5f98b", 0, 0],
  ["d779b436-1fb9-41cb-b543-dc7c10deb0ba", "39-4-1", "bdcdae63-6292-4087-8484-0e5894d5b360", 0, 0],
  ["69f4fca7-b545-491b-a16a-8c6c07b5e389", "39-4-1", "3362cdaf-1afd-4543-8153-3461f563cb80", 0, 0],

  ["3e35e411-7221-4eeb-9aff-9d30dea01cc5", "39-4-2", "8062c761-1ecf-4f06-b5b3-ad16ae35a960", 0, 0],

  ["1bbc01cb-7b3d-4cb1-890a-56578056b2df", "39-5-1", "e5d96985-d137-4f5e-8722-e2c8f0e513da", 0, 0],

  ["9b6a44fc-fb79-447f-9347-17222eb8217f", "39-5-2", "6728027a-a5f4-4901-8215-7f0d2efe6490", 13, 260],

  ["f499b20f-455a-4208-8482-19bc27620004", "40-4-1", "488fa619-bf6e-4d8c-b087-82c088f13028", 0, 0],

  ["66221a53-4c60-4efe-8d9b-c418d5348c34", "40-4-2", "488fa619-bf6e-4d8c-b087-82c088f13028", 0, 0],

  ["5e3d159b-0b91-43a9-91c7-0506804a4a68", "40-5-1", "000d4286-bacf-4611-b65f-83ed27d4ac43", 14, 260],

  ["9ef2dce9-6010-42a4-a0a0-a180edee5b0d", "40-5-2", "57f19e9c-cae2-4454-abdd-3e89773a3c69", 0, 0],

  ["3b3462f7-d4a4-41b5-bb6a-8f127326ba42", "41-4-1", "8082dd3a-89e3-403a-93dc-bb52e41fd44d", 0, 0],
  ["4307e22f-17b8-4f15-baa4-36c1580e102c", "41-4-1", "5cce275c-5dc9-4b5d-bfa0-204733c01c13", 0, 0],
  ["dae412b6-1ea0-4905-aef5-7c6157994dca", "41-4-1", "9f83214e-8962-414f-9b85-ba41d33d8264", 0, 0],
  ["6030249e-55e0-4e26-b00a-c2f479637c97", "41-4-1", "b807cdb0-840e-44a4-bf03-46ca07b77e10", 0, 0],
  ["ed3ce842-e264-4d10-bc16-8020514f47f2", "41-4-1", "88bbacd4-7078-4f4c-bcd7-a240aecd6d9d", 0, 0],

  ["e95ecb86-cffc-457e-a64b-44a9f935858e", "41-4-2", "c4147580-a1ba-483a-b9ed-e16633d0fa95", 0, 0],

  ["6e6b98ea-cbb4-4340-9c81-648734a3e992", "41-5-2", "57f19e9c-cae2-4454-abdd-3e89773a3c69", 0, 0],

  ["f6b9d3b4-ed16-46d2-8af4-2f714c467487", "42-4-2", "b807cdb0-840e-44a4-bf03-46ca07b77e10", 0, 0],

  ["a67bbd97-02d4-42b2-a6b9-4050f73ac563", "42-5-1", "d2158e5d-97f0-4425-ab3b-913b7fb08a77", 4, 800],
  ["723d5c1f-b45f-4da7-9b20-39acf5b19e5f", "41-5-1", "4881bda2-8d8f-48cf-bb0b-bc297b53392a", 6, 200],
  ["5f57c1a6-f7dc-4522-bb35-0dc0121740eb", "41-5-1", "4f18647a-96e0-4006-9790-bbec021a1d28", 3, 600],

  ["a14b4e42-b210-4a85-84ac-43f2c7358240", "42-5-2", "c07ff911-3963-45fa-ae67-2a3bb9211e7c", 0, 0],
  ["16fc8ac1-5cb1-4d17-8f9c-3ce9094dd940", "42-5-2", "1537424f-4788-4059-b0bc-224c5d2ae7f3", 0, 0],
  ["ebc3a8b3-e2f5-440a-8242-49171de88453", "42-5-2", "e04d0b5c-f8af-48c3-96b2-6f5bf589727a", 0, 0],

  ["50a7cc8e-a36e-4e96-8f85-928e6fa0cdd9", "43-4-1", "2b98e73a-4d64-4f4c-871e-db792860d45f", 0, 0],

  ["5d32d07c-4b53-4564-b31e-ecc70598c6cc", "43-4-2", "eed04790-9687-408a-8d0c-f0ea6d60a6fb", 0, 0],
  ["36dfc926-0cb3-421b-b3f0-be075177a129", "43-4-2", "aa81d851-e7f7-4bbb-8fef-77dd97cf3504", 0, 0],

  ["2ab32cab-4526-4f48-9e03-9ec297c735dd", "43-5-1", "08168613-7d98-4b60-af13-d6b310434541", 0, 0],

  ["45b6c7a7-2fe1-4a0b-bb3b-460ea4e8e939", "43-5-2", "1bcdaddb-d329-46ab-9e8e-bfe09d6f8685", 0, 0],

  ["62bf5cd3-060a-4c2d-a99c-8f701c21f4d4", "44-4-1", "f30c388d-7adb-4dba-b3d4-302cdfcab63d", 0, 0],

  ["c148dd75-a30d-4578-b4c9-138e0718b32b", "44-4-2", "e14483f8-51c9-47eb-9901-77dc37da7fc7", 0, 0],
  ["362e6245-4174-431f-a0db-d1ebd5875743", "44-4-2", "edab9f6b-4a53-4a1a-bee0-a34d81a8fbf7", 0, 0],
  ["688e7ba6-3261-4bf5-b55e-01c1ce775b4e", "44-4-2", "198a449f-0e86-43f6-81a1-949c3d8281cb", 0, 0],
  ["f50cbf67-9b5f-4e6e-bd5b-5c46b2610be5", "44-4-2", "22efe9c0-408e-480d-9e51-46e123f6822a", 0, 0],

  ["36b98ed2-a79a-4702-8324-18fb95b4812d", "44-5-1", "29159805-be58-435c-8d6a-29089026227b", 0, 0],

  ["2a35b269-14e0-481c-876d-cdf32e292e72", "45-4-1", "30fd4867-202a-44aa-b556-65b4b8cc8522", 0, 0],

  ["289f450e-a53f-4731-a1d9-9c5a369114d9", "45-4-2", "99e8ee57-1f88-46e6-aa5e-3b5217667566", 0, 0],

  ["2cc73b53-8394-40cd-af4c-b0b95225bc76", "46-4-1", "8e3047cd-f7ed-4565-be63-9eaa9644ebae", 0, 0],

  ["d1cdd3f2-13de-47e9-8c84-ee59b3e45416", "46-4-2", "b79f6b98-a99a-4b6c-abc6-432625dff985", 0, 0],

  ["ce9af19b-8dcd-463b-8b31-2f63a6aba4bf", "46-5-2", "e14483f8-51c9-47eb-9901-77dc37da7fc7", 0, 0],
  ["bc1741fb-e248-4191-842f-66ac0911e546", "46-5-2", "045da4f0-5e59-4d43-8364-abec0bbac38d", 0, 0],

  ["3ca74dae-9b3a-46a7-b4a2-8f3f8ce87547", "47-4-2", "a1b8efc6-642b-42d9-8fa4-ed66f59df6ce", 0, 0],

  ["1a0132d0-1238-43bf-bd25-020d73c12eea", "47-5-1", "86a59a83-6044-4421-a4d3-3d87c97c50a0", 0, 0],

  ["782d6f7d-7213-49c0-bee5-4de462375cfe", "47-5-2", "0dbb2696-ade8-4ad9-b339-3b81411b8c57", 0, 0],

  ["2491388e-5ec1-4135-be2a-3e41092d054e", "48-4-2", "a1b8efc6-642b-42d9-8fa4-ed66f59df6ce", 0, 0],

  ["146b7a37-e04e-4c53-933f-783455dd9868", "48-4-2", "398b43c0-b5ce-44c8-ba2a-348b8eefcebf", 0, 0],

  ["37d22228-b364-4f8e-a01a-4cab62208c80", "48-5-2", "9b5ae7da-11ea-4d11-9468-caf540caec6f", 0, 0],

  ["6c7fc0aa-61dc-459a-8470-e7ba45b3f304", "49-3-1", "c4147580-a1ba-483a-b9ed-e16633d0fa95", 0, 0],

  ["063ad03e-506e-4504-adb0-406e54f6f334", "49-3-2", "d7403295-8f23-46a5-8267-cd5d7e13ee92", 0, 0],

  ["e3b8952e-bb14-4848-9ad7-9ab49fcb5421", "49-4-1", "87b2841a-922c-4a76-b714-047bd5c2ee8e", 0, 0],

  ["e1a36542-ccfa-40c7-a87e-a95ec5aef5a3", "49-4-2", "9b5ae7da-11ea-4d11-9468-caf540caec6f", 0, 0],

  ["50bb36d3-fa91-42ec-a308-01667e2766f0", "50-4-2", "04a5a3aa-0437-4a4c-b7dd-6afb59a41cb7", 0, 0],

  ["c8c9013c-ac15-41b3-87a2-9e6f5d41cdf8", "50-5-1", "88bbacd4-7078-4f4c-bcd7-a240aecd6d9d", 0, 0],

  ["5f0767b2-87b3-4a2c-8506-408ea184eb1c", "50-5-2", "c8bf22e0-1d13-426f-ae20-870987bf62b9", 0, 0],

  ["819926b3-604e-4f00-8bb4-f00aac526421", "51-4-1", "d7403295-8f23-46a5-8267-cd5d7e13ee92", 0, 0],

  ["99cef785-d3bb-4711-9d69-ccaffef1c77c", "51-4-2", "04a5a3aa-0437-4a4c-b7dd-6afb59a41cb7", 0, 0],

  ["3a4901f8-e223-4dcd-989e-85daab5c1fc1", "51-5-1", "1dc195b6-b722-46d4-a2a0-45c2520bc661", 0, 0],

  ["dc11de14-54cd-4b62-8c63-b0e27f3d2ab3", "51-5-2", "b57b0b57-5d5d-4b68-89a6-8596957095ca", 0, 0],

  ["2681fb1c-6899-47b6-b2f6-269ed1073e11", "52-3-1", "ed0089db-8890-4c20-a72c-3608a10bbfc1", 8, 1200],
  ["4b0b652c-be44-4425-8882-c4c7613ff95b", "52-3-1", "64f6a15e-1837-4be5-a5f5-15b04503cb99", 3, 450],

  ["771b275f-4825-4842-a6cb-058f837116b2", "53-2-1", "97650a7d-e51e-4a99-afa1-83600e1f81c1", 12, 1800],

  ["44c0c6b7-e918-490b-aa10-a430f4abd4a4", "53-3-2", "3019b5b6-6cf1-4b41-b8ba-5f27c613f5e0", 0, 0],

  ["3d0d13a1-12be-495e-90e9-8be46d7eb167", "53-3-1", "cf1b0404-2ff6-400e-ac45-5258a43f0d7f", 8, 1200],
  ["99d6d4e5-8a2a-423d-a7f0-cd5e64546575", "53-3-1", "98d8ef69-f9d2-4236-842d-23843519c558", 8, 1200],

  ["a2ee720b-1712-4de7-934b-2300f30db4a9", "53-3-2", "b275940b-f707-49a2-86af-8892b8e35575", 15, 150],

  ["ef236290-cc1e-407d-b8c9-0c9be8b5c888", "54-1-1", "b9656bf3-44a4-43ed-8afc-58cad39acffe", 8, 1200],

  ["f30809ab-390e-4242-add1-a71f23e51d5c", "54-1-2", "c126abf0-ca07-4c73-ae50-9ccb4820b10f", 8, 1200],

  ["01f8100f-1370-46b5-b9b9-af0cdb7cbb8e", "54-3-1", "fcce6c6d-7246-41dd-b6c6-6923f7eb83e4", 22, 330],

  ["f62031d3-460c-403e-ac89-4ae327a78b95", "55-1-2", "57b9d4c8-0050-4102-ac42-46d158d3baae", 0, 0],
  ["293a06bf-0929-455f-a662-27a123cf1d15", "55-1-2", "86223ecd-18d4-48dc-a7e5-34227b450d4e", 0, 0],
  ["44af07b6-aa02-4747-96e9-36986f0c283c", "55-1-2", "1af475b8-1a7a-4811-bf75-4e66ba97d837", 0, 0],

  ["c76beda3-ef1d-4796-b58b-acbe5f8339f0", "55-2-1", "1876f526-29be-4ef9-9bed-ba3bbc26a9d7", 12, 192],
  ["c4fdf98b-00b2-4878-be3d-254a5d5f61e3", "55-2-1", "7f49c75e-c80b-4f69-b2d3-4118023090a3", 10, 150],

  ["f1ecffa8-b403-48fa-9cfe-653f1030787b", "55-2-2", "780b5f80-bd9f-446d-adc6-b303204f01bf", 0, 0],

  ["cc6a03a1-671a-4b48-8409-bac3ebd0fec9", "55-3-1", "1c20e764-8167-40bc-8dea-264301154eec", 16, 2400],

  ["fe362126-57b5-43a4-adde-898f821d8a6b", "55-3-2", "b275940b-f707-49a2-86af-8892b8e35575", 10, 100],

  ["61ea80ec-782a-426a-92f6-d576235ef6e5", "56-3-1", "12f88002-44d3-4a4c-8fcd-39613e4daaf2", 8, 128],

  ["db1393f8-5a65-43b6-8de8-a213b441be1f", "56-3-2", "f389e9a4-a197-445f-8b16-f3caea3796be", 5, 750],
  ["356b698a-26d4-4db1-ac77-7cf2d85ae43e", "56-3-2", "53838b0c-df1b-4239-bc26-e374017959f4", 4, 600],

  ["022a4c06-3080-47e5-81df-6a3783638e1c", "56-4-1", "3cc2d9e5-85ca-4b9f-a804-0e889c176a5a", 12, 240],

  ["b45c17c1-dcf2-49e0-84da-34743e88e180", "57-3-1", "66707b6c-7ec4-4f75-acc0-7aeb8a05e8ee", 0, 0],

  ["6cf0d41a-9372-4419-b5c9-cc0af5a20ccc", "57-4-1", "08168613-7d98-4b60-af13-d6b310434541", 13, 0],

  ["3f0bce0d-f0ab-476f-961a-80f7a9e1e256", "58-3-1", "25cedb22-0265-46f5-8d19-53b5ca87e837", 15, 150],

  ["30e1734d-8dc1-4a39-bfa3-4eea1ff95919", "58-3-2", "ea0d8ef0-c7cf-415a-88d2-d7c439077b48", 11, 88],

  ["60ce37ae-abbb-4670-81af-c6d377c53108", "58-4-1", "daa58374-5a4b-4725-b19d-326f89bf0d0b", 18, 270],

  ["d9796ffb-7da2-4c39-92f6-b60445cc8285", "58-4-2", "59ab0b17-5b92-4646-8bff-abc15320a07a", 22, 550],

  ["da5f8538-959c-4f1e-8eb5-360072da7ed1", "59-3-1", "7a2c5da4-2c75-4577-8a74-1b11237ab21e", 30, 1500],

  ["7da87eaa-abb8-4fae-a7f6-caa69c5c6397", "59-3-2", "17c5595d-9d89-43f8-b0e6-b8a12d20d5a3", 0, 0],
  ["7f4841d9-c494-4517-8481-42232e3fe7c6", "59-3-2", "f07afd67-adcf-424f-8765-9734275ccf79", 0, 0],

  ["8bd74c26-cc8d-4e27-83b5-a554ab60773e", "59-4-1", "70530fe6-7987-4efe-9639-3b3b4f2263f4", 1, 150],
  ["3f991a11-73ad-4a70-be06-8b12ed0a7660", "59-4-1", "ae565dd8-c752-40af-a9d8-996c1e2a3bfc", 2, 300],
  ["b9b05aa8-67fe-4a5d-826d-31608311d27d", "59-4-1", "6a74bcaf-4517-47b6-9ba9-e5e400a7e46a", 2, 300],
  ["3e61c4e1-d390-4f94-a0d1-2773c4c2bbbb", "59-4-1", "1dcc1f63-a4cc-4040-a670-8db64edd0260", 3, 450],

  ["2a784871-d7f1-4352-bf5b-3ccc88796661", "60-3-1", "b275940b-f707-49a2-86af-8892b8e35575", 14, 140],

  ["fbe0d223-c6d9-444b-bcb1-ec2d399a509b", "60-3-2", "85e1bf3f-7fdf-470b-b216-e9d27524b49e", 0, 0],

  ["9c9398b6-69fe-4e4d-943a-a3afd15f871d", "61-3-1", "5d6cc0a0-b255-40d7-8757-e5443cfaf596", 10, 1500],

  ["634db9c8-b1f6-4144-801f-518a2f301b0f", "61-3-2", "175c8742-7259-4089-b7f7-aba0f401efa9", 4, 80],

  ["103a7c8d-b99d-49ae-afc5-3d05963ee26a", "61-4-1", "66dba3ac-48bd-45dd-a98f-5d2567e74047", 20, 2000],

  ["146fe668-e6e0-4905-aefd-680815112b3d", "61-4-2", "b63f42b6-88bd-47cc-bbfe-3e648900cb7c", 0, 0],
  ["f6a4fac0-8520-4d2a-8a7c-42a00117f5b9", "61-4-2", "33c2852c-8310-4a11-97c3-c9fd48eb367d", 0, 0],

  ["c9daa804-3cda-4559-8340-20fee7baba54", "62-3-1", "64e6cf92-4ef5-4781-8ece-efce24165150", 8, 1200],

  ["961ce7fb-c27d-40be-bacb-2adc989a540e", "62-3-2", "162ccee6-24b6-43c6-a189-6e434a483d6c", 15, 225],

  ["94f28e6b-1c84-48c2-96b3-44b5e4a83b6d", "62-4-2", "7be57131-107e-4201-b67c-8922afd2d208", 15, 1500],
  ["c42a6d08-55ee-4316-aac6-41e24a09b437", "62-4-2", "ebdaf70e-128d-45f1-9679-af24b04b248b", 4, 400],

  ["891d8ac2-521c-4349-9d9d-a22de2d0c3e8", "63-3-1", "0f1a65bf-7389-411f-820f-2cba52ec3a4a", 8, 1200],
  ["c2978ee0-d23d-4f44-a923-597c5f0d81b8", "63-3-1", "d8f68ccf-18e1-4359-b334-5def322bbbf4", 7, 1050],

  ["ce67e4bd-72d2-4eb8-b339-cc5710046409", "63-3-2", "bd443f56-a479-4eab-8425-442b189b421f", 0, 0],

  ["6f961720-4c9f-4177-9a0a-738625a8d95c", "63-4-1", "4dde5095-9373-4c51-9d8b-bf59a85efcd2", 19, 187],

  ["3a80c160-4aea-446a-b451-ef609d39e424", "64-3-1", "3ef574d9-e2ac-4601-88b6-b7deaba180bf", 12, 96],
  ["15f46d39-b557-4257-8e60-fb8a3816e321", "64-3-1", "d7d719d9-9396-4756-af32-384cf0953a6f", 8, 100],

  ["766073cb-2d86-4dbc-8c68-c53604bcc797", "64-3-2", "11fc7da3-a7e4-4e75-b690-99a9f0f94a2a", 0, 0],

  ["6ce71f0b-0c1e-412f-b306-a84051802119", "64-4-1", "0d9f9723-dc45-4cba-a429-bfd7390089d1", 15, 2250],

  ["e9a7c53c-4445-439e-a8c2-16d63afb2062", "65-3-1", "bc06f696-5d3d-448f-b0ea-2a85d9397e1c", 0, 0],

  ["1f33936f-aef7-4768-8b80-04e1cb087ebf", "65-3-2", "6c19c162-0ce8-4536-813d-12df198ccdc2", 0, 0],
  ["e40ba86c-7a25-41da-82f0-b6a00258fb2c", "65-3-2", "b9f6ee05-f51a-41cc-8da0-c8fb26e81890", 0, 0],

  ["2eea4e06-f946-458d-905b-8267ccc1e1c3", "65-4-1", "5d253317-995c-4fec-8d09-5f5d77e01a7c", 0, 0],

  ["7855579f-2b62-4d0a-8321-993efa130739", "65-4-2", "fbe3d393-98a2-4e6b-b2fc-67f11436f8f2", 10, 1500],

  ["97619b6e-b5ee-4b23-bcb7-36f12f3564c1", "66-3-1", "08168613-7d98-4b60-af13-d6b310434541", 0, 0],

  ["9e4ac53a-6b86-4a32-8700-cfb87ec1c546", "66-3-2", "ce26b2a5-1204-4e7b-850c-d7b9c66f1d07", 0, 0],

  ["3510420c-ab20-48a7-ad91-556a147bb91d", "66-4-1", "3c5e91e0-a429-488b-b0c6-8d8bef2c2757", 10, 1500],
  ["2aa96011-691a-4429-b117-a600b0579722", "66-4-1", "4f103753-01d2-4625-87e0-7e1c1c68574d", 4, 600],

  ["f135df37-aa65-4352-a36f-c7bf38a732e3", "67-3-1", "11527743-ad6a-43bc-8056-1d84419bf6da", 0, 0],

  ["ef8e9d89-f52d-4bfb-90be-10b99408f71b", "67-3-2", "f30c388d-7adb-4dba-b3d4-302cdfcab63d", 0, 0],

  ["87bf5dfd-a36f-46dd-936f-f5d4f6b7dec4", "67-4-1", "ce26b2a5-1204-4e7b-850c-d7b9c66f1d07", 0, 0],

  ["b454d45a-c25a-4c19-82cb-8f39d6440553", "68-3-1", "ce26b2a5-1204-4e7b-850c-d7b9c66f1d07", 0, 0],

  ["575bde06-e581-4c96-acbc-9edb29b9e62e", "68-3-2", "c9f287bc-094f-4f12-b916-1b10461643b6", 0, 0],

  ["85856c15-ea34-40a3-ae7e-23426593f2d0", "68-4-1", "1bea6f54-012d-4ab6-9237-e71c0cf3a3fa", 0, 0],

  ["c376667b-987a-4a7f-af3c-32107cb13ad9", "68-4-2", "86a59a83-6044-4421-a4d3-3d87c97c50a0", 0, 0],

  ["db616533-12f1-4d9e-8c38-1a755c8fe55b", "69-3-1", "c3728d31-b62f-437a-857d-ccf6ef79161a", 0, 0],

  ["8ffbf920-6dfd-4621-b86e-c4b7a80dd048", "69-3-2", "1dc195b6-b722-46d4-a2a0-45c2520bc661", 0, 0],

  ["cefff931-e8dc-4adb-971a-b9b4ab2f9352", "69-4-1", "2b98e73a-4d64-4f4c-871e-db792860d45f", 0, 0],

  ["253bc0da-9516-49eb-83a9-ad6323ea63c7", "69-4-2", "8dabbc64-8aa1-4a96-b9e0-e9bdb65f8a08", 0, 0],

  ["6f96c96b-2c87-4774-b0d6-4234002cb7b0", "70-3-1", "1dc195b6-b722-46d4-a2a0-45c2520bc661", 0, 0],

  ["ae2a0368-6420-4fc8-bcc5-64deced580bb", "70-3-2", "a77a4f91-7bf3-406a-8218-46c5f41f43fa", 0, 0],

  ["bec8968b-6ba5-4451-95ca-62c429734035", "70-4-1", "bb0671c1-5e4a-4423-ae4a-430f8b58d4f5", 0, 0],

  ["2e28cde1-0dea-42a7-8264-4a019762e729", "70-4-2", "3a983d6e-1e8a-48ed-b126-2da5ca103038", 0, 0],

  ["036d0b60-3663-4f99-893d-5cedb1b5c29b", "71-3-1", "e7baaa27-61d9-40fb-be9f-2391814510fd", 0, 0],
  ["b157b49d-c52c-4a28-bb85-de51bf1d6508", "71-3-1", "f07afd67-adcf-424f-8765-9734275ccf79", 0, 0],

  ["a7f8315f-8444-457c-b576-697fc61ab887", "71-3-2", "f30c388d-7adb-4dba-b3d4-302cdfcab63d", 0, 0],

  ["1e6c5978-acdd-4c8d-b77f-f60683278a2e", "71-4-1", "177da811-bb50-46cf-a5d2-fe9e54df19aa", 0, 0],

  ["d5623521-567e-4667-88ef-f2ebac8dfdcd", "71-4-2", "f30c388d-7adb-4dba-b3d4-302cdfcab63d", 0, 0],

  ["ea097a97-b78b-4d30-baf2-ae2a0d6657a1", "72-3-1", "22efe9c0-408e-480d-9e51-46e123f6822a", 0, 0],

  ["9f62124d-e828-4f42-86cb-75bcae3fc5c0", "72-3-2", "723faf5d-a278-4ab0-9e59-6d3893da523a", 0, 0],
  ["92ee0151-fdf4-4cd8-837e-f5e38aebcd6e", "72-3-2", "07c25553-953c-4926-a750-6ab9227ca5ad", 0, 0],

  ["7d0506f7-fef5-4ec2-97f4-7d8fe9c75c35", "72-4-1", "758a4689-ac76-42eb-8398-7b077fc15843", 0, 0],

  ["f8c26350-9e43-4118-98ee-d2d7d48d9198", "72-4-2", "f07afd67-adcf-424f-8765-9734275ccf79", 0, 0],
];

export const verifySeedData = (whatToVerify: "catalog" | "storage") => {
  console.info("Verifying seed data.");

  if (whatToVerify === "catalog") {
    [...catalogData].forEach((item) => {
      try {
        CatalogItemSchema.parse(item);
      } catch (err) {
        console.warn(item);
        console.warn(err);

        throw new Error();
      }
    });
  } else if (whatToVerify === "storage") {
    [...storageData].forEach((item) => {
      try {
        StorageItemSchema.parse(item);
      } catch (err) {
        console.warn(item);
        console.warn(err);

        throw new Error();
      }
    });
  }
};
