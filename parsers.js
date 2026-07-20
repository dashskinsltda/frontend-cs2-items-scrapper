export const parseItemNameEN = name => {
    let response = name;

    response = response.replace("Sticker | ", "");

    response = response.replace("Souvenir Charm | ", "");
    response = response.replace("Charm | ", "");

    if (response.endsWith(" Pin")) response = response.slice(0, -4);

    response = response.replace("Patch | ", "");

    response = response.replace("Zeus x27 | ", "");

    response = response.replace("Nova | ", "").replace("XM1014 | ", "").replace("MAG-7 | ", "");

    response = response
        .replace("★", "")
        .split(" ")
        .map(substring => substring.trim())
        .filter(substring => substring)
        .join(" ")
        .replace("Shadow Daggers | ", "")
        .replace("Bayonet | ", "")
        .replace("M9 Bayonet | ", "")
        .replace("Flip Knife | ", "")
        .replace("Butterfly Knife | ", "")
        .replace("Falchion Knife | ", "")
        .replace("Bowie Knife | ", "")
        .replace("Classic Knife | ", "")
        .replace("Paracord Knife | ", "")
        .replace("Survival Knife | ", "")
        .replace("Huntsman Knife | ", "")
        .replace("Skeleton Knife | ", "")
        .replace("Gut Knife | ", "")
        .replace("Kukri Knife | ", "")
        .replace("Navaja Knife | ", "")
        .replace("Nomad Knife | ", "")
        .replace("Stiletto Knife | ", "")
        .replace("Talon Knife | ", "")
        .replace("Ursus Knife | ", "")
        .replace("Karambit | ", "");

    if (
        [
            "Shadow Daggers",
            "Bayonet",
            "M9 Bayonet",
            "Flip Knife",
            "Butterfly Knife",
            "Falchion Knife",
            "Bowie Knife",
            "Classic Knife",
            "Paracord Knife",
            "Survival Knife",
            "Huntsman Knife",
            "Skeleton Knife",
            "Gut Knife",
            "Kukri Knife",
            "Navaja Knife",
            "Nomad Knife",
            "Stiletto Knife",
            "Talon Knife",
            "Ursus Knife",
            "Karambit",
        ].includes(response)
    ) {
        response = "Vanilla";
    }

    response = response.replace("Sealed Graffiti | ", "");

    response = response
        .replace("★", "")
        .split(" ")
        .map(substring => substring.trim())
        .filter(substring => substring)
        .join(" ")
        .replace("Sport Gloves | ", "")
        .replace("Driver Gloves | ", "")
        .replace("Specialist Gloves | ", "")
        .replace("Moto Gloves | ", "")
        .replace("Hand Wraps | ", "")
        .replace("Hydra Gloves | ", "")
        .replace("Broken Fang Gloves | ", "")
        .replace("Bloodhound Gloves | ", "");

    response = response
        .replace("USP-S | ", "")
        .replace("Desert Eagle | ", "")
        .replace("Glock-18 | ", "")
        .replace("Five-SeveN | ", "")
        .replace("P250 | ", "")
        .replace("Tec-9 | ", "")
        .replace("Dual Berettas | ", "")
        .replace("P2000 | ", "")
        .replace("CZ75-Auto | ", "")
        .replace("R8 Revolver | ", "");

    response = response
        .replace("AK-47 | ", "")
        .replace("AWP | ", "")
        .replace("M4A1-S | ", "")
        .replace("M4A4 | ", "")
        .replace("Galil AR | ", "")
        .replace("SSG 08 | ", "")
        .replace("FAMAS | ", "")
        .replace("AUG | ", "")
        .replace("SG 553 | ", "")
        .replace("SCAR-20 | ", "")
        .replace("G3SG1 | ", "");

    response = response
        .replace("MP9 | ", "")
        .replace("MAC-10 | ", "")
        .replace("P90 | ", "")
        .replace("MP7 | ", "")
        .replace("UMP-45 | ", "")
        .replace("MP5-SD | ", "")
        .replace("PP-Bizon | ", "");

    response = response.replace("M249 | ", "").replace("Negev | ", "");

    response = response.replace("Music Kit | ", "");

    response = response.replace("Sawed-Off | ", "");

    return response;
};

