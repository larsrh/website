export default {
    source: "./img_assets/in",
    dest: "./img_assets/out",
    overwrite: "outdated",
    manifest: "_data/assets.yaml",
    modes: {
        small: {
            type: "scaled",
            size: 1600
        },
        thumb: {
            type: "thumbnail",
            size: 300
        }
    },
    formats: ["jpg", "avif"]
};
