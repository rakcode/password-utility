export interface PasswordOptions{
    minLength?: number;
    maxLength?: number;
    lowercase?: boolean;
    lowercaseConfig?: {
        min?: number;
        max?: number;
    },
    uppercase?: boolean;
    uppercaseConfig?: {
        min?: number;
        max?: number;
    },
    symbols?: boolean;
    symbolsConfig?: {
        min?: number;
        max?: number;
    },
    number?: boolean;
    numbersConfig?: {
        min?: number;
        max?: number;
    },
}

export const generateRegex = (config?: PasswordOptions) => {

    const defaultConfig = {
        minLength: 8,
        maxLength: 0,
        lowercase: true,
        uppercase: true,
        symbols: true,
        number: true,
        lowercaseConfig: { min: 1, max: 0 },
        uppercaseConfig: { min: 1, max: 0 },
        symbolsConfig: { min: 1, max: 0 },
        numbersConfig: { min: 1, max: 0 }
    };

    if(!config) config = defaultConfig;

    config = { ...defaultConfig, ...config };

    const {
        minLength,
        maxLength,
        lowercase,
        lowercaseConfig,
        uppercase,
        uppercaseConfig,
        symbols,
        symbolsConfig,
        number: numbers,
        numbersConfig
    } = config;

    let regEx = "^";

    if(lowercase) {
        let { min, max } : any = lowercaseConfig;
        min = min ? min : "";
        max = max ? max : "";
        let minMax = "";
        if(min || max)  minMax = `{${min},${max}}`;
        regEx += `(?=.*[a-z]${minMax})`;
    } else regEx += `(?=.*[a-z]?)`;

    if(uppercase) {
        let { min, max } : any = uppercaseConfig;
        min = min ? min : "";
        max = max ? max : "";
        let minMax = "";
        if(min || max)  minMax = `{${min},${max}}`;
        regEx += `(?=.*[A-Z]${minMax})`;
    } else regEx += `(?=.*[A-Z]?)`;

    if(numbers) {
        let { min, max } : any = numbersConfig;
        min = min ? min : "";
        max = max ? max : "";
        let minMax = "";
        if(min || max)  minMax = `{${min},${max}}`;
        regEx += `(?=.*\\d${minMax})`;
    } else regEx += `(?=.*\\d?)`;

    if(symbols) {
        let { min, max } : any = symbolsConfig;
        min = min ? min : "";
        max = max ? max : "";
        let minMax = "";
        if(min || max)  minMax = `{${min},${max}}`;
        regEx += `(?=.*[@$!%*?&]${minMax})`;
    } else regEx += `(?=.*[@$!%*?&]?)`;
    
    const _minLen = minLength ? minLength : 8;
    const _maxLen = maxLength ? maxLength : "";
    regEx += `[A-Za-z\\d@$!%*?&]`;
    regEx += `{${_minLen},${_maxLen}}`;
    regEx += "$";
    return regEx;
}