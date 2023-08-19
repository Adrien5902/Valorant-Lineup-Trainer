module.exports = {
    packagerConfig: {
        asar: false,
        // icon: "path/to/app-icon.ico",
        ignore: [
            ".gitignore",
            ".config.js",
            ".env",
            "public",
            "src",
        ],
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            platforms: ["win32"],
            config: {
                name: "ValorantLineupTrainer",
                description: "Train lineups in valorant"
            },
        },
    ],
    // publishers: [
    //     {
    //         name: '@electron-forge/publisher-github',
    //         config: {
    //             repository: {
    //                 owner: 'Adrien5902',
    //                 name: 'Valorant-Lineup-Trainer'
    //             },
    //             prerelease: true,
    //             draft: true
    //         }
    //     }
    // ]
};