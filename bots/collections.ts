import { Collection } from '@/types/Filters';
import { ESet } from '@/types/Item';

const COLLECTIONS: Collection[] = [
  {
    id: ESet.COLLECTION_SET_COMMUNITY_3,
    name: {
      pt: 'A Coleção do Caçador',
      en: 'The Huntsman Collection'
    },
    image:
      '/images/collections/set_community_3.png'
  },
  {
    id: ESet.COLLECTION_SET_WEAPONS_I,
    name: {
      pt: 'A Coleção do Negócio Bélico',
      en: 'The Arms Deal Collection'
    },
    image:
      '/images/collections/set_weapons_i.png'
  },
  {
    id: ESet.COLLECTION_SET_ESPORTS,
    name: {
      pt: 'A Coleção de eSports de 2013',
      en: 'The eSports 2013 Collection'
    },
    image:
      '/images/collections/set_esports.png'
  },
  {
    id: ESet.COLLECTION_SET_BRAVO_I,
    name: {
      pt: 'A Coleção Bravo',
      en: 'The Bravo Collection'
    },
    image:
      '/images/collections/set_bravo_i.png'
  },
  {
    id: ESet.COLLECTION_SET_WEAPONS_II,
    name: {
      pt: 'A 2ª Coleção do Negócio Bélico',
      en: 'The Arms Deal 2 Collection'
    },
    image:
      '/images/collections/set_weapons_ii.png'
  },
  {
    id: ESet.COLLECTION_SET_ESPORTS_II,
    name: {
      pt: 'A Coleção de eSports de Fim de Ano de 2013',
      en: 'The eSports 2013 Winter Collection'
    },
    image:
      '/images/collections/set_esports_ii.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_1,
    name: {
      pt: 'A Coleção da Ofensiva de Fim de Ano',
      en: 'The Winter Offensive Collection'
    },
    image:
      '/images/collections/set_community_1.png'
  },
  {
    id: ESet.COLLECTION_SET_WEAPONS_III,
    name: {
      pt: 'A 3ª Coleção do Negócio Bélico',
      en: 'The Arms Deal 3 Collection'
    },
    image:
      '/images/collections/set_weapons_iii.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_2,
    name: {
      pt: 'A Coleção Fênix',
      en: 'The Phoenix Collection'
    },
    image:
      '/images/collections/set_community_2.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_4,
    name: {
      pt: 'A Coleção Libertação',
      en: 'The Breakout Collection'
    },
    image:
      '/images/collections/set_community_4.png'
  },
  {
    id: ESet.COLLECTION_SET_ESPORTS_III,
    name: {
      pt: 'A Coleção de eSports de Férias de 2014',
      en: 'The eSports 2014 Summer Collection'
    },
    image:
      '/images/collections/set_esports_iii.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_5,
    name: {
      pt: 'A Coleção Vanguarda',
      en: 'The Vanguard Collection'
    },
    image:
      '/images/collections/set_community_5.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_6,
    name: {
      pt: 'A Coleção Cromática',
      en: 'The Chroma Collection'
    },
    image:
      '/images/collections/set_community_6.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_7,
    name: {
      pt: 'A 2ª Coleção Cromática',
      en: 'The Chroma 2 Collection'
    },
    image:
      '/images/collections/set_community_7.png'
  },
  {
    id: ESet.COLLECTION_SET_DUST,
    name: {
      pt: 'A Coleção Dust',
      en: 'The Dust Collection'
    },
    image:
      '/images/collections/set_dust.png'
  },
  {
    id: ESet.COLLECTION_SET_AZTEC,
    name: {
      pt: 'A Coleção Aztec',
      en: 'The Aztec Collection'
    },
    image:
      '/images/collections/set_aztec.png'
  },
  {
    id: ESet.COLLECTION_SET_VERTIGO,
    name: {
      pt: 'A Coleção Vertigo',
      en: 'The Vertigo Collection'
    },
    image:
      '/images/collections/set_vertigo.png'
  },
  {
    id: ESet.COLLECTION_SET_INFERNO,
    name: {
      pt: 'A Coleção Inferno',
      en: 'The Inferno Collection'
    },
    image:
      '/images/collections/set_inferno.png'
  },
  {
    id: ESet.COLLECTION_SET_MILITIA,
    name: {
      pt: 'A Coleção Militia',
      en: 'The Militia Collection'
    },
    image:
      '/images/collections/set_militia.png'
  },
  {
    id: ESet.COLLECTION_SET_NUKE,
    name: {
      pt: 'A Coleção Nuke',
      en: 'The Nuke Collection'
    },
    image:
      '/images/collections/set_nuke.png'
  },
  {
    id: ESet.COLLECTION_SET_OFFICE,
    name: {
      pt: 'A Coleção Office',
      en: 'The Office Collection'
    },
    image:
      '/images/collections/set_office.png'
  },
  {
    id: ESet.COLLECTION_SET_ASSAULT,
    name: {
      pt: 'A Coleção Assault',
      en: 'The Assault Collection'
    },
    image:
      '/images/collections/set_assault.png'
  },
  {
    id: ESet.COLLECTION_SET_BRAVO_II,
    name: {
      pt: 'A Coleção Alfa',
      en: 'The Alpha Collection'
    },
    image:
      '/images/collections/set_bravo_ii.png'
  },
  {
    id: ESet.COLLECTION_SET_DUST_2,
    name: {
      pt: 'A Coleção Dust 2',
      en: 'The Dust 2 Collection'
    },
    image:
      '/images/collections/set_dust_2.png'
  },
  {
    id: ESet.COLLECTION_SET_TRAIN,
    name: {
      pt: 'A Coleção Train',
      en: 'The Train Collection'
    },
    image:
      '/images/collections/set_train.png'
  },
  {
    id: ESet.COLLECTION_SET_MIRAGE,
    name: {
      pt: 'A Coleção Mirage',
      en: 'The Mirage Collection'
    },
    image:
      '/images/collections/set_mirage.png'
  },
  {
    id: ESet.COLLECTION_SET_ITALY,
    name: {
      pt: 'A Coleção Italy',
      en: 'The Italy Collection'
    },
    image:
      '/images/collections/set_italy.png'
  },
  {
    id: ESet.COLLECTION_SET_LAKE,
    name: {
      pt: 'A Coleção Lake',
      en: 'The Lake Collection'
    },
    image:
      '/images/collections/set_lake.png'
  },
  {
    id: ESet.COLLECTION_SET_SAFEHOUSE,
    name: {
      pt: 'A Coleção Safehouse',
      en: 'The Safehouse Collection'
    },
    image:
      '/images/collections/set_safehouse.png'
  },
  {
    id: ESet.COLLECTION_SET_BANK,
    name: {
      pt: 'A Coleção Bank',
      en: 'The Bank Collection'
    },
    image:
      '/images/collections/set_bank.png'
  },
  {
    id: ESet.COLLECTION_SET_OVERPASS,
    name: {
      pt: 'A Coleção Overpass',
      en: 'The Overpass Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_overpass.3b85a46ee2d4424367831a3f5994bf59f19f08bd.png'
  },
  {
    id: ESet.COLLECTION_SET_COBBLESTONE,
    name: {
      pt: 'A Coleção Cobblestone',
      en: 'The Cobblestone Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_cobblestone.7f470f4ad76920182d29cafc4a7fcbbb5de0e3ec.png'
  },
  {
    id: ESet.COLLECTION_SET_BAGGAGE,
    name: {
      pt: 'A Coleção Baggage',
      en: 'The Baggage Collection'
    },
    image:
      '/images/collections/set_baggage.png'
  },
  {
    id: ESet.COLLECTION_SET_CACHE,
    name: {
      pt: 'A Coleção Cache',
      en: 'The Cache Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_cache.1bdc24f9fbd7532a2eb3e26d6ac33e52fc4a0efc.png'
  },
  {
    id: ESet.COLLECTION_SET_GODS_AND_MONSTERS,
    name: {
      pt: 'A Coleção Deuses e Monstros',
      en: 'The Gods and Monsters Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_gods_and_monsters.c66f30b18e90e05e6a727c5cda23912ffe49ffaf.png'
  },
  {
    id: ESet.COLLECTION_SET_CHOPSHOP,
    name: {
      pt: 'A Coleção do Ferro Velho',
      en: 'The Chop Shop Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_chopshop.b6ed206d7164f48594212559a70312123a12f9b5.png'
  },
  {
    id: ESet.COLLECTION_SET_KIMONO,
    name: {
      pt: 'A Coleção do Sol Nascente',
      en: 'The Rising Sun Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_kimono.eec9d131eed8efec7910f137cf0cadb710e576c8.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_8,
    name: {
      pt: 'A Coleção Falchion',
      en: 'The Falchion Collection'
    },
    image:
      '/images/collections/set_community_8.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_9,
    name: {
      pt: 'A Coleção Sombria',
      en: 'The Shadow Collection'
    },
    image:
      '/images/collections/set_community_9.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_10,
    name: {
      pt: 'A Coleção do Revólver',
      en: 'The Revolver Case Collection'
    },
    image:
      '/images/collections/set_community_10.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_11,
    name: {
      pt: 'A Coleção Fogo Selvagem',
      en: 'The Wildfire Collection'
    },
    image:
      '/images/collections/set_community_11.png'
  },
  {
    id: ESet.COLLECTION_SET_NUKE_2,
    name: {
      pt: 'A Coleção Nuke de 2018',
      en: 'The 2018 Nuke Collection'
    },
    image:
      '/images/collections/set_nuke_2.png'
  },
  {
    id: ESet.COLLECTION_SET_INFERNO_2,
    name: {
      pt: 'A Coleção Inferno de 2018',
      en: 'The 2018 Inferno Collection'
    },
    image:
      '/images/collections/set_inferno_2.png'
  },
  {
    id: ESet.COLLECTION_SET_XRAYMACHINE,
    name: {
      pt: 'A Coleção Raio-X',
      en: 'The X-Ray Collection'
    },
    image:
      '/images/collections/set_xraymachine.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_12,
    name: {
      pt: 'A 3ª Coleção Cromática',
      en: 'The Chroma 3 Collection'
    },
    image:
      '/images/collections/set_community_12.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_13,
    name: {
      pt: 'A Coleção Gama',
      en: 'The Gamma Collection'
    },
    image:
      '/images/collections/set_community_13.png'
  },
  {
    id: ESet.COLLECTION_SET_GAMMA_2,
    name: {
      pt: 'A 2ª Coleção Gama',
      en: 'The Gamma 2 Collection'
    },
    image:
      '/images/collections/set_gamma_2.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_15,
    name: {
      pt: 'A Coleção das Luvas',
      en: 'The Glove Collection'
    },
    image:
      '/images/collections/set_community_15.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_16,
    name: {
      pt: 'A Coleção Espectral',
      en: 'The Spectrum Collection'
    },
    image:
      '/images/collections/set_community_16.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_17,
    name: {
      pt: 'A Coleção da Operação Hidra',
      en: 'The Operation Hydra Collection'
    },
    image:
      '/images/collections/set_community_17.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_18,
    name: {
      pt: 'A 2ª Coleção Espectral',
      en: 'The Spectrum 2 Collection'
    },
    image:
      '/images/collections/set_community_18.png'
  },
  {
    id: ESet.COLLECTION_SET_BLACKSITE,
    name: {
      pt: 'A Coleção Blacksite',
      en: 'The Blacksite Collection'
    },
    image:
      '/images/collections/set_blacksite.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_19,
    name: {
      pt: 'A Coleção do Aperto',
      en: 'The Clutch Collection'
    },
    image:
      '/images/collections/set_community_19.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_20,
    name: {
      pt: 'A Coleção do Horizonte',
      en: 'The Horizon Collection'
    },
    image:
      '/images/collections/set_community_20.png'
  },
  {
    id: ESet.COLLECTION_SET_STMARC,
    name: {
      pt: 'A Coleção St. Marc',
      en: 'The St. Marc Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_stmarc.00c570e3e140452c95e68bfa4868c9ce1c5dc1c4.png'
  },
  {
    id: ESet.COLLECTION_SET_CANALS,
    name: {
      pt: 'A Coleção Canals',
      en: 'The Canals Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_canals.56ae4549ece13ec63d017e7fa24dc0283572670f.png'
  },
  {
    id: ESet.COLLECTION_SET_NORSE,
    name: {
      pt: 'A Coleção Nórdica',
      en: 'The Norse Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_norse.d91172d71b95efb4e334d194cf6b0a5ab9621e8c.png'
  },
  {
    id: ESet.COLLECTION_SET_OP9_CHARACTERS,
    name: {
      pt: 'Agentes da Teia Fragmentada',
      en: 'Shattered Web Agents'
    },
    image:
      '/images/collections/set_op9_characters.png'
  },
  {
    id: ESet.COLLECTION_SET_OP10_CHARACTERS,
    name: {
      pt: 'Agentes da Presa Quebrada',
      en: 'Broken Fang Agents'
    },
    image:
      '/images/collections/set_op10_characters.png'
  },
  {
    id: ESet.COLLECTION_SET_OP11_CHARACTERS,
    name: {
      pt: 'Agentes da Operação Correnteza',
      en: 'Operation Riptide Agents'
    },
    image:
      '/images/collections/set_op11_characters.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_21,
    name: {
      pt: 'A Coleção da Zona de Perigo',
      en: 'The Danger Zone Collection'
    },
    image:
      '/images/collections/set_community_21.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_22,
    name: {
      pt: 'A Coleção Prismática',
      en: 'The Prisma Collection'
    },
    image:
      '/images/collections/set_community_22.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_23,
    name: {
      pt: 'A Coleção Teia Fragmentada',
      en: 'The Shattered Web Collection'
    },
    image:
      '/images/collections/set_community_23.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_24,
    name: {
      pt: 'A Coleção CS20',
      en: 'The CS20 Collection'
    },
    image:
      '/images/collections/set_community_24.png'
  },
  {
    id: ESet.COLLECTION_SET_DUST_2_2021,
    name: {
      pt: 'A Coleção Dust 2 de 2021',
      en: 'The 2021 Dust 2 Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_dust_2_2021.318944ebb9e3dae51cd87d38b5d3584a2fa9425f.png'
  },
  {
    id: ESet.COLLECTION_SET_MIRAGE_2021,
    name: {
      pt: 'A Coleção Mirage de 2021',
      en: 'The 2021 Mirage Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_mirage_2021.f1c9b5169b9fb9d6e0933baba0514dd34d6c9e19.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_25,
    name: {
      pt: 'A 2ª Coleção Prismática',
      en: 'The Prisma 2 Collection'
    },
    image:
      '/images/collections/set_community_25.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_26,
    name: {
      pt: 'A Coleção Fraturada',
      en: 'The Fracture Collection'
    },
    image:
      '/images/collections/set_community_26.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_27,
    name: {
      pt: 'A Coleção da Operação Presa Quebrada',
      en: 'The Operation Broken Fang Collection'
    },
    image:
      '/images/collections/set_community_27.png'
  },
  {
    id: ESet.COLLECTION_SET_OP10_CT,
    name: {
      pt: 'A Coleção do Controle',
      en: 'The Control Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_op10_ct.aaf2dd57a339a610de6f4514a76eb1e846647cc0.png'
  },
  {
    id: ESet.COLLECTION_SET_OP10_T,
    name: {
      pt: 'A Coleção do Caos',
      en: 'The Havoc Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_op10_t.18b6dd49906d15a5f44f1477ca6139c7ab491197.png'
  },
  {
    id: ESet.COLLECTION_SET_OP10_ANCIENT,
    name: {
      pt: 'A Coleção Ancient',
      en: 'The Ancient Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_op10_ancient.e90a2018381216be882d96c9e6c314d99f5097fa.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_28,
    name: {
      pt: 'A Coleção do Ataque Ofídico',
      en: 'The Snakebite Collection'
    },
    image:
      '/images/collections/set_community_28.png'
  },
  {
    id: ESet.COLLECTION_SET_TRAIN_2021,
    name: {
      pt: 'A Coleção Train de 2021',
      en: 'The 2021 Train Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_train_2021.a000b6d4ae1978aeced8ec31aa8ef5a0014dae29.png'
  },
  {
    id: ESet.COLLECTION_SET_VERTIGO_2021,
    name: {
      pt: 'A Coleção Vertigo de 2021',
      en: 'The 2021 Vertigo Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_vertigo_2021.611413bf4d18e0c888054707dff98c612049f097.png'
  },
  {
    id: ESet.COLLECTION_SET_ANUBIS,
    name: {
      pt: 'A Coleção Anubis',
      en: 'The Anubis Collection'
    },
    image:
      '/images/collections/set_anubis.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_29,
    name: {
      pt: 'A Coleção da Operação Correnteza',
      en: 'The Operation Riptide Collection'
    },
    image:
      '/images/collections/set_community_29.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_30,
    name: {
      pt: 'A Coleção dos Sonhos e Pesadelos',
      en: 'The Dreams & Nightmares Collection'
    },
    image:
      '/images/collections/set_community_30.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_31,
    name: {
      pt: 'A Coleção do Coice',
      en: 'The Recoil Collection'
    },
    image:
      '/images/collections/set_community_31.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_32,
    name: {
      pt: 'A Coleção da Revolução',
      en: 'The Revolution Collection'
    },
    image:
      '/images/collections/set_community_32.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_33,
    name: {
      pt: 'A Coleção Quilowatt',
      en: 'The Kilowatt Collection'
    },
    image:
      '/images/collections/set_community_33.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_34,
    name: {
      pt: 'A Coleção da Galeria',
      en: 'The Gallery Collection'
    },
    image:
      '/images/collections/set_community_34.svg'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_35,
    name: {
      pt: 'A Coleção Febril',
      en: 'The Fever Collection'
    },
    image:
      '/images/collections/set_community_35.svg'
  },
  {
    id: ESet.COLLECTION_SET_ARABESQUE,
    name: {
      pt: 'A Coleção Arabesca',
      en: 'The Arabesque Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_arabesque.3d2ee80f107ddabe862843e7b8097b1fdc98a917.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_36,
    name: {
      pt: 'A Coleção Gênese',
      en: 'The Genesis Collection'
    },
    image:
      '/images/collections/set_community_36.svg'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_37,
    name: {
      pt: 'A Coleção Mão Morta',
      en: 'The Dead Hand Collection'
    },
    image:
      '/images/collections/set_community_37.svg'
  },
  {
    id: ESet.COLLECTION_SET_GRAPHIC_DESIGN,
    name: {
      pt: 'A Coleção do Design Gráfico',
      en: 'The Graphic Design Collection'
    },
    image:
      '/images/collections/set_graphic_design.svg'
  },
  {
    id: ESet.COLLECTION_SET_OVERPASS_2024,
    name: {
      pt: 'A Coleção Overpass de 2024',
      en: 'The Overpass 2024 Collection'
    },
    image:
      '/images/collections/set_overpass_2024.svg'
  },
  {
    id: ESet.COLLECTION_SET_REALISM_CAMO,
    name: {
      pt: 'A Coleção Esportiva',
      en: 'The Sport & Field Collection'
    },
    image:
      '/images/collections/set_realism_camo.svg'
  },
  {
    id: ESet.COLLECTION_SET_SPY_TECH,
    name: {
      pt: 'A Coleção Spytech',
      en: 'The Spy Tech Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_spy_tech.441f3fa962400c425c38ece97953d4322afe1706.png'
  },
  {
    id: ESet.COLLECTION_SET_TIMED_DROPS_ACHROMA,
    name: {
      pt: 'A Coleção Acromática',
      en: 'The Achroma Collection'
    },
    image:
      '/images/collections/set_timed_drops_achroma.svg'
  },
  {
    id: ESet.COLLECTION_SET_TIMED_DROPS_COOL,
    name: {
      pt: 'A Coleção Ascendente',
      en: 'The Ascent Collection'
    },
    image:
      '/images/collections/set_timed_drops_cool.svg'
  },
  {
    id: ESet.COLLECTION_SET_TIMED_DROPS_EXUBERANT,
    name: {
      pt: 'A Coleção Arlequim',
      en: 'The Harlequin Collection'
    },
    image:
      '/images/collections/set_timed_drops_exuberant.svg'
  },
  {
    id: ESet.COLLECTION_SET_TIMED_DROPS_NEUTRAL,
    name: {
      pt: 'A Coleção Boreal',
      en: 'The Boreal Collection'
    },
    image:
      '/images/collections/set_timed_drops_neutral.svg'
  },
  {
    id: ESet.COLLECTION_SET_TIMED_DROPS_WARM,
    name: {
      pt: 'A Coleção Radiante',
      en: 'The Radiant Collection'
    },
    image:
      '/images/collections/set_timed_drops_warm.svg'
  },
  {
    id: ESet.COLLECTION_SET_TRAIN_2025,
    name: {
      pt: 'A Coleção Train de 2025',
      en: 'The Train 2025 Collection'
    },
    image:
      '/images/collections/set_train_2025.svg'
  },
  {
    id: ESet.COLLECTION_SET_XPSHOP_WPN_01,
    name: {
      pt: 'Item de edição limitada',
      en: 'Limited Edition Item'
    },
    image:
      '/images/collections/set_xpshop_wpn_01.svg'
  },
  {
    id: ESet.COLLECTION_SET_AUTO_RACING,
    name: {
      pt: 'Coleção de Adesivos da Corrida de Automóveis',
      en: 'Auto Racing Sticker Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_auto_racing.2bb35a9a9c95a4757596a2ebd2085c73529f184b.png'
  },
  {
    id: ESet.COLLECTION_SET_COMMUNITY_2025,
    name: {
      pt: 'Coleção de Adesivos da Comunidade de 2025',
      en: '2025 Community Sticker Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_community_2025.280d945244b90804541bf84784796793fd3bad00.png'
  },
  {
    id: ESet.COLLECTION_SET_FRUITS_VEGGIES,
    name: {
      pt: 'Coleção de Adesivos das Frutas e Verduras',
      en: 'Fruits And Veggies Sticker Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_fruits_veggies.1b09ff5e40587c321b46d3d2c8298ea58c480b08.png'
  },
  {
    id: ESet.COLLECTION_SET_KC_DRBOOM,
    name: {
      pt: 'Coleção dos Chaveiros do Dr. Buum',
      en: 'Dr Boom Charm Collection'
    },
    image:
      '/images/collections/set_kc_drboom.png'
  },
  {
    id: ESet.COLLECTION_SET_KC_MISSINGLINK,
    name: {
      pt: 'Coleção dos Salsichaveiros',
      en: 'Missing Link Charm Collection'
    },
    image:
      '/images/collections/set_kc_missinglink.png'
  },
  {
    id: ESet.COLLECTION_SET_KC_ML_COMMUNITY_01,
    name: {
      pt: 'Coleção dos Salsichaveiros da Comunidade',
      en: 'Missing Link Community Charm Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_kc_ml_community_01.6575c6767ec10b0720cc8833c67a2bb98698422c.png'
  },
  {
    id: ESet.COLLECTION_SET_KC_WEAPON_01,
    name: {
      pt: 'Coleção dos Chaveiros de Arminhas',
      en: 'Small Arms Charm Collection'
    },
    image:
      '/images/collections/set_kc_weapon_01.png'
  },
  {
    id: ESet.COLLECTION_SET_STKR_CRAFT_01,
    name: {
      pt: 'Pacote de Adesivos Elementais',
      en: 'Elemental Craft Sticker Pack'
    },
    image:
      '/images/collections/set_stkr_craft_01.png'
  },
  {
    id: ESet.COLLECTION_SET_STKR_CRAFT_02,
    name: {
      pt: 'Pacote de Adesivos de Criação de Personagens',
      en: 'Character Craft Sticker Pack'
    },
    image:
      '/images/collections/set_stkr_craft_02.png'
  },
  {
    id: ESet.COLLECTION_SET_SUGARFACE2,
    name: {
      pt: '2ª Coleção de Adesivos das Calaveras',
      en: 'Sugarface 2 Sticker Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/set_icons/set_sugarface2.2cb2d789be9fd3a0784335cf2453438a3c0f5ee7.png'
  },
  {
    id: ESet.COLLECTION_4617,
    name: {
      pt: 'Coleção de Grafites do CS:GO nº 3',
      en: 'CS:GO Graffiti #3 Collection'
    },
    image:
      '/images/collections/crate_spray_std3.png'
  },
  {
    id: ESet.COLLECTION_4618,
    name: {
      pt: 'Coleção de Grafites da Zoeira',
      en: 'Trolling Graffiti Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/weapon_cases/crate_spray_std2.c55a072f05762521cc1bdcf2fb0441f4846ae961.png'
  },
  {
    id: ESet.COLLECTION_4621,
    name: {
      pt: 'Coleção de Grafites do CS:GO nº 2',
      en: 'CS:GO Graffiti #2 Collection'
    },
    image:
      'https://cdn.steamstatic.com/apps/730/icons/econ/weapon_cases/crate_spray_std2.c55a072f05762521cc1bdcf2fb0441f4846ae961.png'
  },
]

export default COLLECTIONS;
