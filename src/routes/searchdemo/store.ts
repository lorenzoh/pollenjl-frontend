import {initialize, register, search} from "@novacbn/svelte-stork";

const STORK_WASM = 'https://github.com/jameslittle230/stork/releases/download/v1.5.0/stork.wasm'

await initialize({
    // If you want this library to handle mounting / loading
    // of the main Stork JS library after page load, you can
    // uncomment the following line
    //
    // script_url: "/path/to/stork.js",

    // The WASM blob is not optional however, due to how
    // Browsers handle loading them
    wasm_url: STORK_WASM
});
