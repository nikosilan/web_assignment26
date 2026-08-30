const target =
    document.querySelector("#target");


const browserInfo =
    navigator.userAgent;


const getBrowserInfo = () => {

    if (browserInfo.includes("Edg")) {
        return "Microsoft Edge";
    }

    if (browserInfo.includes("Chrome")) {
        return "Google Chrome";
    }

    if (browserInfo.includes("Firefox")) {
        return "Mozilla Firefox";
    }

    if (browserInfo.includes("Safari")) {
        return "Safari";
    }

    return "Tuntematon selain";
};


const getOperatingSystem = () => {

    const platform =
        navigator.platform;


    if (platform.includes("Win")) {
        return "Windows";
    }

    if (platform.includes("Mac")) {
        return "macOS";
    }

    if (platform.includes("Linux")) {
        return "Linux";
    }

    if (
        navigator.userAgent.includes("Android")
    ) {
        return "Android";
    }

    if (
        navigator.userAgent.includes("iPhone") ||
        navigator.userAgent.includes("iPad")
    ) {
        return "iOS";
    }

    return "Tuntematon käyttöjärjestelmä";
};


const browser =
    getBrowserInfo();


const screenWidth =
    screen.width;

const screenHeight =
    screen.height;


const availableWidth =
    screen.availWidth;

const availableHeight =
    screen.availHeight;


const now =
    new Date();


const date =
    now.toLocaleDateString(
        "fi-FI",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


const time =
    now.toLocaleTimeString(
        "fi-FI",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );


target.innerHTML = `
    <p>
        Selain: ${browser}
    </p>

    <p>
        Käyttöjärjestelmä:
        ${getOperatingSystem()}
    </p>

    <p>
        Näytön koko:
        ${screenWidth} × ${screenHeight}
    </p>

    <p>
        Selaimelle käytettävissä oleva tila:
        ${availableWidth} × ${availableHeight}
    </p>

    <p>
        Päivämäärä:
        ${date}
    </p>

    <p>
        Kellonaika:
        ${time}
    </p>
`;