export const parseItemNamePTBR = name => {
    let response = name;

    response = response.replace("Adesivo | ", "");

    response = response.replace("Souvenir Charm | ", "");
    response = response.replace("Chaveiro | ", "");

    response = response.replace("Broche | ", "");

    response = response.replace("Emblema | ", "");

    response = response.replace("Zeus x27 | ", "");

    response = response
        .replace("Nova | ", "")
        .replace("XM1014 | ", "")
        .replace("MAG-7 | ", "")
        .replace("Cano Curto | ", "");

    response = response
        .replace("★", "")
        .split(" ")
        .map(substring => substring.trim())
        .filter(substring => substring)
        .join(" ")
        .replace("Adagas Sombrias | ", "")
        .replace("Baioneta | ", "")
        .replace("Baioneta M9 | ", "")
        .replace("Canivete | ", "")
        .replace("Canivete Borboleta | ", "")
        .replace("Canivete Falchion | ", "")
        .replace("Faca Bowie | ", "")
        .replace("Faca Clássica | ", "")
        .replace("Faca de Cordame | ", "")
        .replace("Faca de Sobrevivência | ", "")
        .replace("Faca do Caçador | ", "")
        .replace("Faca Esqueleto | ", "")
        .replace("Faca Gut Hook | ", "")
        .replace("Faca Kukri | ", "")
        .replace("Faca Navaja | ", "")
        .replace("Faca Nômade | ", "")
        .replace("Faca Stiletto | ", "")
        .replace("Faca Talon | ", "")
        .replace("Faca Ursus | ", "")
        .replace("Karambit | ", "");

    if (
        [
            "Adagas Sombrias",
            "Baioneta",
            "Baioneta M9",
            "Canivete",
            "Canivete Borboleta",
            "Canivete Falchion",
            "Faca Bowie",
            "Faca Clássica",
            "Faca de Cordame",
            "Faca de Sobrevivência",
            "Faca do Caçador",
            "Faca Esqueleto",
            "Faca Gut Hook",
            "Faca Kukri",
            "Faca Navaja",
            "Faca Nômade",
            "Faca Stiletto",
            "Faca Talon",
            "Faca Ursus",
            "Karambit",
        ].includes(response)
    ) {
        response = "Vanilla";
    }

    response = response.replace("Grafite Lacrado | ", "");

    response = response
        .replace("★", "")
        .split(" ")
        .map(substring => substring.trim())
        .filter(substring => substring)
        .join(" ")
        .replace("Luvas Esportivas | ", "")
        .replace("Luvas de Motorista | ", "")
        .replace("Luvas de Especialista | ", "")
        .replace("Luvas de Motociclismo | ", "")
        .replace("Faixas | ", "")
        .replace("Luvas da Hidra | ", "")
        .replace("Luvas da Presa Quebrada | ", "")
        .replace("Luvas do Cão de Caça | ", "");

    response = response
        .replace("USP-S | ", "")
        .replace("Desert Eagle | ", "")
        .replace("Glock-18 | ", "")
        .replace("Five-SeveN | ", "")
        .replace("P250 | ", "")
        .replace("Tec-9 | ", "")
        .replace("Berettas Duplas | ", "")
        .replace("P2000 | ", "")
        .replace("CZ75-Auto | ", "")
        .replace("Revólver R8 | ", "");

    response = response
        .replace("AK-47 | ", "")
        .replace("AWP | ", "")
        .replace("M4A1-S | ", "")
        .replace("M4A4 | ", "")
        .replace("Galil AR | ", "")
        .replace("SSG 08 | ", "")
        .replace("FAMAS | ", "")
        .replace("AUG | ", "")
        .replace("SG 553 | ", "")
        .replace("SCAR-20 | ", "")
        .replace("G3SG1 | ", "");

    response = response
        .replace("MP9 | ", "")
        .replace("MAC-10 | ", "")
        .replace("P90 | ", "")
        .replace("MP7 | ", "")
        .replace("UMP-45 | ", "")
        .replace("MP5-SD | ", "")
        .replace("PP-Bizon | ", "");

    response = response.replace("M249 | ", "").replace("Negev | ", "");

    response = response.replace("Trilha Sonora | ", "");
    response = response.replace("Trilha Sonora StatTrak™ | ", "StatTrak™ ");
    response = response.replace("Trilha Sonora (StatTrak™) | ", "StatTrak™ ");

    response = response.replaceAll("\\", "");

    return response;
};
