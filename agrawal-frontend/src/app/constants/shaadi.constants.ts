export const gotraList = [
    "Airan",
    "Aeron",
    "Bansal",
    "Bhandal",
    "Bindal",
    "Deran",
    "Dharan",
    "Gangal",
    "Garg",
    "Goyal",
    "Goel",
    "Goenka",
    "Goyan",
    "Jindal",
    "Kansal",
    "Kuchhal",
    "Kuchchal",
    "Madhukul",
    "Mangal",
    "Mittal",
    "Mudgal",
    "Nangal",
    "Singhal",
    "Singla",
    "Tayal",
    "Tingal",
    "Tundal",
    "Vindal",
];

export const rashiList = [
    "Aries ( मेष )",
    "Taurus ( वृष )",
    "Gemini ( मिथुन )",
    "Cancer ( कर्क )",
    "Leo ( सिंह )",
    "Virgo ( कन्या )",
    "Libra ( तुला )",
    "Scorpio ( वृश्चिक )",
    "Sagittarius ( धनु )",
    "Capricorn ( मकर )",
    "Aquarius ( कुम्भ )",
    "Pisces ( मीन )",
];

export const genderList = [
    "Male",
    "Female",
];

export const SHADI_DEFAULT = {
    PROFILE: {
        Male: 'assets/img/mock/profile-male.jpg',
        Female: 'assets/img/mock/profile-female.jpg',
    }
}

export const maritalStatusList = [
    "Never Married",
    "Divorced",
    "Widowed",
];

export const physicalStatusList = [
    "Normal",
    "Physically Challenged",
]

export const employedTypeList = [
    "Private Sector",
    "Government Sector",
    "Business",
    "Self Employed",
    "Not Working",
]

export const incomeList = [
    "Less than 1 Lakh per annum",
    "1-5 Lakhs per annum",
    "5-10 Lakhs per annum",
    "10-20 Lakhs per annum",
    "20-50 Lakhs per annum",
    "More than 50 Lakhs per annum",
]

export const heightListFn = ()=>{
    const options = [];
    options.push({ label:"Less than 4 feet", value: 47 });
    for(let feet = 4; feet <= 6; feet++){
        for(let inch = 0; inch < 12; inch++){
            const label = inch === 0 ? `${feet} feet` : `${feet} feet ${inch} inch`;
            const value = (feet*12) + inch;
            const option = { label, value };
            options.push(option);
        }
    }
    options.push({ label:"More than 6 feet", value: 73 });
    return options;
}
export const heightList = heightListFn();

export const weightListFn = ()=>{
    const options = [];
    options.push({ label:"Less than 40 kg", value: 39 });
    for(let kg = 40; kg <= 100; kg++){
        const label = `${kg} kg`;
        const value = kg;
        const option = { label, value };
        options.push(option);
    }
    options.push({ label:"More than 100 kg", value: 101 });
    return options;
}

export const weightList = weightListFn();

